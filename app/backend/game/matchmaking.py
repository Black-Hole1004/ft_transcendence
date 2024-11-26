from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
from channels.db import database_sync_to_async
from .models import GameSessions
from UserManagement.models import Achievement
from django.core.cache import cache
import time

class MatchmakingConsumer(AsyncWebsocketConsumer):
    matchmaking_queue = {}
    
    async def connect(self):
        """Handle new WebSocket connection"""
        await self.accept()
        
        # Debug prints
        print(f"New connection attempt to matchmaking service")
        print(f"Channel name: {self.channel_name}")
        print(f"Scope user: {self.scope['user']}")
        print(f"Is authenticated: {self.scope['user'].is_authenticated}")
        if hasattr(self.scope['user'], 'username'):
            print(f"Username: {self.scope['user'].username}")
        
        self.user = self.scope["user"]
        
        if not self.user.is_authenticated:
            print("Rejecting unauthenticated connection")
            await self.send(json.dumps({
                'type': 'error',
                'message': 'Authentication required. Please log in.'
            }))
            await self.close()
            return
        
        print(f"Authenticated user connected: {self.user.username}")
        
        # Store player info
        self.matchmaking_queue[self.channel_name] = {
            'searching': False,
            'preferences': None,
            'user': self.user,
            'connected_at': time.time()
        }

        await self.send(json.dumps({
            'type': 'status',
            'message': f'Connected to matchmaking service as {self.user.username}'
        }))

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            
            if data['type'] == 'find_match':
                # Send searching status first
                await self.send(json.dumps({
                    'type': 'searching',
                    'message': 'Looking for opponent...'
                }))
                
                # Store preferences and start search
                self.matchmaking_queue[self.channel_name]['preferences'] = data.get('preferences', {})
                self.matchmaking_queue[self.channel_name]['searching'] = True
                await self.find_opponent()
                
            elif data['type'] == 'cancel_search':
                self.matchmaking_queue[self.channel_name]['searching'] = False
                await self.send(json.dumps({
                    'type': 'cancelled',
                    'message': 'Search cancelled'
                }))

        except json.JSONDecodeError:
            await self.send(json.dumps({
                'type': 'error',
                'message': 'Invalid message format'
            }))

    async def find_opponent(self):
        current_user = self.matchmaking_queue[self.channel_name]['user']
        
        while self.matchmaking_queue[self.channel_name]['searching']:
            for opponent_channel, opponent_data in self.matchmaking_queue.items():
                if (opponent_channel != self.channel_name and 
                    opponent_data['searching']):
                    
                    opponent_user = opponent_data['user']
                    preferences = self.matchmaking_queue[self.channel_name]['preferences']
                    
                    try:
                        game = await self.create_game_session(
                            current_user, 
                            opponent_user, 
                            preferences
                        )
                        
                        # Use your Achievement class to get badge info
                        current_user_badge = Achievement.get_badge(current_user.xp)
                        opponent_badge = Achievement.get_badge(opponent_user.xp)
                        
                        # Create match data for player 1 (current user)
                        match_data_player1 = {
                            'type': 'match_found',
                            'game_id': game.game_id,
                            'player_number': 1,
                            'current_user': {
                                'id': current_user.id,
                                'username': current_user.username,
                                'profile_picture': current_user.profile_picture.url,
                                'xp': current_user.xp,
                                'badge': current_user_badge  # This will have name and image from your Achievement class
                            },
                            'opponent': {
                                'id': opponent_user.id,
                                'username': opponent_user.username,
                                'profile_picture': opponent_user.profile_picture.url,
                                'xp': opponent_user.xp,
                                'badge': opponent_badge
                            }
                        }

                        # Create match data for player 2 (opponent)
                        match_data_player2 = {
                            'type': 'match_found',
                            'game_id': game.game_id,
                            'player_number': 2,
                            'current_user': match_data_player1['opponent'],
                            'opponent': match_data_player1['current_user']
                        }
                            
                        # Mark both as not searching
                        self.matchmaking_queue[self.channel_name]['searching'] = False
                        opponent_data['searching'] = False
                        
                        # Send to both players
                        await self.send(json.dumps(match_data_player1))
                        await self.channel_layer.send(
                            opponent_channel,
                            {
                                'type': 'match_notification',
                                'data': match_data_player2
                            }
                        )
                        return
                    
                    except Exception as e:
                        print(f"Error creating match: {e}")
                        continue
            
            await asyncio.sleep(1)



    @database_sync_to_async
    def create_game_session(self, player1, player2, preferences):
        """Create a new game session"""
        game = GameSessions.objects.create(
            player1=player1,
            player2=player2,
            background_id=preferences.get('backgroundId', 1),
            status=GameSessions.GameStatus.WAITING
        )
        return game

    async def match_notification(self, event):
        """Handle match notification"""
        await self.send(text_data=json.dumps(event['data']))

    async def disconnect(self, close_code):
        """Handle WebSocket disconnection"""
        if self.channel_name in self.matchmaking_queue:
            del self.matchmaking_queue[self.channel_name]