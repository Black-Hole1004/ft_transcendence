from django.shortcuts import render
from UserManagement.models import User
from rest_framework import generics, status
from Chat.models import Conversation, Message
from .serializers import ConversationSerializer, UserInfosSerializer, MessageSerializer, SearchResultSerializer

from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from django.db.models import F

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def ConversationsList(request):
    conversations = (
        Conversation.objects.filter(user1_id=request.user.id) |
        Conversation.objects.filter(user2_id=request.user.id)
    ).annotate(
    last_sent_datetime=F('last_message__sent_datetime')
    ).order_by('-last_sent_datetime')


    serializer = ConversationSerializer(conversations, context={'request': request}, many=True)
    return Response({'id': request.user.id,
                     'conversations':serializer.data
                    })





@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def getUserinfos(request, conversation_key, user_id):

    ids = conversation_key.split('_')
    if request.user.id not in map(int, ids):
        return Response({'detail': 'You are not a participant in this conversation.'}, status=status.HTTP_404_NOT_FOUND)
    
    user_infos = User.objects.filter(id=user_id)
    print(conversation_key)
    conversation = Conversation.objects.filter(conversation_key=conversation_key).first()
    if conversation:
        messages = Message.objects.filter(conversation_id=conversation.id)
        message_serializer = MessageSerializer(messages, context={'request': request}, many=True)

    user_serializer = UserInfosSerializer(user_infos, context={'request': request}, many=True)

    response = {
        'user_infos': user_serializer.data,
    }
    if conversation:
        response['messages'] = message_serializer.data
    print(response)
    return Response(response)






@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def getSearchedUsers(request, user):
    users = User.objects.filter(username__startswith=user).exclude(id=request.user.id)
    print(users)

    search_serializer = SearchResultSerializer(users, context={'request': request}, many=True)

    return Response({
        'search_result': search_serializer.data
    })
