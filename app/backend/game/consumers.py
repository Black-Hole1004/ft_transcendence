import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
import time
from django.core.cache import cache

# game related imports
import math
import random

# # When first player connects
# Connection attempt starting...
# Processing connection for game 2
# Connection accepted
# Assigned as Player 1
# Sent initial state to player 1

# # When that player disconnects
# Player 1 disconnected
# All players disconnected, starting session timeout

# # When new player connects before timeout
# Connection attempt starting...
# Processing connection for game 2
# Connection accepted
# Assigned as Player 1
# Sent initial state to player 1

# # When player connects after timeout
# Connection attempt starting...
# Processing connection for game 2
# Session expired, resetting game state
# Connection accepted
# Assigned as Player 1
# Sent initial state to player 1
import asyncio
import json
import math
import random
import time
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache

class GamePhysics:
    def __init__(self, canvas_width=800, canvas_height=400):
        self.canvas_width = canvas_width
        self.canvas_height = canvas_height
        self.max_ball_angle = 75  # Maximum angle in degrees

    def update_ball_position(self, ball, delta_time):
        """Update ball position with proper time-based movement"""
        ball['x'] += ball['velocityX'] * ball['speed'] * delta_time
        ball['y'] += ball['velocityY'] * ball['speed'] * delta_time
        
        # Validate ball position
        ball['x'] = max(ball['radius'], min(ball['x'], self.canvas_width - ball['radius']))
        ball['y'] = max(ball['radius'], min(ball['y'], self.canvas_height - ball['radius']))

    def handle_paddle_collision(self, ball, paddle, paddle_movement=0):
        """Advanced paddle collision with angle calculation and spin"""
        # Calculate relative intersection point
        hit_position = (paddle['y'] + paddle['height']/2 - ball['y']) / (paddle['height']/2)
        hit_position = max(-1, min(1, hit_position))  # Clamp between -1 and 1
        
        # Calculate bounce angle (in radians)
        bounce_angle = hit_position * (self.max_ball_angle * math.pi / 180)
        bounce_angle += paddle_movement * 0.2  # Add spin effect
        
        # Calculate new velocities
        speed = math.sqrt(ball['velocityX']**2 + ball['velocityY']**2)
        ball['velocityX'] = math.cos(bounce_angle) * speed * (-1 if paddle['x'] < self.canvas_width/2 else 1)
        ball['velocityY'] = -math.sin(bounce_angle) * speed
        
        # Position correction to prevent sticking
        if paddle['x'] < self.canvas_width/2:
            ball['x'] = paddle['x'] + paddle['width'] + ball['radius']
        else:
            ball['x'] = paddle['x'] - ball['radius']
        
        # Speed increase after paddle hit
        ball['speed'] = min(ball['speed'] + ball['speedIncrement'], ball['maxSpeed'])
    
    def check_paddle_collision(self, ball, paddle):
        """Check if ball collides with paddle"""
        if (ball['x'] - ball['radius'] <= paddle['x'] + paddle['width'] and
            ball['y'] >= paddle['y'] and ball['y'] <= paddle['y'] + paddle['height']):
            return True
        return

    def check_wall_collision(self, ball):
        """Handle wall collisions"""
        collision = False
        
        if ball['y'] - ball['radius'] <= 0:
            ball['y'] = ball['radius']
            ball['velocityY'] = abs(ball['velocityY'])
            collision = True
        elif ball['y'] + ball['radius'] >= self.canvas_height:
            ball['y'] = self.canvas_height - ball['radius']
            ball['velocityY'] = -abs(ball['velocityY'])
            collision = True
            
        return collision

    def check_scoring(self, ball):
        """Check if ball scored"""
        if ball['x'] - ball['radius'] <= 0:
            return 2  # Player 2 scores
        elif ball['x'] + ball['radius'] >= self.canvas_width:
            return 1  # Player 1 scores
        return 0  # No score

    def reset_ball(self, ball, direction=1):
        """Reset ball with random angle"""
        ball['x'] = self.canvas_width / 2
        ball['y'] = self.canvas_height / 2
        
        angle = random.uniform(-45, 45) * math.pi / 180
        speed = ball['speed']
        
        ball['velocityX'] = math.cos(angle) * speed * direction
        ball['velocityY'] = math.sin(angle) * speed

