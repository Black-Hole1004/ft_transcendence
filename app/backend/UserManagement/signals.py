
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.utils import timezone
from .models import UserSession
from asgiref.sync import sync_to_async
from django.utils.timezone import now

@receiver(user_logged_in)
def log_user_login(sender, request, user, **kwargs):
    print(f"User logged in: {user.email}")
    print(" ---------------> from signal of user_logged_in <------------------")
    if user.is_authenticated:
        print('------ User logged in --------')
        try:
            print(f"Creating session for {user.email}")
            session = UserSession.objects.create(user=user, login_time=now())
            print(f"Session successfully created: {session}")
        except Exception as e:
            print(f"Failed to create session: {e}")

@receiver(user_logged_out)
def log_user_logout(sender, request, user, **kwargs):
    print(f"User logged out: {user.email}")
    print(" ---------------> from signal of user_logged_out <------------------")
    if user.is_authenticated:
        print('------ User logged out --------')
        try:
            user_session = UserSession.objects.filter(user=user).latest('login_time')
            user_session.logout_time = now()
            user_session.save()
        except UserSession.DoesNotExist:
            print(f"No active session found for user {user}")
        except Exception as e:
            print(f"Error updating session: {e}")