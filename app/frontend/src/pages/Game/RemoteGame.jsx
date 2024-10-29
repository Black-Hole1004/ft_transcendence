// frontend/src/pages/Game/RemoteGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GameScore from '../../components/Game/GameScore';
import Player from '../../components/Game/Player';
import PongTable from '../../components/Game/PongTable';
import Timer from '../../components/Game/Timer';
import { GameOverPopup } from './LocalGame';

const RemoteGame = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const wsRef = useRef(null);
    const gameStateRef = useRef({
        paddle1Y: 200,
        paddle2Y: 200,
        ballPos: { x: 400, y: 200 },
        ballVelocity: { x: 5, y: 5 }
    });

    const [isPaused, setIsPaused] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(location.state?.duration || 60);
    const [isConnected, setIsConnected] = useState(false);
    const [playerId, setPlayerId] = useState(null); // 'player1' or 'player2'
    const [gameError, setGameError] = useState(null);

    useEffect(() => {
        connectToGame();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const connectToGame = () => {
        const gameId = location.state?.gameId;
        if (!gameId) {
            setGameError("No game ID provided");
            return;
        }

        const ws = new WebSocket(`ws://${window.location.host}/ws/game/${gameId}/`);
        wsRef.current = ws;

        ws.onopen = () => {
            setIsConnected(true);
            console.log("Connected to game server");
        };

        ws.onmessage = (event) => {
            handleGameMessage(JSON.parse(event.data));
        };

        ws.onclose = () => {
            setIsConnected(false);
            handleDisconnect();
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            setGameError("Connection error occurred");
        };
    };

    const handleGameMessage = (message) => {
        switch (message.type) {
            case 'game_state':
                updateGameState(message.game);
                break;

            case 'paddle_move':
                handlePaddleMovement(message);
                break;

            case 'ball_update':
                handleBallUpdate(message);
                break;

            case 'score_update':
                handleScoreUpdate(message);
                break;

            case 'power_up':
                handlePowerUp(message);
                break;

            case 'game_paused':
                setIsPaused(message.is_paused);
                break;

            case 'player_assignment':
                setPlayerId(message.player);
                break;

            case 'game_over':
                handleGameOver(message);
                break;

            case 'error':
                setGameError(message.message);
                break;
        }
    };

    const updateGameState = (state) => {
        gameStateRef.current = state;
        setPlayer1Score(state.score_player1);
        setPlayer2Score(state.score_player2);
        setIsPaused(state.is_paused);
    };

    const handlePaddleMovement = (data) => {
        const { player, position } = data;
        gameStateRef.current[`${player}Y`] = position;
    };

    const handleBallUpdate = (data) => {
        gameStateRef.current.ballPos = data.position;
        gameStateRef.current.ballVelocity = data.velocity;
    };

    const handleScoreUpdate = (data) => {
        setPlayer1Score(data.score.player1);
        setPlayer2Score(data.score.player2);
    };

    const handlePowerUp = (data) => {
        // Handle power-up activation
    };

    const handleGameOver = (data) => {
        setIsGameOver(true);
        // Show game over popup with results
    };

    const handleDisconnect = () => {
        setGameError("Connection lost. Attempting to reconnect...");
        // Implement reconnection logic if needed
        setTimeout(connectToGame, 3000);
    };

    const sendGameEvent = (eventData) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(eventData));
        }
    };

    const handlePause = () => {
        sendGameEvent({
            type: 'pause_game',
            is_paused: !isPaused
        });
    };

    const handlePaddleMove = (position) => {
        sendGameEvent({
            type: 'paddle_move',
            player: playerId,
            position: position
        });
    };

    const handleClose = () => {
        navigate('/dashboard');
    };

    if (gameError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Error</h2>
                    <p>{gameError}</p>
                    <button 
                        onClick={handleClose}
                        className="mt-4 bg-white text-red-500 px-4 py-2 rounded"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-80' : 'bg-backdrop-40'}`}>
            <section className='flex'>
                <div className='flex-1 margin-page flex flex-col items-center gap-8'>
                    <GameScore 
                        player1Score={player1Score} 
                        player2Score={player2Score} 
                        isPaused={isPaused} 
                    />
                    <Timer 
                        isPaused={isPaused} 
                        timeRemaining={timeRemaining} 
                    />
                    <div className='flex-1 w-full flex max-lg:flex-wrap max-lg:justify-around justify-between font-dreamscape-sans'>
                        <Player 
                            isPaused={isPaused}
                            PlayerName={location.state?.player1?.name}
                            BadgeName={location.state?.player1?.badge}
                            playerImage={location.state?.player1?.image}
                            badgeImage={location.state?.player1?.badgeImage}
                            GameMode="remote"
                        />
                        <PongTable 
                            isPaused={isPaused}
                            handlePause={handlePause}
                            backgroundId={location.state?.backgroundId}
                            isGameOver={isGameOver}
                            player1Color={location.state?.player1?.color}
                            player2Color={location.state?.player2?.color}
                            ballColor={location.state?.ballColor}
                            paddleHeight={location.state?.paddleHeight}
                            ballRadius={location.state?.ballRadius}
                            powerups={location.state?.powerUps}
                            attacks={location.state?.attacks}
                            isRemote={true}
                            onPaddleMove={handlePaddleMove}
                            gameState={gameStateRef.current}
                            playerId={playerId}
                        />
                        <Player 
                            isPaused={isPaused}
                            PlayerName={location.state?.player2?.name}
                            BadgeName={location.state?.player2?.badge}
                            playerImage={location.state?.player2?.image}
                            badgeImage={location.state?.player2?.badgeImage}
                            GameMode="remote"
                        />
                    </div>
                </div>
            </section>
            {isGameOver && (
                <GameOverPopup
                    winner={player1Score > player2Score ? location.state?.player1 : location.state?.player2}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default RemoteGame;