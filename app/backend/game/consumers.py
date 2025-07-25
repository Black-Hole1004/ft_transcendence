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

# Canvas/Game Area
CANVAS_WIDTH = 800
CANVAS_HEIGHT = 400

# Ball Configuration
BALL_CONFIG = {
    'RADIUS': 10,
    'INITIAL_SPEED': 11,
    'VELOCITY_X': 11,
    'VELOCITY_Y': 11, # it was 11
    'MAX_SPEED': 27,
    'SPEED_INCREMENT': 1.15,
    'MIN_BOUNCE_ANGLE': -38,  # degrees
    'MAX_BOUNCE_ANGLE': 38,   # degrees
    'MAX_BOUNCE_RADIANS': math.pi/6,  # 30 degrees in radians
    'BALL_MOVEMENT_SCALE': 1.5,  # Separate from paddle config
}

# Paddle Configuration
PADDLE_CONFIG = {
    'WIDTH': 16,
    'HEIGHT': 80,
    'SPEED': 500,   #Smaller steps but more frequent updates
    'LEFT_X': 5,            # Left paddle X position
    'RIGHT_X': CANVAS_WIDTH - 16 - 5,  # Right paddle X position,
    'MOVEMENT_SCALE': 1.5
}

# Game Settings
GAME_SETTINGS = {
    'MAX_SCORE': 10,
    'INITIAL_TIME': 120,     # Game duration in seconds
    'PAUSE_LIMIT': 3,        # Number of pauses allowed per player
    'PAUSE_TIMEOUT': 20,     # Auto-resume after 20 seconds
    'MAX_DELTA_TIME': 0.004, # Cap for time step in seconds (1/240)
    'PHYSICS_UPDATE_RATE': 120,  # Updates per second
    'BROADCAST_RATE': 170,       # Broadcasts per second
}

