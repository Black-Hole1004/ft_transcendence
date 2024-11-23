from . import views
from django.urls import path

# /api/chat/
urlpatterns = [
    path('', views.ConversationsList, name='chat-conversations'),
    path('<str:conversation_key>/<int:user_id>/', views.getUserinfos, name=''),
    path('<str:user>/', views.getSearchedUsers, name=''),
]