# game/matchmaking.py
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import GameSessions
from .managers import GameSessionManager

class MatchmakingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """Handle new matchmaking connection"""
        if not self.scope["user"].is_authenticated:
            await self.close()
            return

        self.user_id = self.scope["user"].id
        self.matchmaking_group = 'matchmaking'

        await self.channel_layer.group_add(
            self.matchmaking_group,
            self.channel_name
        )
        await self.accept()

        # Add player to matchmaking queue
        await self.add_to_queue()

    async def disconnect(self, close_code):
        """Handle matchmaking disconnection"""
        await self.remove_from_queue()
        await self.channel_layer.group_discard(
            self.matchmaking_group,
            self.channel_name
        )

    async def receive(self, text_data):
        """Handle matchmaking messages"""
        try:
            data = json.loads(text_data)
            message_type = data.get('type')

            if message_type == 'search_game':
                await self.handle_game_search(data)
            elif message_type == 'cancel_search':
                await self.remove_from_queue()
                await self.send(json.dumps({
                    'type': 'search_cancelled'
                }))

        except json.JSONDecodeError:
            await self.send(json.dumps({
                'type': 'error',
                'message': 'Invalid message format'
            }))

    async def handle_game_search(self, data):
        """Handle game search request"""
        mode = data.get('mode', '1VS1')
        table_id = data.get('table_id', 1)

        # Check for available games first
        available_game = await self.find_available_game(mode)
        
        if available_game:
            # Join existing game
            game = await self.join_game(available_game.gameSession_id)
            await self.send(json.dumps({
                'type': 'game_found',
                'game_id': game.gameSession_id
            }))
        else:
            # Create new game and wait
            game = await self.create_game(mode, table_id)
            await self.send(json.dumps({
                'type': 'waiting_for_opponent',
                'game_id': game.gameSession_id
            }))

    async def match_found(self, event):
        """Notify players when match is found"""
        await self.send(json.dumps({
            'type': 'match_found',
            'game_id': event['game_id']
        }))

    # Helper methods
    async def add_to_queue(self):
        """Add player to matchmaking queue"""
        await self.channel_layer.group_send(
            self.matchmaking_group,
            {
                'type': 'player_joined_queue',
                'player_id': self.user_id
            }
        )

    async def remove_from_queue(self):
        """Remove player from matchmaking queue"""
        await self.channel_layer.group_send(
            self.matchmaking_group,
            {
                'type': 'player_left_queue',
                'player_id': self.user_id
            }
        )

    async def find_available_game(self, mode):
        """Find available game that matches criteria"""
        from channels.db import database_sync_to_async
        
        @database_sync_to_async
        def get_available_game():
            return GameSessions.objects.filter(
                status=GameSessions.GameStatus.WAITING,
                mode_id__mode=mode,
                player2_id__isnull=True
            ).first()

        return await get_available_game()

    async def create_game(self, mode, table_id):
        """Create new game session"""
        from channels.db import database_sync_to_async
        
        @database_sync_to_async
        def create():
            return GameSessionManager.create_game(
                player1_id=self.user_id,
                mode_type=mode,
                table_id=table_id
            )

        return await create()

    async def join_game(self, game_id):
        """Join existing game session"""
        from channels.db import database_sync_to_async
        
        @database_sync_to_async
        def join():
            return GameSessionManager.join_game(
                game_id=game_id,
                player2_id=self.user_id
            )

        return await join()