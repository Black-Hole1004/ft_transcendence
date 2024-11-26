from rest_framework import serializers
from .models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from .models import UserSession
from rest_framework.response import Response

from .profile_utils import (
    handle_password_change,
    remove_profile_picture,
    update_profile_picture,
    generate_new_tokens
)

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=False, min_length=8)
    profile_picture = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'mobile_number', 'is_logged_with_oauth', 'status',
                'username', 'display_name','bio', 'password' ,'new_password', 'confirm_password', 'profile_picture'
            ]
        read_only_fields = ['id', 'email']
    
class UserSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSession
        fields = ['user', 'login_time', 'logout_time', 'duration']

# ----------------------------------------------------------------------------------