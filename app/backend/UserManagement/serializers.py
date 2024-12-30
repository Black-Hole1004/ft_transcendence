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

from .models import FriendShip
from .models import FriendShipRequest

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=False, min_length=8)
    profile_picture = serializers.ImageField(required=False)
    is_friend = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'mobile_number', 'is_logged_with_oauth', 'is_friend', 'status',
                'username', 'display_name','bio', 'password' ,'new_password', 'confirm_password', 'profile_picture'
            ]
        read_only_fields = ['id', 'email']
    
    def get_is_friend(self, obj):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
        # Check both directions of the friendship
            is_friend_from = FriendShip.objects.filter(user_from=request.user, user_to=obj).exists()
            is_friend_to = FriendShip.objects.filter(user_from=obj, user_to=request.user).exists()
            return is_friend_from or is_friend_to
        return False
    
class UserSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSession
        fields = ['user', 'login_time', 'logout_time', 'duration']

# ----------------------------------------------------------------------------------

class FriendRequestSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user_from.username', read_only=True)
    profile_picture = serializers.SerializerMethodField()
    # user_to_profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = FriendShipRequest
        fields = ['id', 'user_from', 'user_to', 'status', 'created_at', 'profile_picture', 'username']
        read_only_fields = ['id', 'user_from', 'created_at']

    def get_profile_picture(self, obj):
        request = self.context.get('request')
        if obj.user_from.profile_picture:
            return request.build_absolute_uri(obj.user_from.profile_picture.url) if request else obj.user_from.profile_picture.url
        return None

class HealthCheckSerializer(serializers.Serializer):
    status = serializers.CharField()
    timestamp = serializers.DateTimeField()
    environment = serializers.CharField()
    services = serializers.DictField()
    system = serializers.DictField()
