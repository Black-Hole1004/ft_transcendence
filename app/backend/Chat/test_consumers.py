import json
from channels.testing import WebsocketCommunicator
from django.test import TestCase
from chat_project.asgi import application

class ChatConsumerTest(TestCase):
    async def test_connect(self):
        # Define the conversation key for the test
        conversation_key = 'test_conversation'
        
        # Set up a WebSocket communicator, which simulates a WebSocket connection
        communicator = WebsocketCommunicator(application, f"/ws/chat/{conversation_key}/")
        
        # Connect the WebSocket
        connected, _ = await communicator.connect()
        
        # Check if the connection was accepted
        self.assertTrue(connected)
        
        # Optionally, send and receive messages here if needed
        
        # Close the WebSocket connection
        await communicator.disconnect()
