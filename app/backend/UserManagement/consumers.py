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

User = get_user_model()
class FriendRequestConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        print('----- connect from FriendRequestConsumer -----')
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
    
    # Add the missing notification_message handler
    async def notification_message(self, event):
        print('----- notification received in AcceptFriendRequestConsumer -----')
        print('Notification received:', event)
        await self.send(text_data=json.dumps({
            'message': event['message']
        }))
        pass

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
            # Set user status to online
            await self.set_user_online()

            # Notify friends that the user is online
            await self.login_notify_friends()
            
            # Use a consistent group name format
            self.group_name = f'user_{self.user.id}'

            # Set user status to online
            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )
            await self.accept()

    
    async def set_user_offline(self):
        """
        Set the user's status to 'offline' in the database
        """
        try:
            # Use database_sync_to_async to perform database operations
            await database_sync_to_async(self.user.save)()
            await database_sync_to_async(setattr)(self.user, 'status', 'offline')
            await database_sync_to_async(self.user.save)()
            print(f"User {self.user.username} set to offline")
        except Exception as e:
            print(f"Error setting user offline: {e}")

    async def set_user_online(self):
        """
        Set the user's status to 'online' in the database
        """
        try:
            # Use database_sync_to_async to perform database operations
            await database_sync_to_async(self.user.save)()
            await database_sync_to_async(setattr)(self.user, 'status', 'online')
            await database_sync_to_async(self.user.save)()
            print(f"User {self.user.username} set to online")
        except Exception as e:
            print(f"Error setting user online: {e}")


    # disconnect method
    async def disconnect(self, close_code):
        print('----- disconnect from NotificationConsumer -----')

        # Set user status to offline
        if hasattr(self, 'user'):
            await self.set_user_offline()
        
        # Notify friends that the user is offline
        await self.logout_notify_friends()

        # Remove the user from the group
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )
    
    async def logout_notify_friends(self):
        print('User attribute exists:', hasattr(self, 'user'))
        if hasattr(self, 'user'):
            print('Current user:', self.user)
            print('Current user ID:', self.user.id)
            friends = await self.get_user_friends(self.user)
            print('friends =>', friends)
            for friend_id in friends:
                print('friend_id =>', friend_id)
                await self.channel_layer.group_send(
                    f'user_{friend_id}',
                    {
                        "type": "notification_message",
                        "message": 'offline',
                    }
                )
    

    async def login_notify_friends(self):
        print('User attribute exists:', hasattr(self, 'user'))
        if hasattr(self, 'user'):
            print('Current user:', self.user)
            print('Current user ID:', self.user.id)
            friends = await self.get_user_friends(self.user)
            print('friends =>', friends)
            for friend_id in friends:
                print('friend_id =>', friend_id)
                await self.channel_layer.group_send(
                    f'user_{friend_id}',
                    {
                        "type": "notification_message",
                        "message": 'online',
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
    
    @database_sync_to_async
    def get_user_friends(self, user):
        friends_from = list(FriendShip.objects.filter(user_from=user).values_list('user_to', flat=True))
        friends_to = list(FriendShip.objects.filter(user_to=user).values_list('user_from', flat=True))
        friends = list(set(friends_from + friends_to))
        print('fetched friends =>', friends)
        return friends


