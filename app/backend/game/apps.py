# description: This file is used to configure the game app.
# path app/backend/game/apps.py
from django.apps import AppConfig


class GameConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'game'