class GameState:
    def __init__(self, game_id, canvas_width=800, canvas_height=400):
        self.game_id = game_id
        self.canvas_width = canvas_width
        self.canvas_height = canvas_height
        
        # Game status
        self.connected_players = 0
        self.players_ready = set()
        self.last_update = {}
        self.disconnect_time = None
        self.reconnect_timeout = 3
        
        # Session management
        self.disconnected_time = None
        self.session_timeout = 3
        
        # Ball properties
        self.ball = {
            'x': canvas_width / 2,
            'y': canvas_height / 2,
            'radius': 15,
            'speed': 5,
            'velocityX': 5,
            'velocityY': 5,
            'speedIncrement': 0.2,
            'maxSpeed': 15
        }
        
        # Paddle properties
        self.paddle_width = 20
        self.paddle_height = 110
        self.paddle_speed = 10
        
        # Player paddles
        self.player1_paddle = {
            'x': 10,
            'y': canvas_height / 2 - self.paddle_height / 2,
            'height': self.paddle_height,
            'width': self.paddle_width,
            'score': 0,
            'connected': False
        }
        
        self.player2_paddle = {
            'x': canvas_width - 30,
            'y': canvas_height / 2 - self.paddle_height / 2,
            'height': self.paddle_height,
            'width': self.paddle_width,
            'score': 0,
            'connected': False
        }
        
        self.is_paused = False
        self.game_over = False
        self.winner = None

    def mark_disconnection(self):
        self.connected_players = max(0, self.connected_players - 1)
        if self.connected_players == 0:
            self.disconnected_time = time.time()

    def is_session_expired(self):
        if self.disconnected_time is None:
            return False
            
        elapsed_time = time.time() - self.disconnected_time
        return elapsed_time >= self.session_timeout

    def reset_session(self):
        self.disconnected_time = None
        self.connected_players = 0
        self.player1_paddle['connected'] = False
        self.player2_paddle['connected'] = False
        self.players_ready.clear()
        self.is_paused = False

