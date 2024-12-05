from django.urls import re_path, path
from .consumers import  FriendRequestConsumer, AcceptFriendRequestConsumer, NotificationConsumer
from . import consumers

websocket_urlpatterns = [
    # re_path(r'ws/notification/', consumers.NotificationConsumer.as_asgi()),
    # re_path(r'ws/update_user_status/', consumers.AcceptFriendRequestConsumer.as_asgi()),
    # re_path(r'ws/friend_request/', consumers.FriendRequestConsumer.as_asgi()),
]
