from django.contrib import admin
from .models import Conversation, Message

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user1_id', 'user2_id', 'last_message_id', 'is_blocked')

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'conversation_id', 'sender_id', 'sent_datetime', 'status')
