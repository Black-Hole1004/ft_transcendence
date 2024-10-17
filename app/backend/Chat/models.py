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

    class Meta:
        indexes = [
            models.Index(fields=['conversation_id']),
        ]

    def __str__(self):
        return f"Message {self.id} from {self.sender_id.username}: {self.content}"

class Conversation(models.Model):
    user1_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user1', default=1)
    user2_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user2', default=2)
    last_message_id = models.ForeignKey('Message', on_delete=models.SET_NULL, null=True, related_name='last_message')
    is_blocked = models.BooleanField(default=False)

    def __str__(self):
        return f"Conversation_id: {self.id}, between: {self.user1_id.username} and {self.user2_id.username}"