from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from .managers import GameSessionManager
from .serializers import GameSessionSerializer, GameTableSerializer
from .models import GameSessions, GameTable, GameMode
from django.db.models import Q
from django.shortcuts import render


# views for the game
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_available_tables(request):
    """Get all available game tables/backgrounds based on user's XP level"""
    try:
        # Get user's XP to determine which tables are available
        user_xp = request.user.xp
        tables = GameTable.objects.all()
        
        # Add 'is_unlocked' field to each table
        tables_data = []
        for table in tables:
            table_data = GameTableSerializer(table).data
            table_data['is_unlocked'] = user_xp >= table.xp_required
            tables_data.append(table_data)
            
        return Response(tables_data)
    except Exception as e:
        return Response(
            {'error': 'Failed to fetch available tables', 'detail': str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_game(request):
    """Create a new game session"""
    try:
        mode_type = request.data.get('mode_type')
        table_id = request.data.get('table_id')

        # Validate presence of mode_type and table_id
        if not all([mode_type, table_id]):
            return Response(
                {'error': 'Missing required fields', 'fields': ['mode_type', 'table_id']},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get GameMode instance by mode string (e.g., '1VS1', 'TOURNAMENT', etc.)
        try:
            mode = GameMode.objects.get(mode=mode_type)
        except GameMode.DoesNotExist:
            return Response(
                {'error': f"Game mode '{mode_type}' does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate table_id as integer and retrieve GameTable object
        if not isinstance(table_id, int):
            return Response(
                {'error': 'Invalid table_id; must be an integer'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            table = GameTable.objects.get(table_id=table_id)
        except GameTable.DoesNotExist:
            return Response(
                {'error': f"Game table with ID '{table_id}' does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create game using manager
        game = GameSessionManager.create_game(
            player1_id=request.user.id, # get the id of the authenticated user
            # player1_id=request.data.get('player1_id'),
            mode=mode,      # Pass GameMode instance
            table=table      # Pass GameTable instance
        )

        return Response(
            GameSessionSerializer(game).data,
            status=status.HTTP_201_CREATED
        )
    except ValidationError as e:
        return Response(
            {'error': 'Game creation failed', 'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_game(request, game_id):
    """Join an existing game session as player 2"""
    try:
        game = GameSessionManager.join_game(
            game_id=game_id,
            player2_id=request.user.id
        )
        return Response(GameSessionSerializer(game).data)
    except ValidationError as e:
        return Response(
            {'error': 'Failed to join game', 'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
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