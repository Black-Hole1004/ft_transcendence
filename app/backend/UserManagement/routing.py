from django.urls import path, re_path
from . import consumers
from .consumers import UserStatusConsumer
websocket_urlpatterns = [
    re_path(r'ws/friend_request/$', consumers.FriendRequestConsumer.as_asgi()),
]