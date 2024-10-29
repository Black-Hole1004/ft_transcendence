// frontend/src/pages/Game/MatchMaking.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MatchMaking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { gameId, settings } = location.state || {};
    const [dots, setDots] = useState('');
    const [secondsWaiting, setSecondsWaiting] = useState(0);
    const [wsConnection, setWsConnection] = useState(null);

    // Animated dots for loading
    useEffect(() => {
        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length >= 5 ? '' : prev + '.');
        }, 500);

        return () => clearInterval(dotsInterval);
    }, []);

    // Timer for waiting
    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsWaiting(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // WebSocket connection to wait for opponent
    useEffect(() => {
        const ws = new WebSocket(`ws://${window.location.host}/ws/game/${gameId}/`);
        setWsConnection(ws);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'opponent_joined') {
                navigate('/remote-game', {
                    state: {
                        gameId,
                        settings,
                        player1: data.player1,
                        player2: data.player2
                    }
                });
            }
        };

        return () => {
            ws.close();
        };
    }, [gameId]);

    const cancelMatchmaking = async () => {
        try {
            await fetch(`/api/game/${gameId}/cancel/`, {
                method: 'POST',
            });
            wsConnection?.close();
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to cancel matchmaking:', error);
        }
    };

    return (
        <div className="min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary flex items-center justify-center">
            <div className="bg-backdrop-80 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                        Finding Opponent  {dots}
                    </h2>
                    <p className="text-gray-400">
                        Time elapsed: {Math.floor(secondsWaiting / 60)}:
                        {String(secondsWaiting % 60).padStart(2, '0')}
                    </p>
                </div>

                <div className="mb-6">
                    <p className="text-sm mb-2">Game Settings:</p>
                    <div className="bg-backdrop-60 p-3 rounded text-left">
                        <p>Paddle Height: {settings.paddleHeight}px</p>
                        <p>Ball Radius: {settings.ballRadius}px</p>
                        <p>Power-ups: {settings.powerUps}</p>
                        <p>Attacks: {settings.attacks}</p>
                    </div>
                </div>

                <button
                    onClick={cancelMatchmaking}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default MatchMaking;