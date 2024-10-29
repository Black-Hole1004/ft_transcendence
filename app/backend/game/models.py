# backend/game/models.py
from django.db import models

class GameMode(models.Model):
    class ModeChoices(models.TextChoices):
        TOURNAMENT = 'TOURNAMENT', 'Tournament'
        TRAINING = 'TRAINING', 'Training with AI'
        ONE_VS_ONE = '1VS1', 'One vs One'

    game_mode_id = models.AutoField(primary_key=True)
    mode = models.CharField(
        max_length=20,
        choices=ModeChoices.choices,
        default=ModeChoices.ONE_VS_ONE,
        unique=True
    )
    description = models.TextField()

    class Meta:
        db_table = 'gameMode'

    def __str__(self):
        return f"{self.mode} - {self.description}"

class GameTable(models.Model):
    table_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    background_image = models.CharField(max_length=255)  # Store the relative path as a string
    # Add if you want to track which backgrounds are locked/unlocked
    xp_required = models.IntegerField(default=0)  # XP needed to unlock this background
    is_default = models.BooleanField(default=False)

    class Meta:
        db_table = 'gameTable'

    def __str__(self):
        return f"{self.name} (ID: {self.table_id})"

class GameSessions(models.Model):
    class GameStatus(models.TextChoices):
        WAITING = 'WAITING', 'Waiting for opponent'
        IN_PROGRESS = 'IN_PROGRESS', 'Game in progress'
        PAUSED = 'PAUSED', 'Game paused'
        FINISHED = 'FINISHED', 'Game finished'

    gameSession_id = models.AutoField(primary_key=True)
    # Player information
    player1_id = models.IntegerField()
    player2_id = models.IntegerField(null=True)
    winner_id = models.IntegerField(null=True)
    loser_id = models.IntegerField(null=True)
    
    # Score tracking
    score_player1 = models.IntegerField(default=0)
    score_player2 = models.IntegerField(default=0)
    
    # Time tracking
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True)
    
    # Game configuration
    mode_id = models.ForeignKey(GameMode, on_delete=models.CASCADE)
    gameTable_id = models.ForeignKey(GameTable, on_delete=models.CASCADE)
    
    # Game state
    is_paused = models.BooleanField(default=False)
    paused_time = models.IntegerField(null=True)
    status = models.CharField(
        max_length=20,
        choices=GameStatus.choices,
        default=GameStatus.WAITING
    )

    class Meta:
        db_table = 'GameSessions'

    def __str__(self):
        return f"Game {self.gameSession_id} - {self.get_status_display()}"

    def update_score(self, player1_scored=False, player2_scored=False):
        if player1_scored:
            self.score_player1 += 1
        if player2_scored:
            self.score_player2 += 1
        self.save()

    def end_game(self):
        from django.utils import timezone
        self.end_time = timezone.now()
        self.status = self.GameStatus.FINISHED
        # Determine winner
        if self.score_player1 > self.score_player2:
            self.winner_id = self.player1_id
            self.loser_id = self.player2_id
        elif self.score_player2 > self.score_player1:
            self.winner_id = self.player2_id
            self.loser_id = self.player1_id
        self.save()

    def toggle_pause(self):
        self.is_paused = not self.is_paused
        if self.is_paused:
            self.status = self.GameStatus.PAUSED
            from django.utils import timezone
            self.paused_time = int(timezone.now().timestamp())
        else:
            self.status = self.GameStatus.IN_PROGRESS
            self.paused_time = None
        self.save()