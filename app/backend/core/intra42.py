from UserManagement.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from social_core.backends.oauth import BaseOAuth2
from django.http import JsonResponse
from django.http import HttpResponse
from django.http import HttpResponseRedirect
import requests
from django.utils.crypto import get_random_string
from django.core.files.base import ContentFile
from django.contrib.auth import login
from UserManagement.profile_utils import notify_friends
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from UserManagement.models import FriendShip
from channels.db import database_sync_to_async
import os
from core.settings import HOSTNAME

class Intra42OAuth2(BaseOAuth2):
    
    """Intra42 OAuth2 authentication backend"""
    name = 'intra42'
    AUTHORIZATION_URL = 'https://api.intra.42.fr/v2/oauth/authorize'
    ACCESS_TOKEN_URL = 'https://api.intra.42.fr/oauth/token'
    USER_DATA_URL = 'https://api.intra.42.fr/v2/me'
    REDIRECT_STATE = False
    EXTRA_DATA = [
        ('id', 'id'),
        ('email', 'email'),
        ('login', 'username'),
        ('displayname', 'name'),
        ('image_url', 'profile_image_url'),
    ]

    def get_user_details(self, response):
        """Return user details from Intra42 account"""
        return {
            'username': response.get('login'),
            'email': response.get('email') or '',
            'first_name': response.get('first_name'),
            'last_name': response.get('last_name'),
            'profile_image_url': response.get('image').get('link'),
        }

    def user_data(self, access_token, *args, **kwargs):
        """Load user data from service using Bearer token authentication"""
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        response = requests.get(self.USER_DATA_URL, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()

    def request_access_token(self, code):
        """
        Exchange the authorization code for an access token by sending a POST request
        to Intra42's token endpoint with the required parameters.
        """
        data = {
            'grant_type': 'authorization_code',
            'client_id': self.setting('SOCIAL_AUTH_INTRA42_KEY'),
            'client_secret': self.setting('SOCIAL_AUTH_INTRA42_SECRET'),
            'code': code,
            'redirect_uri': self.get_redirect_uri(),
        }
        response = requests.post(self.ACCESS_TOKEN_URL, data=data)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Failed to obtain access token: {response.status_code}, {response.text}")

    def auth_complete(self, *args, **kwargs):
        """
        Complete the OAuth2 authorization process by exchanging the authorization
        code for an access token, then fetching user data.
        """

        request = kwargs.get('request')
        if not request:
            raise Exception("Request object not found.")
        code = self.data.get('code')
        if not code:
            raise Exception("Authorization code not found.")

        token_data = self.request_access_token(code)
        access_token = token_data['access_token']
        user_data = self.user_data(access_token)

        user_details = self.get_user_details(user_data)
        user, created = User.objects.get_or_create(
        email=user_details['email'],
        defaults={
            'email': user_details['email'],
            'username': user_details['username'],
            'first_name': user_details['first_name'],
            }
        )

        if user:
            profile_image_url = user_details.get('profile_image_url')
            if profile_image_url and not user.has_custom_profile_picture:
                try:
                    image_response = requests.get(profile_image_url)
                    if image_response.status_code == 200:
                        if user.profile_picture and 'avatar.jpg' not in user.profile_picture.name:
                            if os.path.isfile(user.profile_picture.path):
                                os.remove(user.profile_picture.path)
                        
                        # Save new profile picture
                        user.profile_picture.save(
                            f"{user.username}_profile.jpg",
                            ContentFile(image_response.content),
                            save=True
                        )
                except Exception as e:
                    print(f'Error updating profile picture: {e}')

            user.is_logged_with_oauth = True
            user.is_logged_with_oauth_for_2fa = True
            user.status = 'online'
            user.save()
            friends = async_to_sync(self.get_user_friends)(user)
            notify_friends(user, friends)
            login(request, user, backend='Intra42OAuth2')
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            redirect_url = f"https://{HOSTNAME}/dashboard?access_token={access_token}&refresh_token={refresh_token}"
            return HttpResponseRedirect(redirect_url)

        else:
            return JsonResponse({'error': 'User authentication failed'}, status=401)

    def get_redirect_uri(self, state=None):
        """Returns the redirect URI to be passed in the token exchange request"""
        return self.setting('REDIRECT_URI') 

    @database_sync_to_async
    def get_user_friends(self, user):
        friends_from = list(FriendShip.objects.filter(user_from=user).values_list('user_to', flat=True))
        friends_to = list(FriendShip.objects.filter(user_to=user).values_list('user_from', flat=True))
        friends = list(set(friends_from + friends_to))
        return friends
    
