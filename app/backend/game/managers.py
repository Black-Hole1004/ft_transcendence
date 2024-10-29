from django.utils import timezone
from django.db import transaction, models
from django.core.exceptions import ValidationError
from .models import GameSessions, GameMode, GameTable


class GameSessionManager:
    @staticmethod
    @transaction.atomic
    def create_game(player1_id, mode, table):
        """
        Create a new game session with validation and atomic transaction
        """
        try:
            # Validate player1_id
            if player1_id is None or not isinstance(player1_id, int):
                raise ValueError("Invalid player1_id: must be a valid integer.")

            # Check if player is already in an active game
            active_games = GameSessions.objects.filter(
                (models.Q(player1_id=player1_id) | models.Q(player2_id=player1_id)) &
                (models.Q(status=GameSessions.GameStatus.WAITING) | 
                models.Q(status=GameSessions.GameStatus.IN_PROGRESS))
            )
            
            if active_games.exists():
                raise ValidationError("Player already in an active game")

            print(f"Creating game with player1_id: {player1_id}, mode: {mode}, table: {table}")

            return GameSessions.objects.create(
                player1_id=player1_id,
                mode_id=mode,
                gameTable_id=table,
                status=GameSessions.GameStatus.WAITING,
            )
        except Exception as e:
            raise ValidationError(f"Error creating game: {str(e)}")

    @staticmethod
    @transaction.atomic
    def join_game(game_id, player2_id):
        """
        Join an existing game with validation and atomic transaction
        """
        try:
            game = GameSessions.objects.select_for_update().get(gameSession_id=game_id)
            
            # Validate game state
            if game.status != GameSessions.GameStatus.WAITING:
                raise ValidationError("Game is not available to join")
            if game.player2_id is not None:
                raise ValidationError("Game is already full")
            if game.player1_id == player2_id:
                raise ValidationError("Cannot join your own game")

            # Check if player is already in another active game
            active_games = GameSessions.objects.filter(
                (models.Q(player1_id=player2_id) | models.Q(player2_id=player2_id)) &
                (models.Q(status=GameSessions.GameStatus.WAITING) | 
                models.Q(status=GameSessions.GameStatus.IN_PROGRESS))
            ).exclude(gameSession_id=game_id)

            if active_games.exists():
                raise ValidationError("Player already in another active game")

            # Update game with second player
            game.player2_id = player2_id
            game.status = GameSessions.GameStatus.IN_PROGRESS
            game.save()

            return game

        except GameSessions.DoesNotExist:
            raise ValidationError(f"Game {game_id} does not exist")
        except Exception as e:
            raise ValidationError(f"Error joining game: {str(e)}")

    @staticmethod
    @transaction.atomic
    def update_game_state(game_id, score1=None, score2=None, is_paused=None):
        """
        Update game state with validation and atomic transaction
        """
        try:
            game = GameSessions.objects.select_for_update().get(gameSession_id=game_id)
            
            # Validate game is active
            if game.status not in [GameSessions.GameStatus.IN_PROGRESS, GameSessions.GameStatus.PAUSED]:
                raise ValidationError("Cannot update inactive game")

            # Update scores if provided
            if score1 is not None:
                game.score_player1 = score1
            if score2 is not None:
                game.score_player2 = score2

            # Update pause state if provided
            if is_paused is not None:
                if is_paused != game.is_paused:
                    game.toggle_pause()

            game.save()
            return game

        except GameSessions.DoesNotExist:
            raise ValidationError(f"Game {game_id} does not exist")
        except Exception as e:
            raise ValidationError(f"Error updating game state: {str(e)}")

    @staticmethod
    @transaction.atomic
    def end_game(game_id, forfeit_player_id=None):
        """
        End game with optional forfeit player and atomic transaction
        atomic transaction means that all database operations are done at once
        """
        try:
            game = GameSessions.objects.select_for_update().get(gameSession_id=game_id)
            
            # Set end time
            game.end_time = timezone.now()
            
            if forfeit_player_id:
                # Handle forfeit
                if forfeit_player_id == game.player1_id:
                    game.winner_id = game.player2_id
                    game.loser_id = game.player1_id
                else:
                    game.winner_id = game.player1_id
                    game.loser_id = game.player2_id
            else:
                # Determine winner based on score
                if game.score_player1 > game.score_player2:
                    game.winner_id = game.player1_id
                    game.loser_id = game.player2_id
                elif game.score_player2 > game.score_player1:
                    game.winner_id = game.player2_id
                    game.loser_id = game.player1_id
                # If scores are equal, no winner is set
            
            game.status = GameSessions.GameStatus.FINISHED
            game.save()

            # Update player statistics here if needed
            # self.update_player_stats(game)

            return game

        except GameSessions.DoesNotExist:
            raise ValidationError(f"Game {game_id} does not exist")
        except Exception as e:
            raise ValidationError(f"Error ending game: {str(e)}")

    @staticmethod
    def find_available_games(player_id, mode_type=None):
        """
        Find available games for a player to join
        """
        query = GameSessions.objects.filter(
            status=GameSessions.GameStatus.WAITING
        ).exclude(player1_id=player_id)

        if mode_type:
            query = query.filter(mode_id__mode=mode_type)

        return query.order_by('start_time')

    @staticmethod
    @transaction.atomic
    def handle_disconnect(game_id, player_id):
        """
        Handle player disconnection with atomic transaction
        """
        try:
            game = GameSessions.objects.select_for_update().get(gameSession_id=game_id)
            
            # Only handle disconnect for active games
            if game.status in [GameSessions.GameStatus.IN_PROGRESS, GameSessions.GameStatus.PAUSED]:
                # End game with disconnected player as loser
                return GameSessionManager.end_game(game_id, forfeit_player_id=player_id)
            
            return game

        except GameSessions.DoesNotExist:
            raise ValidationError(f"Game {game_id} does not exist")
        except Exception as e:
            raise ValidationError(f"Error handling disconnect: {str(e)}")