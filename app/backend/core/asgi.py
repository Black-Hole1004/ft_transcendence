from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from UserManagement.routing import websocket_urlpatterns
from Chat.routing import websocket_urlpatterns as chat_urls
from django.core.asgi import get_asgi_application

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(  # This ensures authentication is handled for WebSockets
        URLRouter(
            websocket_urlpatterns + chat_urls
        )
    ),
})