# # routing.py
# from django.core.asgi import get_asgi_application
# from django.urls import re_path
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# import pong_game.routing  # Import routing from pong_game

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),  # For handling standard HTTP requests
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             pong_game.routing.websocket_urlpatterns  # WebSocket URLs
#         )
#     ),
# })
