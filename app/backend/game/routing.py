# routing.py
from django.urls import re_path
from .consumers import GameConsumer
from .matchmaking import MatchmakingConsumer
from channels.routing import URLRouter
from channels.auth import AuthMiddlewareStack

websocket_urlpatterns = [
    re_path(r"ws/game/(?P<game_id>\w+)/$", GameConsumer.as_asgi(), name="game-socket"),
    re_path(r"ws/matchmaking/$", MatchmakingConsumer.as_asgi(), name="matchmaking-socket"),
]

