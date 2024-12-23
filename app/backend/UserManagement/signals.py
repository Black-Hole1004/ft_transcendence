
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.utils import timezone
from .models import UserSession
from asgiref.sync import sync_to_async
from django.utils.timezone import now

@receiver(user_logged_in)
def log_user_login(sender, request, user, **kwargs):
    """
    Log user login details when a user logs in.
    """
    # print(f"User logged in via OAuth: {user.email}")
    if user.is_authenticated:
        print('------ User logged in --------')
        update_user_session_login(user, login_time=now())

@sync_to_async
def update_user_session_login(user):
    # Create or update the user session
    print('----------------------------------------')
    UserSession.objects.create(user=user)

@receiver(user_logged_out)
def log_user_logout(sender, request, user, **kwargs):
    """
    Log user logout details when a user logs out.
    """
    # print(f"User logged out: {user.email}")
    if user.is_authenticated:
        print('------ User logged out --------')
        update_user_session(user)

@sync_to_async
def update_user_session(user):
    user_session = UserSession.objects.filter(user=user).latest('login_time')
    user_session.logout_time = now()
    user_session.save()