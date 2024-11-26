# core/middleware.py
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from urllib.parse import unquote
import json

User = get_user_model()

@database_sync_to_async
def get_user_from_token(token):
    try:
        # Clean the token string more thoroughly
        # Remove URL encoding, quotes, and whitespace
        token = unquote(token)  # URL decode first
        token = token.strip('"\'')  # Remove both single and double quotes
        token = token.strip()  # Remove any whitespace
        
        print(f"Cleaned token: {token[:20]}...")
        
        # Decode the JWT token
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )
        print(f"Token payload: {payload}")
        
        user_id = payload.get('user_id')
        if not user_id:
            print("No user_id in payload")
            return AnonymousUser()
            
        user = User.objects.get(id=user_id)
        print(f"Successfully authenticated user: {user.username}")
        return user
        
    except jwt.InvalidTokenError as e:
        print(f"Invalid token error: {str(e)}")
        print(f"Token that failed: {token[:50]}...")  # Print more of the token for debugging
        return AnonymousUser()
    except User.DoesNotExist:
        print(f"User not found for payload")
        return AnonymousUser()
    except Exception as e:
        print(f"Unexpected error in get_user_from_token: {str(e)}")
        print(f"Token that failed: {token[:50]}...")  # Print more of the token for debugging
        return AnonymousUser()

class JwtCookieMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        try:
            # Get cookies from headers
            headers = dict(scope['headers'])
            cookie_header = headers.get(b'cookie', b'').decode()
            
            # Parse cookies
            cookies = {}
            if cookie_header:
                pairs = cookie_header.split(';')
                for pair in pairs:
                    if '=' in pair:
                        key, value = pair.strip().split('=', 1)
                        cookies[key.strip()] = value.strip()
            
            # Get access token from access_token cookie
            token = cookies.get('access_token')
            
            if token:
                print("Raw token from cookie:", token[:50])  # Debug print
                scope['user'] = await get_user_from_token(token)
                print(f"User authentication status: {scope['user'].is_authenticated}")
                if scope['user'].is_authenticated:
                    print(f"Authenticated as: {scope['user'].username}")
            else:
                print("No access token found in cookies")
                scope['user'] = AnonymousUser()
                
            return await super().__call__(scope, receive, send)
            
        except Exception as e:
            print(f"Error in JwtCookieMiddleware: {str(e)}")
            scope['user'] = AnonymousUser()
            return await super().__call__(scope, receive, send)