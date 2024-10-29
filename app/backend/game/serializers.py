# backend/game/serializers.py
from rest_framework import serializers
from .models import GameSessions, GameMode, GameTable

class GameModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameMode
        fields = '__all__'

class GameTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameTable
        fields = '__all__'

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSessions
        fields = '__all__'
