from rest_framework_simplejwt.tokens import AccessToken
from datetime import timedelta

class CustomAccessToken(AccessToken):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Add custom claims here
        self['2fa_enabled'] = kwargs.get('2fa_enabled', False)

    # Optional: You can override the `access_token_lifetime` to add custom expiration logic.
    @classmethod
    def for_user(cls, user, twofa_enabled=False, twofa_verified=False, role='user', **kwargs):
        # Create a new token for a specific user, adding custom fields
        token = super().for_user(user, **kwargs)
        token['2fa_enabled'] = twofa_enabled
        token['2fa_verified'] = twofa_verified
        return token