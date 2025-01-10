from django.contrib import admin
from .models import GameSessions, GameInvitations

@admin.register(GameSessions)
class GameSessionAdmin(admin.ModelAdmin):
    """Admin configuration for GameSessions model."""
    list_display = ('game_id', 'status', 'player1', 'player2', 'start_time', 'is_paused')
    list_filter = ('status', 'is_paused', 'start_time')
    search_fields = ('game_id', 'player1__username', 'player2__username')
    readonly_fields = ('start_time',) 
    
    fieldsets = (
        ('Game Info', {
            'fields': ('game_id', 'status') 
        }),
        ('Players', {
            'fields': ('player1', 'player2', 'winner', 'loser')
        }),
        ('Game State', {
            'fields': ('score_player1', 'score_player2', 'winner_score', 'loser_score', 'is_paused')
        }),
        ('XP Information', {
            'fields': ('player1_xp_gain', 'player2_xp_gain')
        }),
        ('Timing', {
            'fields': ('start_time',)
        }),
    )

@admin.register(GameInvitations)
class GameInvitationsAdmin(admin.ModelAdmin):
    """Admin configuration for GameInvitations model."""
    list_display = ['sender', 'receiver', 'status', 'created_at', 'updated_at']
    list_filter = ['status', 'created_at', 'updated_at']
    search_fields = ['sender__username', 'receiver__username']
    ordering = ['-created_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('sender', 'receiver')