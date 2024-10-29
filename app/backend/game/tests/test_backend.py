# backend/game/tests/test_backend.py
from django.test import TestCase
from game.models import GameMode, GameTable, GameSessions
from django.utils import timezone

class GameBackendTests(TestCase):
    def setUp(self):
        """Set up test data"""
        # Create game mode
        self.game_mode = GameMode.objects.create(
            game_mode_id=1,
            mode='1VS1',
            description='One versus One game'
        )

        # Create game table
        self.game_table = GameTable.objects.create(
            table_id=1,
            name='Space Table',
            background_url='/assets/images/tables/table1.png'
        )

    def test_game_mode_creation(self):
        """Test if game mode is created correctly"""
        mode = GameMode.objects.get(mode='1VS1')
        self.assertEqual(mode.description, 'One versus One game')

    def test_game_table_creation(self):
        """Test if game table is created correctly"""
        table = GameTable.objects.get(name='Space Table')
        self.assertEqual(table.background_url, '/assets/images/tables/table1.png')
        # ./../../../frontend/public/assets/images/tables/table1.png

    def test_game_session_creation(self):
        """Test game session creation"""
        session = GameSessions.objects.create(
            gameSession_id=1,
            player1_id=123,
            mode_id=self.game_mode,
            gameTable_id=self.game_table,
            start_time=timezone.now()
        )
        self.assertEqual(session.player1_id, 123)
        self.assertIsNone(session.player2_id)

    def test_game_session_joining(self):
        """Test joining a game session"""
        session = GameSessions.objects.create(
            gameSession_id=1,
            player1_id=123,
            mode_id=self.game_mode,
            gameTable_id=self.game_table,
            start_time=timezone.now()
        )
        
        session.player2_id = 456
        session.save()
        
        updated_session = GameSessions.objects.get(gameSession_id=1)
        self.assertEqual(updated_session.player2_id, 456)

    def test_game_session_score_update(self):
        """Test updating game scores"""
        session = GameSessions.objects.create(
            gameSession_id=1,
            player1_id=123,
            mode_id=self.game_mode,
            gameTable_id=self.game_table,
            start_time=timezone.now()
        )
        
        session.score_player1 = 5
        session.score_player2 = 3
        session.save()
        
        updated_session = GameSessions.objects.get(gameSession_id=1)
        self.assertEqual(updated_session.score_player1, 5)
        self.assertEqual(updated_session.score_player2, 3)