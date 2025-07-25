from django.contrib import admin
from .models import Conversation, Message, BlockedUser


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ('id', 'conversation_key', 'user1_id', 'user2_id', 'last_message', 'blocked_by')

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'conversation_id', 'sender_id', 'sent_datetime')

@admin.register(BlockedUser)
class BlockedUserAdmin(admin.ModelAdmin):
    list_display = ('blocker', 'blocked', 'blocked_at', 'reason')
