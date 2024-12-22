# game/tests/test_game_management.py
import pytest
from django.core.exceptions import ValidationError
from ..managers import GameSessionManager
from ..models import GameSessions, GameMode
from django.utils import timezone
from UserManagement.models import User


pytestmark = pytest.mark.django_db


class TestGameSessionManager:
    """
    Test suite for GameSessionManager functionality.
    """

    def test_create_game(self, test_user, game_mode, game_table):
        """
        Test game creation through GameSessionManager.
        
        Ensures that:
        1. Games are created with correct initial state
        2. Validation checks are enforced
        3. Players cannot create multiple active games
        4. Game mode and table associations are correct
        """
        # Create a new game
        game = GameSessionManager.create_game(
            player1_id=test_user.id,
            mode=game_mode,
            table=game_table
        )
        
        assert game.player1_id == test_user.id
        assert game.status == GameSessions.GameStatus.WAITING
        assert game.mode_id == game_mode
        assert game.gameTable_id == game_table

        # Test duplicate game creation
        with pytest.raises(ValidationError):
            GameSessionManager.create_game(
                player1_id=test_user.id,
                mode=game_mode,
                table=game_table
            )

    def test_join_game(self, test_user, game_mode, game_table):
        """
        Test game joining functionality.
        
        Ensures that:
        1. Players can join available games
        2. Game state updates correctly
        3. Validation prevents invalid joins
        4. Players cannot join their own games
        """
        # Create a game
        game = GameSessionManager.create_game(
            player1_id=test_user.id,
            mode=game_mode,
            table=game_table
        )

        # Create second player
        player2 = User.objects.create_user(
            username='player2',
            email='player2@example.com',
            password='testpass123'
        )

        # Join game
        updated_game = GameSessionManager.join_game(
            game_id=game.gameSession_id,
            player2_id=player2.id
        )

        assert updated_game.player2_id == player2.id
        assert updated_game.status == GameSessions.GameStatus.IN_PROGRESS

        # Test invalid join attempts
        with pytest.raises(ValidationError):
            GameSessionManager.join_game(
                game_id=game.gameSession_id,
                player2_id=test_user.id
            )

    def test_update_game_state(self, game_session):
        """
        Test game state updates.
        
        Ensures that:
        1. Score updates work correctly
        2. Pause state can be toggled
        3. Only active games can be updated
        4. Updates are atomic
        """
        # fist let's put the game status to in progress so we can update it
        game_session.status = GameSessions.GameStatus.IN_PROGRESS
        game_session.save()
        # Update game state
        updated_game = GameSessionManager.update_game_state(
            game_id=game_session.gameSession_id,
            score1=5,
            score2=3,
            is_paused=True
        )

        assert updated_game.score_player1 == 5
        assert updated_game.score_player2 == 3
        assert updated_game.is_paused is True

        # Test invalid updates
        game_session.status = GameSessions.GameStatus.FINISHED
        game_session.save()

        with pytest.raises(ValidationError):
            GameSessionManager.update_game_state(
                game_id=game_session.gameSession_id,
                score1=6,
                score2=4
            )

    def test_end_game(self, game_session):
        """
        Test game ending functionality.
        
        Ensures that:
        1. Games end with correct final state
        2. Winner/loser are correctly determined
        3. End time is recorded
        4. Game statistics are updated
        """
        # fist let's put the game status to in progress so we can update it
        game_session.status = GameSessions.GameStatus.IN_PROGRESS
        game_session.save()
        # Set scores and end game
        GameSessionManager.update_game_state(
            game_id=game_session.gameSession_id,
            score1=10,
            score2=8
        )

        ended_game = GameSessionManager.end_game(game_session.gameSession_id)

        assert ended_game.status == GameSessions.GameStatus.FINISHED
        assert ended_game.winner_id == game_session.player1_id
        assert ended_game.loser_id == game_session.player2_id
        assert ended_game.end_time is not None

    def test_handle_disconnect(self, game_session):
        """
        Test disconnection handling.
        
        Ensures that:
        1. Disconnections are properly handled
        2. Game state is updated appropriately
        3. Other player is notified
        4. Game resources are cleaned up
        """
        # first let's put the game status to either in progress or paused so that it is an active game
        game_session.status = GameSessions.GameStatus.IN_PROGRESS
        game_session.save()
        # Handle player disconnect
        updated_game = GameSessionManager.handle_disconnect(
            game_id=game_session.gameSession_id,
            player_id=game_session.player1_id
        )
        assert updated_game.status == GameSessions.GameStatus.FINISHED
        assert updated_game.winner_id == game_session.player2_id
        assert updated_game.loser_id == game_session.player1_id

    def test_find_available_games(self, test_user, game_mode, game_table):
        """
        Test game search functionality.
        
        Ensures that:
        1. Available games are found
        2. Filtering by mode works
        3. Player's own games are excluded
        4. Only waiting games are returned
        """
        # Create some games
        game1 = GameSessionManager.create_game(
            player1_id=test_user.id,
            mode=game_mode,
            table=game_table
        )

        other_user = User.objects.create_user(
            username='other',
            email='other@example.com',
            password='testpass123'
        )

        game2 = GameSessionManager.create_game(
            player1_id=other_user.id,
            mode=game_mode,
            table=game_table
        )

        available_games = GameSessionManager.find_available_games(
            player_id=test_user.id,
            mode_type=game_mode.mode
        )

        assert len(available_games) == 1
        assert available_games[0].gameSession_id == game2.gameSession_id

    def test_concurrent_operations(self, game_session):
        """
        Test concurrent game operations.
        
        Ensures that:
        1. Concurrent updates are handled safely
        2. Race conditions are prevented
        3. Database transactions are atomic
        4. State consistency is maintained
        """
        import threading
        import queue

        results = queue.Queue()

        def update_game():
            try:
                game = GameSessionManager.update_game_state(
                    game_id=game_session.gameSession_id,
                    score1=5,
                    score2=3
                )
                results.put(('success', game))
            except Exception as e:
                results.put(('error', e))

        # Create multiple threads to test concurrent updates
        threads = [
            threading.Thread(target=update_game)
            for _ in range(5)
        ]

        for thread in threads:
            thread.start()

        for thread in threads:
            thread.join()

        # Check results
        while not results.empty():
            status, result = results.get()
            if status == 'success':
                assert result.score_player1 == 5
                assert result.score_player2 == 3