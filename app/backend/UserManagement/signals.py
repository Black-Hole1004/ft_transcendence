
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.utils import timezone
from .models import UserSession

from channels.layers import get_channel_layer

def notify_online(user):
    channel_layer = get_channel_layer()
    channel_layer.group_send(
        f"user_{user.id}",
        {
            "type": "status_update",
            "status": "online"
        }
    )

def notify_offline(user):
    channel_layer = get_channel_layer()
    channel_layer.group_send(
        f"user_{user.id}",
        {
            "type": "status_update",
            "status": "offline"
        }
    )
    print(f"User ===> {user.email} is offline")

@receiver(user_logged_in)
def log_user_login(sender, request, user, **kwargs):
    """
    Log user login details when a user logs in.
    """
    print(f"User logged in via OAuth: {user.email}")
    if user.is_authenticated:
        print('------ User logged in --------')
        UserSession.objects.create(user=user)
        
        # Notify user is online
        notify_online(user)


@receiver(user_logged_out)
def log_user_logout(sender, request, user, **kwargs):
    """
    Log user logout details when a user logs out.
    """
    print(f"User logged out: {user.email}")
    if user.is_authenticated:
        print('------ User logged out --------')
        user_session = UserSession.objects.filter(user=user).latest('login_time')
        user_session.logout_time = timezone.now()
        user_session.save()

        # Notify user is offline
        notify_offline(user)