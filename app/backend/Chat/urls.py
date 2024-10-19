from . import views
from django.urls import path

# /api/chat/
urlpatterns = [
    path('', views.ConversationsList, name='chat-conversations'),
    path('<int:conversation_id>/<int:user_id>/', views.getUserinfos, name=''),
    # path("", views.room, name="room"),
]