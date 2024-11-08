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


from .models import UserSession
from django.utils import timezone

from django.contrib.auth import get_user_model


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
            has_password_change = False
            new_tokens = None

            if request.data.get('remove_profile_picture') == 'true':
                if user.profile_picture and 'avatar.jpg' not in user.profile_picture.name:
                    if os.path.isfile(user.profile_picture.path):
                        os.remove(user.profile_picture.path)
                user.profile_picture = 'profile_pictures/avatar.jpg'
                user.save()

            password = request.data.get('password')
            new_password = request.data.get('new_password')
            confirm_password = request.data.get('confirm_password')

            if any([password, new_password, confirm_password]):
                # Validate password fields
                if not all([password, new_password, confirm_password]):
                    return Response({
                        'error': 'All password fields (password, new_password, confirm_password) are required'
                    }, status=status.HTTP_400_BAD_REQUEST)

                # Check current password
                if not user.check_password(password):
                    return Response({
                        'error': 'Current password is incorrect'
                    }, status=status.HTTP_400_BAD_REQUEST)

                # Check password confirmation
                if new_password != confirm_password:
                    return Response({
                        'error': 'New password and confirm password do not match'
                    }, status=status.HTTP_400_BAD_REQUEST)

                # Check if new password is different
                if password == new_password:
                    return Response({
                        'error': 'New password must be different from current password'
                    }, status=status.HTTP_400_BAD_REQUEST)

            user_data = request.data.copy()
            for field in ['password', 'new_password', 'confirm_password', 'remove_profile_picture']:
                if field in user_data:
                    user_data.pop(field)

            if 'profile_picture' in request.FILES:
                # Remove old profile picture if it exists and is not the default
                if user.profile_picture and 'avatar.jpg' not in user.profile_picture.name:
                    if os.path.isfile(user.profile_picture.path):
                        os.remove(user.profile_picture.path)
            
            serializer = UserSerializer(user, data=user_data, partial=True)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save()

            if has_password_change:
                user.set_password(new_password)
                user.save()

                refresh = RefreshToken.for_user(user)
                new_tokens = {
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh)
                }
            
            response_data = serializer.data
            if new_tokens:
                response_data.update({
                    'message': 'Profile updated and password changed successfully',
                    'new_tokens': new_tokens
                })
            else:
                response_data['message'] = 'Profile updated successfully'
            
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_time_spent(request):
    user = request.user  # Assuming user is authenticated
    sessions = UserSession.objects.time_spent_per_day(user)

    # Return the sessions with time spent in seconds or minutes
    return JsonResponse({'data': list(sessions)})