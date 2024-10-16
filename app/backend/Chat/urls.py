from . import views
from django.urls import path

# /api/chat/
urlpatterns = [
    path('', views.ConversationsList, name='chat-conversations'),
    path('<int:user_id>/', views.getUserinfos, name=''),
]