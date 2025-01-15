from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as django_logout, get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.utils import timezone
from django.db import transaction, connections, IntegrityError
from django.db.models import Count, Q, Sum
from django.db.models.functions import TruncDate, ExtractHour, ExtractMinute, ExtractSecond
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, generics
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework.authtoken.models import Token
from itertools import chain
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from datetime import datetime
import json
import uuid
import os
import jwt
import time
import socket
import redis

from .forms import UserCreationForm
from .models import (
    User,
    UserSession,
    FriendShipRequest,
    FriendShip,
    Achievement
)
from game.models import GameSessions
from .serializers import (
    UserSerializer,
    FriendRequestSerializer,
    HealthCheckSerializer
)
from .profile_utils import (
    remove_profile_picture,
    update_profile_picture,
    handle_password_change,
    generate_new_tokens,
    notify_friends
)

from django.conf import settings
import pyotp
from django.core.mail import EmailMultiAlternatives, EmailMessage, get_connection
from datetime import timedelta
from Chat.models import Conversation
from django.utils import timezone
from mailersend import emails

User = get_user_model()


class Activate2faView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        two_fa_status = data.get('2fa_status')
        if two_fa_status == False:
            user.is_2fa_enabled = False
            user.otp_secret = -1
            user.otp_expiry = None
            user.otp_attempts = 0
            user.save()
        elif two_fa_status == True:
            user.is_2fa_enabled = True
            user.save()
        return Response({'message': '2fa status updated successfully'}, status=200)


# msg.track_clicks = True
class Twofa():
    def sendMail(otp, email, username):
        api_key = settings.MAILERSEND_API_KEY

        mailer = emails.NewEmail(api_key)

        # define an empty dict to populate with mail values
        mail_body = {}
        mail_from = {
            "name": "starserveTeam",
            "email": "starserveteam@starserve.me",
        }

        recipients = [
            {
                "name": username,
                "email": email,
            }
        ]

        mailer.set_mail_from(mail_from, mail_body)
        mailer.set_mail_to(recipients, mail_body)
        mailer.set_subject("StarServe 2fa Verification", mail_body)
        mailer.set_html_content(f"This is your OTP: <h3>{otp}</h3>", mail_body)
        mailer.set_plaintext_content("Have a good day !", mail_body)

        # using print() will also return status code and data
        mailer.send(mail_body)
    
    def generate_otp(user):
        try:
            # Generate a random OTP using pyotp
            otp_secret = pyotp.random_base32()[0:16]

            # Set OTP expiry to 5 minutes from now
            otp_expiry = timezone.now() + timedelta(minutes=5)

            # Print the variables for debugging
            totp = pyotp.TOTP(otp_secret)
            otp = totp.now()
            print(f"Generated OTP: {otp}")
            print(f"OTP Expiry: {otp_expiry}")

            # Store OTP secret and expiry time on the user model
            print(f"Storing OTP Secret: {otp}")
            user.otp_verified = False
            user.otp_secret = otp
            print(f"OTP: {otp}")
            user.otp_expiry = otp_expiry
            user.save()

            # Send OTP to the user's email
            # send_mail(otp, user.email)  # Uncomment this to send email in production
            
            return otp
        except Exception as e:
            print(f"Error generating OTP: {e}")
            return None

    def verify_otp(user, otp):
        try:
            # Check if OTP is expired
            if user.otp_expiry < timezone.now():
                print(f"OTP expired: {user.otp_expiry} < {timezone.now()}")
                return False

            # todo: totp = pyotp.TOTP(user.otp_secret)
            # todo: verified = totp.verify(otp)
            if otp == user.otp_secret:
                print("OTP Verified Successfully!")
                # Clear the OTP secret and expiry
                user.otp_secret = -1
                user.otp_expiry = None
                user.otp_verified = True
                user.otp_attempts = 0
                user.save()
                return True
            else:
                user.otp_attempts += 1
                user.save()
                print(f"OTP Failed. Attempts: {user.otp_attempts}")
                return False
        except Exception as e:
            print(f"Error verifying OTP: {e}")
            return False

