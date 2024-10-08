from django.db import models
from UserManagement.models import User

class Message(models.Model):

    status_choices = [
        ('sent', 'Sent'),
        ('delivered', 'Delivered'),
        ('read', 'Read'),
    ]

    conversation_id = models.ForeignKey('Conversation', on_delete=models.CASCADE, related_name='messages')
    sender_id = models.ForeignKey(User, on_delete=models.CASCADE)
    sent_datetime = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    status = models.CharField(max_length=10, choices=status_choices, default='sent')

    def __str__(self):
        return f"Message {self.message_id} from {self.sender.username}: {self.content}"

class Conversation(models.Model):

    conversation_key = models.CharField(max_length=100, unique=True)
    last_message_id = models.ForeignKey('Message', on_delete=models.SET_NULL, null=True, related_name='last_message')
    is_blocked = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Conversation {self.conversation_id}: {self.conversation_key}"