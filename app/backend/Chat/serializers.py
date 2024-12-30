from UserManagement.models import User
from rest_framework import serializers
from Chat.models import Conversation, Message

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'profile_picture']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender_id', 'sent_datetime', 'content', 'status']

class ConversationSerializer(serializers.ModelSerializer):
    last_message = MessageSerializer()
    other_user = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'conversation_key', 'other_user', 'last_message', 'blocked_by']

    def get_other_user(self, obj):
        request = self.context.get('request')
        if request and request.user:
            current_user_id = request.user.id
            if obj.user1_id.id == current_user_id:
                return UserSerializer(obj.user2_id).data
            elif obj.user2_id.id == current_user_id:
                return UserSerializer(obj.user1_id).data
            return None


class UserInfosSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'bio', 'status', 'profile_picture']


class SearchResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'status', 'profile_picture']
