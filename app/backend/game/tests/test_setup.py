# backend/game/tests/test_setup.py
import os
import django
from django.core.asgi import get_asgi_application
from channels.testing import WebsocketCommunicator
from channels.routing import URLRouter
from django.test import TestCase
from game.models import GameMode, GameTable, GameSessions
from game.routing import websocket_urlpatterns

class GameSetupTest(TestCase):
    def setUp(self):
        # Create test game mode
        self.game_mode = GameMode.objects.create(
            game_mode_id=1,
            mode='1VS1',
            description='One versus One game'
        )

        # Create test game table
        self.game_table = GameTable.objects.create(
            table_id=1,
            name='Default Table',
            background_url='/assets/images/tables/table1.png'
        )

    def test_game_mode_creation(self):
        """Test if game mode is created correctly"""
        game_mode = GameMode.objects.get(mode='1VS1')
        self.assertEqual(game_mode.description, 'One versus One game')

    def test_game_table_creation(self):
        """Test if game table is created correctly"""
        game_table = GameTable.objects.get(name='Default Table')
        self.assertEqual(game_table.background_url, '/assets/images/tables/table1.png')

    async def test_websocket_connection(self):
        """Test WebSocket connection"""
        communicator = WebsocketCommunicator(
            URLRouter(websocket_urlpatterns),
            "/ws/game/1/"
        )
        connected, _ = await communicator.connect()
        self.assertTrue(connected)
        await communicator.disconnect()
