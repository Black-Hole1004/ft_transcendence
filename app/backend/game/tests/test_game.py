# game/tests/test_game.py
import pytest
from channels.testing import WebsocketCommunicator
from channels.db import database_sync_to_async
from channels.routing import URLRouter
from channels.layers import get_channel_layer
from django.urls import re_path
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from django.test import TestCase, TransactionTestCase, override_settings
from ..consumers import GameConsumer
from ..matchmaking import MatchmakingConsumer
from ..models import GameMode, GameTable, GameSessions
from django.urls import reverse
import json
from channels.layers import BaseChannelLayer

User = get_user_model()

# Channel layer configuration for testing
TEST_CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}

class WebSocketTestCase(TransactionTestCase):
    """Base class for WebSocket tests"""
    channel_layers = TEST_CHANNEL_LAYERS
    
    async def _setup_channel_layer(self):
        channel_layer = get_channel_layer()
        await channel_layer.flush()

class TestGameWebSocket(WebSocketTestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user_data = {
            'username': 'testplayer1',
            'email': 'test@example.com',
            'password': 'testpass123'
        }
        cls.game_mode_data = {
            'mode': GameMode.ModeChoices.ONE_VS_ONE,
            'description': "Test mode"
        }
        cls.game_table_data = {
            'name': "Test Table",
            'background_image': "test.jpg",
            'xp_required': 0,
            'is_default': True
        }

    async def asyncSetUp(self):
        await self._setup_channel_layer()
        
        # Create test user
        self.user = await database_sync_to_async(User.objects.create_user)(**self.user_data)
        
        # Create required game mode
        self.game_mode = await database_sync_to_async(GameMode.objects.create)(**self.game_mode_data)
        
        # Create game table
        self.game_table = await database_sync_to_async(GameTable.objects.create)(**self.game_table_data)
        
        # Create a game session
        self.game = await database_sync_to_async(GameSessions.objects.create)(
            player1_id=self.user.id,
            mode_id=self.game_mode,
            gameTable_id=self.game_table,
            status=GameSessions.GameStatus.WAITING
        )

    @pytest.mark.asyncio
    @pytest.mark.django_db(transaction=True)
    async def test_game_connection(self):
        await self.asyncSetUp()
        
        application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])

        communicator = WebsocketCommunicator(
            application=application,
            path=f'/ws/game/{self.game.gameSession_id}/'
        )
        communicator.scope["user"] = self.user
        
        try:
            connected, _ = await communicator.connect()
            assert connected
            
            response = await communicator.receive_json_from()
            assert response['type'] == 'game_state'
            assert response['player_number'] == 1
        finally:
            await communicator.disconnect()

class TestMatchmaking(WebSocketTestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user_data = {
            'username': 'testplayer1',
            'email': 'test@example.com',
            'password': 'testpass123'
        }
        cls.game_mode_data = {
            'mode': GameMode.ModeChoices.ONE_VS_ONE,
            'description': "Test mode"
        }
        cls.game_table_data = {
            'name': "Test Table",
            'background_image': "test.jpg",
            'xp_required': 0,
            'is_default': True
        }

    async def asyncSetUp(self):
        await self._setup_channel_layer()
        
        self.user = await database_sync_to_async(User.objects.create_user)(**self.user_data)
        self.game_mode = await database_sync_to_async(GameMode.objects.create)(**self.game_mode_data)
        self.game_table = await database_sync_to_async(GameTable.objects.create)(**self.game_table_data)

    @pytest.mark.asyncio
    @pytest.mark.django_db(transaction=True)
    async def test_matchmaking_connection(self):
        await self.asyncSetUp()
        
        application = URLRouter([
            re_path(r'ws/matchmaking/$', MatchmakingConsumer.as_asgi()),
        ])

        communicator = WebsocketCommunicator(
            application=application,
            path='/ws/matchmaking/'
        )
        
        try:
            communicator.scope["user"] = self.user
            connected, _ = await communicator.connect()
            assert connected
        finally:
            await communicator.disconnect()

class TestGameAPI(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testplayer1',
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
        
        self.game_mode = GameMode.objects.create(
            mode=GameMode.ModeChoices.ONE_VS_ONE,
            description="Test mode"
        )
        
        self.game_table = GameTable.objects.create(
            name="Test Table",
            background_image="test.jpg",
            xp_required=0,
            is_default=True
        )

    def test_create_game(self):
        url = reverse('create_game')
        data = {
            'mode_type': GameMode.ModeChoices.ONE_VS_ONE,
            'table_id': self.game_table.table_id
        }
        
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['player1_id'], self.user.id)
        self.assertEqual(response.data['status'], GameSessions.GameStatus.WAITING)

    def test_join_game(self):
        # Create another user
        user2 = User.objects.create_user(
            username='testplayer2',
            email='test2@example.com',
            password='testpass123'
        )
        
        # Create a game
        game = GameSessions.objects.create(
            player1_id=self.user.id,
            mode_id=self.game_mode,
            gameTable_id=self.game_table,
            status=GameSessions.GameStatus.WAITING
        )
        
        # Switch to user2
        self.client.force_authenticate(user=user2)
        
        url = reverse('join_game', kwargs={'game_id': game.gameSession_id})
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['player2_id'], user2.id)
        self.assertEqual(response.data['status'], GameSessions.GameStatus.IN_PROGRESS)

    def test_get_available_tables(self):
        url = reverse('game_tables')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) > 0)
        self.assertEqual(response.data[0]['name'], "Test Table")
        self.assertIn('is_unlocked', response.data[0])