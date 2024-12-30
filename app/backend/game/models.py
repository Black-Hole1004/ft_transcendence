from django.db import models
from django.conf import settings
from django.utils import timezone

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
    # game result fields
    winner = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='won_games',
        null=True, 
        on_delete=models.SET_NULL
    )
    loser = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='lost_games',
        null=True, 
        on_delete=models.SET_NULL
    )
    
    # Score tracking
    score_player1 = models.IntegerField(default=0)
    score_player2 = models.IntegerField(default=0)
    
    # scores winner and loser
    winner_score = models.IntegerField(default=0)
    loser_score = models.IntegerField(default=0)
    
    #xp gained by the players
    player1_xp_gain = models.IntegerField(default=0)
    player2_xp_gain = models.IntegerField(default=0)
    
        
    # Game state
    is_paused = models.BooleanField(default=False)
    start_time = models.DateTimeField(auto_now_add=True)
    
    status = models.CharField(
        max_length=20,
        choices=GameStatus.choices,
        default=GameStatus.WAITING
    )
    
    class Meta:
        db_table = 'game_session'
        ordering = ['-start_time']  # Latest games first

    def __str__(self):
        return f"Game {self.game_id} - {self.get_status_display()}"

    def is_full(self):
        """Check if both player slots are filled"""
        return bool(self.player1 and self.player2)
        
    def start_game(self):
        """Start the game if both players are ready"""
        if self.is_full() and self.player1_ready and self.player2_ready:
            self.status = self.GameStatus.IN_PROGRESS
            self.save()
            return True
        return False
        
    def end_game(self, winner_id):
        """End the game and set winner/loser"""
        self.status = self.GameStatus.FINISHED
        self.end_time = timezone.now()
        
        if winner_id == self.player1.id:
            self.winner = self.player1
            self.loser = self.player2
        else:
            self.winner = self.player2
            self.loser = self.player1
                
        self.save()
        


class GameInvitations(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Waiting for response'
        ACCEPTED = 'ACCEPTED', 'Invitation accepted'
        DECLINED = 'DECLINED', 'Invitation declined'
        EXPIRED = 'EXPIRED', 'Invitation expired'

    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='sent_game_invites',
        on_delete=models.CASCADE
    )
    
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='received_game_invites',
        on_delete=models.CASCADE
    )
    
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Game invite from {self.sender.username} to {self.receiver.username}"