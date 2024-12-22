# description: This file contains the URL patterns for the game app
# path : app/backend/game/urls.py
from django.urls import path
from . import views

urlpatterns = [
    
    # # Game queries
    # path('history/', views.get_game_history, name='game_history'),
    
    # # Game actions for debugging purposes
    # path('debug/game/<int:game_id>/', views.check_game_session, name='check_game'),
    # path('debug/active-games/', views.list_active_games, name='list_active_games'),
]