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
from itertools import chain

from django.core.files.uploadedfile import UploadedFile
from rest_framework.views import APIView
from .models import User
from .models import UserSession
import os
import jwt
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
# from .forms import UserProfileForm
#pass=Ahaloui@@13+
#gmail=aymene@gmail.com

from rest_framework import generics

from django.utils import timezone

from django.contrib.auth import get_user_model
from UserManagement.profile_utils import notify_friends

from .profile_utils import (
    remove_profile_picture,
    update_profile_picture,
    handle_password_change,
    generate_new_tokens
)

from .models import UserSession
from .models import FriendShipRequest
from .models import FriendShip

from .serializers import FriendRequestSerializer
from django.db import IntegrityError
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async


from .models import Tournament, TournamentParticipant, Match
from .serializers import TournamentSerializer, MatchSerializer
from django.db import transaction

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connections
from django.conf import settings
from datetime import datetime
import redis
from .serializers import HealthCheckSerializer
import time
import socket
from rest_framework.exceptions import ValidationError


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






def generate_random_username():
    prefix = 'moha_'
    suffix = str(uuid.uuid4())[:8]
    return prefix + suffix


class RegisterView(APIView):

    def post(self, request):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        dummy = generate_random_username()
        data.update({'username': dummy})
        form = UserCreationForm(data)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = generate_random_username()
            user.save()
            return JsonResponse({'message': 'User created successfully'}, status=201)
        else:
            return JsonResponse(form.errors, status=400)



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
    user = request.user
    password = request.data.get('password')
    if user.check_password(password):
        return Response({'message': 'Password is correct.'})
    else:
        return Response({'error': 'Incorrect password.'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        if request.method == 'POST':
            try:
                data = json.loads(request.body.decode('utf-8'))
                email = data.get('email')
                password = data.get('password')
                user = authenticate(request, email=email, password=password)

                if user is not None:
                    user.status = 'online'
                    user.save()
                    auth_login(request, user)

                    friends = async_to_sync(self.get_user_friends)(user)
                    notify_friends(user, friends)

                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)
                    refresh_token = str(refresh)
                    response = JsonResponse({
                        'access_token': access_token,
                        'refresh_token': refresh_token,
                        'message': 'User authenticated successfully'
                    })
                    return response
                else:
                    return JsonResponse({'error': 'Invalid credentials'}, status=401)
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid JSON'}, status=400)
        else:
            return render(request, 'login.html')

    @database_sync_to_async
    def get_user_friends(self, user):
        friends_from = list(FriendShip.objects.filter(user_from=user).values_list('user_to', flat=True))
        friends_to = list(FriendShip.objects.filter(user_to=user).values_list('user_from', flat=True))
        friends = list(set(friends_from + friends_to))
        return friends

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        session = UserSession.objects.filter(user=user, logout_time__isnull=True).first()
        if session:
            session.logout_time = timezone.now()
            session.save()
        
        user.status = 'offline'
        user.save()

        # Notify friends about login
        friends = async_to_sync(self.get_user_friends)(user)
        notify_friends(user, friends)
        django_logout(request)
        return Response({'message': 'User logged out successfully'})



    @database_sync_to_async
    def get_user_friends(self, user):
        friends_from = list(FriendShip.objects.filter(user_from=user).values_list('user_to', flat=True))
        friends_to = list(FriendShip.objects.filter(user_to=user).values_list('user_from', flat=True))
        friends = list(set(friends_from + friends_to))
        return friends

class UserStatusView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({'status': request.user.status})

    def post(self, request):
        print(f"Request data: {request.data}")
        user = request.user
        status = request.data.get('status', 'online')
        
        valid_statuses = ['online', 'offline', 'ingame']
        if status not in valid_statuses:
            return Response({'error': 'Invalid status'}, status=400)
        
        user.status = status
        user.save()
        return Response({'status': 'success'})





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

            if 'username' in user_data:
                user.has_custom_username = True
            if 'profile_picture' in request.FILES:
                user.has_custom_profile_picture = True
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
            
            # Handle profile picture update if new picture is uploaded
            if profile_picture:
                update_profile_picture(user, profile_picture)

            # Serialize the data and update the user instance
            serializer = UserSerializer(user, data=user_data, partial=True)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(f"after User data: {user_data}")
            updated_user = serializer.save()

            # if password was changed, generate new tokens
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
        # Re-authenticate user using the new password to ensure the password change worked
        user = authenticate(username=user.username, password=new_password)
        
        if not user:
            raise ValidationError('Authentication failed. Invalid credentials.')

        # If authentication is successful, generate new tokens
        return generate_new_tokens(user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_time_spent(request):
    user = request.user  # Assuming user is authenticated
    sessions = UserSession.objects.time_spent_per_day(user)

    # Return the sessions with time spent in seconds or minutes
    return JsonResponse({'data': list(sessions)})

class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return User.objects.exclude(id=user.id)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class UsersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class SendFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        user_from = request.user
        user_to_id = request.data.get('user_to')
        if not user_to_id:
            return Response({'message': 'user_to field is required'}, status=400)
        try:
            user_to = User.objects.get(id=user_to_id)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=404)
        if FriendShip.objects.filter(user_from=user_from, user_to=user_to).exists() or FriendShip.objects.filter(user_from=user_to, user_to=user_from).exists():
            return Response({"message": "You are already friends"}, status=400)
        if FriendShipRequest.objects.filter(user_from=user_from, user_to=user_to, status='pending').exists():
            return Response({"message": "Friend request already sent"}, status=400)
        serializer = FriendRequestSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            friend_request = FriendShipRequest(user_from=user_from, user_to=user_to)
            friend_request.save()
            return Response(
                {
                    "sender_id": user_from.id,
                    "message": "Friend request sent",
                    "id": friend_request.id,
                    "from_user": user_from.username,
                    "receiver_id": user_to.id,
                },
                status=201,
            )
        return Response(serializer.errors, status=400)

class AcceptFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, friend_request_id):
        try:
            friend_request = FriendShipRequest.objects.get(id=friend_request_id)
            if friend_request.status == 'accepted':
                return Response({"message": "Friend request already accepted"}, status=400)

            if friend_request.status == 'rejected':
                return Response({"message": "Friend request was rejected"}, status=400)
            friend_request.status = 'accepted'
            friend_request.save()

            try:
                if FriendShip.objects.filter(user_from=friend_request.user_to, user_to=friend_request.user_from).exists() or FriendShip.objects.filter(user_from=friend_request.user_from, user_to=friend_request.user_to).exists():
                    return Response({"message": "Friendship already exists"}, status=400)
                FriendShip.objects.create(user_from=friend_request.user_from, user_to=friend_request.user_to)
            except IntegrityError:
                return Response({"message": "Friendship already exists"}, status=400)

            channel_layer = get_channel_layer()
            # Notify the user who sent the friend request
            async_to_sync(channel_layer.group_send)(
                f"user_{friend_request.user_from.id}",
                {
                    "type": "friend_request_accepted",
                    "message": f"{friend_request.user_to.username} accepted your friend request.",
                }
            )
            # Notify the user who accepted the friend request
            async_to_sync(channel_layer.group_send)(
                f"user_{friend_request.user_to.id}",
                {
                    "type": "friend_request_accepted",
                    "message": f"You are now friends with {friend_request.user_from.username}.",
                }
            )
            return Response({"message": "Friend request accepted and friendship created"}, status=201)

        except FriendShipRequest.DoesNotExist:
            return Response({"message": "Friend request not found"}, status=404)

class CancelFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, friend_request_id):
        try:
            friend_request = FriendShipRequest.objects.get(id=friend_request_id)

            if friend_request.status == 'rejected':
                return Response({"message": "Friend request already rejected"}, status=400)

            if friend_request.status == 'accepted':
                return Response({"message": "Friend request already accepted"}, status=400)

            # Update the status to 'rejected'
            friend_request.status = 'rejected'
            friend_request.save()

            return Response({"message": "Friend request rejected"}, status=201)

        except FriendShipRequest.DoesNotExist:
            return Response({"message": "Friend request not found"}, status=404)


class FriendShipRequestListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        friend_requests = FriendShipRequest.objects.filter(user_to=user, status='pending')
        serializer = FriendRequestSerializer(friend_requests, many=True, context={'request': request})
        return Response(serializer.data, status=200)


# Tournament views for creating and managing tournaments
class TournamentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tournaments = Tournament.objects.all()
        serializer = TournamentSerializer(tournaments, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(f"Request data =====> {request.data}")
        with transaction.atomic():
            users = request.data.get('users', [])
            print(f"Users =========> {users}")


            if len(users) != 4:
                return Response(
                    {'error': 'Invalid number of users'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            tournament = Tournament.objects.create(
                name = request.data.get('name', 'Tournament'),
            )

            for idx, user_id in enumerate(users, 1):
                TournamentParticipant.objects.create(
                    tournament=tournament,
                    user_id=user_id,
                    seed=idx
                )
            
            Match.objects.create(
                tournament=tournament,
                player1_id=users[0],
                player2_id=users[3],
                round_number=1
            )

            Match.objects.create(
                tournament=tournament,
                player1_id=users[1],
                player2_id=users[2],
                round_number=1
            )

            tournament.status = 'IN_PROGRESS'
            tournament.save()

            serializer = TournamentSerializer(tournament)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class TournamentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_objects(self, pk):
        try:
            return Tournament.objects.get(pk=pk)
        except Tournament.DoesNotExist:
            raise None
    
    def get(self, request, pk):
        tournament = self.get_objects(pk)
        if tournament is None:
            return Response(
                {'error': 'Tournament not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = TournamentSerializer(tournament)
        return Response(serializer.data)
    
    def put(self, request, pk):
        tournament = self.get_objects(pk)
        if tournament is None:
            return Response(
                {'error': 'Tournament not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = TournamentSerializer(tournament, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        tournament = self.get_objects(pk)
        if tournament is None:
            return Response(
                {'error': 'Tournament not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        tournament.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class HealthCheckView(APIView):
    """
    Enhanced health check endpoint that monitors various system components
    """
    permission_classes = []  # Allow unauthenticated access

    def check_database(self):
        start_time = time.time()
        try:
            for name in connections:
                cursor = connections[name].cursor()
                cursor.execute("SELECT 1")
                cursor.fetchone()
            latency = (time.time() - start_time) * 1000  # Convert to milliseconds
            return {
                "status": "healthy",
                "message": "Database connection successful",
                "latency": round(latency, 2)
            }
        except Exception as e:
            return {
                "status": "unhealthy",
                "message": str(e)
            }

    def check_redis(self):
        if not hasattr(settings, 'REDIS_URL'):
            return {
                "status": "unknown",
                "message": "Redis not configured"
            }

        start_time = time.time()
        try:
            redis_client = redis.from_url(settings.REDIS_URL)
            redis_client.ping()
            latency = (time.time() - start_time) * 1000
            return {
                "status": "healthy",
                "message": "Redis connection successful",
                "latency": round(latency, 2)
            }
        except redis.RedisError as e:
            return {
                "status": "unhealthy",
                "message": str(e)
            }

    def check_disk_usage(self):
        try:
            disk = psutil.disk_usage('/')
            return {
                "total": disk.total,
                "used": disk.used,
                "free": disk.free,
                "percent": disk.percent
            }
        except Exception as e:
            return {"error": str(e)}

    def check_memory_usage(self):
        try:
            memory = psutil.virtual_memory()
            return {
                "total": memory.total,
                "available": memory.available,
                "percent": memory.percent,
                "used": memory.used,
                "free": memory.free
            }
        except Exception as e:
            return {"error": str(e)}

    def check_cpu_usage(self):
        try:
            cpu_percent = psutil.cpu_percent(interval=1)
            cpu_count = psutil.cpu_count()
            return {
                "percent": cpu_percent,
                "cpu_count": cpu_count
            }
        except Exception as e:
            return {"error": str(e)}

    def get(self, request, *args, **kwargs):
        services_status = {
            "database": self.check_database(),
            "redis": self.check_redis()
        }

        # System metrics
        system_metrics = {
            "hostname": socket.gethostname(),
            "disk": self.check_disk_usage(),
            "memory": self.check_memory_usage(),
            "cpu": self.check_cpu_usage()
        }

        # Determine overall health
        is_healthy = all(
            service["status"] == "healthy"
            for service in services_status.values()
            if service["status"] != "unknown"
        )

        response_data = {
            "status": "healthy" if is_healthy else "unhealthy",
            "timestamp": datetime.now().isoformat(),
            "environment": os.getenv("DJANGO_ENV", "development"),
            "services": services_status,
            "system": system_metrics
        }

        serializer = HealthCheckSerializer(response_data)
        response_status = status.HTTP_200_OK if is_healthy else status.HTTP_503_SERVICE_UNAVAILABLE
        
        return Response(
            serializer.data,
            status=response_status
        )