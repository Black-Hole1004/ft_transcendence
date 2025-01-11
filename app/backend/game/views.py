# description: This file contains the views for the game and matchmaking
# path app/backend/game/views.py
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from .managers import GameSessionManager
from .serializers import GameSessionSerializer
from .models import GameSessions
from django.db.models import Q
import jwt
from django.conf import settings
from django.db import models
from django.shortcuts import get_object_or_404
from .models import GameInvitations
# views for the game

# this function is used to get the user from the jwt token
def get_user_from_token(request):
    """Helper function to get user from token in either header or cookie"""
    try:
        # First try to get token from Authorization header
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        else:
            # Try to get token from cookie
            token = request.COOKIES.get('access')
            
        if not token:
            return None

        # Decode token
        payload = jwt.decode(
            token,
            key=settings.SECRET_KEY,
            algorithms=["HS256"]
        )
        return payload.get('user_id')
        
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def end_game(request, game_id):
    """End a game session"""
    try:
        # Validate player is part of the game
        game = GameSessions.objects.get(gameSession_id=game_id)
        if request.user.id not in [game.player1_id, game.player2_id]:
            return Response(
                {'error': 'Not authorized to end this game'},
                status=status.HTTP_403_FORBIDDEN
            )

        game = GameSessionManager.end_game(game_id)
        return Response(GameSessionSerializer(game).data)
    except GameSessions.DoesNotExist:
        return Response(
            {'error': 'Game not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except ValidationError as e:
        return Response(
            {'error': 'Failed to end game', 'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET'])
def list_active_games(request):
    """List all active game sessions"""
    active_games = GameSessions.objects.exclude(status=GameSessions.GameStatus.FINISHED)
    
    games_info = [{
        'game_id': game.game_id,
        'status': game.status,
        'player1': game.player1.username if game.player1 else None,
        'player2': game.player2.username if game.player2 else None,
        'start_time': game.start_time
    } for game in active_games]
    
    return Response({
        'active_games_count': len(games_info),
        'games': games_info
    })
    
    
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pending_game_invites(request):
    """Get active game invitations for user"""
    try:
        
        active_invites = GameInvitations.objects.filter(
            receiver=request.user,
            status=GameInvitations.Status.PENDING
        )
        
        
        invites_data = [{
            'type': 'game_invite',
            'invitation_id': invite.id,
            'from_user': invite.sender.username,
            'profile_picture': invite.sender.profile_picture.url if invite.sender.profile_picture else None,
            'sender_id': invite.sender.id,
            'created_at': invite.created_at.timestamp()
        } for invite in active_invites]
        
        
        return Response(invites_data)
        
    except Exception as e:
        print(f"Error in get_pending_game_invites: {str(e)}")
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )