import json
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
import jwt
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings

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
        # Decode the JWT without verification (to get the payload/body)
        payload = jwt.decode(
            token, 
            key=settings.SECRET_KEY,  # Use your Django secret key here
            algorithms=["HS256"]      # Algorithm used for signing
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
        # await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"===== Disconnected =====")

    # @staticmethod
    # def get_room_name(user1_id, user2_id):
    #     return f"chat_{min(user1_id, user2_id)}_{max(user1_id, user2_id)}"

    async def receive(self, text_data):
        print(f"text_data: {text_data}")
        data = json.loads(text_data)
        # sender = data['sender']
        # receiver = data['receiver']
        message_type = data['message_type']
        print(f"data: {data}")
        # message = data['message']
        # print(f"sender: {sender}")
        # print(f"message: {message}")
        # print(f"receiver: {receiver}")

        if message_type == 'join':
            # self.room_group_name = self.get_room_name(sender, receiver)
            self.conversation_id = data['conversation_id']
            print(f"conversation_id: {self.conversation_id}")
            self.room_group_name = f"chat_{self.conversation_id}"
            print('room_group_name: ', self.room_group_name)

            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            print('joined group')

        elif message_type == 'message':
            sender = data['sender']
            message = data['message']
            print(f"sender: {sender}")
            print(f"message: {message}")

            await self.channel_layer.group_send(
                self.room_group_name, {'type': 'chat.message', 'message': message}
            )


    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))
        print('Message sent')
