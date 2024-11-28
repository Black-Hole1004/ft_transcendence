from django.urls import re_path, path
from .consumers import  FriendRequestConsumer, UserStatusConsumer
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/user_status/', consumers.UserStatusConsumer.as_asgi()),
    re_path(r'ws/friend_request/$', consumers.FriendRequestConsumer.as_asgi()),
]