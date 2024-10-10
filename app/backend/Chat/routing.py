from django.urls import path, re_path
from . import consumers

websocket_urlpatterns = [
    path('ws/chat/<str:conversation_key>/', consumers.ChatConsumer.as_asgi()),
]
