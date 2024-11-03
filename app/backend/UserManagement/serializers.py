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
    
    def validate(self, data):

        password = data.get('password')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')

        print('password =>', password)
        print('new_password =>', new_password)
        print('confirm_password =>', confirm_password)

        ## Validate the current password
        if new_password or confirm_password:
            print('testtest')
            user = self.context['request'].user
            if not user.check_password(password):
                raise serializers.ValidationError({'current_password': 'Current password is incorrect.'})
        
            # Check if the new password is different from the current password
            if password == new_password:
                raise serializers.ValidationError({'new_password': 'New password must be different from the current password.'})

            # Confirm the new password matches
            if new_password != confirm_password:
                raise serializers.ValidationError({'error': 'New password and confirm password do not match.'})
        return data


# ----------------------------------------------------------------------------------