class GamePhysics:
    def __init__(self, canvas_width=800, canvas_height=400):
        self.max_ball_angle = 60  # Maximum angle in degrees
    
    def update_ball_position(self, ball, delta_time):
        """Update ball position with smooth and consistent movement"""
        # Update position
        ball['x'] += ball['velocityX'] * ball['speed'] * delta_time * BALL_CONFIG['BALL_MOVEMENT_SCALE']
        ball['y'] += ball['velocityY'] * ball['speed'] * delta_time * BALL_CONFIG['BALL_MOVEMENT_SCALE']

        # Wall collision handling
        if ball['y'] + ball['radius'] > CANVAS_HEIGHT:
            ball['y'] = CANVAS_HEIGHT - ball['radius']
            ball['velocityY'] = -abs(ball['velocityY'])  # Reflect upward

        elif ball['y'] - ball['radius'] < 0:
            ball['y'] = ball['radius']
            ball['velocityY'] = abs(ball['velocityY'])  # Reflect downward

        
    def check_paddle_collision(self, ball, paddle):
        """
        Check if ball collides with paddle, distinguishing between surface and edge hits.
        Returns: 
            - None: No collision
            - "surface": Hit on paddle surface
            - "edge": Hit on paddle edge
        """
        # First check if ball is within paddle's x-range
        if (ball['x'] - ball['radius'] <= paddle['x'] + paddle['width'] and
            ball['x'] + ball['radius'] >= paddle['x']):
            
            # Calculate how far the ball's center is from paddle edges
            distance_from_top = abs(ball['y'] - paddle['y'])
            distance_from_bottom = abs(ball['y'] - (paddle['y'] + paddle['height']))
            
            # If ball center is within paddle height, it's a surface hit
            if ball['y'] >= paddle['y'] and ball['y'] <= paddle['y'] + paddle['height']:
                return "surface"
                
            # If ball is very close to top or bottom edge
            elif distance_from_top <= ball['radius'] or distance_from_bottom <= ball['radius']:
                # Only count as edge hit if ball is moving towards paddle
                moving_towards_paddle = ((ball['velocityX'] > 0 and paddle['x'] > CANVAS_WIDTH/2) or (ball['velocityX'] < 0 and paddle['x'] < CANVAS_WIDTH/2))
                if moving_towards_paddle:
                    return "edge"
        
        return None

    def handle_paddle_collision(self, ball, paddle):
        """Handle paddle collisions differently based on collision type"""
        collision_type = self.check_paddle_collision(ball, paddle)
        
        if collision_type == "edge":
            # For edge hits, let the ball pass through by not modifying velocities
            return False
            
        # For surface hits, use existing bounce logic
        paddle_center = paddle['y'] + PADDLE_CONFIG['HEIGHT'] / 2
        hit_pos = paddle_center - ball['y']
        normalized_hit = max(-1, min(1, hit_pos / (PADDLE_CONFIG['HEIGHT'] / 2)))
        
        incoming_angle = math.atan2(ball['velocityY'], ball['velocityX'])
        max_angle = BALL_CONFIG['MAX_BOUNCE_RADIANS']
        forced_angle = math.copysign(max_angle * 0.7, incoming_angle)
        
        paddle_influence = normalized_hit * (max_angle * 0.3)
        final_angle = forced_angle + paddle_influence
        
        current_speed = math.sqrt(ball['velocityX']**2 + ball['velocityY']**2)
        new_speed = min(
            current_speed * BALL_CONFIG['SPEED_INCREMENT'], 
            BALL_CONFIG['MAX_SPEED']
        )
        
        ball['velocityX'] = -math.copysign(
            math.cos(final_angle) * new_speed,
            ball['velocityX']
        )
        ball['velocityY'] = math.sin(final_angle) * new_speed
        ball['speed'] += min(BALL_CONFIG['SPEED_INCREMENT'] / 2, BALL_CONFIG['MAX_SPEED'])
        
        # Position correction
        OFFSET_MARGIN = 1
        if paddle['x'] < CANVAS_WIDTH / 2:
            ball['x'] = paddle['x'] + paddle['width'] + ball['radius'] + OFFSET_MARGIN
        else:
            ball['x'] = paddle['x'] - ball['radius'] - OFFSET_MARGIN
        
        return True

    # def check_paddle_collision(self, ball, paddle):
    #     """Check if ball collides with paddle"""
    #     return (ball['x'] - ball['radius'] <= paddle['x'] + paddle['width'] and
    #             ball['x'] + ball['radius'] >= paddle['x'] and
    #             ball['y'] + ball['radius'] >= paddle['y'] and
    #             ball['y'] - ball['radius'] <= paddle['y'] + paddle['height'])
    

    def check_wall_collision(self, ball):
        """Check and handle wall collisions"""
        collision = False
        if ball['y'] - ball['radius'] <= 0:
            ball['y'] = ball['radius']
            ball['velocityY'] = abs(ball['velocityY'])
            collision = True
        elif ball['y'] + ball['radius'] >= CANVAS_HEIGHT:
            ball['y'] = CANVAS_HEIGHT - ball['radius']
            ball['velocityY'] = -abs(ball['velocityY'])
            collision = True
        return collision

    def check_scoring(self, ball):
        """Check if ball scored"""
        if ball['x'] - ball['radius'] <= 0:
            
            return 1  # Player 1 scores ==> i scored ==> ball went off the left side of the canvas
        elif ball['x'] + ball['radius'] >= CANVAS_WIDTH:
            return 2  # Player 2 scores ==> opponent scored ==> ball went off the right side of the canvas
        return 0
    
    def reset_ball(self, ball, direction=1):
        """Reset ball with improved randomization"""
        # Center the ball
        ball['x'] = CANVAS_WIDTH / 2
        ball['y'] = CANVAS_HEIGHT / 2
        
        # Reset to initial speed
        ball['speed'] = BALL_CONFIG['INITIAL_SPEED']
        ball['speedIncrement'] = BALL_CONFIG['SPEED_INCREMENT']
        ball['velocityX'] = BALL_CONFIG['VELOCITY_X']
        ball['velocityY'] = BALL_CONFIG['VELOCITY_Y']
        
        # generate a random angle between MIN_BOUNCE_ANGLE and MAX_BOUNCE_ANGLE
        angle = random.uniform( BALL_CONFIG['MIN_BOUNCE_ANGLE'], BALL_CONFIG['MAX_BOUNCE_ANGLE'] ) * math.pi / 180
        
        # Set velocities with proper scaling
        ball['velocityX'] = math.cos(angle) * ball['speed'] * direction # Randomize direction
        ball['velocityY'] = math.sin(angle) * ball['speed']

