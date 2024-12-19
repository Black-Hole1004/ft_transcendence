from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework_simplejwt.tokens import RefreshToken
import json
import uuid
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth import logout as django_logout

from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import parser_classes

from django.http import HttpResponseRedirect

from django.core.files.uploadedfile import UploadedFile
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from .models import User
import os
import jwt
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework.exceptions import ValidationError


from django.db.models import Count, Q
from .models import Achievement
from game.models import GameSessions

from .models import UserSession
from django.utils import timezone

from django.contrib.auth import get_user_model

from .profile_utils import (
    remove_profile_picture,
    update_profile_picture,
    handle_password_change,
    generate_new_tokens
)


User = get_user_model()
#todo: (DELETE THIS LATER) simple view to test permissions control and jwt decoding
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt  # Disable CSRF for this view for testing purposes
def decode_jwt(request):
    try:
        # get jwt from bearer
        token = request.headers['Authorization'].split(' ')[1]
        print(f"Token: {token}")
        # Decode the JWT without verification (to get the payload/body)
        payload = jwt.decode(
            token, 
            key=settings.SECRET_KEY,  # Use your Django secret key here
            algorithms=["HS256"]      # Algorithm used for signing
        )
        # return payload
        response = JsonResponse({
                    'jwt': payload,
                    'message': 'User authenticated successfully'
                })
        return response
    except jwt.ExpiredSignatureError:
        return JsonResponse({"error": "Token has expired"})
    except jwt.InvalidTokenError:
        return JsonResponse({"error": "Invalid token"})

def decode_jwt_info(token):
    try:
        # Decode the JWT without verification (to get the payload/body)
        payload = jwt.decode(
            token, 
            key=settings.SECRET_KEY,  # Use your Django secret key here
            algorithms=["HS256"]      # Algorithm used for signing
        )
        return payload
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token"}



@csrf_exempt  # Disable CSRF for this view for testing purposes
def login(request):
    print(f" -------- Request method: {request.method} ---------")
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            data = json.loads(request.body.decode('utf-8'))
            # data = request.POST
            email = data.get('email')
            password = data.get('password')

            # Authenticate the user
            user = authenticate(request, email=email, password=password)
            print(f"Authenticated user: {email}, {password}, {user}")

            if user is not None:
                auth_login(request, user)

                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                # Set the access token in the cookie
                response = JsonResponse({
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'message': 'User authenticated successfully'
                })

                response.set_cookie(
                    key='access_token',
                    value=access_token,
                    httponly=True,
                    secure=True,  # Ensure cookies are only sent over HTTPS
                    samesite='Lax'  # Adjust this according to your CSRF needs
                )

                return response
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return render(request, 'login.html')
        # return JsonResponse({'error': 'Invalid request method'}, status=405)

def generate_random_username():


    prefix = 'moha_'
    suffix = str(uuid.uuid4())[:8]
    return prefix + suffix

@csrf_exempt  # Disable CSRF for this view for testing purposes
def register(request):
    if request.method == 'POST':
        try:
            # Parse the JSON data from the request body
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        # Initialize the form with the JSON data
        # insert dummy username into the data json using uuid
        dummy = generate_random_username()
        data.update({'username': dummy})
        print(f"Data: {data}")
        form = UserCreationForm(data)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = generate_random_username()
            user.save()
            return JsonResponse({'message': 'User created successfully'}, status=201)
        else:
            # Return form errors as JSON
            return JsonResponse(form.errors, status=400)
    else:
        return render(request, 'register.html')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    user = request.user
    session = None
    if user.is_authenticated:
        session = UserSession.objects.filter(user=user, logout_time__isnull=True).first()
    if session:
        session.logout_time = timezone.now()
        session.save()
    django_logout(request)
    return Response({'message': 'User logged out successfully'})


def generate_random_username():
    prefix = 'moha_'
    suffix = str(uuid.uuid4())[:8]
    return prefix + suffix



@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/token/verify',
        '/api/login',
        '/api/register',
        'api/logout'
    ]

    return Response(routes)


