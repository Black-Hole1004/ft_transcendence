# game/tests/test_api_endpoints.py
import pytest
from django.urls import reverse
from rest_framework import status
from django.utils import timezone
from ..models import GameSessions, GameMode, GameTable
from django.contrib.auth import get_user_model

User = get_user_model()
pytestmark = pytest.mark.django_db

# Game Table Tests
def test_get_available_tables(auth_client, game_table):
    url = reverse('game_tables')
    response = auth_client.get(url)
    
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) > 0
    assert 'is_unlocked' in response.data[0]
    assert response.data[0]['name'] == game_table.name

def test_tables_xp_requirement(auth_client, game_table):
    high_xp_table = GameTable.objects.create(
        name="Premium Table",
        background_image="premium.jpg",
        xp_required=1000,
        is_default=False
    )
    
    url = reverse('game_tables')
    response = auth_client.get(url)
    
    assert response.status_code == status.HTTP_200_OK
    tables_data = {table['name']: table['is_unlocked'] for table in response.data}
    assert tables_data[game_table.name] is True
    assert tables_data[high_xp_table.name] is False

def test_unauthenticated_tables_access(api_client):
    url = reverse('game_tables')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

# Game Session Tests
def test_create_game(auth_client, game_mode, game_table):
    url = reverse('create_game')
    data = {
        'mode_type': game_mode.mode,
        'table_id': game_table.table_id
    }
    
    response = auth_client.post(url, data, format='json')
    
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['player1_id'] == auth_client.handler._force_user.id
    assert response.data['status'] == GameSessions.GameStatus.WAITING

def test_join_game(auth_client, game_session, test_password):
    # Create second user
    user2 = User.objects.create_user(
        username='testuser2',
        email='test2@example.com',
        password=test_password
    )
    auth_client.force_authenticate(user=user2)
    
    url = reverse('join_game', kwargs={'game_id': game_session.gameSession_id})
    response = auth_client.post(url)
    
    assert response.status_code == status.HTTP_200_OK
    assert response.data['player2_id'] == user2.id
    assert response.data['status'] == GameSessions.GameStatus.IN_PROGRESS

def test_update_game_state(auth_client, game_session):
    """Test game state update scenarios."""
    url = reverse('update_game', kwargs={'game_id': game_session.gameSession_id})
    
    # Set up game session
    game_session.status = GameSessions.GameStatus.IN_PROGRESS
    game_session.player2_id = game_session.player1_id + 1
    game_session.save()

    # Test valid score update
    response = auth_client.post(url, {
        'score_player1': 5,
        'score_player2': 3
    }, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert response.data['score_player1'] == 5
    assert response.data['score_player2'] == 3

    # Test pause state
    response = auth_client.post(url, {
        'is_paused': True
    }, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert response.data['is_paused'] is True

    # Test invalid scores
    response = auth_client.post(url, {
        'score_player1': -1
    }, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST


# Game History Tests
def test_game_history(auth_client, game_session):
    game_session.status = GameSessions.GameStatus.FINISHED
    game_session.end_time = timezone.now()
    game_session.save()
    
    url = reverse('game_history')
    response = auth_client.get(url)
    print
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) > 0
    assert response.data[0]['gameSession_id'] == game_session.gameSession_id

def test_game_history_filtering(auth_client, game_session):
    # Set up first game
    first_time = timezone.now() - timezone.timedelta(hours=1)
    game_session.status = GameSessions.GameStatus.FINISHED
    game_session.end_time = first_time
    game_session.save()

    # Create second game
    second_time = timezone.now()
    game2 = GameSessions.objects.create(
        player1_id=auth_client.handler._force_user.id,
        mode_id=game_session.mode_id,
        gameTable_id=game_session.gameTable_id,
        status=GameSessions.GameStatus.FINISHED,
        end_time=second_time
    )
    
    url = reverse('game_history')
    response = auth_client.get(url)
    
    assert response.status_code == status.HTTP_200_OK
    assert all(game['status'] == GameSessions.GameStatus.FINISHED for game in response.data)
    assert len(response.data) == 2
    # Convert string dates to datetime for comparison
    timestamps = [game['end_time'] for game in response.data]
    assert timestamps[0] > timestamps[1]

def test_handle_disconnect(auth_client, game_session):
    # Set up game session
    game_session.status = GameSessions.GameStatus.IN_PROGRESS
    game_session.player2_id = game_session.player1_id + 1
    game_session.save()

    url = reverse('disconnect', kwargs={'game_id': game_session.gameSession_id})
    response = auth_client.post(url)

    assert response.status_code == status.HTTP_200_OK
    assert response.data['status'] == GameSessions.GameStatus.FINISHED
    assert response.data['end_time'] is not None


# @pytest.mark.parametrize('scenario', [
#     ('invalid_mode', {'mode_type': 'INVALID', 'table_id': 1}, status.HTTP_400_BAD_REQUEST),
#     ('missing_fields', {}, status.HTTP_400_BAD_REQUEST),
#     ('unauthorized', {'mode_type': 'ONE_VS_ONE', 'table_id': 1}, status.HTTP_401_UNAUTHORIZED),
# ])
# def test_create_game_errors(api_client, auth_client, scenario, game_table):
#     scenario_name, data, expected_status = scenario
#     url = reverse('create_game')
    
#     client = api_client if scenario_name == 'unauthorized' else auth_client
#     response = client.post(url, data, format='json')
#     assert response.status_code == expected_status