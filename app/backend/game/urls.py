# description: This file contains the URL patterns for the game app
# path : app/backend/game/urls.py
from django.urls import path
from . import views

urlpatterns = [
    
    # Game setup endpoints
    
    # Game session management
    path('create/', views.create_game, name='create_game'),
    path('join/<int:game_id>/', views.join_game, name='join_game'),
    path('update/<int:game_id>/', views.update_game_state, name='update_game'),
    path('end/<int:game_id>/', views.end_game, name='end_game'),
    path('disconnect/<int:game_id>/', views.handle_disconnect, name='disconnect'),
    
    # Game queries
    path('history/', views.get_game_history, name='game_history'),
]