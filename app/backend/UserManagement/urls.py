# app/backend/user/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('profile/stats/', views.get_profile_stats, name='profile-stats'),
]