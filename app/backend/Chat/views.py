from rest_framework import generics
from Chat.models import Conversation, Message
from .serializers import ConversationSerializer

from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
@csrf_exempt
def ConversationsList(request):
    # print(request.user.id)
    conversations = Conversation.objects.filter(user1_id=request.user.id) | Conversation.objects.filter(user1_id=request.user.id)
    serializer = ConversationSerializer(conversations, context={'request': request}, many=True)
    return Response(serializer.data)
