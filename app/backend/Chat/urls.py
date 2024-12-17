from . import views
from django.urls import path

# /api/chat/
urlpatterns = [
    path('search/<str:user>/', views.getSearchedUsers, name=''),
    path('', views.ConversationsList, name='chat-conversations'),
    path('<str:conversation_key>/', views.getUserInfos, name=''),
    path('status/<str:conversation_key>/', views.getFriendshipStatus, name=''),
    # path('update_status/<str:conversation_key>/', views.update_conversation_status, name='update_conversation_status'),
]