# app/backend/user/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('profile/stats/', views.get_current_profile_stats, name='profile-stats'), # for current logged in user
    path('leaderboard/', views.get_leaderboard, name='leaderboard'),
    path('achievements/', views.get_achievements, name='achievements'),
    path('me/', views.get_user_data, name='user_data'),
    path('profile/stats/<str:username>/', views.get_profile_stats, name='profile-stats'), # for other users
]