# matchmaking.py
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio

class MatchmakingConsumer(AsyncWebsocketConsumer):
    matchmaking_queue = set()
    
    async def connect(self):
        await self.accept()
        MatchmakingConsumer.matchmaking_queue.add(self.channel_name)
        print(f"Player connected. Queue size: {len(MatchmakingConsumer.matchmaking_queue)}")

    async def disconnect(self, close_code):
        MatchmakingConsumer.matchmaking_queue.discard(self.channel_name)
        print(f"Player disconnected. Queue size: {len(MatchmakingConsumer.matchmaking_queue)}")

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['type'] == 'find_match':
            await self.find_opponent()

    async def find_opponent(self):
        for opponent_channel in MatchmakingConsumer.matchmaking_queue:
            if opponent_channel != self.channel_name:
                game_id = len(MatchmakingConsumer.matchmaking_queue)  # Simple game ID
                
                # Send to current player (player 1)
                await self.send(json.dumps({
                    'type': 'match_found',
                    'game_id': game_id,
                    'player_number': 1
                }))
                
                # Send to opponent (player 2)
                await self.channel_layer.send(
                    opponent_channel,
                    {
                        'type': 'match_notification',
                        'data': {
                            'type': 'match_found',
                            'game_id': game_id,
                            'player_number': 2
                        }
                    }
                )
                # Remove both from queue
                MatchmakingConsumer.matchmaking_queue.discard(self.channel_name)
                MatchmakingConsumer.matchmaking_queue.discard(opponent_channel)
                return

        await asyncio.sleep(1)
        if len(MatchmakingConsumer.matchmaking_queue) > 1:
            await self.find_opponent()

    async def match_notification(self, event):
        await self.send(text_data=json.dumps(event['data']))
