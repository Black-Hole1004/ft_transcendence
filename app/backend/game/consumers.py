import asyncio
import json
import math
import random
import time
import traceback
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone
from .models import GameSessions
from asgiref.sync import sync_to_async
from UserManagement.models import Achievement

class GamePhysics:
    def __init__(self, canvas_width=800, canvas_height=400):
        self.canvas_width = canvas_width
        self.canvas_height = canvas_height
        self.max_ball_angle = 75  # Maximum angle in degrees
    
    def update_ball_position(self, ball, delta_time):
        """Update ball position with proper time-based movement"""
        # Scale the movement to be faster
        movement_scale = 1.5  # Adjust this value to change overall speed
        
        next_x = ball['x'] + (ball['velocityX'] * ball['speed'] * delta_time * movement_scale)
        next_y = ball['y'] + (ball['velocityY'] * ball['speed'] * delta_time * movement_scale)
        
        # Wall collisions (top and bottom)
        if next_y + ball['radius'] > self.canvas_height or next_y - ball['radius'] < 0:
            ball['velocityY'] = -ball['velocityY']
            # Prevent ball from going out of bounds for smoother bounce and position accuracy
            if next_y + ball['radius'] > self.canvas_height:
                next_y = self.canvas_height - ball['radius']
            if next_y - ball['radius'] <= 0:
                next_y = ball['radius']
        
        ball['x'] = next_x
        ball['y'] = next_y

    
    def handle_paddle_collision(self, ball, paddle):
        """Improved paddle collision physics"""
        # Reverse X direction
        ball['velocityX'] = -ball['velocityX']
        
        # Calculate collision point relative to paddle center
        relative_intersect_y = (paddle['y'] + (paddle['height'] / 2)) - ball['y']
        normalized_intersect = relative_intersect_y / (paddle['height'] / 2)
        
        # Calculate bounce angle (maximum 75 degrees)
        bounce_angle = normalized_intersect * (self.max_ball_angle * math.pi / 180)
        
        # Update velocities based on bounce angle
        speed = math.sqrt(ball['velocityX'] ** 2 + ball['velocityY'] ** 2)
        ball['velocityY'] = -speed * math.sin(bounce_angle)
        
        # Position correction
        if paddle['x'] < self.canvas_width / 2:  # Left paddle
            ball['x'] = paddle['x'] + paddle['width'] + ball['radius']
        else:  # Right paddle
            ball['x'] = paddle['x'] - ball['radius']
        
        # Speed increase with better scaling
        new_speed = min(ball['speed'] + ball['speedIncrement'], ball['maxSpeed'])
        speed_scale = new_speed / ball['speed']
        ball['speed'] = new_speed
        ball['velocityX'] *= speed_scale
        ball['velocityY'] *= speed_scale

    def check_paddle_collision(self, ball, paddle):
        """Check if ball collides with paddle"""
        return (ball['x'] - ball['radius'] <= paddle['x'] + paddle['width'] and
                ball['x'] + ball['radius'] >= paddle['x'] and
                ball['y'] + ball['radius'] >= paddle['y'] and
                ball['y'] - ball['radius'] <= paddle['y'] + paddle['height'])

    def check_wall_collision(self, ball):
        """Check and handle wall collisions"""
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
        return 0
    
    def reset_ball(self, ball, direction=1):
        """Reset ball with improved randomization"""
        # Center the ball
        ball['x'] = self.canvas_width / 2
        ball['y'] = self.canvas_height / 2
        
        # Reset to initial speed
        ball['speed'] = 8  # Match initial speed
        
        # Generate random angle between -45 and 45 degrees
        angle = random.uniform(-45, 45) * math.pi / 180
        speed = ball['speed']
        
        # Set velocities with proper scaling
        ball['velocityX'] = math.cos(angle) * speed * direction # Randomize direction
        ball['velocityY'] = math.sin(angle) * speed
        
        # Add slight randomization to initial speed
        speed_variation = random.uniform(0.9, 1.1)
        ball['velocityX'] *= speed_variation
        ball['velocityY'] *= speed_variation

