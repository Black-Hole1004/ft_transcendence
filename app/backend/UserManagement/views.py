from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.contrib.auth import authenticate, login as auth_login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
import json

@csrf_exempt  # Disable CSRF for this view for testing purposes
def login(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')

            # Authenticate the user
            user = authenticate(request, username=username, password=password)
            print(f"Authenticated user: {username}, {password}, {user}")

            if user is not None:
                auth_login(request, user)

                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                # Return tokens in JSON response
                return JsonResponse({
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'message': 'User authenticated successfully'
                })
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            return HttpResponse('User created successfully')
        else:
            return HttpResponse('Invalid form')
    else:
        form = UserCreationForm()
        return render(request, 'register.html')


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/token/verify',
        'api/login',
        'api/register',
    ]

    return Response(routes)


def display_text(request):
    text = request.GET.get('text', '')
    return HttpResponse(f'Text: {text}')

