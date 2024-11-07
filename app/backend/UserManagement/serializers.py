from rest_framework import serializers
from .models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model


User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=False, min_length=8)
    profile_picture = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'mobile_number',
                'username', 'display_name','bio', 'password' ,'new_password', 'confirm_password', 'profile_picture'
            ]
        read_only_fields = ['id', 'email']
        def update(self, instance, validated_data):
            # Handle profile picture update
            if 'profile_picture' in self.context.get('request').FILES:
                instance.profile_picture = self.context.get('request').FILES['profile_picture']

            return super().update(instance, validated_data)
        
        # def validate_mobile_number(self, value):
        # # Example: Check if mobile number is already used by another user
        #     if User.objects.filter(mobile_number=value).exists():
        #         raise serializers.ValidationError("This mobile number is already registered.")
        #     return value

# ----------------------------------------------------------------------------------