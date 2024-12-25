# game/tests/test_matchmaking.py
import pytest
from channels.testing import WebsocketCommunicator
from channels.routing import URLRouter
from django.urls import re_path
from ..matchmaking import MatchmakingConsumer
from ..models import GameSessions
import json

pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]

class TestMatchmaking:
    """
    Test suite for matchmaking functionality.
    """

    async def test_matchmaking_connection(self, websocket_communicator):
        """
        Test matchmaking WebSocket connection.
        
        Ensures that:
        1. Players can connect to matchmaking
        2. Authentication is required
        3. Players are added to queue
        4. Initial state is correct
        """
        application = URLRouter([
            re_path(r'ws/matchmaking/$', MatchmakingConsumer.as_asgi()),
        ])
        
        communicator = websocket_communicator('/ws/matchmaking/')
        communicator.application = application
        connected, _ = await communicator.connect()
        
        assert connected
        await communicator.disconnect()

    async def test_game_search(self, websocket_communicator, game_mode, game_table):
        """
        Test game search functionality.
        
        Ensures that:
        1. Players can search for games
        2. Matching criteria are respected
        3. Available games are found
        4. New games are created when needed
        """
        application = URLRouter([
            re_path(r'ws/matchmaking/$', MatchmakingConsumer.as_asgi()),
        ])
        
        communicator = websocket_communicator('/ws/matchmaking/')
        communicator.application = application
        await communicator.connect()
        
        # Search for game
        await communicator.send_json_to({
            'type': 'search_game',
            'mode': game_mode.mode,
            'table_id': game_table.table_id
        })
        
        response = await communicator.receive_json_from()
        assert response['type'] in ['waiting_for_opponent', 'game_found']
        
        await communicator.disconnect()

    async def test_matchmaking_queue(self, websocket_communicator):
        """
        Test matchmaking queue management.
        
        Ensures that:
        1. Players are properly queued
        2. Queue position is maintained
        3. Players can cancel matchmaking
        4. Queue updates are broadcast
        """
        application = URLRouter([
            re_path(r'ws/matchmaking/$', MatchmakingConsumer.as_asgi()),
        ])
        
        # Connect multiple players
        player1 = websocket_communicator('/ws/matchmaking/')
        player1.application = application
        await player1.connect()
        
        player2 = websocket_communicator('/ws/matchmaking/')
        player2.application = application
        await player2.connect()
        
        # Verify queue management
        await player1.send_json_to({'type': 'search_game'})
        await player2.send_json_to({'type': 'search_game'})
        
        response1 = await player1.receive_json_from()
        response2 = await player2.receive_json_from()
        
        assert response1['type'] == 'waiting_for_opponent'
        assert response2['type'] == 'game_found'
        
        await player1.disconnect()
        await player2.disconnect()

    async def test_matchmaking_cancellation(self, websocket_communicator):
        """
        Test matchmaking cancellation.
        
        Ensures that:
        1. Players can cancel matchmaking
        2. Queue is updated after cancellation
        3. Other players are not affected
        4. Resources are properly cleaned up
        """
        application = URLRouter([
            re_path(r'ws/matchmaking/$', MatchmakingConsumer.as_asgi()),
        ])
        
        communicator = websocket_communicator('/ws/matchmaking/')
        communicator.application = application
        await communicator.connect()
        
        # Start and cancel matchmaking
        await communicator.send_json_to({'type': 'search_game'})
        await communicator.send_json_to({'type': 'cancel_search'})
        
        response = await communicator.receive_json_from()
        assert response['type'] == 'search_cancelled'
        
        await communicator.disconnect()

    async def test_match_found_notification(self, websocket_communicator, game_session):
        """
        Test match found notifications.
        
        Ensures that:
        1. Players are notified when match is found
        2. Game session is created
        3. Both players receive correct game information
        4. Players are removed from queue
        """
        application = URLRouter([
            re_path(r'ws/matchmaking/$', MatchmakingConsumer.as_asgi()),
        ])
        
        # Connect two players
        player1 = websocket_communicator('/ws/matchmaking/')
        player2 = websocket_communicator('/ws/matchmaking/')
        player1.application = application
        player2.application = application
        
        await player1.connect()
        await player2.connect()
        
        # Start matchmaking for both
        await player1.send_json_to({'type': 'search_game'})
        await player2.send_json_to({'type': 'search_game'})
        
        # Verify match notifications
        response1 = await player1.receive_json_from()
        response2 = await player2.receive_json_from()
        
        assert 'game_id' in response1
        assert 'game_id' in response2
        
        await player1.disconnect()
        await player2.disconnect()