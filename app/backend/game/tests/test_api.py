# backend/game/tests/test_api.py
from django.test import TestCase, Client
from django.urls import reverse
from game.models import GameMode, GameTable, GameSessions
import json

class GameAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        
        # Create GameMode and GameTable for testing
        self.game_mode = GameMode.objects.create(
            game_mode_id=1,
            mode='1VS1',
            description='One versus One game'
        )
        self.game_table = GameTable.objects.create(
            table_id=1,
            name='Space Table',
            background_url='/assets/images/tables/table1.png'
        )

    def test_create_game_endpoint(self):
        """Test game creation endpoint"""
        # Send a request to create a game
        response = self.client.post(
            reverse('create_game'),
            data=json.dumps({
                'mode_id': self.game_mode.game_mode_id,
                'table_id': self.game_table.table_id,
                'settings': {
                    'paddleHeight': 110,
                    'ballRadius': 15,
                    'powerUps': 1,
                    'attacks': 1
                }
            }),
            content_type='application/json'
        )
        
        # Check for expected status code
        self.assertEqual(response.status_code, 200)
        
        # Verify the response contains a valid game session ID
        data = json.loads(response.content)
        self.assertIn('gameSession_id', data)
        self.assertIsInstance(data['gameSession_id'], int)

    def test_join_game_endpoint(self):
        """Test game joining endpoint"""
        # First, create a game session with player1 and set status to WAITING
        game_session = GameSessions.objects.create(
            gameSession_id=1,
            player1_id=123,
            mode_id=self.game_mode,
            gameTable_id=self.game_table,
            status='WAITING'  # Ensure game is in 'WAITING' status
        )
        
        # Attempt to join the game with player2
        response = self.client.post(
            reverse('join_game', kwargs={'game_id': game_session.gameSession_id}),
            data=json.dumps({'player2_id': 456}),
            content_type='application/json'
        )
        
        # Verify the response
        self.assertEqual(response.status_code, 200)
        
        # Check that player2_id is now set in the session
        data = json.loads(response.content)
        self.assertEqual(data.get('player2_id'), 456)

    def test_game_state_update_endpoint(self):
        """Test game state update endpoint"""
        # Create a game session for updating game state
        game_session = GameSessions.objects.create(
            gameSession_id=1,
            player1_id=123,
            player2_id=456,
            mode_id=self.game_mode,
            gameTable_id=self.game_table,
            status='IN_PROGRESS'
        )
        
        # Send a request to update the game state
        response = self.client.post(
            reverse('update_game', kwargs={'game_id': game_session.gameSession_id}),
            data=json.dumps({
                'score_player1': 5,
                'score_player2': 3,
                'is_paused': True
            }),
            content_type='application/json'
        )
        
        # Verify the response
        self.assertEqual(response.status_code, 200)
        
        # Check that the game state was updated correctly
        data = json.loads(response.content)
        self.assertEqual(data['score_player1'], 5)
        self.assertEqual(data['score_player2'], 3)
        self.assertTrue(data['is_paused'])
