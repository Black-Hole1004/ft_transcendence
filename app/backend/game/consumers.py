import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.core.exceptions import ValidationError
from .managers import GameSessionManager
from .models import GameSessions

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """Handle new WebSocket connection with authentication"""
        # Authentication check
        if not self.scope["user"].is_authenticated:
            await self.close()
            return

        # Get game_id and validate
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.room_group_name = f'game_{self.game_id}'

        # Validate game session and player authorization
        if not await self.validate_game_session():
            await self.close()
            return

        # Store player information
        self.player_number = await self.get_player_number()
        
        # Join game group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept the connection
        await self.accept()

        # Send initial game state
        game_state = await self.get_game_state()
        if game_state:
            await self.send(text_data=json.dumps({
                'type': 'game_state',
                'game': game_state,
                'player_number': self.player_number
            }))

    async def disconnect(self, close_code):
        """Handle WebSocket disconnection with cleanup"""
        try:
            # Handle player disconnect in game
            await self.handle_player_disconnect()
            
            # Leave game group
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
            
            # Notify other player about disconnection
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'player_disconnected',
                    'player': self.player_number
                }
            )
        except Exception as e:
            print(f"Error in disconnect: {e}")

    async def receive(self, text_data):
        """Handle incoming WebSocket messages with validation"""
        try:
            data = json.loads(text_data)
            message_type = data.get('type')

            # Validate game state
            if not await self.is_game_active():
                await self.send(text_data=json.dumps({
                    'type': 'error',
                    'message': 'Game is not active'
                }))
                return

            # Validate move based on message type
            if not await self.validate_move(data):
                await self.send(text_data=json.dumps({
                    'type': 'error',
                    'message': 'Invalid move'
                }))
                return

            # Handle different message types
            handlers = {
                'paddle_move': self.handle_paddle_move,
                'ball_update': self.handle_ball_update,
                'score_update': self.handle_score_update,
                'power_up': self.handle_power_up,
                'pause_game': self.handle_pause_game,
                'reconnect': self.handle_reconnection
            }

            handler = handlers.get(message_type)
            if handler:
                await handler(data)
            else:
                await self.send(text_data=json.dumps({
                    'type': 'error',
                    'message': 'Unknown message type'
                }))

        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': 'Invalid JSON format'
            }))
        except Exception as e:
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': str(e)
            }))

    # Validation methods
    @database_sync_to_async
    def validate_game_session(self):
        """Validate game session and player authorization"""
        try:
            game = GameSessions.objects.get(gameSession_id=self.game_id)
            user_id = self.scope["user"].id
            return (user_id == game.player1_id or user_id == game.player2_id)
        except GameSessions.DoesNotExist:
            return False

    @database_sync_to_async
    def is_game_active(self):
        """Check if game is active"""
        game = GameSessions.objects.get(gameSession_id=self.game_id)
        return game.status == GameSessions.GameStatus.IN_PROGRESS

    @database_sync_to_async
    def validate_move(self, data):
        """Validate move based on type"""
        game = GameSessions.objects.get(gameSession_id=self.game_id)
        
        if data['type'] == 'paddle_move':
            position = data.get('position', 0)
            return 0 <= position <= 100  # Validate paddle position
            
        elif data['type'] == 'ball_update':
            # Only player 1 updates ball position to avoid conflicts
            return self.player_number == 1
            
        return True

    # Handler methods
    async def handle_paddle_move(self, data):
        """Handle paddle movement with rate limiting"""
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'paddle_movement',
                'player': self.player_number,
                'position': data['position']
            }
        )

    async def handle_ball_update(self, data):
        """Handle ball updates with validation"""
        if self.player_number == 1:  # Only player 1 updates ball
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'ball_update',
                    'position': data['position'],
                    'velocity': data['velocity']
                }
            )

    async def handle_score_update(self, data):
        """Handle score updates with validation"""
        await self.update_score(data['scorer'])
        game_state = await self.get_game_state()
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'score_change',
                'scorer': data['scorer'],
                'game_state': game_state
            }
        )

    # Event handlers (same as before, but with enhanced error handling)
    async def paddle_movement(self, event):
        try:
            await self.send(text_data=json.dumps({
                'type': 'paddle_move',
                'player': event['player'],
                'position': event['position']
            }))
        except Exception as e:
            print(f"Error in paddle_movement: {e}")

    # ... (rest of your event handlers with similar error handling)

    # Helper methods (enhanced versions)
    @database_sync_to_async
    def get_player_number(self):
        """Get player number (1 or 2) based on user ID"""
        game = GameSessions.objects.get(gameSession_id=self.game_id)
        user_id = self.scope["user"].id
        return 1 if user_id == game.player1_id else 2

    @database_sync_to_async
    def get_game_state(self):
        """Get enhanced game state"""
        try:
            game = GameSessions.objects.get(gameSession_id=self.game_id)
            return {
                'score_player1': game.score_player1,
                'score_player2': game.score_player2,
                'is_paused': game.is_paused,
                'status': game.status,
                'player1_id': game.player1_id,
                'player2_id': game.player2_id,
                'game_id': game.gameSession_id,
                'mode': game.mode_id.mode,
                'table': game.gameTable_id.name
            }
        except GameSessions.DoesNotExist:
            return None