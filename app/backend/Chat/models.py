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
    status = models.CharField(max_length=10, choices=status_choices, default='sent') # remove

    class Meta:
        indexes = [
            models.Index(fields=['conversation_id']),
        ]

    def __str__(self):
        return f"Message {self.id} from {self.sender_id.username}: {self.content}"

class Conversation(models.Model):
    conversation_key = models.CharField(max_length=20, default='0_0')
    user1_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user1', default=1)
    user2_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user2', default=2)
    last_message = models.ForeignKey('Message', on_delete=models.SET_NULL, null=True, related_name='last_message')
    blocked_by = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"Conversation_id: {self.id}, between: {self.user1_id.username} and {self.user2_id.username}"


class BlockedUser(models.Model):
    blocker = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='blocking'
    )
    blocked = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='blocked_by'
    )
    blocked_at = models.DateTimeField(auto_now_add=True)
    reason = models.TextField(null=True, blank=True)

    class Meta:
        unique_together = ('blocker', 'blocked')
        indexes = [
            models.Index(fields=['blocker']),
            models.Index(fields=['blocked']),
        ]

    def __str__(self):
        return f"{self.blocker.username} blocked {self.blocked.username}"
    
    @classmethod
    def is_blocked(cls, user1, user2):
        """Check if either user has blocked the other"""
        return cls.objects.filter(
            models.Q(blocker=user1, blocked=user2) | 
            models.Q(blocker=user2, blocked=user1)
        ).exists()

    @classmethod
    def get_blocked_users(cls, user):
        """Get all users blocked by the given user"""
        return User.objects.filter(
            blocked_by__blocker=user
        )

    @classmethod
    def get_blocking_users(cls, user):
        """Get all users who have blocked the given user"""
        return User.objects.filter(
            blocking__blocked=user
        )