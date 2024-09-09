from django.urls import path, include
from UserManagement import views

from UserManagement.views import UserProfileView
# from UserManagement.views import UserUpdateView


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


urlpatterns = [
    # admin/
    # path('admin/', admin.site.urls),
    path('', views.getRoutes),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/login/', views.login, name='login'),
    path('api/register/', views.register, name='register'),
    path('api/display_text/', views.display_text, name='display-text'),
    path('api/users/', UserProfileView.as_view(), name='user-profile'),
    path('api/decode_jwt/', views.decode_jwt, name='decode_jwt'),
]