class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.game_state = None
        self.player_number = None
        self.game_loop_task = None
        self.physics = GamePhysics()
        self.last_move_time = 0
        self.last_broadcast_time = 0

    def validate_game_state(self):
        """Validate game state to prevent cheating"""
        ball = self.game_state.ball
        
        # Validate ball position
        ball['x'] = max(ball['radius'], min(ball['x'], self.game_state.canvas_width - ball['radius']))
        ball['y'] = max(ball['radius'], min(ball['y'], self.game_state.canvas_height - ball['radius']))
        
        # Validate ball speed
        ball['speed'] = min(ball['speed'], ball['maxSpeed'])
        
        # Validate scores
        self.game_state.player1_paddle['score'] = max(0, min(11, self.game_state.player1_paddle['score']))
        self.game_state.player2_paddle['score'] = max(0, min(11, self.game_state.player2_paddle['score']))

    def get_game_state_dict(self):
        """Get current game state"""
        return {
            'ball': self.game_state.ball,
            'player1': {
                'x': self.game_state.player1_paddle['x'],
                'y': self.game_state.player1_paddle['y'],
                'score': self.game_state.player1_paddle['score'],
                'connected': self.game_state.player1_paddle['connected']
            },
            'player2': {
                'x': self.game_state.player2_paddle['x'],
                'y': self.game_state.player2_paddle['y'],
                'score': self.game_state.player2_paddle['score'],
                'connected': self.game_state.player2_paddle['connected']
            },
            'is_paused': self.game_state.is_paused,
            'game_over': self.game_state.game_over,
            'winner': self.game_state.winner,
            'connected_players': self.game_state.connected_players
        }

    async def connect(self):
        """Handle WebSocket connection"""
        try:
            self.game_id = str(self.scope['url_route']['kwargs']['game_id'])
            self.room_group_name = f'game_{self.game_id}'
            
            # Get or create game state
            try:
                game_state = cache.get(f'game_state_{self.game_id}')
                if game_state is None or not hasattr(game_state, 'is_session_expired') or game_state.is_session_expired():
                    game_state = GameState(self.game_id)
            except Exception as e:
                print(f"Error retrieving game state: {e}")
                game_state = GameState(self.game_id)

            await self.accept()
            
            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            
            # Assign player number
            if not game_state.player1_paddle['connected']:
                self.player_number = 1
                game_state.player1_paddle['connected'] = True
            elif not game_state.player2_paddle['connected']:
                self.player_number = 2
                game_state.player2_paddle['connected'] = True
            else:
                await self.close()
                return

            game_state.connected_players += 1
            self.game_state = game_state
            
            # Update cache
            with cache.lock(f'game_state_{self.game_id}_lock'):
                cache.set(f'game_state_{self.game_id}', self.game_state)
            
            # Send initial state
            await self.send(json.dumps({
                'type': 'game_info',
                'player_number': self.player_number,
                'state': self.get_game_state_dict()
            }))
            
        except Exception as e:
            print(f"Error in connect: {str(e)}")
            if hasattr(self, 'room_group_name'):
                await self.channel_layer.group_discard(
                    self.room_group_name,
                    self.channel_name
                )
            await self.close()

    async def disconnect(self, close_code):
        """Handle WebSocket disconnection"""
        try:
            if hasattr(self, 'game_state') and self.game_state:
                # Update player connection status
                if self.player_number == 1:
                    self.game_state.player1_paddle['connected'] = False
                else:
                    self.game_state.player2_paddle['connected'] = False
                
                self.game_state.connected_players -= 1
                self.game_state.is_paused = True
                self.game_state.mark_disconnection()
                
                # Update cache
                with cache.lock(f'game_state_{self.game_id}_lock'):
                    cache.set(f'game_state_{self.game_id}', self.game_state)
                
                # Notify remaining player
                if hasattr(self, 'room_group_name'):
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            'type': 'player_disconnected',
                            'player': self.player_number,
                            'remaining_players': self.game_state.connected_players
                        }
                    )
            
            # Leave room group
            if hasattr(self, 'room_group_name'):
                await self.channel_layer.group_discard(
                    self.room_group_name,
                    self.channel_name
                )
            
        except Exception as e:
            print(f"Error in disconnect: {str(e)}")


    async def receive(self, text_data):
        """Handle incoming WebSocket messages"""
        try:
            data = json.loads(text_data)
            message_type = data.get('type')
            
            handlers = {
                'paddle_move': self.handle_paddle_move,
                'player_ready': self.handle_player_ready,
                'restart_game': self.handle_restart_request,
                'pause_game': self.handle_pause_game,
                'resume_game': self.handle_resume_game,
                'start_game': self.handle_start_game
            }
            
            handler = handlers.get(message_type)
            if handler:
                # Rate limit message handling
                current_time = time.time()
                if not hasattr(self, 'last_message_time'):
                    self.last_message_time = 0
                
                if current_time - self.last_message_time < 1/60:  # 60 messages per second max
                    return
                    
                self.last_message_time = current_time
                await handler(data)
            else:
                await self.send(json.dumps({
                    'type': 'error',
                    'message': 'Unknown message type'
                }))
                
        except json.JSONDecodeError:
            await self.send(json.dumps({
                'type': 'error',
                'message': 'Invalid JSON format'
            }))
        except Exception as e:
            await self.send(json.dumps({
                'type': 'error',
                'message': str(e)
            }))

    async def game_loop(self):
        """Main game loop"""
        physics_interval = 1/60  # 60 FPS for physics
        broadcast_interval = 1/20  # 20 FPS for state updates
        last_physics_time = time.time()
        last_broadcast_time = time.time()
        
        while not self.game_state.game_over and self.game_state.connected_players == 2:
            current_time = time.time()
            
            if not self.game_state.is_paused:
                # Physics update
                if current_time - last_physics_time >= physics_interval:
                    delta_time = current_time - last_physics_time
                    last_physics_time = current_time
                    
                    try:
                        # Update ball position
                        self.physics.update_ball_position(self.game_state.ball, delta_time)
                        
                        # Check collisions
                        if self.physics.check_wall_collision(self.game_state.ball):
                            await self.broadcast_collision('wall')
                        
                        # Check paddle collisions
                        for i, paddle in enumerate([self.game_state.player1_paddle, self.game_state.player2_paddle], 1):
                            if self.physics.check_paddle_collision(self.game_state.ball, paddle):
                                await self.broadcast_collision('paddle', i)
                                self.physics.handle_paddle_collision(self.game_state.ball, paddle)
                        
                        # Check scoring
                        scorer = self.physics.check_scoring(self.game_state.ball)
                        if scorer > 0:
                            await self.handle_scoring(scorer)
                            
                    except Exception as e:
                        print(f"Error in physics update: {e}")
                        continue
                
                # State broadcast
                if current_time - last_broadcast_time >= broadcast_interval:
                    last_broadcast_time = current_time
                    await self.broadcast_game_state()
            
            await asyncio.sleep(physics_interval)

    async def handle_paddle_move(self, data):
        """Handle paddle movement"""
        if not self.game_state:
            return
                
        try:
            new_y = float(data.get('y', 0))
            # Validate bounds
            new_y = max(0, min(new_y, self.game_state.canvas_height - self.game_state.paddle_height))
            
            # Update paddle position
            if self.player_number == 1:
                self.game_state.player1_paddle['y'] = new_y
            else:
                self.game_state.player2_paddle['y'] = new_y
            
            # Broadcast to all clients
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'state_update',
                    'state': {
                        'paddles': {
                            '1': {'y': self.game_state.player1_paddle['y']},
                            '2': {'y': self.game_state.player2_paddle['y']}
                        }
                    }
                }
            )
            
        except Exception as e:
            print(f"Error in handle_paddle_move: {str(e)}")

    #added start
    async def handle_player_ready(self, data):
        """Handle player ready status"""
        if self.player_number not in self.game_state.players_ready:
            self.game_state.players_ready.add(self.player_number)
            
            if len(self.game_state.players_ready) == 2:
                self.game_state.is_paused = False
                await self.start_game()
            
            with cache.lock(f'game_state_{self.game_id}_lock'):
                self.game_state = cache.get(f'game_state_{self.game_id}')
                # Update game state and set cache
                cache.set(f'game_state_{self.game_id}', self.game_state)
    
    async def handle_pause_game(self, data):
        """Handle game pause request"""
        try:
            if not self.game_state.game_over:
                self.game_state.is_paused = True
                
                # Update cache
                with cache.lock(f'game_state_{self.game_id}_lock'):
                    cache.set(f'game_state_{self.game_id}', self.game_state)
                
                # Notify all players
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_status_update',
                        'is_paused': True,
                        'player': self.player_number
                    }
                )
        except Exception as e:
            print(f"Error in handle_pause_game: {str(e)}")
            await self.send(json.dumps({
                'type': 'error',
                'message': str(e)
            }))

    async def handle_restart_request(self, data):
        """Handle game restart request"""
        if self.game_state.game_over:
            await asyncio.sleep(2) # Wait for 2 seconds for players to see the final state before restarting 
            self.game_state = GameState(self.game_id)
            self.game_state.player1_paddle['connected'] = True
            self.game_state.player2_paddle['connected'] = True
            self.game_state.connected_players = 2
            self.game_state.players_ready.clear()
            with cache.lock(f'game_state_{self.game_id}_lock'):
                self.game_state = cache.get(f'game_state_{self.game_id}')
                # Update game state and set cache
                cache.set(f'game_state_{self.game_id}', self.game_state)
            
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_restarted',
                    'state': self.get_game_state_dict()
                }
            )
    
    async def handle_player_disconnect(self, data):
        """Handle player disconnect request"""
        try:
            if self.player_number == 1:
                self.game_state.player1_paddle['connected'] = False
            else:
                self.game_state.player2_paddle['connected'] = False
            
            self.game_state.connected_players -= 1
            self.game_state.is_paused = True
            self.game_state.disconnect_time = time.time()
            
            # Update game state in cache
            with cache.lock(f'game_state_{self.game_id}_lock'):
                cache.set(f'game_state_{self.game_id}', self.game_state)
            
            # Notify other player about disconnection
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'player_disconnected',
                    'player': self.player_number,
                    'message': f'Player {self.player_number} disconnected'
                }
            )
            
            # Start reconnection timeout handler
            asyncio.create_task(self.handle_reconnection_timeout())
            
        except Exception as e:
            print(f"Error in handle_player_disconnect: {str(e)}")
    
    async def handle_resume_game(self, data):
        """Handle game resume request"""
        try:
            if not self.game_state.game_over:
                self.game_state.is_paused = False
                
                # Update cache
                with cache.lock(f'game_state_{self.game_id}_lock'):
                    cache.set(f'game_state_{self.game_id}', self.game_state)
                
                # Notify all players
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_status_update',
                        'is_paused': False,
                        'player': self.player_number
                    }
                )
        except Exception as e:
            print(f"Error in handle_resume_game: {str(e)}")
            await self.send(json.dumps({
                'type': 'error',
                'message': str(e)
            }))
    
    async def handle_start_game(self, data):
        """Handle game start request"""
        try:
            if self.game_state.connected_players == 2 and not self.game_state.game_over:
                self.game_state.is_paused = False
                
                # Update cache
                with cache.lock(f'game_state_{self.game_id}_lock'):
                    cache.set(f'game_state_{self.game_id}', self.game_state)
                
                # Start game loop if not already running
                if not self.game_loop_task:
                    self.game_loop_task = asyncio.create_task(self.game_loop())
                
                # Notify all players
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_status_update',
                        'is_paused': False,
                        'player': self.player_number
                    }
                )
        except Exception as e:
            print(f"Error in handle_start_game: {str(e)}")
            await self.send(json.dumps({
                'type': 'error',
                'message': str(e)
            }))

    async def start_game(self):
        """Start the game loop with a countdown"""
        # await self.channel_layer.group_send(
        #     self.room_group_name,
        #     {'type': 'game_countdown', 'seconds': 3}
        # )
        # await asyncio.sleep(3)  # Countdown before starting the game
        if not self.game_loop_task:
            self.game_loop_task = asyncio.create_task(self.game_loop())
    
    async def broadcast_collision(self, collision_type, player=None):
        """Broadcast collision events"""
        if collision_type == 'wall':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'wall_collision'
                }
            )
        elif collision_type == 'paddle':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'paddle_collision',
                    'player': player
                }
            )
            
    # added end
    async def handle_scoring(self, scorer):
        """Handle scoring events"""
        if scorer == 1:
            self.game_state.player1_paddle['score'] += 1
        else:
            self.game_state.player2_paddle['score'] += 1

        # Reset ball
        self.game_state.ball['speed'] = 5
        self.physics.reset_ball(self.game_state.ball, direction=-1 if scorer == 1 else 1)
        
        # Broadcast score
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'score_update',
                'scorer': scorer,
                'scores': {
                    '1': self.game_state.player1_paddle['score'],
                    '2': self.game_state.player2_paddle['score']
                }
            }
        )
        
        # Check for game over
        if (self.game_state.player1_paddle['score'] >= 11 or 
            self.game_state.player2_paddle['score'] >= 11):
            self.game_state.game_over = True
            self.game_state.winner = 1 if self.game_state.player1_paddle['score'] > self.game_state.player2_paddle['score'] else 2
            await self.handle_game_over()

    async def broadcast_game_state(self):
        """Broadcast game state to all players"""
        current_state = {
            'ball': {
                'x': round(self.game_state.ball['x'], 2),
                'y': round(self.game_state.ball['y'], 2)
            },
            'paddles': {
                '1': {'y': round(self.game_state.player1_paddle['y'], 2)},
                '2': {'y': round(self.game_state.player2_paddle['y'], 2)}
            },
            'scores': {
                '1': self.game_state.player1_paddle['score'],
                '2': self.game_state.player2_paddle['score']
            }
        }
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'state_update',
                'state': current_state,
                'timestamp': time.time()
            }
        )

    # Event handlers for different message types
    async def state_update(self, event):
        """Forward state updates to the client"""
        print(f"Sending state update to client: {event}")  # Debug log
        await self.send(text_data=json.dumps({
            'type': 'state_update',
            'state': event['state']
        }))

    async def paddle_update(self, event):
        await self.send(text_data=json.dumps({
            'type': 'paddle_update',
            'player': event['player'],
            'y': event['y']
        }))

    async def score_update(self, event):
        await self.send(text_data=json.dumps({
            'type': 'score_update',
            'scorer': event['scorer'],
            'scores': event['scores']
        }))

    async def game_paused(self, event):
        await self.send(text_data=json.dumps({
            'type': 'game_paused',
            'player': event['player']
        }))

    async def game_resumed(self, event):
        await self.send(text_data=json.dumps({
            'type': 'game_resumed',
            'player': event['player']
        }))

    async def player_disconnected(self, event):
        await self.send(text_data=json.dumps({
            'type': 'player_disconnected',
            'player': event['player']
        }))

    async def game_countdown(self, event):
        await self.send(text_data=json.dumps({
            'type': 'game_countdown',
            'seconds': event['seconds']
        }))

    async def handle_game_over(self):
        """Handle game over state"""
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_ended',
                'reason': 'score_limit',
                'winner': self.game_state.winner,
                'final_scores': {
                    '1': self.game_state.player1_paddle['score'],
                    '2': self.game_state.player2_paddle['score']
                }
            }
        )
