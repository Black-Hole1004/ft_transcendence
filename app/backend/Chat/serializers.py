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
        fields = ['sender_id', 'sent_datetime', 'content', 'status']

class ConversationSerializer(serializers.ModelSerializer):
    other_user = serializers.SerializerMethodField()
    last_message_id = MessageSerializer()

    class Meta:
        model = Conversation
        fields = ['id', 'other_user', 'last_message_id', 'is_blocked']
    
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
        fields = ['first_name', 'last_name', 'username', 'bio', 'is_active', 'profile_picture']