class GameState:
    def __init__(self, game_id, canvas_width=800, canvas_height=400):
        self.game_id = game_id
        
        self.player1_id = None # player id from the matchmaking service to track players
        self.player2_id = None # player id from the matchmaking service to track players
        
        self.disconnect_time = None          # Will store the timestamp when a player disconnects
        self.disconnected_player = None      # Will store which player number disconnected (1 or 2)

        self.forfeit_flag = False # flag to indicate if a player has forfeited the game ==> means the player has left the game 
        # pause/resume  management system
        GAME_SETTINGS['PAUSE_LIMIT'] = 3 # number of pauses allowed for player
        self.player1_pauses_remaining = GAME_SETTINGS['PAUSE_LIMIT']
        self.player2_pauses_remaining = GAME_SETTINGS['PAUSE_LIMIT']
        self.current_pause_player = None # player who paused the game
        self.pause_time = None # time when the game was paused
        
        # for paddle movement
        self.player1_movement = None  # 'up', 'down', or None
        self.player2_movement = None  # 'up', 'down', or None
        
        # Game status
        self.connected_players = 0
        self.players_ready = set()
        self.time_remaining = GAME_SETTINGS['INITIAL_TIME']
        
        # Ball properties
        self.ball = {
            'x': CANVAS_WIDTH / 2,
            'y': CANVAS_HEIGHT / 2,
            'radius': BALL_CONFIG['RADIUS'],
            'speed': BALL_CONFIG['INITIAL_SPEED'],
            'velocityX': BALL_CONFIG['VELOCITY_X'],
            'velocityY': BALL_CONFIG['VELOCITY_Y'],
            'speedIncrement': BALL_CONFIG['SPEED_INCREMENT'],
            'maxSpeed': BALL_CONFIG['MAX_SPEED']
        }
        
        # Paddle properties
        self.paddle_width = PADDLE_CONFIG['WIDTH']
        self.paddle_height = PADDLE_CONFIG['HEIGHT']
        
        # Player paddles
        self.player1_paddle = { # player 1 paddle ==> left side of the canvas ==> opponent paddle
            'x' : PADDLE_CONFIG['RIGHT_X'], # always start at the right side of the canvas
            'y': CANVAS_HEIGHT / 2 - PADDLE_CONFIG['HEIGHT'] / 2, 
            'height': PADDLE_CONFIG['HEIGHT'],
            'width': PADDLE_CONFIG['WIDTH'],
            'speed' : PADDLE_CONFIG['SPEED'],
            'score': 0,
            'connected': False
        }
        
        self.player2_paddle = { # player 2 paddle ==> right side of the canvas ==> my paddle
            'x': PADDLE_CONFIG['LEFT_X'], # always start at the left side of the canvas
            'y': CANVAS_HEIGHT / 2 - PADDLE_CONFIG['HEIGHT'] / 2,
            'height': PADDLE_CONFIG['HEIGHT'],
            'width': PADDLE_CONFIG['WIDTH'],
            'speed' : PADDLE_CONFIG['SPEED'],
            'score': 0,
            'connected': False
        }
        
        self.is_paused = True
        self.game_over = False
        self.winner = None
        
