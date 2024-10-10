from django.shortcuts import render
from django.http import HttpResponse

def chat(request):
    return HttpResponse("<h1>Chat page</h1>")