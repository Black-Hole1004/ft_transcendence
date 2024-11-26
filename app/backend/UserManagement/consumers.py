from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
import json
from django.contrib.auth.models import AnonymousUser
from django.core.cache import cache

class FriendRequestConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        print('----- connect -----')
        self.user = self.scope['user']
        self.room_group_name = f'friend_request_{self.user.id}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
    
    async def disconnect(self, close_code):
        print('----- disconnect -----')
        await self.channel_layer.group_discard(  # Corrected method name
            self.room_group_name,
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

        print('message =>', message)
        print('friend_request_id =>', friend_request_id)
        print('from_user =>', from_user)
        print('profile_picture =>', profile_picture)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'friend_request_message',
                'message': message,
                'id': friend_request_id,
                'from_user': from_user,
                'profile_picture': profile_picture,
                'sender_id': sender_id
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

        print('message =>', message)
        print('friend_request_id =>', friend_request_id)
        print('from_user =>', from_user)
        print('profile_picture =>', profile_picture)
        print('sender_id =>', sender_id)

        if self.user.id != sender_id:
            await self.send(
                text_data=json.dumps({
                    'message': event['message'],
                    'id': event['id'],
                    'from_user': event['from_user'],
                    'profile_picture': event['profile_picture'],
                    'sender_id': sender_id,
                })
            )



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