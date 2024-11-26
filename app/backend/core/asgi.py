"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from .middleware import JwtCookieMiddleware

# Import WebSocket routing from different apps
from game import routing as game_routing
from Chat.routing import websocket_urlpatterns as chat_routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Merged WebSocket URL patterns from 'game' and 'Chat' apps
websocket_urlpatterns = game_routing.websocket_urlpatterns + chat_routing

# Application setup
application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AllowedHostsOriginValidator(
            # Add middleware to authenticate users using JWT cookie when connecting to the WebSocket
            # that will be used by the consumers to access the user object
            JwtCookieMiddleware(
                URLRouter(websocket_urlpatterns)
            )
        ),
    }
)
