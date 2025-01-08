import json

from django.db.models import Q
from .models import Message, Conversation
from UserManagement.models import FriendShip

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async

from django.core.cache import cache
from django_redis import get_redis_connection
from channels.generic.websocket import AsyncWebsocketConsumer

from .validators import ConversationValidator

User = get_user_model()

def extract_access_token(headers):
    for header in headers:
        key, value = header
        if key == b'cookie':
            cookies = value.decode()

            cookie_list = cookies.split('; ')

            for cookie in cookie_list:
                if cookie.startswith('access_token='):
                    return cookie.split('=')[1] 
    return None

def decode_jwt_info(token):
    try:
        payload = jwt.decode(
            token, 
            key=settings.SECRET_KEY,
            algorithms=["HS256"]
        )
        return payload
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token"}



class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        try:
            # Extract and validate token
            headers = self.scope['headers']
            access_token = extract_access_token(headers)
            access_token = access_token.replace('%22', '')

            # Get user information
            self.userid = decode_jwt_info(access_token)['user_id']
            self.user = await database_sync_to_async(User.objects.get)(id=self.userid)

            if self.user.is_authenticated:
                await self.accept()

                cache.set(f"user_{self.userid}_channel", self.channel_name, timeout=86400)
                print(f"Connected: User {self.userid} on channel {self.channel_name}")
            else:
                await self.close()

        except (KeyError, User.DoesNotExist, Exception) as e:
            print(f"Connection error: {str(e)}")
            await self.close()


    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message_type = data['message_type']

            # Extract conversation participants
            conversation_key = data['conversation_key']
            participants = conversation_key.split('_')
            participants = [int(key) for key in participants]

            # Validate conversation participants
            if not ConversationValidator.is_valid_conversation(participants, self.userid):
                return

            # Get the other participant's ID
            other_participant_id = ConversationValidator.get_other_participant_id(participants, self.userid)

            # Handle different message types
            handlers = {
                'join': self._handle_join,
                'message': self._handle_message,
                'block': self._handle_block
            }

            if handler := handlers.get(message_type):
                await handler(data, conversation_key, other_participant_id)

        except Exception as e:
            print(f"Error in receive: {str(e)}")


    async def disconnect(self, close_code):
        try:
            # Clean up cache
            cache.delete(f"user_{self.userid}_channel")

            # Clean up group membership if exists
            if hasattr(self, 'conversation_key') and self.conversation_key:

                # Remove this channel from group
                await self.channel_layer.group_discard(self.chat_room_name, self.channel_name)

                await self.check_and_delete_empty_group(self.chat_room_name)

        except Exception as e:
            print(f"Disconnect error: {str(e)}")


    @database_sync_to_async
    def check_and_delete_empty_group(self, group_name):
        redis_client = get_redis_connection("default")
        group_key = f"asgi:group:{group_name}"
        group_members = redis_client.smembers(group_key)

        if not group_members:
            redis_client.delete(group_key)
            print(f"Group {group_name} deleted as it's empty")


    @database_sync_to_async
    def check_conversation_existed(self, conversation_key, other_participant_id):
        try:
            self.other_participant = User.objects.get(id=other_participant_id)
            conversation = Conversation.objects.filter(conversation_key=conversation_key).first()

            if not conversation:
                conversation = Conversation.objects.create(
                    conversation_key = conversation_key,
                    user1_id = self.user,
                    user2_id = self.other_participant
                )
            return conversation

        except User.DoesNotExist:
            return None


    @database_sync_to_async
    def save_message(self, conversation, sender_id, content):
        sender = User.objects.get(id=sender_id)
        new_message =  Message.objects.create(
            conversation_id = conversation,
            sender_id = sender,
            content = content
        )
        conversation.last_message = new_message
        conversation.save()
        return new_message


    @database_sync_to_async
    def set_conversation_status(self, conversation, blocker_id):
        try:
            # Update block status
            conversation.blocked_by = blocker_id if blocker_id > 0 else 0

            # Remove friendship if blocked
            if blocker_id > 0:
                is_friend_from = FriendShip.objects.filter(user_from=self.user, user_to=self.other_participant).delete()
                is_friend_to = FriendShip.objects.filter(user_from=self.other_participant, user_to=self.user).delete()

            # Save the updated conversation
            conversation.save()
        except Exception as e:
            print(f"Error setting block status: {e}")


    async def _handle_join(self, data, conversation_key, other_participant_id):
        # Create chat room name
        chat_room_name = f"chat_{conversation_key}"

        # Add current user to chat room
        await self.channel_layer.group_add(chat_room_name, self.channel_name)

        # Try to add other participant if they're online
        current_participant_channel = cache.get(f"user_{other_participant_id}_channel")
        if current_participant_channel:
            await self.channel_layer.group_add(chat_room_name, current_participant_channel)

        # Store room name for later use
        self.chat_room_name = chat_room_name
        self.conversation_key = conversation_key


    async def _handle_message(self, data, conversation_key, other_participant_id):
        if not hasattr(self, 'chat_room_name') or data['sender'] != self.userid:
            return

        # Check if other participant's channel has changed
        current_participant_channel = cache.get(f"user_{other_participant_id}_channel")
        if current_participant_channel != getattr(self, 'last_participant_channel', None):
            await self.channel_layer.group_add(self.chat_room_name, current_participant_channel)
            self.last_participant_channel = current_participant_channel

        # Save message to database
        conversation = await self.check_conversation_existed(
            conversation_key,
            other_participant_id
        )
        saved_message = await self.save_message(
            conversation = conversation,
            sender_id = data['sender'],
            content = data['message']
        )

        # Broadcast message to group
        await self.channel_layer.group_send(
            self.chat_room_name, {
                'type': 'chat.message',
                'event': 'message',
                'message': data['message'],
                'sender': data['sender'],
                'id': saved_message.id,
                'timestamp': saved_message.sent_datetime.isoformat(),
            }
        )


    async def _handle_block(self, data, conversation_key, other_participant_id):
        conversation = await self.check_conversation_existed(
            conversation_key,
            other_participant_id
        )

        await self.set_conversation_status(conversation, data['blocker_id'])

        await self.channel_layer.group_send(
            self.chat_room_name, {
                'type': 'block.message',
                'event': 'block',
                'blocker_id': data['blocker_id'],
            }
        )


    async def block_message(self, event):

        await self.send(text_data=json.dumps({
            'event': event['event'],
            'blocker_id': event['blocker_id'],
        }))


    async def chat_message(self, event):

        await self.send(text_data=json.dumps({
            'event': event['event'],
            'id': event['id'],
            'message': event['message'],
            'sender': event['sender'],
            'timestamp': event['timestamp'],
        }))
