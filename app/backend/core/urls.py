from django.urls import path
from UserManagement import views
from django.urls import include
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/login/', views.login, name='login'),
    path('api/register/', views.register, name='register'),
    path('social-auth/', include('social_django.urls', namespace='social')),
    path('api/decode_jwt/', views.decode_jwt, name='decode_jwt'),
]