class GameState:
    def __init__(self, game_id, canvas_width=800, canvas_height=400):
        self.game_id = game_id
        
        self.player1_id = None # player id from the matchmaking service to track players
        self.player2_id = None # player id from the matchmaking service to track players
        
        self.canvas_width = canvas_width
        self.canvas_height = canvas_height
        
        # track players ids 
        # pause/resume  management system
        self.pause_limit = 3 # number of pauses allowed for player
        self.player1_pauses_remaining = self.pause_limit
        self.player2_pauses_remaining = self.pause_limit
        self.current_pause_player = None # player who paused the game
        self.pause_time = None # time when game was paused
        self.pause_timeout = 20 # time in seconds before game is resumed automatically
        
        # for paddle movement
        self.player1_movement = None  # 'up', 'down', or None
        self.player2_movement = None  # 'up', 'down', or None
        
        # Game status
        self.connected_players = 0
        self.players_ready = set()
        self.time_remaining = 30  # 1 minute and 5 seconds
        
        # Ball properties
        self.ball = {
            'x': canvas_width / 2,
            'y': canvas_height / 2,
            'radius': 20,
            'speed': 6,
            'velocityX': 6,
            'velocityY': 6,
            'speedIncrement': 1.2,
            'maxSpeed': 18
        }
        
        # Paddle properties
        self.paddle_width = 20
        self.paddle_height = 110
        
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
            'y': 0,
            'height': self.paddle_height,
            'width': self.paddle_width,
            'score': 0,
            'connected': False
        }
        
        self.is_paused = True
        self.game_over = False
        self.winner = None
        
