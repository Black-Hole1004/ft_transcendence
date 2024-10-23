from django.shortcuts import render
from rest_framework import generics
from UserManagement.models import User
from Chat.models import Conversation, Message
from .serializers import ConversationSerializer, UserInfosSerializer, MessageSerializer

from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from django.db.models import F

@api_view(['GET'])
@permission_classes([IsAuthenticated])
# @authentication_classes([JWTAuthentication])
@csrf_exempt
def ConversationsList(request):
    conversations = (
        Conversation.objects.filter(user1_id=request.user.id) |
        Conversation.objects.filter(user2_id=request.user.id)
    ).annotate(
    last_sent_datetime=F('last_message__sent_datetime')
    ).order_by('-last_sent_datetime')


    serializer = ConversationSerializer(conversations, context={'request': request}, many=True)
    return Response(serializer.data)





@api_view(['GET'])
@permission_classes([IsAuthenticated])
# @authentication_classes([JWTAuthentication])
@csrf_exempt
def getUserinfos(request, conversation_id, user_id):
    user_infos = User.objects.filter(id=user_id)
    messages = Message.objects.filter(conversation_id=conversation_id)
    
    user_serializer = UserInfosSerializer(user_infos, context={'request': request}, many=True)
    message_serializer = MessageSerializer(messages, context={'request': request}, many=True)

    return Response({
        'user_infos': user_serializer.data,
        'messages': message_serializer.data
    })
