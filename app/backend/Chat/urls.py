from . import views
from django.urls import path

# /api/chat/
urlpatterns = [
    path('', views.ConversationsList, name='chat-conversations'),
    path('<str:conversation_key>/', views.getUserInfos, name=''),
    path('search/<str:user>/', views.getSearchedUsers, name=''),
]