class Verify2faView(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            otp = int(data.get('otp'))
            user = authenticate(request, email=email, password=password)
            if not user:
                return JsonResponse({'error': 'not user False'}, status=400)
            elif user.otp_verified:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                response = JsonResponse({
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'message': 'User already verified 2fa'
                }, status=200)
                return response
            elif user.otp_attempts >= 3:
                return JsonResponse({'error': 'Too many attempts'}, status=400)
            elif Twofa.verify_otp(user, otp):
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                response = JsonResponse({
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'message': 'User Verified 2fa successfully'
                }, status=200)
                return response
            else:
                return JsonResponse({'error': 'False'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)



def generate_random_username():
    prefix = 'Guest_'
    suffix = str(uuid.uuid4())[:8]
    return prefix + suffix


class RegisterView(APIView):

    def post(self, request):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        dummy = generate_random_username()
        if len(dummy) > 10:
            dummy = dummy[:10]
        data.update({'username': dummy})
        if len(data.get('username')) > 10:
            data['username'] = data['username'][:10]
        form = UserCreationForm(data)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'User created successfully'}, status=201)
        else:
            return JsonResponse(form.errors, status=400)


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

class LoginView(APIView):
    def post(self, request):
        if request.method == 'POST':
            try:
                data = json.loads(request.body.decode('utf-8'))
                email = data.get('email')
                password = data.get('password')
                user = authenticate(request, email=email, password=password)

                if user is not None and user.is_2fa_enabled:
                    # Generate and send OTP to the user's email
                    otp = Twofa.generate_otp(user)
                    Twofa.sendMail(otp=otp, email=user.email, username=user.username)
                    return JsonResponse({'message': f'OTP sent to your email: {user.email}', "Twofa_enabled" : True}, status=200)
                if user is not None:
                    user.status = 'online'
                    user.save()

                    friends = async_to_sync(self.get_user_friends)(user)
                    notify_friends(user, friends)

                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)
                    refresh_token = str(refresh)
                    response = JsonResponse({
                        'access_token': access_token,
                        'refresh_token': refresh_token,
                        'message': 'User authenticated successfully',
                        'Twofa_enabled': False
                    })
                    return response
                else:
                    return JsonResponse({'error': 'Invalid credentials'}, status=401)
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid JSON'}, status=400)
        else:
            return JsonResponse({'error': 'Method not allowed'}, status=405)

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
        return Response({'message': 'User logged out successfully'})



    @database_sync_to_async
    def get_user_friends(self, user):
        friends_from = list(FriendShip.objects.filter(user_from=user).values_list('user_to', flat=True))
        friends_to = list(FriendShip.objects.filter(user_to=user).values_list('user_from', flat=True))
        friends = list(set(friends_from + friends_to))
        return friends





@permission_classes([IsAuthenticated])
class UserProfileView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        try:
            user = request.user
            user = User.objects.get(id=user.id);
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
                if 'mobile_number' in serializer.errors:
                    print(f"Mobile number error ------> {serializer.errors['mobile_number']}")
                    return Response({'error': 'Invalid mobile number'}, status=status.HTTP_400_BAD_REQUEST)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            if '2fa_status' in user_data:
                update_2fa_status(user, user_data['2fa_status'])

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
        users = User.objects.all().limit(100)
        # limit to 100 users
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class SendFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def check_if_blocked(self, user, target_user_id):
        conversation = Conversation.objects.filter(
            (
                (Q(user1_id_id=user.id) & Q(user2_id_id=target_user_id)) |
                (Q(user1_id_id=target_user_id) & Q(user2_id_id=user.id))
            )
        ).first()

        if conversation:
            # Check if the target user has blocked the current user
            return conversation.blocked_by == int(target_user_id) or conversation.blocked_by == int(user.id)
        return False

    def post(self, request):

        user_from = request.user
        user_to_id = request.data.get('user_to')
        if not user_to_id:
            return Response({'message': 'user_to field is required'}, status=400)
        try:
            user_to = User.objects.get(id=user_to_id)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=404)

        # Check if user is blocked
        if self.check_if_blocked(user_from, user_to_id):
            return Response({"message": "Cannot send friend request - user has blocked you"}, status=400)
        
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

    def check_if_blocked(self, user, target_user_id):
        conversation = Conversation.objects.filter(
            (
                (Q(user1_id_id=user.id) & Q(user2_id_id=target_user_id)) |
                (Q(user1_id_id=target_user_id) & Q(user2_id_id=user.id))
            )
        ).first()

        if conversation:
            # Check if the target user has blocked the current user
            return conversation.blocked_by == int(target_user_id) or conversation.blocked_by == int(user.id)
        return False

    def post(self, request, friend_request_id):
        try:
            friend_request = FriendShipRequest.objects.get(id=friend_request_id)
            if (friend_request.user_to != request.user):
                return Response({"message": "You are not authorized to accept this friend request"}, status=403)

            # Check if user is blocked
            if self.check_if_blocked(friend_request.user_to, friend_request.user_from.id):
                return Response({"message": "Cannot accept friend request - user has blocked you"}, status=400)

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
            if (friend_request.user_to != request.user):
                return Response({"message": "You are not authorized to accept this friend request"}, status=403)

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

        print(f"Request scheme: {request.scheme}")
        print(f"Request path: {request.path}")
        print(f"Request META: {request.META}")
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


