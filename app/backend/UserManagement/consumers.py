from channels.generic.websocket import AsyncWebsocketConsumer
import json

class FriendRequestConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.room_group_name = f"friend_request_{self.user.id}"

        # Join the WebSocket group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the WebSocket group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        friend_request_id = text_data_json.get('id')
        from_user = text_data_json.get('fromUser')

        # Debug output to ensure values are present
        print("Received message:", message)
        print("Friend request ID:", friend_request_id)
        print("From user:", from_user)

        if not friend_request_id or not from_user:
            print("Error: Missing friend request ID or fromUser")

        # Send message to the WebSocket group
        await self.channel_layer.group_send(
        self.room_group_name,
        {
            'type': 'friend_request_message',
            'message': message,
            'id': friend_request_id,
            'fromUser': from_user,
        }
    )

    # Receive message from the group
    async def friend_request_message(self, event):
        message = event['message']
        friend_request_id = event.get('id')
        from_user = event.get('fromUser')

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'id': friend_request_id,
            'fromUser': from_user
        }))


# unlit i come back to this later
# class UserStatusConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         # Check if the user is authenticated
#         if self.scope["user"].is_authenticated:
#             print(f'User {self.scope["user"]} connected')
#             self.user = self.scope["user"]
#             self.group_name = f"user_{self.user.id}"

#             # Add user to the group
#             await self.channel_layer.group_add(
#                 self.group_name,
#                 self.channel_name
#             )

#             self.accept()  # Accept the connection
#         else:
#             print(f"Unauthenticated user attempted to connect: {self.scope['user']}")
#             await self.close()  # Close connection if not authenticated

#     async def disconnect(self, close_code):
#         # Handle disconnect
#         await self.channel_layer.group_discard(
#             self.group_name,
#             self.channel_name
#         )

#     async def receive(self, text_data):
#         # Handle messages received from WebSocket
#         text_data_json = json.loads(text_data)
#         status = text_data_json['status']

#         # Send status update to the group
#         await self.channel_layer.group_send(
#             self.group_name,
#             {
#                 'type': 'status_update',
#                 'status': status
#             }
#         )

#     async def status_update(self, event):
#         # Send status update to WebSocket
#         await self.send(text_data=json.dumps({
#             'status': event['status']
#         }))
