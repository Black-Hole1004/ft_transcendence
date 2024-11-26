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
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_game(request):
    """Create a new game session"""
    try:
        # Get authenticated user
        user = request.user
        print(f"Creating game for user: {user.email} (ID: {user.id})")

        # Get and validate input data
        mode_type = request.data.get('mode_type')
        table_id = request.data.get('table_id')

        if not all([mode_type, table_id]):
            return Response({
                'error': 'Missing required fields',
                'required_fields': {
                    'mode_type': 'Game mode (1VS1, TOURNAMENT, or TRAINING)',
                    'table_id': 'ID of the game table'
                }
            }, status=status.HTTP_400_BAD_REQUEST)
        # Check if user is already in an active game
        active_game = GameSessions.objects.filter(
            (models.Q(player1_id=user.id) | models.Q(player2_id=user.id)) &
            models.Q(status__in=[
                GameSessions.GameStatus.WAITING,
                GameSessions.GameStatus.IN_PROGRESS
            ])
        ).first()

        if active_game:
            return Response({
                'error': 'Already in an active game',
                'game_id': active_game.gameSession_id,
                'status': active_game.status
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create the game session
        game = GameSessionManager.create_game(
            player1_id=user.id,
        )

        # Return created game data
        return Response({
            'message': 'Game created successfully',
            'game_id': game.gameSession_id,
            'status': game.status,
            'player1_id': game.player1_id,
            'created_at': game.start_time,
            'waiting_for_opponent': True
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(f"Error creating game: {str(e)}")
        return Response({
            'error': f'Unexpected error: {str(e)}',
            'type': str(type(e).__name__)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_game(request, game_id):
    """Join an existing game session"""
    try:
        print(f"Attempting to join game {game_id} with user {request.user.id}")
        game = GameSessions.objects.get(gameSession_id=game_id)
        print(f"Found game: {game}")
        
        if not game.player1_id:
            game.player1_id = request.user
        elif not game.player2_id:
            game.player2_id = request.user
        else:
            return Response(
                {'error': 'Game is full'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        game.save()
        print(f"Successfully joined game. Players: {game.player1_id}, {game.player2_id}")
        
        return Response(GameSessionSerializer(game).data)
    except GameSessions.DoesNotExist:
        print(f"Game {game_id} not found")
        return Response(
            {'error': 'Game not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        print(f"Error joining game: {e}")
        return Response(
            {'error': 'Failed to join game', 'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def update_game_state(request, game_id):
    """Update game state (score, pause status)"""
    try:
        # Validate player is part of the game
        game = GameSessions.objects.get(gameSession_id=game_id)
        if request.user.id not in [game.player1_id, game.player2_id]:
            return Response(
                {'error': 'Not authorized to update this game'},
                status=status.HTTP_403_FORBIDDEN
            )

        game = GameSessionManager.update_game_state(
            game_id=game_id,
            score1=request.data.get('score_player1'),
            score2=request.data.get('score_player2'),
            is_paused=request.data.get('is_paused')
        )
        
        return Response(GameSessionSerializer(game).data)
    except GameSessions.DoesNotExist:
        return Response(
            {'error': 'Game not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except ValidationError as e:
        return Response(
            {'error': 'Failed to update game state', 'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

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
@permission_classes([IsAuthenticated])
def get_game_history(request):
    """Get completed games history for the current user"""
    try:
        # Consider moving this to GameSessionManager
        completed_games = GameSessions.objects.filter(
            Q(player1_id=request.user.id) | Q(player2_id=request.user.id),
            status=GameSessions.GameStatus.FINISHED
        ).order_by('-end_time')
        
        return Response(GameSessionSerializer(completed_games, many=True).data)
    except Exception as e:
        return Response(
            {'error': 'Failed to fetch game history', 'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def handle_disconnect(request, game_id):
    """Handle player disconnection"""
    try:
        # Validate player is part of the game
        game = GameSessions.objects.get(gameSession_id=game_id)
        if request.user.id not in [game.player1_id, game.player2_id]:
            return Response(
                {'error': 'Not authorized for this game'},
                status=status.HTTP_403_FORBIDDEN
            )

        game = GameSessionManager.handle_disconnect(
            game_id=game_id,
            player_id=request.user.id
        )
        return Response(GameSessionSerializer(game).data)
    except GameSessions.DoesNotExist:
        return Response(
            {'error': 'Game not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except ValidationError as e:
        return Response(
            {'error': 'Failed to handle disconnect', 'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
        

# views for the matchmaking
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_queue_status(request):
    """Get current matchmaking queue status"""
    try:
        waiting_games = GameSessions.objects.filter(
            status=GameSessions.GameStatus.WAITING
        ).count()
        
        active_games = GameSessions.objects.filter(
            status=GameSessions.GameStatus.IN_PROGRESS
        ).count()
        
        return Response({
            'waiting_games': waiting_games,
            'active_games': active_games,
            'estimated_wait_time': waiting_games * 30  # Simple estimation
        })
    except Exception as e:
        return Response(
            {'error': 'Failed to get queue status', 'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_matchmaking(request):
    """Cancel matchmaking search"""
    try:
        games = GameSessions.objects.filter(
            player1_id=request.user.id,
            status=GameSessions.GameStatus.WAITING
        )
        games.delete()
        
        return Response({'status': 'matchmaking cancelled'})
    except Exception as e:
        return Response(
            {'error': 'Failed to cancel matchmaking', 'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
        
@api_view(['GET'])
def check_game_session(request, game_id):
    """Debug view to check game session details"""
    game = get_object_or_404(GameSessions, game_id=game_id)
    
    game_info = {
        'game_id': game.game_id,
        'status': game.status,
        'background_id': game.background_id,
        
        'players': {
            'player1': {
                'id': game.player1.id if game.player1 else None,
                'username': game.player1.username if game.player1 else None,
                'ready': game.player1_ready,
                'score': game.score_player1
            },
            'player2': {
                'id': game.player2.id if game.player2 else None,
                'username': game.player2.username if game.player2 else None,
                'ready': game.player2_ready,
                'score': game.score_player2
            }
        },
        
        'game_state': {
            'is_paused': game.is_paused,
            'start_time': game.start_time,
            'end_time': game.end_time,
            'is_full': game.is_full()
        },
        
        'results': {
            'winner': game.winner.username if game.winner else None,
            'loser': game.loser.username if game.loser else None
        }
    }
    
    return Response(game_info)

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