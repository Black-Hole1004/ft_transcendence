# description: This file is used to serialize the data from the database to JSON format.
# path app/backend/game/serializers.py
from rest_framework import serializers
from .models import GameSessions
from .models import GameInvitations

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSessions
        fields = '__all__'

class GameInvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameInvitations
        fields = '__all__'
