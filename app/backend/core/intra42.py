from UserManagement.views import login
from UserManagement.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from social_core.backends.oauth import BaseOAuth2
from django.http import JsonResponse
from django.http import HttpResponse
from django.http import HttpResponseRedirect
import requests
from django.utils.crypto import get_random_string
from django.core.files.base import ContentFile

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
    # def start(self):

    #     response = HttpResponse()

    #     response['Access-Control-Allow-Origin'] = '*'

    #     response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'

    #     response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'


    #     # Redirect the user to the authorization page

    #     response['Location'] = self.AUTHORIZATION_URL

    #     response.status_code = 302


    #     return response
    def get_user_details(self, response):
        """Return user details from Intra42 account"""
        return {
            'username': response.get('login'),
            'email': response.get('email') or '',
            'first_name': response.get('first_name'),
            'last_name': response.get('last_name'),
            'profile_image_url': response.get('image').get('link'),
            # add by me ahaloui
            'mobile_number': response.get('phone'),
        }

    def user_data(self, access_token, *args, **kwargs):
        """Load user data from service using Bearer token authentication"""
        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        response = requests.get(self.USER_DATA_URL, headers=headers)

        # Check if the response was successful
        if response.status_code == 200:
            return response.json()  # Parse JSON response and return user data
        else:
            # Handle errors by logging and raising exceptions as needed
            response.raise_for_status()

    def request_access_token(self, code):
        """
        Exchange the authorization code for an access token by sending a POST request
        to Intra42's token endpoint with the required parameters.
        """
        data = {
            'grant_type': 'authorization_code',
            'client_id': self.setting('SOCIAL_AUTH_INTRA42_KEY'),  # Replace with your client ID from settings
            'client_secret': self.setting('SOCIAL_AUTH_INTRA42_SECRET'),  # Replace with your client secret from settings
            'code': code,
            'redirect_uri': self.get_redirect_uri(),
        }
        response = requests.post(self.ACCESS_TOKEN_URL, data=data)

        # Handle the response and return the token data
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Failed to obtain access token: {response.status_code}, {response.text}")

    def auth_complete(self, *args, **kwargs):
        """
        Complete the OAuth2 authorization process by exchanging the authorization
        code for an access token, then fetching user data.
        """
        # Get the authorization code from the request
        code = self.data.get('code')
        if not code:
            raise Exception("Authorization code not found.")

        # Exchange the code for an access token
        token_data = self.request_access_token(code)
        print('token_data--->: ' + token_data['access_token'])

        # Now fetch the user's profile data
        access_token = token_data['access_token']
        user_data = self.user_data(access_token)

        # Extract necessary user details from user_data
        user_details = self.get_user_details(user_data)

        # Get or create the user in the database
        # print(user_details)
        user, created = User.objects.get_or_create(
        email=user_details['email'],
        defaults={
            'email': user_details['email'],
            'username': user_details['username'],
            'first_name': user_details['first_name'],
            # 'password': User.objects.make_random_password() i get an error here so i used the below line
            # add by me ahaloui
            # 'password': get_random_string(length=12), # Set a random password,
            'mobile_number': user_details.get('mobile_number', ''),
            }
        )

        if user:
            # add by me ahaloui
            image_response = None
            profile_image_url = user_details.get('profile_image_url')
            if profile_image_url and (created or user.profile_picture.name == 'profile_pictures/avatar.jpg'):
                image_response = requests.get(profile_image_url)
            if image_response and image_response.status_code == 200:
                user.profile_picture.save(f"{user.username}_profile.jpg", ContentFile(image_response.content), save=True)

            user.is_logged_from_oauth = True
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Redirect to front-end URL and include tokens in the query parameters
            redirect_url = f"http://localhost:5173/dashboard?access_token={access_token}&refresh_token={refresh_token}"
            return HttpResponseRedirect(redirect_url)

        else:
            return JsonResponse({'error': 'User authentication failed'}, status=401)
        # return self.do_auth(access_token, token_data=token_data, *args, **kwargs)
        #todo: fix cookies setting ...

    def get_redirect_uri(self, state=None):
        """Returns the redirect URI to be passed in the token exchange request"""
        return self.setting('REDIRECT_URI')  # Ensure this is set in your settings