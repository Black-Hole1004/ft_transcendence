from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.contrib.auth import authenticate, login as auth_login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework_simplejwt.tokens import RefreshToken
import json
import uuid
from rest_framework import status
from .serializers import UserSerializer

from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import parser_classes

from django.http import HttpResponseRedirect

from django.core.files.uploadedfile import UploadedFile

from rest_framework.views import APIView


from .models import User

import os
import jwt
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# from .forms import UserProfileForm
#pass=Ahaloui@@13+
#gmail=aymene@gmail.com



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
            user.save()
            return JsonResponse({'message': 'User created successfully'}, status=201)
        else:
            # Return form errors as JSON
            return JsonResponse(form.errors, status=400)
    else:
        return render(request, 'register.html')

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
    ]

    return Response(routes)


def display_text(request):
    text = request.GET.get('text', '')
    return HttpResponse(f'Text: {text}')


@permission_classes([IsAuthenticated])
class UserProfileView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]


    def get(self, request):
        try:
            payload = decode_jwt_info(request.headers['Authorization'].split(' ')[1])
            print(f"Payload: {payload}")
            user_id = payload['user_id']
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        try:
            payload = decode_jwt_info(request.headers['Authorization'].split(' ')[1])
            print(f"Payload: {payload}")
            user_id = payload['user_id']
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Create a mutable copy of the data
        mutable_data = request.data.copy()
        print(f"Mutable data: {mutable_data}")
        
        # Handle profile picture update or removal
        if 'profile_picture' in mutable_data:
            if mutable_data['profile_picture'] in [None, '', 'null']:
                # Remove the current profile picture if it's not the default
                if user.profile_picture and user.profile_picture.name != 'profile_pictures/avatar.jpg':
                    if os.path.isfile(user.profile_picture.path):
                        os.remove(user.profile_picture.path)
                user.profile_picture = 'profile_pictures/avatar.jpg'
                user.save(update_fields=['profile_picture'])
                # Remove profile_picture from mutable_data
                mutable_data.pop('profile_picture')
            elif isinstance(mutable_data['profile_picture'], UploadedFile):
                # New file uploaded, let the serializer handle it
                pass
            else:
                # Invalid data for profile_picture, remove it to avoid serializer errors
                mutable_data.pop('profile_picture')
        
        serializer = UserSerializer(user, data=mutable_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
