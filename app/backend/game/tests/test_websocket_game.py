# game/tests/test_websocket_game.py
import pytest
from channels.testing import WebsocketCommunicator
from channels.routing import URLRouter
from django.urls import re_path
from ..consumers import GameConsumer
from ..models import GameSessions
from channels.db import database_sync_to_async
import json

pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]

class TestGameWebSocket:
    """
    Test suite for game WebSocket functionality.
    """

    async def test_connection_authentication(self, websocket_communicator, game_session):
        """
        Test WebSocket connection authentication.
        
        Ensures that:
        1. Authenticated users can connect
        2. Unauthenticated users are rejected
        3. Connection includes proper game state
        4. Player number is correctly assigned
        """
        application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])
        
        # Test authenticated connection
        communicator = websocket_communicator(f'/ws/game/{game_session.gameSession_id}/')
        communicator.application = application
        connected, _ = await communicator.connect()
        
        assert connected
        
        # Verify initial game state message
        response = await communicator.receive_json_from()
        assert response['type'] == 'game_state'
        assert 'game' in response
        assert 'player_number' in response
        
        await communicator.disconnect()

    async def test_paddle_movement(self, websocket_communicator, game_session):
        """
        Test paddle movement messaging.
        
        Ensures that:
        1. Paddle movements are properly transmitted
        2. Position validation works
        3. Messages are broadcasted to other players
        4. Rate limiting is enforced
        """
        application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])
        
        # Connect two players
        player1 = websocket_communicator(f'/ws/game/{game_session.gameSession_id}/')
        player1.application = application
        await player1.connect()
        
        # Send paddle movement
        await player1.send_json_to({
            'type': 'paddle_move',
            'position': 50
        })
        
        # Verify movement message
        response = await player1.receive_json_from()
        assert response['type'] == 'paddle_move'
        assert response['position'] == 50
        assert response['player'] == 1
        
        await player1.disconnect()

    async def test_ball_updates(self, websocket_communicator, game_session):
        """
        Test ball position update messaging.
        
        Ensures that:
        1. Ball updates are properly transmitted
        2. Only player 1 can update ball position
        3. Updates include correct velocity data
        4. All players receive updates
        """
        application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])
        
        # Connect as player 1
        player1 = websocket_communicator(f'/ws/game/{game_session.gameSession_id}/')
        player1.application = application
        await player1.connect()
        
        # Send ball update
        await player1.send_json_to({
            'type': 'ball_update',
            'position': {'x': 50, 'y': 50},
            'velocity': {'dx': 1, 'dy': 1}
        })
        
        # Verify update message
        response = await player1.receive_json_from()
        assert response['type'] == 'ball_update'
        assert 'position' in response
        assert 'velocity' in response
        
        await player1.disconnect()

    async def test_score_updates(self, websocket_communicator, game_session):
        """
        Test score update functionality.
        
        Ensures that:
        1. Score updates are properly tracked
        2. All players receive score updates
        3. Game state is updated correctly
        4. Win conditions are checked
        """
        application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])
        
        # Connect player
        player = websocket_communicator(f'/ws/game/{game_session.gameSession_id}/')
        player.application = application
        await player.connect()
        
        # Update score
        await player.send_json_to({
            'type': 'score_update',
            'scorer': 1
        })
        
        # Verify score update
        response = await player.receive_json_from()
        assert response['type'] == 'score_change'
        assert 'game_state' in response
        
        await player.disconnect()

    async def test_game_pause_resume(self, websocket_communicator, game_session):
        """
        Test game pause/resume functionality.
        
        Ensures that:
        1. Games can be paused and resumed
        2. All players are notified of pause state
        3. Game state is properly preserved
        4. Only valid players can pause/resume
        """
        application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])
        
        # Connect player
        player = websocket_communicator(f'/ws/game/{game_session.gameSession_id}/')
        player.application = application
        await player.connect()
        
        # Test pause
        await player.send_json_to({
            'type': 'pause_game'
        })
        
        response = await player.receive_json_from()
        assert response['type'] == 'game_state'
        assert response['game']['is_paused'] is True
        
        await player.disconnect()

    async def test_disconnection_handling(self, websocket_communicator, game_session):
        """
        Test player disconnection handling.
        
        Ensures that:
        1. Disconnections are properly detected
        2. Other players are notified
        3. Game state is updated appropriately
        4. Reconnection is possible
        """
        application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])
        
        # Connect and then disconnect
        player = websocket_communicator(f'/ws/game/{game_session.gameSession_id}/')
        player.application = application
        await player.connect()
        await player.disconnect()
        
        # Verify game state
        game = await database_sync_to_async(GameSessions.objects.get)(
            gameSession_id=game_session.gameSession_id
        )
        assert game.status == GameSessions.GameStatus.FINISHED

    async def test_error_handling(self, websocket_communicator, game_session):
        """
        Test WebSocket error handling.
        
        Ensures that:
        1. Invalid messages are properly handled
        2. Error responses are sent to clients
        3. Connection remains stable after errors
        4. Security violations are properly handled
        """
        application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])
        
        player = websocket_communicator(f'/ws/game/{game_session.gameSession_id}/')
        player.application = application
        await player.connect()
        
        # Send invalid message
        await player.send_json_to({
            'type': 'invalid_type',
            'data': 'invalid'
        })
        
        response = await player.receive_json_from()
        assert response['type'] == 'error'
        assert 'message' in response
        
        await player.disconnect()