# user profile statistics-------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_profile_stats(request):
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
                'start_time': game.start_time.strftime('%m/%d/%Y %H:%M')
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

# leaderboard-------------------------------------------------------------
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_leaderboard(request):
#     try:
#         # Get top 20 users ordered by XP
#         top_users = User.objects.order_by('-xp')[:20]
        
#         # Prepare user data with achievements
#         leaderboard_data = []
#         for user in top_users:
#             # Get user's current achievement based on XP
#             achievement = Achievement.get_badge(user.xp)
            
#             leaderboard_data.append({
#                 'id': user.id,
#                 'username': user.username,
#                 'xp': user.xp,
#                 'profile_picture': user.profile_picture.url if user.profile_picture else None,
#                 'achievement': achievement  # This already includes name and image
#             })
        
#         return Response({
#             'users': leaderboard_data
#         })
        
#     except Exception as e:
#         return Response({
#             'error': str(e)
#         }, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_leaderboard(request):
    try:
        current_user = request.user
        top_users = User.objects.order_by('-xp')[:20]
        leaderboard_data = []
        current_user_in_top = False
        
        for user in top_users:
            # Get user's current achievement based on XP
            achievement = Achievement.get_badge(user.xp)
            
            # Create the user data dictionary with all basic fields
            user_data = {
                'id': user.id,
                'username': user.username,
                'xp': user.xp,
                'profile_picture': user.profile_picture.url if user.profile_picture else None,
                'achievement': achievement
            }
            
            # If this is the current user, mark it and set the flag
            if user.id == current_user.id:
                current_user_in_top = True
                user_data['is_current_user'] = True  # Add the flag here for top 20 users
            
            leaderboard_data.append(user_data)
        
        # If current user isn't in top 20, add them at the end
        if not current_user_in_top:
            achievement = Achievement.get_badge(current_user.xp)
            leaderboard_data.append({
                'id': current_user.id,
                'username': current_user.username,
                'xp': current_user.xp,
                'profile_picture': current_user.profile_picture.url if current_user.profile_picture else None,
                'achievement': achievement,
                'is_current_user': True
            })
        
        return Response({
            'users': leaderboard_data
        })
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=500)
        
        
#achievements -------------------------------------------------------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_achievements(request):
    try:
        # Get all available achievements
        achievements = [
            {
                'name': 'Novice Astronaut',
                'image': 'novice-astronaut',
                'xp_required': 0,
                'description': 'Begin your cosmic journey'
            },
            {
                'name': 'Cosmic Explorer',
                'image': 'cosmic-explorer',
                'xp_required': 2000,
                'description': 'Venture beyond the familiar'
            },
            {
                'name': 'Stellar Voyager',
                'image': 'stellar-voyager',
                'xp_required': 4000,
                'description': 'Navigate through stellar challenges'
            },
            {
                'name': 'Galactic Trailblazer',
                'image': 'galactic-trailblazer',
                'xp_required': 6000,
                'description': 'Forge new paths in the galaxy'
            },
            {
                'name': 'Celestial Master',
                'image': 'celestial-master',
                'xp_required': 8000,
                'description': 'Achieve cosmic mastery'
            }
        ]
        
        # Get current user's XP for progress calculation
        user_xp = request.user.xp
        
        # Add progress information
        for i in range(len(achievements)):
            current = achievements[i]
            next_threshold = achievements[i + 1]['xp_required'] if i < len(achievements) - 1 else 10000
            
            # Calculate progress percentage
            if user_xp >= next_threshold:
                progress = 100
            elif user_xp < current['xp_required']:
                progress = 0
            else:
                progress = ((user_xp - current['xp_required']) / 
                          (next_threshold - current['xp_required'])) * 100
                
            current['progress'] = round(progress, 2)
            current['user_xp'] = user_xp
            
        return Response({
            'achievements': achievements,
            'current_xp': user_xp
        })
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=500)
        
