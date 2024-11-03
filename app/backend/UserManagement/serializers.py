from rest_framework import serializers
from .models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=False, min_length=8)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'mobile_number',
                'username', 'display_name','bio', 'password' ,'new_password', 'confirm_password'
            ]
        # extra_kwargs = {
        #     'profile_picture': {'required': False}
        # }

################## for tommorow    ###############
# def validate(self, data):
#     user = self.context['request'].user  # Get the authenticated user
#     password = data.get('password')
#     new_password = data.get('new_password')
#     confirm_password = data.get('confirm_password')
#     # If changing password, perform necessary validations
#     if new_password or confirm_password:
#         # Check if current password is provided
#         if not password:
#             raise serializers.ValidationError({'error': 'Current password is required to change password.'})
#         # Check if the current password is correct
#         if not user.check_password(password):
#             raise serializers.ValidationError({'error': 'Current password is incorrect.'})
#         # Check if new password is different from the current password
#         if password == new_password:
#             raise serializers.ValidationError({'error': 'New password must be different from the current password.'})
#         # Check if new password matches the confirmation
#         if new_password != confirm_password:
#             raise serializers.ValidationError({'error': 'New password and confirm password do not match.'})
#     return data
# ----------------------------------------------------------------------------------