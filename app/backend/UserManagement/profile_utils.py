import os
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def remove_profile_picture(user):
    """Remove the profile picture of the user."""
    if user.profile_picture and 'avatar' not in user.profile_picture.name:
        if os.path.isfile(user.profile_picture.path):
            os.remove(user.profile_picture.path)
    user.profile_picture = 'profile_pictures/avatar.jpg'
    # user.is_custom_profile_picture = False
    user.save()

def update_profile_picture(user, profile_picture):
    """Update the user's profile picture."""
    if profile_picture:
        if user.profile_picture and 'avatar.jpg' not in user.profile_picture.name:
            if os.path.isfile(user.profile_picture.path):
                os.remove(user.profile_picture.path)
        user.profile_picture = profile_picture
        # user.is_custom_profile_picture = True
        user.save()
        

def handle_password_change(user, user_data):
    """Handle password change for the user."""
    password = user_data.get('password')
    new_password = user_data.get('new_password')
    confirm_password = user_data.get('confirm_password')

    if user.is_logged_with_oauth and any([password, new_password, confirm_password]):
        print('User is logged with OAuth')
        if all ([new_password, confirm_password]) and new_password == confirm_password and new_password != password:
            user.set_password(new_password)
            user.is_logged_with_oauth = False
            print(f'--->> user:---------> {user}')
            user.save()
        else:
            return Response(
                {'error': 'Please provide the new password and confirm password. The new password and confirm password must match and be different from the current password.'},
                status=status.HTTP_400_BAD_REQUEST
            )
    elif any([password, new_password, confirm_password]):
        if not user.is_logged_with_oauth:
            if not all ([password, new_password, confirm_password]):
                return Response(
                    {'error': 'All password fields (password, new_password, confirm_password) are required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if not user.check_password(password):
                return Response(
                    {'error': 'The current password is incorrect.'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            if new_password != confirm_password:
                return Response(
                    {'error': 'The new password and confirm password do not match.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if new_password == password:
                return Response(
                    {'error': 'The new password must be different from the current password.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            user.set_password(new_password)
            user.save()

    return True

def generate_new_tokens(user):
    """Generate new tokens for the user."""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }

def notify_friends(user, friends):
    """
    Notify all friends of the user about the user's status.

    Args:
        user: The user whose status has changed.
        friends: A list of friend IDs to notify.
    """
    channel_layer = get_channel_layer()
    for friend_id in friends:
        async_to_sync(channel_layer.group_send)(
            f"user_{friend_id}",
            {
                "type": "notification_message",
                "message": user.status,  # Replace with the actual status field or logic
            }
        )