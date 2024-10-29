# backend/game/tests/test_basic.py
from django.test import TestCase
from game.models import GameMode, GameTable

class BasicGameTests(TestCase):
    def test_create_game_mode(self):
        """Test creating a game mode"""
        game_mode = GameMode.objects.create(
            game_mode_id=1,
            mode='1VS1',
            description='One versus One game'
        )
        self.assertEqual(GameMode.objects.count(), 1)
        self.assertEqual(game_mode.mode, '1VS1')

    def test_create_game_table(self):
        """Test creating a game table"""
        game_table = GameTable.objects.create(
            table_id=1,
            name='Space Table',
            background_url='/assets/images/tables/table1.png'
        )
        self.assertEqual(GameTable.objects.count(), 1)
        self.assertEqual(game_table.name, 'Space Table')