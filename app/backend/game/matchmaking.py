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
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.search_task = None  # this to track the search task (solved the issue with disconnect doesn't get called)
    
    async def connect(self):
        """Handle new WebSocket connection"""
        await self.accept()
        
        # Store minimal user data from scope
        user = self.scope.get('user')
        if not user or not user.is_authenticated:
            print("Rejecting unauthenticated connection")
            await self.send(json.dumps({
                'type': 'error',
                'message': 'Authentication required. Please log in.'
            }))
            await self.close()
            return
        
        # Store important user data as instance variables
        self.user_id = user.id
        self.username = user.username
        
        # Remove any existing connections for this user
        await self.remove_existing_user_connection()
        
        # Store player info in matchmaking queue
        self.matchmaking_queue[self.channel_name] = {
            'searching': False,
            'user_id': self.user_id,
            'username': self.username,
            'connected_at': time.time()
        }

        # Send connection confirmation
        await self.send(json.dumps({
            'type': 'status',
            'message': f'Connected to matchmaking service as {self.username}'
        }))

    @database_sync_to_async
    def check_player_status(self, user_id):
        """Check if player is currently in a game"""
        from django.contrib.auth import get_user_model
        User = get_user_model()
        try:
            user = User.objects.get(id=user_id)
            return user.status
        except User.DoesNotExist:
            return None
        
    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            
            if data['type'] == 'find_match':
                # Check if user is already in queue
                if any(q['user_id'] == self.user_id and q['searching'] 
                    for q in self.matchmaking_queue.values()):
                    await self.send(json.dumps({
                        'type': 'error',
                        'message': 'Already searching for a match'
                    }))
                    return

                player_status = await self.check_player_status(self.user_id)
                if player_status == 'ingame':
                    await self.send(json.dumps({
                        'type': 'error',
                        'message': 'Cannot search for a match while in a game'
                    }))
                    return
                # Send searching status
                await self.send(json.dumps({
                    'type': 'searching',
                    'message': 'Looking for opponent...'
                }))
                
                # Store and start search
                self.matchmaking_queue[self.channel_name]['searching'] = True
                self.search_task = asyncio.create_task(self.find_opponent())
                # await self.find_opponent()
                
            elif data['type'] == 'cancel_search':
                if self.search_task:
                    self.search_task.cancel()  # Cancel the search task
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
        
    
    async def disconnect(self, close_code):
        """Handle WebSocket disconnection."""
        print("Disconnecting from matchmaking service")
        try:
            # Cancel the search task if it exists
            if self.search_task:
                self.search_task.cancel()
            if self.channel_name in self.matchmaking_queue:
                player_info = self.matchmaking_queue[self.channel_name]
                print(f"User {player_info['username']} disconnecting from matchmaking service")
                player_info['searching'] = False
                del self.matchmaking_queue[self.channel_name]
        except Exception as e:
            print(f"Error during disconnect: {e}")

    async def remove_existing_user_connection(self):
        """Remove any existing connections for the current user"""
        channels_to_remove = []
        for channel, data in self.matchmaking_queue.items():
            if data['user_id'] == self.user_id:
                channels_to_remove.append(channel)
        
        for channel in channels_to_remove:
            del self.matchmaking_queue[channel]

    @database_sync_to_async
    def get_user_data(self, user_id):
        """Get fresh user data from database"""
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user = User.objects.get(id=user_id)
        return user

    #find opponent
    async def find_opponent(self):
        """Find a match for the current user"""
        try:
            # Get fresh user data from database
            current_user = await self.get_user_data(self.user_id)
            
            TIMEOUT_SECONDS = 120
            start_time = time.time()
        
            while self.channel_name in self.matchmaking_queue and self.matchmaking_queue[self.channel_name]['searching']:
                try:
                    current_status = await self.check_player_status(self.user_id)
                    if current_status == 'ingame':
                        self.matchmaking_queue[self.channel_name]['searching'] = False
                        await self.send(json.dumps({
                            'type': 'error',
                            'message': 'Match search cancelled - you are already in a game'
                        }))
                        return
                    
                    # Check for timeout
                    if time.time() - start_time > TIMEOUT_SECONDS:
                        self.matchmaking_queue[self.channel_name]['searching'] = False
                        await self.send(json.dumps({
                            'type': 'timeout',
                            'message': 'No opponent found. Please try again later.'
                        }))
                        return
                    
                    # Look for opponent
                    for opponent_channel, opponent_data in self.matchmaking_queue.items():
                        # Skip self or same user
                        if (opponent_channel == self.channel_name or 
                            opponent_data['user_id'] == self.user_id):
                            continue

                        # Check if opponent is searching
                        if opponent_data['searching']:
                            # Get fresh opponent data
                            opponent_user = await self.get_user_data(opponent_data['user_id'])
                            
                            try:
                                # Create game session
                                game = await self.create_game_session(current_user, opponent_user)
                                
                                # Get badges for both players
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
                                        'profile_picture': current_user.profile_picture.url if current_user.profile_picture else None,
                                        'xp': current_user.xp,
                                        'badge': current_user_badge
                                    },
                                    'opponent': {
                                        'id': opponent_user.id,
                                        'username': opponent_user.username,
                                        'profile_picture': opponent_user.profile_picture.url if opponent_user.profile_picture else None,
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
                                
                                # Update search status for both players
                                self.matchmaking_queue[self.channel_name]['searching'] = False
                                opponent_data['searching'] = False
                                
                                # Send match data to both players
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
                    
                    # Wait before next iteration
                    await asyncio.sleep(1)
                    
                except asyncio.CancelledError:
                    print("Search cancelled")
                    raise
                except Exception as e:
                    print(f"Error in find_opponent loop: {e}")
                    return
                    
        except asyncio.CancelledError:
            print("Search task cancelled")
            if self.channel_name in self.matchmaking_queue:
                self.matchmaking_queue[self.channel_name]['searching'] = False
        except Exception as e:
            print(f"Error in find_opponent: {e}")

    @database_sync_to_async
    def create_game_session(self, player1, player2):
        """Create a new game session"""
        game = GameSessions.objects.create(
            player1=player1,
            player2=player2,
            status=GameSessions.GameStatus.WAITING
        )
        return game

    async def match_notification(self, event):
        """Handle match notification"""
        await self.send(text_data=json.dumps(event['data']))
