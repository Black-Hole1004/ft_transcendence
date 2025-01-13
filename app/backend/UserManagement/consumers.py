from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
import json
from django.core.cache import cache
from django.conf import settings
from jwt import decode as jwt_decode
from urllib.parse import parse_qs
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from itertools import chain
from django.contrib.auth.signals import user_logged_out, user_logged_in
from django.dispatch import Signal
from django.contrib.auth.signals import user_logged_out
from django.contrib.auth.signals import user_logged_in

from .models import FriendShip
from game.models import GameInvitations
from collections import defaultdict
from django.core.exceptions import ValidationError
import asyncio

import logging as log

User = get_user_model()

# keep a list of all connected users (online users)
connected_users = {} # connected_users[<user_id>] = <channel_name>

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
        """Handle incoming WebSocket messages"""
        print('----- receive from FriendRequestConsumer -----')
        try:
            data = json.loads(text_data)
            message_type = data.get('type')
            
            if message_type == 'game_invite':
                # Handle game invite
                print(f"XGame invite from: {self.user.username} | {data.get('receiver_id')}")
                await self.handle_game_invite(data)
                
            elif message_type == 'game_invite_response':
                # Handle invite response
                print(f"XGame invite response from {self.user.username}: {data.get('response')}")
                await self.handle_game_invite_response(data)
                
            else:
                # Handle regular friend request messages
                await self.handle_friend_request(data)

        except Exception as e:
            print(f"Error in receive: {str(e)}")
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': str(e)
            }))

    async def handle_friend_request(self, data):
        """Handle regular friend request messages"""
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
                
    async def handle_game_invite(self, data):
        try:
            receiver_id = data.get('receiver_id')
            receiver_status = await self.get_receiver_status(receiver_id)
            sender_tab_id = data.get('senderTabId')  # Add this line

            if receiver_status != 'online':
                await self.channel_layer.group_send(
                    f'friend_request_{self.user.id}',
                    {
                        'type': 'game_invite_notification',
                        'data': {
                            'type': 'invite_failed',
                            'message': f'Cannot send game invite - user is {receiver_status}'
                        }
                    }
                )
                return

            invitation = await self.create_game_invitation(
                sender=self.user,
                receiver_id=receiver_id,
            )
            created_at = invitation.created_at.timestamp()
            
            # Set up expiration task
            asyncio.create_task(self.handle_invitation_expiration(invitation.id))
            
            await self.channel_layer.group_send(
                f'friend_request_{receiver_id}',
                {
                    'type': 'game_invite_notification',
                    'data': {
                        'type': 'game_invite',
                        'invitation_id': invitation.id,
                        'created_at': created_at,
                        'senderTabId' : sender_tab_id,
                        'sender': {
                            'id': self.user.id,
                            'username': self.user.username,
                            'profile_picture': self.user.profile_picture.url if self.user.profile_picture else None
                        }
                    }
                }
            )

        except Exception as e:
            print(f"Error handling game invite: {e}")

    # handle automatic expiration of game invitation-------------------------------------------------------
    async def handle_invitation_expiration(self, invitation_id):
        """Handle invitation expiration after 60 seconds"""
        await asyncio.sleep(60)  # Wait 60 seconds
        
        try:
            # Get invitation using database_sync_to_async
            invitation = await self.get_game_invitation(invitation_id)
            
            # Only expire if still pending
            if invitation.status == GameInvitations.Status.PENDING:
                # Update status using database_sync_to_async
                invitation = await self.expire_game_invitation(invitation.id)
                
                # Notify both users about expiration
                notification_data = await self.prepare_expiration_notification(invitation)
                
                for user_id in [invitation.sender.id, invitation.receiver.id]:
                    await self.channel_layer.group_send(
                        f'friend_request_{user_id}',
                        {
                            'type': 'game_invite_notification',
                            'data': notification_data
                        }
                    )
                        
        except Exception as e:
            print(f"Error handling invitation expiration: {e}")

    @database_sync_to_async
    def expire_game_invitation(self, invitation_id):
        """Update invitation status to expired"""
        invitation = GameInvitations.objects.get(id=invitation_id)
        invitation.status = GameInvitations.Status.EXPIRED
        invitation.save()
        return invitation

    @database_sync_to_async
    def prepare_expiration_notification(self, invitation):
        """Prepare notification data in sync context"""
        return {
            'type': 'game_invite_expired',
            'invitation_id': invitation.id,
            'sender': {
                'id': invitation.sender.id,
                'username': invitation.sender.username,
            },
            'receiver': {
                'id': invitation.receiver.id,
                'username': invitation.receiver.username,
            }
        }

    @database_sync_to_async
    def get_receiver_status(self, receiver_id):
        try:
            receiver = User.objects.get(id=receiver_id)
            return receiver.status
        except User.DoesNotExist:
            return 'offline'

    @database_sync_to_async
    def get_user_status(self, user_id):
        try:
            user = User.objects.get(id=user_id)
            return user.status
        except User.DoesNotExist:
            return 'offline'
            
    async def handle_game_invite_response(self, data):
        """Handle response to game invitation"""
        invitation_id = data.get('invitation_id')
        response = data.get('response')
        accepting_tab_id = data.get('acceptingTabId')  # Get from request
        
        invitation = await self.get_game_invitation(invitation_id)
        if response == 'accept':
            await self.handle_invitation_acceptance(invitation, accepting_tab_id)
        else:
            await self.handle_invitation_decline(invitation)
            
    @database_sync_to_async
    def create_game_invitation(self, sender, receiver_id):
        """Create game invitation record"""
        receiver = User.objects.get(id=receiver_id)
        
        return GameInvitations.objects.create(
            sender=sender,
            receiver=receiver
        )
        
    async def game_invite_notification(self, event):
        """Send game invite notification to websocket"""
        await self.send(text_data=json.dumps(event['data']))
        

    # database_sync_to_async related methods -------------------------------------------------------------
    @database_sync_to_async
    def get_game_invitation(self, invitation_id):
        """Fetch game invitation from database"""
        return GameInvitations.objects.get(id=invitation_id)


    @database_sync_to_async
    def accept_game_invite(self, invitation, accepting_tab_id):
        """Handle invitation acceptance"""
        # Verify current user is intended recipient
        if (invitation.receiver.id != self.user.id):
            raise ValidationError("Not authorized to accept this invitation !!!")
        
        #  validate the invitation hasn't expired
        if invitation.status == GameInvitations.Status.EXPIRED:
            raise ValidationError("Cannot accept expired invitation")
        # Update invitation status
        invitation.status = GameInvitations.Status.ACCEPTED
        invitation.save()
        # get the status of the sender (online or offline)
        try:
            sender_user = User.objects.get(id=invitation.sender.id)
            status = sender_user.status
        except Exception as e:
            print(f"Error getting user {user_id}: {e}")
            return None
            
        
        # Prepare the notification data
        notification_data = {
            'type': 'game_invite_accepted',
            'invitation_id': invitation.id,
            'acceptingTabId': accepting_tab_id,
            'sender': {  # Details of the person who sent the invite
                'status' : status,
                'id': invitation.sender.id,
                'username': invitation.sender.username,
                'profile_picture': invitation.sender.profile_picture.url if invitation.sender.profile_picture else None
            },
            'receiver': {  # Details of the person who accepted the invite
                'id': self.user.id,
                'username': self.user.username,
                'profile_picture': self.user.profile_picture.url if self.user.profile_picture else None
            }
        }

        return {
            "room_groups": {
                "sender": f'friend_request_{invitation.sender.id}',
                "receiver": f'friend_request_{self.user.id}'
            },
            "data": notification_data
        }

    async def handle_invitation_acceptance(self, invitation, accepting_tab_id):
        """Asynchronous wrapper to handle game invitation acceptance"""
        try:
            # Call the sync-to-async wrapped function
            result = await self.accept_game_invite(invitation, accepting_tab_id)
            
            # Send notifications if acceptance was successful
            await self.channel_layer.group_send(
                result["room_groups"]["sender"],
                {
                    'type': 'game_invite_notification',
                    'data': {
                        **result["data"],
                        'user': result["data"]["sender"],
                    }
                }
            )

            await self.channel_layer.group_send(
                result["room_groups"]["receiver"],
                {
                    'type': 'game_invite_notification',
                    'data': {
                        **result["data"],
                        'user': result["data"]["receiver"],
                    }
                }
            )

        except ValidationError as e:
            # Notify the user who's accepting the invite
            await self.send(json.dumps({
                'type': 'error',
                'message': str(e)
            }))
            
            log.warning(f"Unauthorized acceptance attempt by user {self.user.id} : {self.user.username} on invitation {invitation.id}")
            log.warning(str(e))
            
        except Exception as e:
            # Handle other unexpected errors
            print(f"Error accepting game invite: {e}")
            print(f"Error details: {str(e)}")
            await self.send(json.dumps({
                'type': 'error',
                'message': 'An unexpected error occurred'
            }))

    @database_sync_to_async
    def decline_game_invite(self, invitation):
        """Handle invitation decline"""
        # Verify current user is intended recipient
        if invitation.receiver.id != self.user.id:
            raise ValidationError("Not authorized to decline this invitation")

        # Validate the invitation hasn't expired
        if invitation.status == GameInvitations.Status.EXPIRED:
            raise ValidationError("Cannot decline expired invitation")
        
        # Update invitation status
        invitation.status = GameInvitations.Status.DECLINED
        invitation.save()

        # Get sender status
        try:
            sender_user = User.objects.get(id=invitation.sender.id)
            status = sender_user.status
        except Exception as e:
            print(f"Error getting user {user_id}: {e}")
            return None

        # Prepare notification data
        notification_data = {
            'type': 'game_invite_declined',
            'invitation_id': invitation.id,
            'sender': {
                'status': status, 
                'id': invitation.sender.id,
                'username': invitation.sender.username,
                'profile_picture': invitation.sender.profile_picture.url if invitation.sender.profile_picture else None
            },
            'receiver': {
                'id': self.user.id,
                'username': self.user.username, 
                'profile_picture': self.user.profile_picture.url if self.user.profile_picture else None
            }
        }

        return {
            "room_groups": {
                "sender": f'friend_request_{invitation.sender.id}',
                "receiver": f'friend_request_{self.user.id}'  
            },
            "data": notification_data
        }
        
    async def handle_invitation_decline(self, invitation):
        """Asynchronous wrapper to handle game invitation declinee"""
        try:
            result = await self.decline_game_invite(invitation)
            
            # Notify sender
            await self.channel_layer.group_send(
                result["room_groups"]["sender"],
                {
                    'type': 'game_invite_notification',
                    'data': {
                        **result["data"],
                        'user': result["data"]["sender"],
                    }
                }
            )

            # Notify receiver 
            await self.channel_layer.group_send(
                result["room_groups"]["receiver"],
                {
                    'type': 'game_invite_notification',
                    'data': {
                        **result["data"],
                        'user': result["data"]["receiver"],
                    }
                }
            )

        except ValidationError as e:
            await self.send(json.dumps({
                'type': 'error',
                'message': str(e)
            }))

            log.warning(f"Unauthorized acceptance attempt by user {self.user.id} : {self.user.username} on invitation {invitation.id}")
            log.warning(str(e))

        except Exception as e:
            print(f"Error declining invite: {e}")
            print(f"Error details: {str(e)}")
            await self.send(json.dumps({
                'type': 'error',
                'message': 'An unexpected error occurred'
            }))
    
    # handers for game invite accept and decline
    async def game_invite_accepted(self, event):
        """Handle the 'game_invite_accepted' message type"""
        await self.send(text_data=json.dumps({
            "type": "game_invite_accepted",
            "invitation_id": event.get("invitation_id"),
            "receiver": event.get("receiver"),
            "sender": event.get("sender")
        }))

    async def game_invite_declined(self, event):
        """Handle the 'game_invite_declined' message type"""
        await self.send(text_data=json.dumps({
            "type": "game_invite_declined",
            "invitation_id": event.get("invitation_id"),
            "receiver": event.get("receiver")
        }))

