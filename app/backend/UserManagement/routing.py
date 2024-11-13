from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/notification/', consumers.NotificationConsumer.as_asgi()),
    path('ws/user_status/', consumers.UserStatusConsumer.as_asgi()),
]