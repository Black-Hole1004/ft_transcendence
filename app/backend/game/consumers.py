import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import sync_to_async
import math
import time
from channels.db import database_sync_to_async
from django.core.cache import cache

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
        self.reconnect_timeout = 3  # seconds
        
        # Session management
        self.disconnected_time = None
        self.session_timeout = 3  # seconds
        
        # Ball properties
        self.ball = {
            'x': canvas_width / 2,
            'y': canvas_height / 2,
            'radius': 15,
            'speed': 5,
            'velocityX': 5,
            'velocityY': 5,
            'speedIncrement': 0.2,  # Speed increase after each paddle hit
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
            'score': 0,
            'connected': False
        }
        
        self.player2_paddle = {
            'x': canvas_width - 30,
            'y': canvas_height / 2 - self.paddle_height / 2,
            'score': 0,
            'connected': False
        }
        
        # Game state flags
        self.is_paused = True  # Start paused until both players ready
        self.game_over = False
        self.winner = None

    def mark_disconnection(self):
        """Mark when disconnection happened and start timeout if needed"""
        self.connected_players = max(0, self.connected_players - 1)  # Ensure we don't go below 0
        
        # Only start the timeout if all players are disconnected
        if self.connected_players == 0:
            print(f"All players disconnected, starting session timeout")
            self.disconnected_time = time.time()
        else:
            print(f"{self.connected_players} player(s) still connected")

    def is_session_expired(self):
        """Check if the session has expired"""
        if self.disconnected_time is None:
            return False
            
        current_time = time.time()
        elapsed_time = current_time - self.disconnected_time
        
        # Check if we've exceeded the timeout period
        if elapsed_time >= self.session_timeout:
            print(f"Session expired after {elapsed_time:.2f} seconds")
            return True
            
        return False

    def reset_session(self):
        """Reset session state"""
        self.disconnected_time = None
        self.connected_players = 0
        self.player1_paddle['connected'] = False
        self.player2_paddle['connected'] = False
        self.players_ready.clear()
        self.is_paused = True

