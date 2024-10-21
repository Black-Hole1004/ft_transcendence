import json
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        print(self.scope)
        self.user = self.scope['user']
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
