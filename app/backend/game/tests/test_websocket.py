# backend/game/tests/test_websocket.py
import pytest
from channels.testing import WebsocketCommunicator
from channels.routing import URLRouter
from game.routing import websocket_urlpatterns
import json

@pytest.mark.asyncio
async def test_websocket_connection():
    communicator = WebsocketCommunicator(
        URLRouter(websocket_urlpatterns),
        "/ws/game/1/"
    )
    connected, _ = await communicator.connect()
    assert connected
    await communicator.disconnect()

@pytest.mark.asyncio
async def test_paddle_movement():
    communicator = WebsocketCommunicator(
        URLRouter(websocket_urlpatterns),
        "/ws/game/1/"
    )
    connected, _ = await communicator.connect()
    assert connected

    # Send paddle movement
    await communicator.send_json_to({
        'type': 'paddle_move',
        'player': 'player1',
        'position': 150
    })

    # Receive response
    response = await communicator.receive_json_from()
    assert response['type'] == 'paddle_move'
    assert response['position'] == 150

    await communicator.disconnect()

@pytest.mark.asyncio
async def test_game_state():
    communicator = WebsocketCommunicator(
        URLRouter(websocket_urlpatterns),
        "/ws/game/1/"
    )
    connected, _ = await communicator.connect()
    assert connected

    # Send game state update
    await communicator.send_json_to({
        'type': 'game_state',
        'score': {'player1': 5, 'player2': 3},
        'ball': {'x': 400, 'y': 300}
    })

    # Receive response
    response = await communicator.receive_json_from()
    assert response['type'] == 'game_state'
    assert response['score']['player1'] == 5

    await communicator.disconnect()