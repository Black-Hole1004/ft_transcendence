# backend/game/tests/test_endpoints.py
import json
from django.test import TestCase, Client
from django.urls import reverse
from game.models import GameMode, GameTable, GameSessions

class GameEndpointsTest(TestCase):
    def setUp(self):
        self.client = Client()
        
        # Create test data
        self.game_mode = GameMode.objects.create(
            game_mode_id=1,
            mode='1VS1',
            description='One versus One game'
        )
        
        self.game_table = GameTable.objects.create(
            table_id=1,
            name='Default Table',
            background_url='/assets/images/tables/table1.png'
        )

    def test_create_game(self):
        """Test game creation endpoint"""
        response = self.client.post(reverse('create_game'), {
            'mode_id': 1,
            'table_id': 1,
            'settings': {
                'paddleHeight': 110,
                'ballRadius': 15
            }
        }, content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('gameSession_id', data)

    def test_join_game(self):
        """Test game joining endpoint"""
        # First create a game
        game = GameSessions.objects.create(
            gameSession_id=1,
            player1_id=1,
            mode_id=self.game_mode,
            gameTable_id=self.game_table
        )
        
        response = self.client.post(
            reverse('join_game', kwargs={'game_id': 1}),
            {'player2_id': 2},
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['player2_id'], 2)

    def test_game_state_update(self):
        """Test game state update endpoint"""
        game = GameSessions.objects.create(
            gameSession_id=1,
            player1_id=1,
            mode_id=self.game_mode,
            gameTable_id=self.game_table
        )
        
        response = self.client.post(
            reverse('update_game_state', kwargs={'game_id': 1}),
            {
                'score_player1': 5,
                'score_player2': 3,
                'is_paused': True
            },
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['score_player1'], 5)
        self.assertEqual(data['score_player2'], 3)
        self.assertTrue(data['is_paused'])