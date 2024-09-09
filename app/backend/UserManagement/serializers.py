from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'mobile_number', 'username', 'display_name','bio', 'profile_picture']
        extra_kwargs = {
            'profile_picture': {'required': False}
        }

# ----------------------------------------------------------------------------------