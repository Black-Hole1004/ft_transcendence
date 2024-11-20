// src/pages/Game/RemoteGame.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameWebSocket from '../../services/GameWebSocket';

const RemoteGame = () => {
    const location = useLocation();
    const { gameId, settings } = location.state;
    const [gameSocket, setGameSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [playerNumber, setPlayerNumber] = useState(null);
    
    useEffect(() => {
        // Create new WebSocket connection
        const socket = new GameWebSocket();
        
        socket.connect(gameId);
        
        // Setup connection handlers
        socket.on('connect', () => {
            console.log('Connected to game server');
            setIsConnected(true);
        });
        
        socket.on('game_state', (gameState) => {
            console.log('Received initial game state:', gameState);
            if (gameState.player1_id === settings.player1_id) {
                setPlayerNumber(1);
            } else {
                setPlayerNumber(2);
            }
        });
        
        setGameSocket(socket);
        
        // Cleanup on unmount
        return () => socket.disconnect();
    }, [gameId]);

    if (!isConnected) {
        return <div>Connecting to game...</div>;
    }

    return (
        <div>
            <h2>Remote Game</h2>
            <p>Game ID: {gameId}</p>
            <p>You are Player {playerNumber}</p>
        </div>
    );
};

export default RemoteGame;
