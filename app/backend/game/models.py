from django.db import models
from django.conf import settings

class GameSessions(models.Model):
    class GameStatus(models.TextChoices):
        WAITING = 'WAITING', 'Waiting for opponent'
        IN_PROGRESS = 'IN_PROGRESS', 'Game in progress'
        PAUSED = 'PAUSED', 'Game paused'
        FINISHED = 'FINISHED', 'Game finished'

    game_id = models.AutoField(primary_key=True)
    
    # Player fields
    player1 = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='games_as_player1',
        on_delete=models.CASCADE,
        null=True
    )
    player2 = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='games_as_player2',
        null=True, 
        on_delete=models.CASCADE
    )
    winner = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='games_won',
        null=True, 
        on_delete=models.SET_NULL
    )
    loser = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='games_lost',
        null=True, 
        on_delete=models.SET_NULL
    )
    
    # Score tracking
    score_player1 = models.IntegerField(default=0)
    score_player2 = models.IntegerField(default=0)
    
    # Time tracking
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    
    # Game configuration
    background_id = models.IntegerField(default=1)  # Just store the background ID directly
    
    # Game state
    is_paused = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20,
        choices=GameStatus.choices,
        default=GameStatus.WAITING
    )
    
    # Player ready states
    player1_ready = models.BooleanField(default=False)
    player2_ready = models.BooleanField(default=False)

    class Meta:
        db_table = 'game_session'

    def __str__(self):
        return f"Game {self.game_id} - {self.get_status_display()}"

    def assign_player(self, user, player_number):
        """Assign a user to a player slot"""
        if player_number == 1 and not self.player1:
            self.player1 = user
            self.save()
            return True
        elif player_number == 2 and not self.player2:
            self.player2 = user
            self.save()
            return True
        return False

    def is_full(self):
        """Check if both player slots are filled"""
        return bool(self.player1 and self.player2)