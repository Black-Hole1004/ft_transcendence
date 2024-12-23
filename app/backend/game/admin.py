# game/admin.py
from django.contrib import admin
from .models import GameSessions

admin.site.register(GameSessions)

# @admin.register(GameSessions)
class GameSessionAdmin(admin.ModelAdmin):
    list_display = ('game_id', 'status', 'player1', 'player2', 'start_time', 'is_paused')
    list_filter = ('status', 'is_paused', 'start_time')
    search_fields = ('game_id', 'player1__username', 'player2__username')
    readonly_fields = ('start_time', 'end_time')
    
    fieldsets = (
        ('Game Info', {
            'fields': ('game_id', 'status', 'background_id')
        }),
        ('Players', {
            'fields': ('player1', 'player2', 'winner', 'loser')
        }),
        ('Game State', {
            'fields': ('score_player1', 'score_player2', 'is_paused', 'player1_ready', 'player2_ready')
        }),
        ('Timing', {
            'fields': ('start_time', 'end_time')
        }),
    )