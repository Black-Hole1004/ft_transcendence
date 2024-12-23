from django.contrib import admin
from django.urls import path, include
from UserManagement import views

from UserManagement.views import UserProfileView
from UserManagement.views import UserListView
from UserManagement.views import SendFriendRequestView
from UserManagement.views import AcceptFriendRequestView
from UserManagement.views import CancelFriendRequestView
from UserManagement.views import UserStatusView
from UserManagement.views import FriendShipRequestListView
from UserManagement.views import RegisterView
from UserManagement.views import LoginView
from UserManagement.views import LogoutView
from UserManagement.views import TournamentView
from UserManagement.views import TournamentDetailView
from UserManagement.views import UsersListView
from UserManagement.views import HealthCheckView

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# from UserManagement.views import UserUpdateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


urlpatterns = [
    # admin/
    path('admin/', admin.site.urls),
    path('', views.getRoutes),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/display_text/', views.display_text, name='display-text'),
    path('api/user/', UserProfileView.as_view(), name='user-profile'),
    path('api/decode_jwt/', views.decode_jwt, name='decode_jwt'),
    path('social-auth/', include('social_django.urls', namespace='social')),
    # added by tabi3a : check user existence
    path('api/check-user/', views.check_user_exists, name='check-user'),
    
    path('api/game/', include('game.urls')),
    path('api/user/', include('UserManagement.urls')),
    
    path('api/check_password/', views.check_user_password, name='check_user_password'),
    path('api/time-spent/', views.get_user_time_spent, name='time_spent'),
    path('api/logout/', views.LogoutView.as_view(), name='logout'),
    path('api/chat/', include('Chat.urls')),
    path('chat/', include('Chat.urls')),
    path('api/users/', UserListView.as_view(), name='user-list'),
    path('api/userss/', UsersListView.as_view(), name='users-list'),
    path('api/user/status/', UserStatusView.as_view(), name='user_status'),
    path('api/send_friend_request/', SendFriendRequestView.as_view(), name='send_friend_request'),
    path('api/friend_request/accept/<int:friend_request_id>/', AcceptFriendRequestView.as_view(), name='accept-friend-request'),
    path('api/friend_request/cancel/<int:friend_request_id>/', CancelFriendRequestView.as_view(), name='cancel-friend-request'),
    path('api/friend_ship_request/', FriendShipRequestListView.as_view(), name='friend_ship_request'),
    path('api/tournament/', TournamentView.as_view(), name='tournament-list'),
    path('api/tournament/<int:id>/', TournamentDetailView.as_view(), name='tournament-detail'),
    path('api/health/', HealthCheckView.as_view(), name='healthCheck'),    
]

# Add this to serve badges specifically
if settings.DEBUG:  # Serve only in development mode
    urlpatterns += static(settings.BADGES_URL, document_root=settings.BADGES_DIR)