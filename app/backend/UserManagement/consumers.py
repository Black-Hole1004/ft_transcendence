from channels.generic.websocket import AsyncWebsocketConsumer
import json

# class NotificationConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.user = self.scope['user']
#         if self.user.is_authenticated:
#             self.group_name = f'user_{self.user.id}'
#             await self.channel_layer.group_add(
#                 self.group_name,
#                 self.channel_name
#             )
#             await self.accept()
#         else:
#             await self.close()

#     async def disconnect(self, close_code):
#        if self.user.is_authenticated:
#            await self.channel_layer.group_discard(
#                self.group_name,
#                self.channel_name
#            )
    
#     async def send_notification(self, event):
#         await self.send(text_data=json.dumps({
#             'message': message
#         }))

# class UserStatusConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.user = self.scope['user']
#         if self.user.is_authenticated:
#             self.group_name = f'user_{self.user.id}'

#             await self.set_user_status(self.user, 'online')

#             await self.channel_layer.group_add(
#                 self.group_name,
#                 self.channel_name
#             )
#             await self.accept()

#             await self.send(text_data=json.dumps({
#                 'status': self.user.status
#             }))
#         else:
#             await self.close()
    
#     async def disconnect(self, close_code):
#         if self.user.is_authenticated:
            
#             await self.set_user_status(self.user, 'offline')
            
#             await self.channel_layer.group_discard(
#                 self.group_name,
#                 self.channel_name
#             )

#     async def set_user_status(self, user, status):
#         """Sets the user's online status."""
#         try:
#             user.status = status
#             user.save()
#         except Exception as e:
#             print(e)
#             return False

#     async def send_status_update(self, status):
#         """Send a status update to all users in the group."""
#         await self.channel_layer.group_send(
#             self.group_name,
#             {
#                 'type': 'status_update',
#                 'status': status
#             }
#         )
    
#     async def status_update(self, event):
#         """Receive status update from group_send and send it to the WebSocket client."""
#         status = event['status']
#         await self.send(text_data=json.dumps({
#             'status': status
#         }))

class StatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_group_name = f'user_{self.scope["user"].id}'
        await self.channel_layer.group_add(
            self.user_group_name,
            self.channel_name
        )
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.user_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        status = data['status', 'offline']
    
        # await self.channel_layer.group_send(
        #     self.user_group_name,
        #     {
        #         'type': 'status_update',
        #         'status': status
        #     }
        # )
    
    async def status_update(self, event):
        await self.send(text_data=json.dumps({
            'status': event['status']
        }))