from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
import json
from django.core.cache import cache
from django.conf import settings
from jwt import decode as jwt_decode
from urllib.parse import parse_qs



User = get_user_model()
class FriendRequestConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        # print('----- connect -----')
        query_string = self.scope['query_string'].decode()
        # print('query_string ===================>', query_string)
        query_params = parse_qs(query_string)
        access_token = query_params.get('access_token', [None])[0]
        if access_token:
            access_token = access_token.strip('"')
        # print('access_token ===================>', access_token)
        if not access_token:
            await self.close()
            return
        try:
            decoded_data = jwt_decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
            self.user = await database_sync_to_async(User.objects.get)(id=decoded_data['user_id'])
            # print('self.user ==================>', self.user)
        except Exception as e:
            await self.close()
            return
        
        if self.user.is_authenticated:
            self.sender_room_group_name = f'friend_request_{self.user.id}'
            await self.channel_layer.group_add(
                self.sender_room_group_name,
                self.channel_name
            )
            await self.accept()
    
    async def disconnect(self, close_code):
        print('----- disconnect -----')
        if hasattr(self, 'sender_room_group_name'):
            await self.channel_layer.group_discard(
                self.sender_room_group_name,
                self.channel_name
            )
    
    async def receive(self, text_data):
        print('----- receive -----')
        data = json.loads(text_data)
        message = data.get('message')
        friend_request_id = data.get('id')
        from_user = data.get('from_user')
        profile_picture = data.get('profile_picture')
        sender_id = data.get('sender_id')
        receiver_id = data.get('receiver_id')

        receiver_room_group_name = f'friend_request_{receiver_id}'

        # Send the notification to the receiver's group
        await self.channel_layer.group_send(
            receiver_room_group_name,
            {
                'type': 'friend_request_message',
                'message': message,
                'id': friend_request_id,
                'from_user': from_user,
                'profile_picture': profile_picture,
                'sender_id': sender_id,
                'receiver_id': receiver_id,
            }
        )
    
    async def friend_request_message(self, event):
        print('----- friend_request_message -----')
        print('event =>', event)
        message = event['message']
        friend_request_id = event['id']
        from_user = event['from_user']
        profile_picture = event['profile_picture']
        sender_id = event['sender_id']
        receiver_id = event['receiver_id']


        # Send notification to the receiver's WebSocket connection
        if self.user.id == receiver_id:
            await self.send(text_data=json.dumps({
                'message': message,
                'id': friend_request_id,
                'from_user': from_user,
                'profile_picture': profile_picture,
                'sender_id': sender_id,
                'receiver_id': receiver_id,
            }))
    
class UserStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope['user']
        if user.is_authenticated:
            # Mark the user as online
            await self.set_user_online(user.id)
            # Add the user to the status broadcast group
            await self.channel_layer.group_add("user_status", self.channel_name)
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        user = self.scope['user']
        if user.is_authenticated:
            # Mark the user as offline
            await self.set_user_offline(user.id)
            # Remove the user from the status broadcast group
            await self.channel_layer.group_discard("user_status", self.channel_name)

    async def set_user_online(self, user_id):
        cache.set(f"user_online_{user_id}", True, timeout=3600)  # Online status for 1 hour
        # Broadcast user status to the group
        await self.broadcast_user_status(user_id, "online")

    async def set_user_offline(self, user_id):
        cache.delete(f"user_online_{user_id}")
        # Broadcast user status to the group
        await self.broadcast_user_status(user_id, "offline")

    async def broadcast_user_status(self, user_id, status):
        await self.channel_layer.group_send(
            "user_status",
            {
                "type": "user.status",
                "user_id": user_id,
                "status": status,
            },
        )

    # Method to handle incoming messages in the group
    async def user_status(self, event):
        await self.send(text_data=json.dumps({
            "user_id": event["user_id"],
            "status": event["status"],
        }))