class GameConsumer(AsyncWebsocketConsumer):
    # Class variable to store game states
    game_states = {}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.player_number = None
        self.game_loop_task = None
        self.physics = GamePhysics()
        self._game_id = None

    @property
    def game_state(self):
        return self.game_states.get(self.game_id)

    @game_state.setter
    def game_state(self, value):
        self.game_states[self.game_id] = value

    @property
    def game_id(self):
        return self._game_id

    @game_id.setter
    def game_id(self, value):
        self._game_id = str(value)

    async def connect(self):
        """Handle WebSocket connection"""
        try:
            self.game_id = self.scope['url_route']['kwargs']['game_id']
            self.room_group_name = f'game_{self.game_id}'
                        
            # Initialize game state if it doesn't exist
            if not self.game_state:
                print("Creating new game state")
                self.game_state = GameState(self.game_id)
            
            await self.accept()
            
            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            
            if self.game_state.connected_players >= 2:
                print("Game is full")
                await self.close()
                return

            # Send initial state
            await self.send(json.dumps({
                'type': 'game_info',
                'player_number': self.player_number,
                'state': self.get_game_state_dict(),
                'settings': {
                    'paddle_width': self.game_state.paddle_width,
                    'paddle_height': self.game_state.paddle_height,
                    'canvas_width': self.game_state.canvas_width,
                    'canvas_height': self.game_state.canvas_height,
                    'duration': self.game_state.time_remaining
                }
            }))
            
        except Exception as e:
            # print(f"Error in connect: {str(e)}")
            traceback.print_exc()
            await self.close()

    async def disconnect(self, close_code):
        """Handle WebSocket disconnection"""
        try:
            if self.game_state:
                # Update player connection status
                if self.player_number == 1:
                    self.game_state.player1_paddle['connected'] = False
                else:
                    self.game_state.player2_paddle['connected'] = False
                
                self.game_state.connected_players -= 1
                self.game_state.is_paused = True
                
                # Notify remaining player
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

            # Handle game over if one player disconnects
            if self.game_state and self.game_state.connected_players <= 1:
                self.game_state.game_over = True
                self.game_state.winner = 1 if self.player_number == 2 else 2
                await self.handle_game_over()
            
        except Exception as e:
            print(f"Error in disconnect: {str(e)}")

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
            'time_remaining': self.game_state.time_remaining
        }

    async def receive(self, text_data):
        """Handle incoming WebSocket messages"""
        try:
            data = json.loads(text_data)
            message_type = data.get('type')
            
            # Message handlers for different message types
            handlers = {
                'player_number_init': self.handle_player_number_init, # the player number received from the frontend from the matchmaking service                'paddle_move': self.handle_paddle_move,
                'paddle_direction': self.handle_paddle_direction,
                'player_ready': self.handle_player_ready,
                'restart_game': self.handle_restart_request,
                'pause_game': self.handle_pause_game,
                'resume_game': self.handle_resume_game,
                'start_game': self.handle_start_game
            }
            
            handler = handlers.get(message_type)
            if handler:
                await handler(data)
            else:
                await self.send(json.dumps({
                    'type': 'error',
                    'message': 'Unknown message type'
                }))
                
        except Exception as e:
            await self.send(json.dumps({
                'type': 'error',
                'message': str(e)
            }))

    async def handle_player_number_init(self, data):
        """Handle player number initialization"""
        try:
            self.player_number = data.get('player_number')
            player_id = data.get('player_id') # player id (user id) from the matchmaking service (frontend)
            print(f"Player number initialized: {self.player_number} and player_id: {player_id}")
            if self.player_number == 1:
                self.game_state.player1_id = player_id
                self.game_state.player1_paddle['connected'] = True
            else:
                self.game_state.player2_id = player_id
                self.game_state.player2_paddle['connected'] = True
            
            self.game_state.connected_players += 1
            
            # Just confirm player number was set
            await self.send(json.dumps({
                'type': 'player_number_confirmed',
                'player_number': self.player_number
            }))
            
        except Exception as e:
            await self.send(json.dumps({
                'type': 'error',
                'message': f'Error initializing player number: {str(e)}'
            }))
            
    async def update_paddles(self, delta_time):
        """Update paddle positions with improved smoothness"""
        paddle_speed = 430 * delta_time  # Increased from 400 to 800 for faster movement
        
        # Update player 1 paddle with interpolation
        if self.game_state.player1_movement == 'up':
            target_y = max(0, self.game_state.player1_paddle['y'] - paddle_speed)
            self.game_state.player1_paddle['y'] = target_y
        elif self.game_state.player1_movement == 'down':
            target_y = min(
                400 - 110,  # canvas height - paddle height
                self.game_state.player1_paddle['y'] + paddle_speed
            )
            self.game_state.player1_paddle['y'] = target_y

        # Update player 2 paddle with interpolation
        if self.game_state.player2_movement == 'up':
            target_y = max(0, self.game_state.player2_paddle['y'] - paddle_speed)
            self.game_state.player2_paddle['y'] = target_y
        elif self.game_state.player2_movement == 'down':
            target_y = min(
                400 - 110,
                self.game_state.player2_paddle['y'] + paddle_speed
            )
            self.game_state.player2_paddle['y'] = target_y
    
    async def handle_paddle_direction(self, data):
        """Handle paddle direction changes with immediate response"""
        try:
            #check if the game is OVER
            if self.game_state is None or self.game_state.game_over:
                return
            
            action = data.get('action')
            player_paddle = self.game_state.player1_paddle if self.player_number == 1 else self.game_state.player2_paddle
            
            # Instant movement state change
            if self.player_number == 1:
                if action == 'startUp':
                    self.game_state.player1_movement = 'up'
                    # Initial movement for instant response
                    player_paddle['y'] = max(0, player_paddle['y'] - 7)
                elif action == 'startDown':
                    self.game_state.player1_movement = 'down'
                    player_paddle['y'] = min(400 - 110, player_paddle['y'] + 7)
                elif action in ['stopUp', 'stopDown']:
                    self.game_state.player1_movement = None
            else:
                if action == 'startUp':
                    self.game_state.player2_movement = 'up'
                    player_paddle['y'] = max(0, player_paddle['y'] - 7)
                elif action == 'startDown':
                    self.game_state.player2_movement = 'down'
                    player_paddle['y'] = min(400 - 110, player_paddle['y'] + 7)
                elif action in ['stopUp', 'stopDown']:
                    self.game_state.player2_movement = None
            
            # Immediate state broadcast for responsive feel
            await self.broadcast_game_state()

        except Exception as e:
            print(f"Error in handle_paddle_direction: {str(e)}")
            
    async def game_loop(self):
        """Main game loop with optimized timings"""
        physics_interval = 1/120  # Doubled physics rate (was 1/60)
        broadcast_interval = 1/60  # Increased broadcast rate (was 1/20)
        last_physics_time = time.time()
        last_broadcast_time = time.time()
        last_timer_update = time.time()
        # print("===> Game loop <===")
        try:
            while not self.game_state.game_over and self.game_state.connected_players == 2:
                current_time = time.time()
                # print(f"Game loop running: {current_time}")
                if not self.game_state.is_paused:
                    # Timer update
                    timer_delta = current_time - last_timer_update
                    last_timer_update = current_time
                    
                    self.game_state.time_remaining -= timer_delta
                    
                    # Check for time-based game over
                    if self.game_state.time_remaining <= 0:
                        self.game_state.time_remaining = 0
                        self.game_state.game_over = True
                        # determine winner based on score
                        if self.game_state.player1_paddle['score'] > self.game_state.player2_paddle['score']:
                            self.game_state.winner = 1
                        elif self.game_state.player1_paddle['score'] < self.game_state.player2_paddle['score']:
                            self.game_state.winner = 2
                        else:
                            self.game_state.winner = 0 # draw
                        await self.handle_game_over()
                        break
                    
                    # Physics update with more precise delta time
                    if current_time - last_physics_time >= physics_interval:
                        delta_time = min(current_time - last_physics_time, 0.017)  # Cap delta time
                        last_physics_time = current_time

                        # Update paddle positions
                        await self.update_paddles(delta_time)
                        
                        # Update ball position
                        self.physics.update_ball_position(self.game_state.ball, delta_time)
                        
                        # Check paddle collisions
                        for i, paddle in enumerate([self.game_state.player1_paddle, self.game_state.player2_paddle], 1):
                            if self.physics.check_paddle_collision(self.game_state.ball, paddle):
                                self.physics.handle_paddle_collision(self.game_state.ball, paddle)
                                # await self.broadcast_collision('paddle', i)
                        
                        # Check scoring
                        scorer = self.physics.check_scoring(self.game_state.ball)
                        if scorer > 0:
                            await self.handle_scoring(scorer)
                            continue
                    
                        # Broadcast state
                        if current_time - last_broadcast_time >= broadcast_interval:
                            last_broadcast_time = current_time
                            await self.broadcast_game_state()
                    
                # Always update timer reference if game is running
                last_timer_update = current_time
                await asyncio.sleep(0.008) #slightly faster than 1/120
                
        except Exception as e:
            print(f"Error in game loop: {str(e)}")
            import traceback
            print(traceback.format_exc())

    
    async def handle_paddle_move(self, data):
        """Handle paddle movement with improved smoothness"""
        try:
            direction = data.get('direction')
            paddle_speed = 15  # pixels per frame
            
            if self.player_number == 1:
                current_y = self.game_state.player1_paddle['y']
                if direction == 'up':
                    new_y = max(0, current_y - paddle_speed)
                else:  # down
                    new_y = min(
                        400 - 110,  # canvas height - paddle height
                        current_y + paddle_speed
                    )
                self.game_state.player1_paddle['y'] = new_y
            else:
                current_y = self.game_state.player2_paddle['y']
                if direction == 'up':
                    new_y = max(0, current_y - paddle_speed)
                else:  # down
                    new_y = min(
                        400 - 110,  # canvas height - paddle height
                        current_y + paddle_speed
                    )
                self.game_state.player2_paddle['y'] = new_y

            # Send paddle updates immediately
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'paddles_update',
                    'paddles': {
                        '1': {
                            'x': self.game_state.player1_paddle['x'],
                            'y': self.game_state.player1_paddle['y']
                        },
                        '2': {
                            'x': self.game_state.player2_paddle['x'],
                            'y': self.game_state.player2_paddle['y']
                        }
                    }
                }
            )
        except Exception as e:
            print(f"Error in handle_paddle_move: {str(e)}")


    async def handle_player_ready(self, data):
        """Handle player ready status"""
        try:
            self.game_state.players_ready.add(self.player_number)
            # print(f"Player {self.player_number} ready. Ready players: {self.game_state.players_ready}")
            
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'player_ready',
                    'player': self.player_number
                }
            )

            # Start game if both players are ready
            # if len(self.game_state.players_ready) == 2:
            #     await self.handle_start_game(None)

        except Exception as e:
            print(f"Error in handle_player_ready: {str(e)}")

    async def handle_start_game(self, data):
        """Handle game start request"""
        try:
            # print("\n=== Starting Game ===")
            
            if (self.game_state.connected_players == 2 and 
                len(self.game_state.players_ready) == 2 and 
                not self.game_state.game_over):
                
                self.game_state.is_paused = False
                
                # Start game loop if not already running
                if not self.game_loop_task:
                    # print("Starting game loop")
                    self.game_loop_task = asyncio.create_task(self.game_loop())
                
                # print("Game started successfully")
                
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_started',
                        'message': 'Game has started!'
                    }
                )
            else:
                print(f"Can't start game: players={self.game_state.connected_players}, " 
                    f"ready={self.game_state.players_ready}, "
                    f"game_over={self.game_state.game_over}")
                
        except Exception as e:
            print(f"Error in handle_start_game: {str(e)}")

    async def check_pause_timeout(self):
        """Check if pause has exceeded timeout"""
        try:
            start_pause_time = self.game_state.pause_time
            
            for remaining in range(self.game_state.pause_timeout, 0, -1):
                await asyncio.sleep(1)
                
                # Stop if already resumed
                if not self.game_state.is_paused or self.game_state.pause_time != start_pause_time:
                    print("Pause timeout cancelled - game resumed")
                    return
                    
                # Send warning every 5 seconds
                if remaining % 5 == 0:
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            'type': 'pause_timeout_warning',
                            'seconds_remaining': remaining
                        }
                    )
            
            # Auto-resume on timeout
            if self.game_state.is_paused and self.game_state.pause_time == start_pause_time:
                print(f"Pause timeout reached - auto-resuming game")
                self.game_state.is_paused = False
                self.game_state.current_pause_player = None
                self.game_state.pause_time = None
                
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_resumed',  
                        'player': self.game_state.current_pause_player
                    }
                )
                
        except Exception as e:
            print(f"Error in check_pause_timeout: {str(e)}")
            traceback.print_exc()
        
        
    async def handle_pause_game(self, data):
        """Handle game pause request"""
        # print("Handling pause request    ..... hahahhahahha")
        if not self.game_state.game_over:
            # Check if player has pauses remaining
            pauses_remaining = (self.game_state.player1_pauses_remaining 
                            if self.player_number == 1 
                            else self.game_state.player2_pauses_remaining)
            
            if pauses_remaining > 0:
                self.game_state.is_paused = True
                self.game_state.current_pause_player = self.player_number
                self.game_state.pause_time = time.time()
                
                # Decrement remaining pauses
                if self.player_number == 1:
                    self.game_state.player1_pauses_remaining -= 1
                else:
                    self.game_state.player2_pauses_remaining -= 1
                
                print(f"Sending pause update. P1 remaining: {self.game_state.player1_pauses_remaining}, P2 remaining: {self.game_state.player2_pauses_remaining}")
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_paused',
                        'player': self.player_number,
                        'pauses_remaining': {
                            '1': self.game_state.player1_pauses_remaining,
                            '2': self.game_state.player2_pauses_remaining
                        }
                    }
                )
                print("Pause update sent successfully xoxoxoxox")
                
                # Start pause timeout checker
                asyncio.create_task(self.check_pause_timeout())

    async def handle_resume_game(self, data):
        """Handle game resume request"""
        if not self.game_state.game_over and self.game_state.is_paused:
            # Only allow the player who paused to resume
            if self.player_number == self.game_state.current_pause_player:
                self.game_state.is_paused = False
                self.game_state.current_pause_player = None
                self.game_state.pause_time = None
                
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_resumed',
                        'player': self.player_number
                    }
                )

    async def handle_restart_request(self, data):
        """Handle game restart request"""
        if self.game_state.game_over:
            self.game_state = GameState(self.game_id)
            self.game_state.player1_paddle['connected'] = True
            self.game_state.player2_paddle['connected'] = True
            self.game_state.connected_players = 2
            self.game_state.players_ready.clear()
            
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_restarted',
                    'state': self.get_game_state_dict()
                }
            )

    async def handle_scoring(self, scorer):
        """Handle scoring events"""
        if scorer == 1:
            self.game_state.player1_paddle['score'] += 1
        else:
            self.game_state.player2_paddle['score'] += 1

        # Reset ball
        self.game_state.ball['speed'] = 8
        self.physics.reset_ball(self.game_state.ball, direction=-1 if scorer == 1 else 1)
        
        # Instead of separate score update, broadcast full game state
        await self.broadcast_game_state()
        
        # Check for game over by score limit
        if (self.game_state.player1_paddle['score'] >= 10 or 
            self.game_state.player2_paddle['score'] >= 10):
            self.game_state.game_over = True
            self.game_state.winner = 1 if self.game_state.player1_paddle['score'] > self.game_state.player2_paddle['score'] else 2
            await self.handle_game_over()

    async def broadcast_game_state(self):
        """Broadcast complete game state to all players"""
        current_state = {
            'ball': {
                'x': round(self.game_state.ball['x'], 2),
                'y': round(self.game_state.ball['y'], 2)
            },
            'player1': {
                'x': self.game_state.player1_paddle['x'],
                'y': self.game_state.player1_paddle['y'],
                'score': self.game_state.player1_paddle['score']
            },
            'player2': {
                'x': self.game_state.player2_paddle['x'],
                'y': self.game_state.player2_paddle['y'],
                'score': self.game_state.player2_paddle['score']
            },
            'time_remaining': round(self.game_state.time_remaining),
            'winner': self.game_state.winner,
        }
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_state_update',
                'state': current_state
            }
        )

    async def broadcast_collision(self, collision_type, player=None):
        """Broadcast collision events"""
        message = {'type': f'{collision_type}_collision'}
        if player:
            message['player'] = player
        
        await self.channel_layer.group_send(self.room_group_name, message)

    async def handle_game_over(self):
        """Handle game over state"""        
        reason = 'time_up' if self.game_state.time_remaining <= 0 else 'score_limit'
        
        winner_number = self.game_state.winner
        #     winner_number = 1 if self.game_state.player1_paddle['score'] > self.game_state.player2_paddle['score'] else 2
        # get winner_id
        winner_id = self.game_state.player1_id if winner_number == 1 else self.game_state.player2_id
        loser_id = self.game_state.player1_id if winner_number == 2 else self.game_state.player2_id
        winner_score = self.game_state.player1_paddle['score'] if winner_number == 1 else self.game_state.player2_paddle['score']
        loser_score = self.game_state.player2_paddle['score'] if winner_number == 1 else self.game_state.player1_paddle['score']
        
        # update the the database, winner and loser score, game status to completed, winner and loser users with the appropriate xp points
        print(f"Winner: {winner_id}, Loser: {loser_id}, Scores: {winner_score} - {loser_score}")
        print(f"Game over reason: {reason} ----- Updating game results -----")
        await self.update_game_results (
            winner_id=winner_id,
            loser_id=loser_id,
            winner_score=winner_score,
            loser_score=loser_score
        )
        
        # await self.channel_layer.group_send(
        #     self.room_group_name,
        #     {
        #         'type': 'game_ended',
        #         'reason': reason,
        #         'winner': self.game_state.winner,
        #         'final_scores': {
        #             '1': self.game_state.player1_paddle['score'],
        #             '2': self.game_state.player2_paddle['score']
        #         },
        #         'time_remaining': round(self.game_state.time_remaining)
        #     }
        # )

    def calculate_xp_gain(self, winner_score, loser_score):
        """Calculate XP gain based on game results"""
        """
            {'name': 'NOVICE ASTRONAUT', 'xp': 0, 'image': '/badges/novice.png'},
            {'name': 'COSMIC EXPLORER', 'xp': 2000, 'image': '/badges/cosmic.png'},
            {'name': 'STELLAR VOYAGER', 'xp': 4000, 'image': '/badges/stellar.png'},
            {'name': 'GALACTIC TRAILBLAZER', 'xp': 6000, 'image': '/badges/galactic.png'},
            {'name': 'CELESTIAL MASTER', 'xp': 8000, 'image': '/badges/celestial.png'}
            
        """
        # Calculate XP gain based on score difference
        score_diff = abs(winner_score - loser_score)
        xp_gain = 250 + (score_diff * 10) # 250 base XP + 10 XP per score difference
        return xp_gain

    async def get_user(self, user_id):
        """
        Get user from database
        """
        try:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            
            user = await sync_to_async(User.objects.get)(id=user_id)
            return user
        except Exception as e:
            print(f"Error getting user {user_id}: {e}")
            return None
    
    async def update_user(self, user):
        """
        Update user in database
        """
        try:
            await sync_to_async(user.save)()
        except Exception as e:
            print(f"Error updating user {user.id}: {e}")
            
    async def get_game_session(self, game_id):
        """
        Get game session from database
        """
        try:
            game = await sync_to_async(GameSessions.objects.get)(game_id=game_id)
            return game
        except GameSessions.DoesNotExist:
            print(f"Game session {game_id} not found")
            return None
        except Exception as e:
            print(f"Error getting game session {game_id}: {e}")
            return None

    async def update_game_results(self, winner_id, loser_id, winner_score, loser_score):
        try:
            game = await self.get_game_session(self.game_id)
            
            if not game:
                print("Game session with id {self.game_id} not found")
                return
            
            # Calculate XP changes
            xp_gain = self.calculate_xp_gain(winner_score, loser_score)
            
            # Update winner stats
            winner = await self.get_user(winner_id)
            old_winner_xp = winner.xp  # Store old XP for sending in response
            winner.xp += xp_gain
            winner.won_games_count += 1
            winner.total_games_count += 1
            await self.update_user(winner)
            
            # Update loser stats
            loser = await self.get_user(loser_id)
            old_loser_xp = loser.xp  # Store old XP for sending in response
            loser.xp = max(0, loser.xp - (xp_gain // 2))
            loser.lost_games_count += 1
            loser.total_games_count += 1
            await self.update_user(loser)
            
            # Update game status
            game.status = GameSessions.GameStatus.FINISHED
            game.end_time = timezone.now()
            game.winner_id = winner_id
            game.loser_id = loser_id
            game.score_player1 = winner_score if self.game_state.player1_id == winner_id else loser_score
            game.score_player2 = loser_score if self.game_state.player1_id == winner_id else winner_score
            await sync_to_async(game.save)()

            # Get badges (assuming you have a similar Achievement class as in matchmaking)
            winner_badge = Achievement.get_badge(winner.xp)
            loser_badge = Achievement.get_badge(loser.xp)
            
            # Send comprehensive game end data
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_ended',
                    'game_id': game.game_id,
                    'reason': 'time_up' if self.game_state.time_remaining <= 0 else 'score_limit',
                    'winner_user': {
                        'id': winner.id,
                        'username': winner.username,
                        'profile_picture': winner.profile_picture.url if winner.profile_picture else None,
                        'old_xp': old_winner_xp,
                        'new_xp': winner.xp,
                        'xp_change': xp_gain,
                        'score': winner_score,
                        'badge': winner_badge
                    },
                    'loser_user': {
                        'id': loser.id,
                        'username': loser.username,
                        'profile_picture': loser.profile_picture.url if loser.profile_picture else None,
                        'old_xp': old_loser_xp,
                        'new_xp': loser.xp,
                        'xp_change': -(xp_gain // 2),
                        'score': loser_score,
                        'badge': loser_badge
                    }
                }
            )
            print("\n" + "="*80)
            print("                               GAME OVER                                     ")
            print("="*80 + "\n")
            
            print("GAME DETAILS:")
            print(f"Game ID: {game.game_id}")
            print(f"Reason: {'time_up' if self.game_state.time_remaining <= 0 else 'score_limit'}")
            print("\n" + "-"*80)
            
            print("WINNER INFORMATION:")
            print("-"*80)
            print(f"ID: {winner.id}")
            print(f"Username: {winner.username}")
            print(f"Profile Picture: {winner.profile_picture.url if winner.profile_picture else 'None'}")
            print(f"Score: {winner_score}")
            print(f"XP Change: {old_winner_xp} -> {winner.xp} (Gained: +{xp_gain})")
            print(f"Badge: {winner_badge['name']} ({winner_badge['image']})")
            print("\n" + "-"*80)
            
            print("LOSER INFORMATION:")
            print("-"*80)
            print(f"ID: {loser.id}")
            print(f"Username: {loser.username}")
            print(f"Profile Picture: {loser.profile_picture.url if loser.profile_picture else 'None'}")
            print(f"Score: {loser_score}")
            print(f"XP Change: {old_loser_xp} -> {loser.xp} (Lost: {-(xp_gain // 2)})")
            print(f"Badge: {loser_badge['name']} ({loser_badge['image']})")
            print("\n" + "="*80 + "\n")
            
        except Exception as e:
            print(f"Error updating game results: {e}")
            traceback.print_exc()
    
    async def game_ended(self, event):
        """Handle game ended event"""
        try:
            await self.send(text_data=json.dumps({
                'type': 'game_ended',
                'game_id': event['game_id'],
                'reason': event['reason'],
                'winner_user': event['winner_user'],
                'loser_user': event['loser_user']
            }))
        except Exception as e:
            print(f"Error sending game_ended message: {e}")
            traceback.print_exc()
    
    # WebSocket event handler methods
    async def ball_update(self, event):
        """Handle ball update event"""
        await self.send(text_data=json.dumps({
            'type': 'ball_update',
            'state': event['state']
        }))

    async def paddles_update(self, event):
        """Handle paddles update event"""
        await self.send(text_data=json.dumps({
            'type': 'paddles_update',
            'paddles': event['paddles']
        }))

    async def score_update(self, event):
        """Handle score update event"""
        await self.send(text_data=json.dumps({
            'type': 'score_update',
            'scorer': event['scorer'],
            'scores': event['scores']
        }))

    async def game_paused(self, event):
        """Handle game paused event"""
        await self.send(text_data=json.dumps({
            'type': 'game_paused',
            'player': event['player'],
            'pauses_remaining': event['pauses_remaining']
        }))

    async def game_resumed(self, event):
        """Handle game resumed event"""
        await self.send(text_data=json.dumps({
            'type': 'game_resumed',
            'player': event['player']
        }))

    
    async def pause_timeout_warning(self, event):
        """Handle pause timeout warning event"""
        await self.send(text_data=json.dumps({
            'type': 'pause_timeout_warning',
            'seconds_remaining': event['seconds_remaining']
        }))

    async def pause_timeout(self, event):
        """Handle pause timeout event"""
        await self.send(text_data=json.dumps({
            'type': 'pause_timeout',
            'player': event['player'],
            # 'winner': event['winner']
        }))
    
    async def game_started(self, event):
        """Handle game started event"""
        await self.send(text_data=json.dumps({
            'type': 'game_started',
            'message': event['message']
        }))

    async def game_ended(self, event):
        """Handle game ended event"""
        await self.send(text_data=json.dumps({
            'type': 'game_ended',
            'reason': event['reason'],
            'winner': event['winner'],
            'final_scores': event['final_scores']
        }))

    async def game_restarted(self, event):
        """Handle game restarted event"""
        await self.send(text_data=json.dumps({
            'type': 'game_restarted',
            'state': event['state']
        }))

    async def player_ready(self, event):
        """Handle player ready event"""
        await self.send(text_data=json.dumps({
            'type': 'player_ready',
            'player': event['player']
        }))

    async def player_disconnected(self, event):
        """Handle player disconnected event"""
        await self.send(text_data=json.dumps({
            'type': 'player_disconnected',
            'player': event['player'],
            'remaining_players': event['remaining_players']
        }))

    async def wall_collision(self, event):
        """Handle wall collision event"""
        await self.send(text_data=json.dumps({
            'type': 'wall_collision'
        }))

    async def paddle_collision(self, event):
        """Handle paddle collision event"""
        await self.send(text_data=json.dumps({
            'type': 'paddle_collision',
            'player': event.get('player')
        }))
        
    async def game_state_update(self, event):
        """Handle game state update event"""
        await self.send(text_data=json.dumps({
            'type': 'game_state_update',
            'state': event['state']
        }))
    