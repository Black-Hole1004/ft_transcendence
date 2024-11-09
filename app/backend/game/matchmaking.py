# # matchmaking.py
# from channels.generic.websocket import AsyncWebsocketConsumer
# import json
# import asyncio

# class MatchmakingConsumer(AsyncWebsocketConsumer):
#     matchmaking_queue = set()
    
#     async def connect(self):
#         await self.accept()
#         MatchmakingConsumer.matchmaking_queue.add(self.channel_name)
#         print(f"Player connected. Queue size: {len(MatchmakingConsumer.matchmaking_queue)}")

#     async def disconnect(self, close_code):
#         MatchmakingConsumer.matchmaking_queue.discard(self.channel_name)
#         print(f"Player disconnected. Queue size: {len(MatchmakingConsumer.matchmaking_queue)}")

#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         if data['type'] == 'find_match':
#             await self.find_opponent()

#     async def find_opponent(self):
#         for opponent_channel in MatchmakingConsumer.matchmaking_queue:
#             if opponent_channel != self.channel_name:
#                 game_id = len(MatchmakingConsumer.matchmaking_queue)  # Simple game ID
                
#                 # Send to current player (player 1)
#                 await self.send(json.dumps({
#                     'type': 'match_found',
#                     'game_id': game_id,
#                     'player_number': 1
#                 }))
                
#                 # Send to opponent (player 2)
#                 await self.channel_layer.send(
#                     opponent_channel,
#                     {
#                         'type': 'match_notification',
#                         'data': {
#                             'type': 'match_found',
#                             'game_id': game_id,
#                             'player_number': 2
#                         }
#                     }
#                 )
#                 # Remove both from queue
#                 MatchmakingConsumer.matchmaking_queue.discard(self.channel_name)
#                 MatchmakingConsumer.matchmaking_queue.discard(opponent_channel)
#                 return

#         await asyncio.sleep(1)
#         if len(MatchmakingConsumer.matchmaking_queue) > 1:
#             await self.find_opponent()

#     async def match_notification(self, event):
#         await self.send(text_data=json.dumps(event['data']))



from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
from channels.db import database_sync_to_async
from django.core.cache import cache

class MatchmakingConsumer(AsyncWebsocketConsumer):
    # Use a dictionary instead of set to store player info
    matchmaking_queue = {}
    
    async def connect(self):
        """Handle new WebSocket connection"""
        await self.accept()
        
        # Store player info with preferences
        self.matchmaking_queue[self.channel_name] = {
            'searching': False,
            'preferences': None
        }
        
        await self.send(json.dumps({
            'type': 'connected',
            'message': 'Connected to matchmaking service'
        }))

    async def disconnect(self, close_code):
        """Handle WebSocket disconnection"""
        if self.channel_name in self.matchmaking_queue:
            del self.matchmaking_queue[self.channel_name]

    async def receive(self, text_data):
        """Handle incoming WebSocket messages"""
        try:
            data = json.loads(text_data)
            
            if data['type'] == 'find_match':
                # Store player preferences
                self.matchmaking_queue[self.channel_name]['preferences'] = data.get('preferences', {})
                self.matchmaking_queue[self.channel_name]['searching'] = True
                await self.find_opponent()
                
            elif data['type'] == 'cancel_search':
                self.matchmaking_queue[self.channel_name]['searching'] = False
                await self.send(json.dumps({
                    'type': 'search_cancelled',
                    'message': 'Search cancelled'
                }))

        except json.JSONDecodeError:
            await self.send(json.dumps({
                'type': 'error',
                'message': 'Invalid message format'
            }))

    async def find_opponent(self):
        """Find an opponent with matching preferences"""
        while self.matchmaking_queue[self.channel_name]['searching']:
            for opponent_channel, opponent_data in self.matchmaking_queue.items():
                if (opponent_channel != self.channel_name and 
                    opponent_data['searching']):
                    
                    # Create unique game ID (in practice, use UUID or DB-generated ID) 1 < id < 1000
                    game_id = len(self.matchmaking_queue) + 1
                    
                    # Mark both players as not searching
                    self.matchmaking_queue[self.channel_name]['searching'] = False
                    opponent_data['searching'] = False
                    
                    # Send match found to both players
                    match_data = {
                        'type': 'match_found',
                        'game_id': game_id,
                    }
                    
                    await self.send(json.dumps({
                        **match_data,
                        'player_number': 1
                    }))
                    
                    await self.channel_layer.send(
                        opponent_channel,
                        {
                            'type': 'match_notification',
                            'data': {
                                **match_data,
                                'player_number': 2
                            }
                        }
                    )
                    return
                    
            await asyncio.sleep(1)  # Wait before checking again

    async def match_notification(self, event):
        """Handle match notifications"""
        await self.send(text_data=json.dumps(event['data']))