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
        print('the respose {')
        if user:
            # Print user information
            print("User Email:", user.email)
            print("User First Name:", user.first_name)
            print("User Last Name:", user.last_name)

            # Access Google-specific information if available
            google_data = user.social_auth.get(provider='google-oauth2')
            profile_picture = google_data.extra_data.get('picture')
            # phone_number = google_data.extra_data.get('phone_number')
            print("User Profile Picture:", profile_picture)
            # print("User Phone Number:", phone_number)
            extra_data = google_data.extra_data
            print("[ Google extra data:", extra_data)
            print("]")
            # Continue with token generation and redirection...
            print('}')
        # user = response.user

        if user:

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Redirect to front-end URL and include tokens in the query parameters
            redirect_url = f"http://localhost:5173/dashboard?access_token={access_token}&refresh_token={refresh_token}"
            print('redirect_url =>', redirect_url)
            return HttpResponseRedirect(redirect_url)

        else:
            return JsonResponse({'error': 'User authentication failed'}, status=401)