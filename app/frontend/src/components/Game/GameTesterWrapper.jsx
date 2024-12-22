// GameTesterWrapper.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import GameTester from '../../pages/Game/GameTester';

function GameTesterWrapper() {
    const location = useLocation();
    const gameId = location.state?.gameId;
    
    if (!gameId) {
        return <div>No game ID provided</div>;
    }
    
    return <GameTester gameId={gameId} />;
}

export default GameTesterWrapper;