# myapp/views.py
from django.http import HttpResponse
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm, CustomAuthenticationForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate

def display_text(request):
    text = request.GET.get('text', '')
    return HttpResponse(f'Text: {text}')


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse('User created successfully')
        else:
            return HttpResponse('Invalid form')
    else:
        return render(request, 'register.html')

def login(request):
    if request.method == 'POST':
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            # A backend authenticated the credentials
            return HttpResponse('User authenticated successfully')
        else:
            # No backend authenticated the credentials
            return HttpResponse('Invalid credentials')
    else:
        return render(request, 'login.html')