class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.game_state = None
        self.player_number = None
        self.game_loop_task = None

    
    def get_game_state_dict(self):
        """Convert game state to dictionary"""
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
        """Handle new WebSocket connection"""
        try:
            print("Connection attempt starting...")
            
            self.game_id = str(self.scope['url_route']['kwargs']['game_id'])
            self.room_group_name = f'game_{self.game_id}'
            print(f"Processing connection for game {self.game_id}")
            
            # Get game state from cache with proper error handling
            try:
                game_state = cache.get(f'game_state_{self.game_id}')
                if game_state is None:
                    print("No existing game state found")
                    game_state = GameState(self.game_id)
                else:
                    print("Found existing game state")
                    # Verify the game state has the required method
                    if not hasattr(game_state, 'is_session_expired'):
                        print("Game state missing methods, creating new instance")
                        game_state = GameState(self.game_id)
                    elif game_state.is_session_expired():
                        print("Session expired, creating new game state")
                        game_state = GameState(self.game_id)
            except Exception as e:
                print(f"Error retrieving game state: {e}")
                game_state = GameState(self.game_id)

            # Accept the connection
            await self.accept()
            print("Connection accepted")
            
            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            
            # Handle player assignment
            if not game_state.player1_paddle['connected']:
                self.player_number = 1
                game_state.player1_paddle['connected'] = True
                print("Assigned as Player 1")
            elif not game_state.player2_paddle['connected']:
                self.player_number = 2
                game_state.player2_paddle['connected'] = True
                print("Assigned as Player 2")
            else:
                print("No available player slots")
                await self.close()
                return

            game_state.connected_players += 1
            self.game_state = game_state
            
            # Update game state in cache
            with cache.lock(f'game_state_{self.game_id}_lock'):
                cache.set(f'game_state_{self.game_id}', self.game_state)
            
            # Send initial state
            await self.send(json.dumps({
                'type': 'game_info',
                'player_number': self.player_number,
                'state': self.get_game_state_dict()
            }))
            print(f"Sent initial state to player {self.player_number}")
            
        except Exception as e:
            print(f"Error in connect: {str(e)}")
            import traceback
            traceback.print_exc()
            if hasattr(self, 'room_group_name'):
                await self.channel_layer.group_discard(
                    self.room_group_name,
                    self.channel_name
                )
            await self.close()

    async def disconnect(self, close_code):
        """Handle WebSocket disconnection"""
        try:
            print(f"Handling disconnect for game {self.game_id}, player {self.player_number}")
            
            if hasattr(self, 'game_state') and self.game_state:
                # Update the game state
                if self.player_number == 1:
                    self.game_state.player1_paddle['connected'] = False
                else:
                    self.game_state.player2_paddle['connected'] = False
                
                self.game_state.connected_players -= 1
                self.game_state.is_paused = True
                
                # Mark disconnection - this sets the disconnection time
                self.game_state.mark_disconnection()
                print(f"Marked disconnection for Player {self.player_number}. Players remaining: {self.game_state.connected_players}")
                
                # Update game state in cache
                with cache.lock(f'game_state_{self.game_id}_lock'):
                    cache.set(f'game_state_{self.game_id}', self.game_state)
                
                # Notify other players if any are still connected
                if hasattr(self, 'room_group_name'):
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            'type': 'player_disconnected',
                            'player': self.player_number,
                            'remaining_players': self.game_state.connected_players,
                            'message': f'Player {self.player_number} disconnected'
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
            import traceback
            traceback.print_exc()

        # Modify the receive method to include the new handlers
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
                'start_game': self.handle_start_game,
                'player_disconnect': self.handle_player_disconnect
            }
            
            handler = handlers.get(message_type)
            if handler:
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
    # for game pasue and resume functionality
        # Add these event handlers as well
    
    async def game_paused(self, event):
        """Send pause notification to clients"""
        await self.send(text_data=json.dumps({
            'type': 'game_paused',
            'player': event['player']
        }))

    async def game_resumed(self, event):
        """Send resume notification to clients"""
        await self.send(text_data=json.dumps({
            'type': 'game_resumed',
            'player': event['player']
        }))

    async def handle_paddle_move(self, data):
        """Handle paddle movement"""
        if not self.game_state or self.game_state.game_over:
            return
            
        try:
            new_y = data.get('y', 0)
            new_y = max(0, min(new_y, self.game_state.canvas_height - self.game_state.paddle_height))
            
            if self.player_number == 1:
                self.game_state.player1_paddle['y'] = new_y
            else:
                self.game_state.player2_paddle['y'] = new_y
            print(f"Player {self.player_number} moved paddle to {new_y}")
            # Only broadcast paddle position
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'paddle_update',
                    'player': self.player_number,
                    'y': new_y
                }
            )
            
        except Exception as e:
            print(f"Error in handle_paddle_move: {str(e)}")

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
    
    async def handle_start_game(self, data):
        """Handle game start request"""
        if self.game_state.connected_players == 2 and not self.game_state.game_over:
            # Mark player as ready
            self.game_state.players_ready.add(self.player_number)
            
            # If both players are ready, start the game
            if len(self.game_state.players_ready) == 2:
                await self.start_game()
            else:
                # Notify that we're waiting for other player
                await self.send(json.dumps({
                    'type': 'waiting_for_player',
                    'message': 'Waiting for other player to be ready'
                }))
            
            # Update game state in cache
            with cache.lock(f'game_state_{self.game_id}_lock'):
                cache.set(f'game_state_{self.game_id}', self.game_state)

    async def start_game(self):
        """Start the game loop with a countdown"""
        await self.channel_layer.group_send(
            self.room_group_name,
            {'type': 'game_countdown', 'seconds': 3}
        )
        await asyncio.sleep(3)  # Countdown before starting the game
        if not self.game_loop_task:
            self.game_loop_task = asyncio.create_task(self.game_loop())
    
    async def handle_resume_game(self, data):
        """Handle game resume request"""
        if not self.game_state.game_over:
            self.game_state.is_paused = False
            
            # Update game state in cache
            with cache.lock(f'game_state_{self.game_id}_lock'):
                cache.set(f'game_state_{self.game_id}', self.game_state)
            
            # Add countdown before resuming
            await self.channel_layer.group_send(
                self.room_group_name,
                {'type': 'game_countdown', 'seconds': 3}
            )
            await asyncio.sleep(3)
            
            # Notify all players about resume
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_resumed',
                    'player': self.player_number
                }
            )

    async def handle_pause_game(self, data):
        """Handle game pause request"""
        if not self.game_state.game_over:
            self.game_state.is_paused = True
            
            # Update game state in cache
            with cache.lock(f'game_state_{self.game_id}_lock'):
                cache.set(f'game_state_{self.game_id}', self.game_state)
            
            # Notify all players about pause
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_paused',
                    'player': self.player_number  # Track who paused the game
                }
            )

    async def game_loop(self):
        """Main game loop with optimized state updates"""
        last_state = {}
        
        while not self.game_state.game_over and self.game_state.connected_players == 2:
            if not self.game_state.is_paused:
                # Update ball position
                self.update_ball_position()
                
                # Check collisions and handle scoring
                await self.check_collisions_and_scoring()
                
                # Get current state
                current_state = self.get_game_state_dict()
                
                # Only send updates for changed values
                changes = {}
                for key, value in current_state.items():
                    if key not in last_state or last_state[key] != value:
                        changes[key] = value
                
                if changes:
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            'type': 'state_update',
                            'changes': changes
                        }
                    )
                    last_state = current_state
                
            await asyncio.sleep(1/60)  # 60 FPS

    def update_ball_position(self):
        """Update ball position with physics"""
        ball = self.game_state.ball
        ball['x'] += ball['velocityX'] * ball['speed']
        ball['y'] += ball['velocityY'] * ball['speed']

    async def check_collisions_and_scoring(self):
        """Handle collisions and scoring"""
        ball = self.game_state.ball
        
        # Wall collisions
        if ball['y'] + ball['radius'] > self.game_state.canvas_height or ball['y'] - ball['radius'] < 0:
            ball['velocityY'] = -ball['velocityY']
        
        # Paddle collisions
        for paddle_num, paddle in enumerate([self.game_state.player1_paddle, self.game_state.player2_paddle], 1):
            if self.check_paddle_collision(ball, paddle):
                ball['velocityX'] = -ball['velocityX']
                # Increase ball speed
                ball['speed'] = min(ball['speed'] + ball['speedIncrement'], ball['maxSpeed'])
                break
        
        # Scoring
        if ball['x'] - ball['radius'] < 0:
            self.game_state.player2_paddle['score'] += 1
            await self.reset_ball()
        elif ball['x'] + ball['radius'] > self.game_state.canvas_width:
            self.game_state.player1_paddle['score'] += 1
            await self.reset_ball()
        
        # Check for game over
        if (self.game_state.player1_paddle['score'] >= 11 or 
            self.game_state.player2_paddle['score'] >= 11):
            self.game_state.game_over = True
            self.game_state.winner = 1 if self.game_state.player1_paddle['score'] > self.game_state.player2_paddle['score'] else 2

    def check_paddle_collision(self, ball, paddle):
        """Check if ball collides with paddle"""
        return (ball['x'] - ball['radius'] < paddle['x'] + self.game_state.paddle_width and
                ball['x'] + ball['radius'] > paddle['x'] and
                ball['y'] + ball['radius'] > paddle['y'] and
                ball['y'] - ball['radius'] < paddle['y'] + self.game_state.paddle_height)

    async def reset_ball(self):
        """Reset ball after scoring"""
        ball = self.game_state.ball
        ball['x'] = self.game_state.canvas_width / 2
        ball['y'] = self.game_state.canvas_height / 2
        # reset the ball speed to the initial value
        ball['speed'] = self.game_state.ball['speed']
        ball['velocityX'] = -ball['velocityX']
        ball['velocityY'] = 5 * (1 if ball['velocityY'] > 0 else -1)

    async def handle_reconnection_timeout(self):
        """Handle reconnection timeout"""
        await asyncio.sleep(self.game_state.reconnect_timeout)
        if (self.game_state.disconnect_time and 
            time.time() - self.game_state.disconnect_time >= self.game_state.reconnect_timeout):
            self.game_state.game_over = True
            self.game_state.winner = 2 if self.player_number == 1 else 1
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_ended',
                    'reason': 'disconnect_timeout',
                    'winner': self.game_state.winner
                }
            )

    # WebSocket event handlers
    async def state_update(self, event):
        """Send state updates to client"""
        await self.send(text_data=json.dumps({
            'type': 'state_update',
            'changes': event['changes']
        }))

    async def paddle_update(self, event):
        """Send paddle updates to client"""
        await self.send(text_data=json.dumps({
            'type': 'paddle_update',
            'player': event['player'],
            'y': event['y']
        }))

    async def player_disconnected(self, event):
        """Handle player disconnection notification"""
        await self.send(text_data=json.dumps({
            'type': 'player_disconnected',
            'player': event['player']
        }))

    async def game_restarted(self, event):
        """Handle game restart notification"""
        await self.send(text_data=json.dumps({
            'type': 'game_restarted',
            'state': event['state']
        }))

    async def game_ended(self, event):
        """Handle game end notification"""
        await asyncio.sleep(2) # Wait for 2 seconds for players to see the final state before restarting 
        await self.send(text_data=json.dumps({
            'type': 'game_ended',
            'reason': event['reason'],
            'winner': event['winner']
        }))
        await asyncio.sleep(5)  # Wait 3 seconds before resetting the game state
        self.game_state = GameState(self.game_id)
        with cache.lock(f'game_state_{self.game_id}_lock'):
            cache.set(f'game_state_{self.game_id}', self.game_state)
        
    async def game_countdown(self, event):
        await self.send(text_data=json.dumps({
            'type': 'game_countdown',
            'seconds': event['seconds']
        }))