class GameConsumer(AsyncWebsocketConsumer):
    # Class variable to store game states
    game_states = {}
    RECONNECT_TIMEOUT = 10
    

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
                'state': self.get_game_state_dict()
            }))
            
        except Exception as e:
            traceback.print_exc()
            await self.close()
        
    async def disconnect(self, close_code):
        """Handle WebSocket disconnection"""
        try:
            if self.game_state:
                # Skip everything if game is over
                if self.game_state.game_over:
                    return

                # Store disconnect info
                self.game_state.disconnect_time = time.time()
                self.game_state.disconnected_player = self.player_number
                    
                # Update player connection status
                if self.player_number == 1:
                    await self.update_user_status(self.game_state.player1_id, 'online')
                    self.game_state.player1_paddle['connected'] = False
                else:
                    await self.update_user_status(self.game_state.player2_id, 'online')
                    self.game_state.player2_paddle['connected'] = False
                
                self.game_state.connected_players -= 1
                self.game_state.is_paused = True
                
                # Notify remaining player about temporary disconnect
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'player_temporary_disconnect',
                        'player': self.player_number,
                        'reconnect_timeout': self.RECONNECT_TIMEOUT
                    }
                )
            
                # Leave room group
                if hasattr(self, 'room_group_name'):
                    await self.channel_layer.group_discard(
                        self.room_group_name,
                        self.channel_name
                    )

                # Start reconnection timer
                asyncio.create_task(self.wait_for_reconnect())
            
        except Exception as e:
            print(f"Error in disconnect: {str(e)}")

    async def wait_for_reconnect(self):
        """Wait for player to reconnect before ending game"""
        try:
            await asyncio.sleep(self.RECONNECT_TIMEOUT)
            
            # Check if player has reconnected
            if (hasattr(self, 'game_state') and 
                self.game_state.disconnected_player == self.player_number and 
                not self.game_state.game_over):
                print(f"Player {self.player_number} did not reconnect in time => Ending game")
                # If not reconnected, end the game
                self.game_state.game_over = True
                self.game_state.winner = 1 if self.player_number == 2 else 2
                print(f"Sending game over with winner: {self.game_state.winner} due to disconnect")
                self.game_state.forfeit_flag = True
                
                if self.player_number == 2:  # Player 2 disconnected, Player 1 wins
                    self.game_state.player1_paddle['score'] = 3
                    self.game_state.player2_paddle['score'] = 0
                else:  # Player 1 disconnected, Player 2 wins
                    self.game_state.player1_paddle['score'] = 0
                    self.game_state.player2_paddle['score'] = 3
                await self.handle_game_over()
                
        except Exception as e:
            print(f"Error in wait_for_reconnect: {str(e)}")

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
            'time_remaining': self.game_state.time_remaining,
        }

    async def receive(self, text_data):
        """Handle incoming WebSocket messages"""
        try:
            data = json.loads(text_data)
            message_type = data.get('type')
            
            # Message handlers for different message types
            handlers = {
                'player_number_init': self.handle_player_number_init, # the player number received from the frontend from the matchmaking service 
                'paddle_direction': self.handle_paddle_direction,
                'player_ready': self.handle_player_ready,
                'restart_game': self.handle_restart_request,
                'pause_game': self.handle_pause_game,
                'resume_game': self.handle_resume_game,
                'start_game': self.handle_start_game,
                'check_ready_players': self.check_ready_players,
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
    
    async def check_ready_players(self, data):
        """send the frontend the number of ready players"""
        await self.send(json.dumps({
            'type': 'ready_players_count',
            'ready_count': len( self.game_state.players_ready),
            'connected_count': self.game_state.connected_players
        }))
        
    
    async def handle_player_number_init(self, data):
        """Handle player number initialization"""
        try:
            self.player_number = data.get('player_number')
            player_id = data.get('player_id')

            # Check for reconnection first
            if (self.game_state and 
                self.game_state.disconnected_player == self.player_number and 
                self.game_state.disconnect_time is not None and
                time.time() - self.game_state.disconnect_time < self.RECONNECT_TIMEOUT):
                                
                # Clear disconnect state
                self.game_state.disconnect_time = None
                self.game_state.disconnected_player = None
                
                # Restore player connection
                if self.player_number == 1:
                    self.game_state.player1_id = player_id
                    self.game_state.player1_paddle['connected'] = True
                else:
                    self.game_state.player2_id = player_id
                    self.game_state.player2_paddle['connected'] = True
                    
                self.game_state.connected_players += 1
                
                # Resume game if both players are connected
                if self.game_state.connected_players == 2:
                    self.game_state.is_paused = False
                
                # Notify about reconnection
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'player_reconnected',
                        'player': self.player_number
                    }
                )
            else:
                # Normal connection logic
                if self.player_number == 1:
                    self.game_state.player1_id = player_id
                    self.game_state.player1_paddle['connected'] = True
                else:
                    self.game_state.player2_id = player_id
                    self.game_state.player2_paddle['connected'] = True
                
                self.game_state.connected_players += 1

            # Send confirmation
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
        """Update paddle positions with direct movement"""
        paddle_speed = PADDLE_CONFIG['SPEED'] * delta_time
        max_y = CANVAS_HEIGHT - PADDLE_CONFIG['HEIGHT']
        
        # Direct paddle movement without interpolation
        if self.game_state.player1_movement == 'up':
            self.game_state.player1_paddle['y'] = max(0, 
                self.game_state.player1_paddle['y'] - paddle_speed)
        elif self.game_state.player1_movement == 'down':
            self.game_state.player1_paddle['y'] = min(max_y, 
                self.game_state.player1_paddle['y'] + paddle_speed)

        if self.game_state.player2_movement == 'up':
            self.game_state.player2_paddle['y'] = max(0, 
                self.game_state.player2_paddle['y'] - paddle_speed)
        elif self.game_state.player2_movement == 'down':
            self.game_state.player2_paddle['y'] = min(max_y, 
                self.game_state.player2_paddle['y'] + paddle_speed)
        
    async def handle_paddle_direction(self, data):
        """Handle paddle direction changes with immediate response"""
        try:
            # Early return checks
            if self.game_state is None or self.game_state.game_over or self.game_state.is_paused:
                return
            
            action = data.get('action')
            if not action:
                return
                
            # Calculate movement constants
            max_y = CANVAS_HEIGHT - PADDLE_CONFIG['HEIGHT']
            move_step = PADDLE_CONFIG['SPEED'] * GAME_SETTINGS['MAX_DELTA_TIME']
            
            # Get correct paddle based on player number
            if self.player_number == 1:
                player_paddle = self.game_state.player1_paddle
                player_paddle['x'] = PADDLE_CONFIG['RIGHT_X']  # Right side
                movement_state = self.game_state.player1_movement
            else:
                player_paddle = self.game_state.player2_paddle
                player_paddle['x'] = PADDLE_CONFIG['LEFT_X']   # Left side
                movement_state = self.game_state.player2_movement

            # Handle movement
            match action:
                case 'startUp':
                    if self.player_number == 1:
                        self.game_state.player1_movement = 'up'
                    else:
                        self.game_state.player2_movement = 'up'
                    # Initial movement for responsiveness
                    player_paddle['y'] = max(0, player_paddle['y'] - move_step)
                    
                case 'startDown':
                    if self.player_number == 1:
                        self.game_state.player1_movement = 'down'
                    else:
                        self.game_state.player2_movement = 'down'
                    # Initial movement for responsiveness
                    player_paddle['y'] = min(max_y, player_paddle['y'] + move_step)
                    
                case 'stopUp' | 'stopDown':
                    if self.player_number == 1:
                        self.game_state.player1_movement = None
                    else:
                        self.game_state.player2_movement = None

            # Broadcast the new state
            await self.broadcast_game_state()

        except Exception as e:
            print(f"Error in handle_paddle_direction: {str(e)}")
            
    async def game_loop(self):
        """Main game loop with optimized timings"""
        physics_interval = 1/GAME_SETTINGS['PHYSICS_UPDATE_RATE']  # 1/240
        broadcast_interval = 1/GAME_SETTINGS['BROADCAST_RATE']     # 1/120
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
                await asyncio.sleep(GAME_SETTINGS['MAX_DELTA_TIME'])
                
        except Exception as e:
            print(f"Error in game loop: {str(e)}")
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
                
                # Update both players' status to 'ingame'
                await self.update_user_status(self.game_state.player1_id, 'ingame')
                await self.update_user_status(self.game_state.player2_id, 'ingame')
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
            
            for remaining in range(GAME_SETTINGS['PAUSE_TIMEOUT'], 0, -1):
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
        try:
            if self.game_state.forfeit_flag:
                reason = 'forfeit'
            else:
                reason = 'time_up' if self.game_state.time_remaining <= 0 else 'score_limit'
            
            winner_number = self.game_state.winner
            
            if winner_number == 1 or winner_number == 0: # i won or draw
                winner_id = self.game_state.player1_id
                loser_id = self.game_state.player2_id
            elif winner_number == 2: # opponent won
                winner_id = self.game_state.player2_id
                loser_id = self.game_state.player1_id
            
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
        except Exception as e:
            print(f"Error in handle_game_over: {str(e)}")
            # traceback.print_exc()

    def calculate_xp_changes(self, winner_score, loser_score):
        """Calculate XP changes based on score difference"""
        score_diff = winner_score - loser_score
        
        # For a draw
        if score_diff == 0:
            return {
                'winner_xp': 100,  # Base XP for participating
                'loser_xp': 100    # Both get same XP in a draw
            }
        
        # Calculate base XP gain/loss
        base_xp = 200  # Base XP for winning
        bonus_per_point = 20   # Additional XP per point difference
        
        # Winner's XP calculation
        winner_xp = base_xp + (score_diff * bonus_per_point)
        # Cap maximum XP gain at 300
        winner_xp = min(winner_xp, 300)
        
        # Loser's XP loss calculation
        # Lose less XP if they kept the score close
        loser_xp = -(base_xp // 2) - (score_diff * (bonus_per_point // 2))
        # Cap maximum XP loss at -250
        loser_xp = max(loser_xp, -250)
        
        return {
            'winner_xp': winner_xp,
            'loser_xp': loser_xp
        }

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
            
            # Set both players back to 'online' status after the game ends
            await self.update_user_status(winner_id, 'online')
            await self.update_user_status(loser_id, 'online')
            
            # Calculate XP changes
            xp_changes = self.calculate_xp_changes(winner_score, loser_score)
                
            # update xp changes
            game.winner_score = winner_score
            game.loser_score = loser_score
            
            # Update XP gains in game session
            if self.game_state.player1_id == winner_id:
                game.player1_xp_gain = xp_changes['winner_xp']
                game.player2_xp_gain = xp_changes['loser_xp']
            else:
                game.player1_xp_gain = xp_changes['loser_xp']
                game.player2_xp_gain = xp_changes['winner_xp']
            
            # Update winner stats
            winner = await self.get_user(winner_id)
            old_winner_xp = winner.xp  # Store old XP for sending in response
            winner.xp += xp_changes['winner_xp']
            winner.won_games_count += 1
            winner.total_games_count += 1
            await self.update_user(winner)
            
            # Update loser stats
            loser = await self.get_user(loser_id)
            old_loser_xp = loser.xp  # Store old XP for sending in response
            loser.xp = max(0, loser.xp + xp_changes['loser_xp'])  # Prevent negative XP
            loser.lost_games_count += 1
            loser.total_games_count += 1
            await self.update_user(loser)
            
            # Update game status
            game.status = GameSessions.GameStatus.FINISHED
            game.end_time = timezone.now()
            game.winner_id = winner_id
            game.loser_id = loser_id
            game.score_player1 = winner_score if (self.game_state.player1_id == winner_id) else loser_score
            game.score_player2 = loser_score if (self.game_state.player1_id == winner_id) else winner_score
            await sync_to_async(game.save)()

            # Get badges 
            winner_badge = Achievement.get_badge(winner.xp) # {name, xp, image}
            loser_badge = Achievement.get_badge(loser.xp)
            
            # get progession data
            progress_data_winner = Achievement.get_badge_progress(winner.xp) # percentage progress to next badge
            progress_data_loser = Achievement.get_badge_progress(loser.xp)
            winner_badge.update(progress_data_winner) # add progress data to badge {curren_xp_treshold, next_xp_threshold, progress_percentage}
            loser_badge.update(progress_data_loser)
            
            print(f"Winner badge: {winner_badge}")
            print(f"Loser badge: {loser_badge}")
        
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
                        'xp_change': xp_changes['winner_xp'],
                        'score': winner_score,
                        'badge': winner_badge
                    },
                    'loser_user': {
                        'id': loser.id,
                        'username': loser.username,
                        'profile_picture': loser.profile_picture.url if loser.profile_picture else None,
                        'old_xp': old_loser_xp,
                        'new_xp': loser.xp,
                        'xp_change': xp_changes['loser_xp'],
                        'score': loser_score,
                        'badge': loser_badge
                    }
                }
            )            
        except Exception as e:
            print(f"Error updating game results: {e}")
            traceback.print_exc()
    
    async def update_user_status(self, user_id, status):
        """Update user status"""
        try:
            user = await self.get_user(user_id)
            if user:
                user.status = status
                await self.update_user(user)
        except Exception as e:
            print(f"Error updating user status: {str(e)}")
    
    # WebSocket event handler methods------------------------------------------------------
    
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
    
    async def player_temporary_disconnect(self, event):
        """Handle temporary disconnect message"""
        await self.send(text_data=json.dumps({
            'type': 'player_temporary_disconnect',
            'player': event['player']
        }))

    async def player_reconnected(self, event):
        """Handle player reconnected message"""
        await self.send(text_data=json.dumps({
            'type': 'player_reconnected',
            'player': event['player']
        }))