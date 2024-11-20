import json

from django.db.models import Q
from .models import Message, Conversation

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async

from django.core.cache import cache

from channels.generic.websocket import AsyncWebsocketConsumer

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
        headers = self.scope['headers']
        access_token = extract_access_token(headers)
        access_token = access_token.replace('%22', '')
        self.userid = decode_jwt_info(access_token)['user_id']
        self.user = await database_sync_to_async(User.objects.get)(id=self.userid)
        cache.set(f"user_{self.userid}_channel", self.channel_name)
        if self.user.is_authenticated:
            print('accepted')
            await self.accept()
        else:
            await self.close()


    async def disconnect(self, close_code):
        cache.delete(f"user_{self.user.id}_channel")
        # if self.conversation_id:
        print('group discarded')
        # await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


    @database_sync_to_async
    def save_message(self, conversation_id, sender_id, content):
        sender = User.objects.get(id=sender_id)
        conversation = Conversation.objects.get(id=conversation_id)
        new_message =  Message.objects.create(
            conversation_id = conversation,
            sender_id = sender,
            content = content
        )
        conversation.last_message = new_message
        conversation.save()
        return new_message

    @database_sync_to_async
    def check_conversation_existed(self, conversation_key, id1, id2):
        try:
            user1 = User.objects.get(id=id1)
            user2 = User.objects.get(id=id2)
            conversation = Conversation.objects.filter(conversation_key=conversation_key).first()

            if not conversation:
                conversation = Conversation.objects.create(
                    conversation_key = conversation_key,
                    user1_id = user1,
                    user2_id = user2
                )
                return conversation
            return conversation

        except Conversation.DoesNotExist:
            return None


    async def receive(self, text_data):
        data = json.loads(text_data)
        print('data: ', data)
        message_type = data['message_type']
        self.conversation_key = data['conversation_key']
        self.participants = data['conversation_key'].split('_')
        
        if self.userid not in map(int, self.participants):
            print('heeeeere')
            return
        
        print('userid: ', self.userid)
        print('conversation_key: ', self.conversation_key)
        self.other_user = int(self.participants[0]) if self.participants[0] != self.userid else int(self.participants[1])
        print('other_user: ', self.other_user)

        if message_type == 'join':
            if self.participants:
                self.room_group_name = f"chat_{self.conversation_key}"

                await self.channel_layer.group_add(self.room_group_name, self.channel_name)
                
                self.other_user_channel = cache.get(f"user_{self.other_user}_channel")
                if self.other_user_channel:
                    await self.channel_layer.group_add(self.room_group_name, self.other_user_channel)
                # else:
                #     pass

        elif message_type == 'message':
            if self.room_group_name:
                sender = data['sender']
                message = data['message']
                conversation_key = data['conversation_key']
                self.old_user_channel = self.other_user_channel
                self.other_user_channel = cache.get(f"user_{self.other_user}_channel")
                if self.old_user_channel is not self.other_user_channel:
                    await self.channel_layer.group_add(self.room_group_name, self.other_user_channel)


                conversation = await self.check_conversation_existed(conversation_key, self.user.id, self.other_user)

                saved_message = await self.save_message(
                    conversation_id = conversation.id,
                    sender_id = sender,
                    content = message
                )


                await self.channel_layer.group_send(
                    self.room_group_name, {
                        'type': 'chat.message',
                        'message': message,
                        'sender': sender,
                        'id': saved_message.id,
                        'timestamp': saved_message.sent_datetime.isoformat()
                    }
                )





    async def chat_message(self, event):

        await self.send(text_data=json.dumps({
            'id': event['id'],
            'message': event['message'],
            'sender': event['sender'],
            'timestamp': event['timestamp']
        }))


