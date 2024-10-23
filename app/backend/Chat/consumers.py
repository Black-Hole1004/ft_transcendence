import json

from .models import Message, Conversation

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async

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
        print('*******************************************')
        headers = self.scope['headers']
        access_token = extract_access_token(headers)
        print("Access Token:", access_token)
        userid = decode_jwt_info(access_token)['user_id']
        print('userid: ', userid)
        self.user = await database_sync_to_async(User.objects.get)(id=userid)
        print(self.user)
        if self.user.is_authenticated:
            await self.accept()
        else:
            print('close')
            await self.close()
        print('==============================================')


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"===== Disconnected =====")


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


    async def receive(self, text_data):
        print(f"text_data: {text_data}")
        data = json.loads(text_data)
        message_type = data['message_type']
        print(f"data: {data}")

        if message_type == 'join':
            self.conversation_id = data['conversation_id']
            print(f"conversation_id: {self.conversation_id}")
            self.room_group_name = f"chat_{self.conversation_id}"
            print('room_group_name: ', self.room_group_name)

            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            print('joined group')

        elif message_type == 'message':
            sender = data['sender']
            message = data['message']
            conversation_id = data['conversation_id']
            print(f"sender: {sender}")
            print(f"message: {message}")

            print('======>', conversation_id)
            saved_message = await self.save_message(
                conversation_id = conversation_id,
                sender_id = sender,
                content = message
            )
            print(saved_message)

            print('Message saved successfuly')

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
        print('Message sent')