#--------------------------------------------------------------------------------------------------------------------
    
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
        # Add debug logging
        print("Starting connection attempt...")
        #add the user to the connected users list when they connect
        
        query_string = self.scope['query_string'].decode()
        query_params = parse_qs(query_string)
        access_token = query_params.get('access_token', [None])[0]
        
        if not access_token:
            print("No access token found")
            await self.close()
            return
        
        try:
            access_token = access_token.strip('"')
            decoded_data = jwt_decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
            self.user = await database_sync_to_async(User.objects.get)(id=decoded_data['user_id'])
            print(f"User authenticated: {self.user.username}")
        except Exception as e:
            print(f"Authentication error: {e}")
            await self.close()
            return

        if self.user.is_authenticated:
            print(f"Setting up connection for user: {self.user.username}")
            try:
                # Store group name before triggering signals
                self.group_name = f'user_{self.user.id}'
                # Add user to connected users list
                # connected_users[self.user.id] = self.channel_name
                
                # Add to group first
                await self.channel_layer.group_add(
                    self.group_name,
                    self.channel_name
                )
                
                # Accept connection before triggering signals
                await self.accept()
                
                # Then trigger signals and status updates
                await database_sync_to_async(user_logged_in.send)(
                    sender=self.user.__class__,
                    request=self.scope.get('request', None),
                    user=self.user
                )
                
                await self.set_user_status('online')
                await self.notify_friends('online')
                
            except Exception as e:
                print(f"Error during connection setup: {e}")
                await self.close()
            
    
    async def disconnect(self, close_code):
        print('----- disconnect from NotificationConsumer -----')
        # remove the user from the connected users list when they disconnect

        if hasattr(self, 'user') and self.user:
            try:
                # Remove user from connected users list
                # if self.user.id in connected_users:
                #     del connected_users[self.user.id]\
    
                # Trigger the user_logged_out signal
                await database_sync_to_async(user_logged_out.send)(
                    sender=self.__class__, 
                    request=self.scope.get('request', None),
                    user=self.user
                )
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
