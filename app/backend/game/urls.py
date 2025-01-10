# description: This file contains the URL patterns for the game app
# path : app/backend/game/urls.py
from django.urls import path
from . import views

urlpatterns = [

    path('pending-game-invites/', views.get_pending_game_invites, name='pending-game-invites'),
]