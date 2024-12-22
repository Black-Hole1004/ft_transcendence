# game/tests/conftest.py
import pytest
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from ..models import GameMode, GameTable, GameSessions
from channels.layers import get_channel_layer
from channels.testing import WebsocketCommunicator

User = get_user_model()

# Channel layer configuration for WebSocket tests
TEST_CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}

@pytest.fixture
def api_client():
    """
    Returns an authenticated Django REST framework API client.
    """
    return APIClient()

@pytest.fixture
def test_password():
    """
    Returns a test password for user creation.
    """
    return 'test_password123'

@pytest.fixture
def test_user(db, test_password):
    """
    Creates and returns a test user with basic attributes.
    """
    user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password=test_password
    )
    return user

@pytest.fixture
def auth_client(api_client, test_user):
    """
    Returns an authenticated API client.
    """
    api_client.force_authenticate(user=test_user)
    return api_client

@pytest.fixture
def game_mode(db):
    """
    Creates and returns a test game mode.
    """
    return GameMode.objects.create(
        mode=GameMode.ModeChoices.ONE_VS_ONE,
        description="Test Mode"
    )

@pytest.fixture
def game_table(db):
    """
    Creates and returns a test game table.
    """
    return GameTable.objects.create(
        name="Test Table",
        background_image="test.jpg",
        xp_required=0,
        is_default=True
    )

@pytest.fixture
def game_session(db, test_user, game_mode, game_table):
    """
    Creates and returns a test game session.
    """
    return GameSessions.objects.create(
        player1_id=test_user.id,
        mode_id=game_mode,
        gameTable_id=game_table,
        status=GameSessions.GameStatus.WAITING
    )

@pytest.fixture
async def channel_layer():
    """
    Returns a test channel layer for WebSocket tests.
    """
    channel_layer = get_channel_layer()
    await channel_layer.flush()
    return channel_layer

@pytest.fixture
def websocket_communicator(game_session, test_user):
    """
    Returns a WebSocket communicator for testing.
    """
    def _websocket_communicator(path):
        communicator = WebsocketCommunicator(
            application=None,  # Will be set in individual tests
            path=path
        )
        communicator.scope["user"] = test_user
        return communicator
    return _websocket_communicator

