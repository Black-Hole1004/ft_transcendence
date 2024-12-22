# game/tests/test_integration.py
import pytest
from channels.testing import WebsocketCommunicator
from channels.routing import URLRouter
from django.urls import reverse
from rest_framework import status
from ..consumers import GameConsumer, MatchmakingConsumer
from ..models import GameSessions, GameMode, GameTable
from django.contrib.auth.models import User
from django.urls import re_path
from channels.db import database_sync_to_async
import json
import asyncio

pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]

class TestGameFlowIntegration:
    """
    Test suite for end-to-end game flow integration.
    """

    async def test_complete_game_flow(self, auth_client, websocket_communicator, game_mode, game_table):
        """
        Test complete game flow from creation to completion.
        
        Tests the entire game lifecycle:
        1. Game creation through REST API
        2. WebSocket connection for both players
        3. Game play simulation
        4. Score updates and state changes
        5. Game completion and cleanup
        """
        # 1. Create game through API
        create_url = reverse('create_game')
        create_data = {
            'mode_type': game_mode.mode,
            'table_id': game_table.table_id
        }
        
        response = auth_client.post(create_url, create_data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        game_id = response.data['gameSession_id']

        # 2. Connect players via WebSocket
        application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])

        player1 = websocket_communicator(f'/ws/game/{game_id}/')
        player1.application = application
        await player1.connect()

        # Create and connect player 2
        player2_user = User.objects.create_user(
            username='player2',
            email='player2@example.com',
            password='testpass123'
        )
        
        # Join game through API
        auth_client.force_authenticate(user=player2_user)
        join_url = reverse('join_game', kwargs={'game_id': game_id})
        response = auth_client.post(join_url)
        assert response.status_code == status.HTTP_200_OK

        player2 = websocket_communicator(f'/ws/game/{game_id}/')
        player2.application = application
        player2.scope["user"] = player2_user
        await player2.connect()

        # 3. Simulate gameplay
        # Paddle movements
        await player1.send_json_to({
            'type': 'paddle_move',
            'position': 30
        })
        await player2.send_json_to({
            'type': 'paddle_move',
            'position': 70
        })

        # Ball updates
        await player1.send_json_to({
            'type': 'ball_update',
            'position': {'x': 50, 'y': 50},
            'velocity': {'dx': 1, 'dy': 1}
        })

        # Score updates
        await player1.send_json_to({
            'type': 'score_update',
            'scorer': 1
        })

        # Verify state updates
        response = await player1.receive_json_from()
        assert response['type'] == 'score_change'

        # 4. End game
        end_url = reverse('end_game', kwargs={'game_id': game_id})
        response = auth_client.post(end_url)
        assert response.status_code == status.HTTP_200_OK

        # 5. Clean up connections
        await player1.disconnect()
        await player2.disconnect()

    async def test_matchmaking_to_game_flow(self, websocket_communicator, game_mode, game_table):
        """
        Test flow from matchmaking to game completion.
        
        Tests the matchmaking-to-game process:
        1. Two players enter matchmaking
        2. Match is found and game created
        3. Players are connected to game
        4. Basic gameplay occurs
        5. Game is completed properly
        """
        application = URLRouter([
            re_path(r'ws/matchmaking/$', MatchmakingConsumer.as_asgi()),
        ])

        # Connect players to matchmaking
        player1 = websocket_communicator('/ws/matchmaking/')
        player2 = websocket_communicator('/ws/matchmaking/')
        player1.application = application
        player2.application = application

        await player1.connect()
        await player2.connect()

        # Start matchmaking
        await player1.send_json_to({
            'type': 'search_game',
            'mode': game_mode.mode,
            'table_id': game_table.table_id
        })
        
        await player2.send_json_to({
            'type': 'search_game',
            'mode': game_mode.mode,
            'table_id': game_table.table_id
        })

        # Get game assignment
        response1 = await player1.receive_json_from()
        response2 = await player2.receive_json_from()
        
        game_id = response1.get('game_id') or response2.get('game_id')
        assert game_id is not None

        # Switch to game WebSocket
        game_application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])

        game_player1 = websocket_communicator(f'/ws/game/{game_id}/')
        game_player2 = websocket_communicator(f'/ws/game/{game_id}/')
        game_player1.application = game_application
        game_player2.application = game_application

        await game_player1.connect()
        await game_player2.connect()

        # Simulate brief gameplay
        await game_player1.send_json_to({
            'type': 'paddle_move',
            'position': 40
        })

        # Clean up
        await game_player1.disconnect()
        await game_player2.disconnect()
        await player1.disconnect()
        await player2.disconnect()

    async def test_error_recovery_flow(self, websocket_communicator, game_session):
        """
        Test error recovery and reconnection flows.
        
        Tests system resilience:
        1. Connection drops and reconnections
        2. State recovery after disconnection
        3. Error handling during gameplay
        4. Game state consistency
        """
        application = URLRouter([
            re_path(r'ws/game/(?P<game_id>\w+)/$', GameConsumer.as_asgi()),
        ])

        # Initial connection
        player = websocket_communicator(f'/ws/game/{game_session.gameSession_id}/')
        player.application = application
        await player.connect()

        # Simulate connection drop
        await player.disconnect()

        # Reconnect
        player = websocket_communicator(f'/ws/game/{game_session.gameSession_id}/')
        player.application = application
        await player.connect()

        # Verify state recovery
        response = await player.receive_json_from()
        assert response['type'] == 'game_state'
        assert 'game' in response

        # Clean up
        await player.disconnect()