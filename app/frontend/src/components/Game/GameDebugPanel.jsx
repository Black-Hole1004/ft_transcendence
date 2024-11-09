// src/components/Game/GameDebugPanel.jsx
import React from 'react';

const GameDebugPanel = ({ gameState }) => {
    if (!gameState) return null;

    const { ball, player1, player2 } = gameState;

    return (
        <div className="bg-black bg-opacity-20 p-4 rounded">
            <div className="grid grid-cols-3 gap-4">
                {/* Ball Debug Info */}
                <div className="space-y-2">
                    <h3 className="font-bold text-yellow-400">Ball</h3>
                    <div className="text-sm">
                        <p>Position: ({ball?.x?.toFixed(2)}, {ball?.y?.toFixed(2)})</p>
                        <p>Speed: {ball?.speed?.toFixed(2)}</p>
                        <p>Velocity X: {ball?.velocityX?.toFixed(2)}</p>
                        <p>Velocity Y: {ball?.velocityY?.toFixed(2)}</p>
                    </div>
                </div>

                {/* Player 1 Debug Info */}
                <div className="space-y-2">
                    <h3 className="font-bold text-blue-400">Player 1</h3>
                    <div className="text-sm">
                        <p>Position Y: {player1?.y?.toFixed(2)}</p>
                        <p>Score: {player1?.score}</p>
                        <p>Connected: {player1?.connected ? 'Yes' : 'No'}</p>
                    </div>
                </div>

                {/* Player 2 Debug Info */}
                <div className="space-y-2">
                    <h3 className="font-bold text-green-400">Player 2</h3>
                    <div className="text-sm">
                        <p>Position Y: {player2?.y?.toFixed(2)}</p>
                        <p>Score: {player2?.score}</p>
                        <p>Connected: {player2?.connected ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDebugPanel;