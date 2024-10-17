import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.conversation_key = self.scope['url_route']['kwargs']['conversation_key']
        print('conversation_key: ', self.conversation_key)
        self.room_group_name = f'chat_{self.conversation_key}'
        print('room_group: ', self.room_group_name)

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        print('Channel name: ', self.channel_name)

        await self.accept()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"===== Disconnected from {self.room_group_name} =====")


    async def receive(self, text_data):
        print(f"text_data: {text_data}")
        data = json.loads(text_data)
        print(f"data: {data}")
        message = data['message']
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
