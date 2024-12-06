from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
import json
from django.core.cache import cache
from django.conf import settings
from jwt import decode as jwt_decode
from urllib.parse import parse_qs
from asgiref.sync import sync_to_async
from .models import FriendShip
from channels.db import database_sync_to_async
from itertools import chain
from django.contrib.auth.signals import user_logged_out, user_logged_in
from django.dispatch import Signal



User = get_user_model()
class FriendRequestConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        print('----- connect from FriendRequestConsumer -----')
        query_string = self.scope['query_string'].decode()
        query_params = parse_qs(query_string)
        access_token = query_params.get('access_token', [None])[0]
        if access_token:
            access_token = access_token.strip('"')
        if not access_token:
            await self.close()
            return
        try:
            decoded_data = jwt_decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
            self.user = await database_sync_to_async(User.objects.get)(id=decoded_data['user_id'])
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
        print('----- disconnect from FriendRequestConsumer -----')

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

    @database_sync_to_async
    def get_user_friends(self, user):
        friends_from = list(FriendShip.objects.filter(user_from=user).values_list('user_to', flat=True))
        friends_to = list(FriendShip.objects.filter(user_to=user).values_list('user_from', flat=True))
        friends = list(set(friends_from + friends_to))
        return friends
    
    async def friend_request_accepted(self, event):
        pass
    

class AcceptFriendRequestConsumer(AsyncWebsocketConsumer):
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

            self.group_name = f'user_{self.user.id}'
            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )

            await self.accept()
    
    async def disconnect(self, close_code):
        print('----- disconnect from AcceptFriendRequestConsumer -----')

        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )
    
    async def friend_request_accepted(self, event):
        # Send data to the WebSocket
        print('event =>', event)
        await self.send(text_data=json.dumps({
            "type": "friend_request_accepted",
            "message": event["message"],
        }))
    
    async def notification_message(self, event):
        print('----- notification received in AcceptFriendRequestConsumer -----')
        print('Notification received:', event)
        await self.send(text_data=json.dumps({
            'message': event['message']
        }))
        pass

    
    @database_sync_to_async
    def get_user_friends(self, user):
        friends_from = list(FriendShip.objects.filter(user_from=user).values_list('user_to', flat=True))
        friends_to = list(FriendShip.objects.filter(user_to=user).values_list('user_from', flat=True))
        friends = list(set(friends_from + friends_to))
        return friends

#------------------------------------------------------------------------------------
class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        query_string = self.scope['query_string'].decode()
        query_params = parse_qs(query_string)
        access_token = query_params.get('access_token', [None])[0]
        
        if not access_token:
            await self.close()
            return
        
        access_token = access_token.strip('"')
        try:
            decoded_data = jwt_decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
            self.user = await database_sync_to_async(User.objects.get)(id=decoded_data['user_id'])
        except Exception as e:
            print(f"Authentication error: {e}")
            await self.close()
            return
        
        if self.user.is_authenticated:

            await self.set_user_status('online')
            await self.notify_friends('online')
            
            self.group_name = f'user_{self.user.id}'
            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )
            await self.accept()

    async def disconnect(self, close_code):
        print('----- disconnect from NotificationConsumer -----')

        if hasattr(self, 'user') and self.user:
            try:
                await self.set_user_status('offline')
                await self.notify_friends('offline')
            except Exception as e:
                print(f"Error setting user offline: {e}")
        else:
            print("No user found during disconnect")

        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )
    
    async def notify_friends(self, status):
        """Notify friends about user's status change (online/offline)"""
        if hasattr(self, 'user'):
            friends = await self.get_user_friends(self.user)
            for friend_id in friends:
                await self.channel_layer.group_send(
                    f'user_{friend_id}',
                    {
                        "type": "notification_message",
                        "message": status,
                    }
                )
            
    async def notification_message(self, event):
        print('----- notification received -----')
        print('Notification received:', event) 
        try:
            message = event.get("message", "No message")
            await self.send(text_data=json.dumps({
                'message': message
            }))
        except Exception as e:
            print(f"Error sending notification: {e}")

    async def friend_request_accepted(self, event):
        pass
    
    async def set_user_status(self, status):
        try:
            # Refresh user instance first
            self.user = await database_sync_to_async(User.objects.get)(id=self.user.id)
            await database_sync_to_async(setattr)(self.user, 'status', status)
            await database_sync_to_async(self.user.save)()
        except Exception as e:
            print(f"Error setting user {status}: {e}")

    @database_sync_to_async
    def get_user_friends(self, user):
        friends_from = list(FriendShip.objects.filter(user_from=user).values_list('user_to', flat=True))
        friends_to = list(FriendShip.objects.filter(user_to=user).values_list('user_from', flat=True))
        friends = list(set(friends_from + friends_to))
        return friends


