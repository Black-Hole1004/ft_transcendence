from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login as auth_login
from social_core.backends.google import GoogleOAuth2
from django.http import HttpResponseRedirect
import requests
from django.core.files.base import ContentFile
import random
import string
from UserManagement.profile_utils import notify_friends
from UserManagement.models import User
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from UserManagement.models import FriendShip
from channels.db import database_sync_to_async
from core.settings import HOSTNAME
from UserManagement.views import generate_random_username, Twofa
from datetime import datetime, timedelta, timezone
import os



class CustomGoogleOAuth2(GoogleOAuth2):
    """
    Custom Google OAuth2 backend that preserves user customizations
    """
    
    ESSENTIAL_FIELDS = {
        'email'  # Email is essential as it's the primary identifier
    }
    
    CUSTOMIZABLE_FIELDS = {
        'username': 'has_custom_username',
        'profile_picture': 'has_custom_profile_picture',
        'first_name': None,
        'last_name': None,
        'bio': None,
        'mobile_number': None,
    }

    def auth_complete(self, *args, **kwargs):
        """Complete the OAuth2 process and handle user data updates"""
        try:
            user = super().auth_complete(*args, **kwargs)
        except Exception as e:
            if 'duplicate key value violates unique constraint' in str(e):
                return JsonResponse({'error': 'Email already in use'}, status=401)
            return JsonResponse({'error': f'Authentication failed !'}, status=401)
        try:
            if user:
                try:
                    # Get Google data
                    google_data = user.social_auth.get(provider='google-oauth2')
                    extra_data = google_data.extra_data
                    access_token = extra_data.get('access_token')

                    # Get fresh user info from Google
                    profile_url = 'https://www.googleapis.com/oauth2/v3/userinfo'
                    response = requests.get(profile_url, headers={'Authorization': f'Bearer {access_token}'})

                    if response.status_code != 200:
                        return JsonResponse({'error': 'Failed to retrieve user information'}, status=401)

                    user_data = response.json()

                    # Update user fields based on customization status
                    self.update_user_fields(user, user_data)

                    # Always update essential fields
                    for field in self.ESSENTIAL_FIELDS:
                        if field in user_data:
                            setattr(user, field, user_data[field])

                    # Handle duplicate username case
                    if user_data.get('username') and User.objects.filter(username=user_data['username']).exclude(pk=user.pk).exists():
                        temp_username = generate_random_username().lower()
                        setattr(user, 'username', temp_username)

                    # Set OAuth flag and status
                    user.is_logged_with_oauth = True
                    user.is_logged_with_oauth_for_2fa = True
                    user.status = 'online'
                    user.save()

                    # Handle friends notification
                    friends = async_to_sync(self.get_user_friends)(user)
                    notify_friends(user, friends)

                    # Handle login and tokens
                    auth_login(self.strategy.request, user)
                    self.strategy.request.session.flush()

                    # Generate JWT tokens
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)
                    refresh_token = str(refresh)
                    redirect_url = (
                        f"https://{HOSTNAME}/dashboard?"
                        f"access_token={access_token}&"
                        f"refresh_token={refresh_token}"
                    )
                    now = datetime.now()
                    user_joined_datetime = datetime.combine(user.date_joined, datetime.min.time())

                    # Check if the user joined within the last 5 seconds
                    # if now - user_joined_datetime >= timedelta(seconds=5):
                    #     Twofa.sendMail(otp=0, email=user.email, username=user.username, type='accountCreated')
                    return HttpResponseRedirect(redirect_url)

                except Exception as e:
                    return JsonResponse({
                        'error': f'Authentication process failed: {str(e)}'
                    }, status=401)

            return JsonResponse({'error': 'User authentication failed'}, status=401)
        except Exception as e:
            return JsonResponse({'error': f'Authentication failed !'}, status=401)

    @database_sync_to_async
    def get_user_friends(self, user):
        """Get list of user's friends"""
        friends_from = list(FriendShip.objects.filter(user_from=user).values_list('user_to', flat=True))
        friends_to = list(FriendShip.objects.filter(user_to=user).values_list('user_from', flat=True))
        friends = list(set(friends_from + friends_to))
        return friends

    def update_user_fields(self, user, google_data):
        """Update user fields while respecting customizations"""
        google_field_mapping = {
            'given_name': 'first_name',
            'family_name': 'last_name',
            'picture': 'profile_picture',
            'email': 'email',
            'is_logged_with_oauth': 'is_logged_with_oauth',
        }

        max_lengths = {
            'username': 10,
            'first_name': 10,
            'last_name': 10,
        }


        for google_field, model_field in google_field_mapping.items():
            google_value = google_data.get(google_field)
            if not google_value:
                continue
                
            # Check if field is customizable
            custom_flag = self.CUSTOMIZABLE_FIELDS.get(model_field)
            
            # If field has a custom flag, check it
            if custom_flag:
                has_custom = getattr(user, custom_flag, False)
                if has_custom:
                    continue  # Skip update if user has customized this field
            
            # For fields without flags, only update if empty
            elif model_field in self.CUSTOMIZABLE_FIELDS:
                current_value = getattr(user, model_field, None)
                if current_value:  # Don't update if user has set a value
                    continue

            # Check for max length
            if model_field in max_lengths:
                max_length = max_lengths[model_field]
                google_value = google_value[:max_length]
            
            
            # Update the field if we haven't skipped it
            if model_field == 'profile_picture' and not user.has_custom_profile_picture:
                self.update_profile_picture(user, google_value)
            else:
                setattr(user, model_field, google_value)
            
        user.save()



    def update_profile_picture(self, user, picture_url):
        """Update profile picture if not customized"""
        try:
            image_response = requests.get(picture_url)
            if image_response.status_code == 200:
                if user.profile_picture and 'avatar.jpg' not in user.profile_picture.name:
                    if os.path.isfile(user.profile_picture.path):
                        os.remove(user.profile_picture.path)
                
                user.profile_picture.save(
                    f"{user.username}_profile.jpg",
                    ContentFile(image_response.content),
                    save=True
                )  
        except Exception as e:
            print('Error saving profile picture:', e)