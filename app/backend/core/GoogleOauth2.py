from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login as auth_login
from social_core.backends.google import GoogleOAuth2
from django.http import HttpResponseRedirect

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

            # Redirect to front-end URL and include tokens in the query parameters
            redirect_url = f"http://localhost:5173/dashboard?access_token={access_token}&refresh_token={refresh_token}"

            return HttpResponseRedirect(redirect_url)

        else:
            return JsonResponse({'error': 'User authentication failed'}, status=401)
