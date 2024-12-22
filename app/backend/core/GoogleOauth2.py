from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login as auth_login
from social_core.backends.google import GoogleOAuth2
from django.http import HttpResponseRedirect
import requests
from django.core.files.base import ContentFile
import random
import string
from UserManagement.models import User


class CustomGoogleOAuth2(GoogleOAuth2):
    """
    Custom Google OAuth2 backend that handles setting JWT tokens in cookies after authentication.
    """

    def auth_complete(self, *args, **kwargs):
        """
        Complete the OAuth2 process, authenticate the user, and set JWT tokens in cookies.
        """
        # Call the original auth_complete method to authenticate the user
        user = super().auth_complete(*args, **kwargs)
        if user:
            # Access Google-specific information if available
            google_data = user.social_auth.get(provider='google-oauth2')
            extra_data = google_data.extra_data
            
            access_token = extra_data.get('access_token')
            profile_url = 'https://www.googleapis.com/oauth2/v3/userinfo'
            response = requests.get(profile_url, headers={'Authorization': f'Bearer {access_token}'})

            # Check if the request was successful
            if response.status_code != 200:
                return JsonResponse({'error': 'Failed to retrieve user information'}, status=401)
            
            # Extract user data from the response
            user_data = response.json()
            # Extract necessary user details from user_data
            user_details = {
                'email': user_data.get('email'),
                'username': user_data.get('name'),
                'first_name': user_data.get('given_name'),
                'mobile_number': user_data.get('phone_number', ''),
                'profile_picture': user_data.get('picture'),
            }

            # Only update profile picture if `is_custom_profile_picture` is False
            if user_details['profile_picture']:
                try:
                    image_response = requests.get(user_details['profile_picture'])
                    if image_response.status_code == 200:
                        user.profile_picture.save(
                            f"{user.username}_profile.jpg", 
                            ContentFile(image_response.content), 
                            save=True
                        )
                except Exception as e:
                    print('Error saving profile picture:', e)
            
            user.first_name = user_details['first_name']
            user.email = user_details['email']
            user.username = user_details['username']
            user.is_logged_with_oauth = True
            user.save()

            auth_login(self.strategy.request, user)
            self.strategy.request.session.flush()

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Redirect to front-end URL and include tokens in the query parameters
            redirect_url = f"http://localhost:5173/dashboard?access_token={access_token}&refresh_token={refresh_token}"
            return HttpResponseRedirect(redirect_url)

        else:
            return JsonResponse({'error': 'User authentication failed'}, status=401)