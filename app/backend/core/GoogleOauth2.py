from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login as auth_login
from social_core.backends.google import GoogleOAuth2

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
        print('response--->: ')
        print(user)
        # user = response.user

        if user:

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Create a response with the tokens and set cookies
            response = JsonResponse({
                'access_token': access_token,
                'refresh_token': refresh_token,
                'message': 'User authenticated successfully via Google OAuth'
            })

            # Set the access token as a cookie
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,  # Ensures the cookie is not accessible via JavaScript
                secure=True,    # Only set the cookie over HTTPS
                samesite='Lax', # CSRF protection, adjust according to your needs
            )

            # Set the refresh token as a cookie if necessary
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='Lax',
            )

            return response

        else:
            return JsonResponse({'error': 'User authentication failed'}, status=401)