def display_text(request):
    text = request.GET.get('text', '')
    return HttpResponse(f'Text: {text}')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_user_password(request):
    print(f"Request data: {request.data}")
    user = request.user  # Get the authenticated user
    password = request.data.get('password')
    if user.check_password(password):
        return Response({'message': 'Password is correct.'})
    else:
        return Response({'error': 'Incorrect password.'}, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class UserProfileView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        try:
            payload = decode_jwt_info(request.headers['Authorization'].split(' ')[1])
            user_id = payload['user_id']
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        try:
            user = request.user
            user_data = request.data.copy()
            profile_picture = request.FILES.get('profile_picture', None)

            # Handle profile picture removal if requested
            if request.data.get('remove_profile_picture') == 'true':
                remove_profile_picture(user)
            
            # Check if any password fields are provided and handle validation
            validation_response = handle_password_change(user, user_data)
            if validation_response is not True:
                return Response(validation_response.data, status=status.HTTP_400_BAD_REQUEST)
            
            for field in ['password', 'new_password', 'confirm_password']:
                if field in user_data:
                    user_data.pop(field, None)
            
            # Handle profile picture update or removal
            if 'profile_picture' in user_data:
                if profile_picture:
                    update_profile_picture(user, profile_picture)
                elif user_data['profile_picture'] in [None, '', 'null']:
                    # Remove the current profile picture if it's not the default
                    if user.profile_picture and user.profile_picture.name != 'profile_pictures/avatar.jpg':
                        if os.path.isfile(user.profile_picture.path):
                            os.remove(user.profile_picture.path)
                    user.profile_picture = 'profile_pictures/avatar.jpg'
                    user.save(update_fields=['profile_picture'])
                    user_data.pop('profile_picture')
            
            # Serialize the data and update the user instance
            serializer = UserSerializer(user, data=user_data, partial=True)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            updated_user = serializer.save()

            # If password was changed, generate new tokens
            new_tokens = None
            if 'new_password' in user_data:
                new_tokens = self.reauthenticate_and_generate_tokens(updated_user, user_data['new_password'])
            
            response_data = serializer.data
            response_data['message'] = (
                'Profile updated and password changed successfully' 
                if new_tokens else 'Profile updated successfully'
            )
            if new_tokens:
                response_data['access_token'] = new_tokens

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def reauthenticate_and_generate_tokens(self, user, new_password):
        """Reauthenticate the user using the new password and generate new JWT tokens."""
        user = authenticate(username=user.username, password=new_password)
        if not user:
            raise ValidationError('Authentication failed. Invalid credentials.')

        return generate_new_tokens(user)


@api_view(['POST'])
@permission_classes([AllowAny])
def check_user_exists(request):
    """Debug endpoint to check if user exists"""
    email = request.data.get('email')
    user = User.objects.filter(email=email).first()
    
    if user:
        return Response({
            'exists': True,
            'is_active': user.is_active,
            'email': user.email,
            'username': user.username
        })
    return Response({
        'exists': False,
        'message': 'No user found with this email'
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_time_spent(request):
    user = request.user
    sessions = UserSession.objects.time_spent_per_day(user)

    return JsonResponse({'data': list(sessions)})

# user profile statistics

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile_stats(request):
    try:
        user = request.user
        games = GameSessions.objects.filter(
            Q(player1=user) | Q(player2=user),
            status='FINISHED'
        )
        
        total_games = games.count()
        wins = games.filter(winner=user).count()
        win_rate = (wins / total_games * 100) if total_games > 0 else 0
        
        recent_matches = []
        for game in games.order_by('-start_time')[:5]:
            is_player1 = (game.player1 == user)
            
            current_player = game.player1 if is_player1 else game.player2
            opponent = game.player2 if is_player1 else game.player1
            
            # Get badge data
            current_badge = Achievement.get_badge(current_player.xp)
            opponent_badge = Achievement.get_badge(opponent.xp)
            
            # Get profile pictures
            current_profile_picture = current_player.profile_picture.url if current_player.profile_picture else None
            opponent_profile_picture = opponent.profile_picture.url if opponent.profile_picture else None
            
            # Get scores
            current_score = game.score_player1 if is_player1 else game.score_player2
            opponent_score = game.score_player2 if is_player1 else game.score_player1
            
            # XP gain logic
            current_xp_gain = game.player1_xp_gain if is_player1 else game.player2_xp_gain
            opponent_xp_gain = game.player2_xp_gain if is_player1 else game.player1_xp_gain
            
            # Improved result determination
            if game.score_player1 == game.score_player2:
                result = 'DRAW'
            else:
                if (is_player1 and game.winner == game.player1) or (not is_player1 and game.winner == game.player2):
                    result = 'VICTORY'
                else:
                    result = 'DEFEAT'
            
            match_data = {
                'current_player': {
                    'profile_picture': current_profile_picture,
                    'badge_image': current_badge['image'],
                    'xp_gain': current_xp_gain,
                    'score': current_score
                },
                'opponent': {
                    'profile_picture': opponent_profile_picture,
                    'badge_image': opponent_badge['image'],
                    'xp_gain': opponent_xp_gain,
                    'score': opponent_score
                },
                'result': result,
            }
            recent_matches.append(match_data)

        # Rest of the code remains the same...
        user_badge = Achievement.get_badge(user.xp)
        progress_data = Achievement.get_badge_progress(user.xp)
        user_badge.update(progress_data)
        
        overall_progress = (user.xp / 10000 * 100) if user.xp < 10000 else 100
        
        return Response({
            'stats': {
                'total_games': total_games,
                'games_won': wins,
                'win_rate': round(win_rate, 2),
                'xp': user.xp
            },
            'achievement': {
                'current': user_badge,
                'overall_progress': round(overall_progress, 2)
            },
            'match_history': recent_matches
        })
        
    except Exception as e:
        print(f"Error in get_profile_stats: {str(e)}")
        return Response({
            'error': str(e)
        }, status=500)