from django.urls import re_path, path
from .consumers import  FriendRequestConsumer, UserStatusConsumer
from . import consumers

websocket_urlpatterns = [
    path('ws/user_status/', UserStatusConsumer.as_asgi()),
    re_path(r'ws/friend_request/$', consumers.FriendRequestConsumer.as_asgi()),
]