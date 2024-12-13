from django.urls import re_path, path
from .consumers import  FriendRequestConsumer, AcceptFriendRequestConsumer, NotificationConsumer, TournamentConsumer
from . import consumers



websocket_urlpatterns = [
    re_path(r'ws/notify/', consumers.NotificationConsumer.as_asgi()),
    re_path(r'ws/friends/', consumers.AcceptFriendRequestConsumer.as_asgi()),
    re_path(r'ws/notifications/', consumers.FriendRequestConsumer.as_asgi()),re_path(r'ws/tournament/(?P<tournament_id>\w+)/$', consumers.TournamentConsumer.as_asgi()),
]