# get current logged in user data
# UserManagement/views.py

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    try:
        user = request.user
        return JsonResponse({
            'id': user.id,
            'username': user.username,
            'xp': user.xp,
            'email': user.email,
            'profile_picture': user.profile_picture.url if hasattr(user, 'profile_picture') and user.profile_picture else None,
            'badge': Achievement.get_badge(user.xp)
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data_by_id(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        return JsonResponse({
            'id': user.id,
            'username': user.username,
            'xp': user.xp,
            'email': user.email,
            'profile_picture': user.profile_picture.url if hasattr(user, 'profile_picture') and user.profile_picture else None,
            'badge': Achievement.get_badge(user.xp)
        })
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# delete user data
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    user = request.user
    user.delete()
    return JsonResponse({'message': 'User deleted successfully'})

class GetUserByUserName(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, profile_name):
        try:
            user = User.objects.get(username=profile_name)
            data = {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'username': user.username,
                'email': user.email,
                'bio': user.bio,
                'mobile_number': user.mobile_number,
                'profile_picture': user.profile_picture.url if hasattr(user, 'profile_picture') and user.profile_picture else None,
                'date_joined': user.date_joined,
                'date_joined_formatted': user.date_joined.strftime('%B %Y')
                # 'xp': user.xp,
                # 'profile_picture': user.profile_picture.url if user.profile_picture else None,
                # 'achievement': Achievement.get_badge(user.xp)
            }
            return Response(data)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class GetTimeSpentByUserName(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, profile_name):
        try:
            user = User.objects.get(username=profile_name)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Aggregate time spent
        sessions = (
            UserSession.objects.filter(user=user)
            .annotate(date=TruncDate('login_time'))  # Group by date
            .values('date')  # Select date
            .annotate(
                total_seconds=Sum(
                    ExtractHour('duration') * 3600
                    + ExtractMinute('duration') * 60
                    + ExtractSecond('duration')
                )
            )
        )

        # Format response
        formatted_sessions = []
        for session in sessions:
            total_seconds = session['total_seconds'] or 0

            formatted_sessions.append({
                "date": session['date'],
                "total_time_spent_seconds": total_seconds,
            })

        return JsonResponse({'data': formatted_sessions})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile_stats(request, username):
    try:
        user = User.objects.get(username=username)
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
                'start_time': game.start_time.strftime('%m/%d/%Y %H:%M')
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_blocked_status(request):
    user = request.user
    user_to_check_id = request.GET.get('user_id')

    print('user_id ----------->', user_to_check_id)
    print('user ----------->', user)
    print('user_id ----------->', user.id)

    if not user_to_check_id:
        return JsonResponse({'error': 'User ID not provided'}, status=400)

    try:
        # Get the conversation and check if the target user has blocked the current user
        conversation = Conversation.objects.filter(
            (
                # Case 1: Current user is user1, target user is user2
                (Q(user1_id_id=user.id) & Q(user2_id_id=user_to_check_id)) |
                # Case 2: Current user is user2, target user is user1
                (Q(user1_id_id=user_to_check_id) & Q(user2_id_id=user.id))
            )
        ).first()

        print('Found conversation:', conversation)
        
        is_blocked = False
        if conversation:
            # Check if the target user has blocked the current user
            target_user_id = int(user_to_check_id)
            is_blocked = conversation.blocked_by == target_user_id or conversation.blocked_by == user.id

        print('Conversation details:')
        print('- Current user ID:', user.id)
        print('- Target user ID:', user_to_check_id)
        print('- Blocked by:', getattr(conversation, 'blocked_by', None))
        print('- Is blocked:', is_blocked)

        return JsonResponse({'is_blocked': is_blocked})
    except Exception as e:
        print('Error:', str(e))
        return JsonResponse({'error': str(e)}, status=500)