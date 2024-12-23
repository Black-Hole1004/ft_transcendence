// import React, { useState, useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import GameWebSocket from '../../services/GameWebSocket'
// import GameScore from '../../components/Game/GameScore'
// import Player from '../../components/Game/Player'
// import RemotePongTable from '../../components/Game/RemotePongTable'
// import Timer from '../../components/Game/Timer'
// import Confetti from 'react-confetti'

// const GameOverPopup = ({ winner, finalScore, onClose }) => (
// 	<div className='fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50'>
// 		<div className='bg-[#0E0B0A] border-2 border-[#76797Cff] text-[#E6DDC6] rounded-lg shadow-xl w-[480px] overflow-hidden relative'>
// 			<div
// 				className="h-60 bg-[url('path/to/venus-pingpong-background.jpg')] bg-cover bg-center relative"
// 				style={{ filter: 'brightness(1.2)' }}
// 			>
// 				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#0E0B0A]'></div>
// 				<div className='absolute inset-0 flex flex-col items-center justify-center'>
// 					<h2 className='text-5xl font-bold text-[#E6DDC6] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider'>
// 						GAME OVER
// 					</h2>
// 				</div>
// 			</div>
// 			<div className='p-8 relative z-10'>
// 				<div className='text-center'>
// 					<p className='text-2xl mb-2'>Cosmic Champion:</p>
// 					<p className='text-4xl font-bold mb-4 text-[#BE794A] glow drop-shadow-[0_2px_10px_rgba(190,121,74,0.8)]'>
// 						{winner}
// 					</p>
// 					<p className='text-xl mb-4'>
// 						Final Score: {finalScore?.player1} - {finalScore?.player2}
// 					</p>
// 					<p className='text-lg mb-6 text-[#E6DDC6] opacity-90'>
// 						Your stellar skills have conquered the arena!
// 					</p>
// 				</div>
// 				<div className='flex justify-center space-x-6 mt-8'>
// 					<button
// 						onClick={onClose}
// 						className='bg-transparent hover:bg-[#61463A] text-[#E6DDC6] font-bold py-3 px-8 rounded-full border-2 border-[#BE794A] transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
// 					>
// 						Return to Base
// 					</button>
// 				</div>∏
// 			</div>
// 		</div>
// 	</div>
// )

// const CountdownTimer = ({ count }) => (
// 	<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
// 		<div className='text-[#E6DDC6] text-9xl font-bold animate-pulse'>{count}</div>
// 	</div>
// )

// const PlayerDisconnectPopup = ({ onClose }) => (
// 	<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
// 		<div className='bg-[#0E0B0A] border-2 border-[#76797Cff] text-[#E6DDC6] rounded-lg shadow-xl w-[480px] overflow-hidden relative'>
// 			<div className='p-8 relative z-10'>
// 				<div className='text-center'>
// 					<p className='text-2xl mb-2'>Player Disconnected</p>
// 					<p className='text-lg mb-6 text-[#E6DDC6] opacity-90'>
// 						The other player has disconnected from the game.
// 					</p>
// 				</div>
// 				<div className='flex justify-center space-x-6 mt-8'>
// 					<button
// 						onClick={onClose}
// 						className='bg-transparent hover:bg-[#61463A] text-[#E6DDC6] font-bold py-3 px-8 rounded-full border-2 border-[#BE794A] transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
// 					>
// 						Return to Base
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// )

// const RemoteGame = () => {
// 	const navigate = useNavigate()
// 	const location = useLocation()

// 	// Destructure location state with default values
// 	const { gameId, playerId, settings = {}, matchData } = location.state || {}

// 	// Game states
// 	const [isPaused, setIsPaused] = useState(false)
// 	const [isGameOver, setIsGameOver] = useState(false)
// 	const [player1Score, setPlayer1Score] = useState(0)
// 	const [player2Score, setPlayer2Score] = useState(0)
// 	const [showConfetti, setShowConfetti] = useState(false)
// 	const [winner, setWinner] = useState(null)
// 	const [countdown, setCountdown] = useState(5)
// 	const [gameStarted, setGameStarted] = useState(false)
// 	const [gameSocket, setGameSocket] = useState(null)
// 	const [timeRemaining, setTimeRemaining] = useState(settings?.duration || 60)
// 	const [finalScore, setFinalScore] = useState(null)
// 	const [showDisconnectPopup, setShowDisconnectPopup] = useState(false)
// 	const [errorMessage, setErrorMessage] = useState(null)

// 	const [playerData, setPlayerData] = useState({
// 		player1: {
// 			name: 'Player 1',
// 			ready: false,
// 		},
// 		player2: {
// 			name: 'Player 2',
// 			ready: false,
// 		},
// 	})

// 	// Initialize WebSocket and handle game setup
// 	useEffect(() => {
// 		let socket = null

// 		const initializeGame = async () => {
// 			if (!gameId || !settings) {
// 				console.error('Missing required game data')
// 				setErrorMessage('Game initialization failed. Missing required data.')
// 				return
// 			}

// 			try {
// 				socket = new GameWebSocket()
// 				setGameSocket(socket)

// 				// Set up event handlers before connecting
// 				socket.on('connect', () => {
// 					console.log('Connected to game server')
// 					socket.send({
// 						type: 'player_ready',
// 						playerId: playerId,
// 					})
// 				})

// 				socket.on('error', (error) => {
// 					console.error('WebSocket error:', error)
// 					setErrorMessage('Connection error occurred. Please try again.')
// 				})

// 				socket.on('gameState', (state) => {
// 					if (!gameStarted) return

// 					setPlayer1Score(state.score?.player1 || 0)
// 					setPlayer2Score(state.score?.player2 || 0)
// 					setIsPaused(state.isPaused || false)
// 					setTimeRemaining(state.timeRemaining || timeRemaining)

// 					if (state.players) {
// 						setPlayerData(state.players)
// 					}
// 				})

// 				socket.on('playerReady', (data) => {
// 					setPlayerData((prev) => ({
// 						...prev,
// 						[data.player]: { ...prev[data.player], ready: true },
// 					}))
// 				})

// 				socket.on('allPlayersReady', () => {
// 					setCountdown(5)
// 				})

// 				socket.on('gameOver', handleGameOver)

// 				socket.on('playerDisconnect', () => {
// 					setShowDisconnectPopup(true)
// 					setIsPaused(true)
// 				})

// 				// Now connect
// 				socket.connect(gameId)
// 			} catch (error) {
// 				console.error('Error initializing game:', error)
// 				setErrorMessage('Failed to initialize game. Please try again.')
// 			}
// 		}

// 		initializeGame()

// 		// Cleanup function
// 		return () => {
// 			if (socket) {
// 				socket.disconnect()
// 			}
// 		}
// 	}, [gameId, playerId, settings])

// 	// Countdown effect
// 	useEffect(() => {
// 		if (!gameStarted && countdown > 0) {
// 			const timer = setInterval(() => {
// 				setCountdown((prev) => prev - 1)
// 			}, 1000)

// 			return () => clearInterval(timer)
// 		}

// 		if (countdown === 0 && !gameStarted) {
// 			setGameStarted(true)
// 			gameSocket?.send({
// 				type: 'game_start',
// 			})
// 		}
// 	}, [countdown, gameStarted])

// 	const handlePause = () => {
// 		if (!gameSocket?.isConnected() || !gameStarted || isGameOver) return

// 		gameSocket.send({
// 			type: 'pause_game',
// 			playerId: playerId,
// 		})
// 	}

// 	const handleGameOver = (data) => {
// 		setIsGameOver(true)
// 		setWinner(data.winner === 1 ? playerData.player1.name : playerData.player2.name)
// 		setFinalScore(data.finalScore)
// 		setShowConfetti(true)
// 		setTimeout(() => setShowConfetti(false), 5000)
// 	}

// 	const handleDisconnect = () => {
// 		if (gameSocket?.isConnected()) {
// 			gameSocket.send({
// 				type: 'player_disconnect',
// 				playerId: playerId,
// 			})
// 			gameSocket.disconnect()
// 		}
// 	}

// 	useEffect(() => {
// 		window.addEventListener('beforeunload', handleDisconnect)
// 		return () => {
// 			window.removeEventListener('beforeunload', handleDisconnect)
// 			handleDisconnect()
// 		}
// 	}, [gameSocket])

// 	if (errorMessage) {
// 		return (
// 			<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
// 				<div className='bg-[#0E0B0A] border-2 border-[#76797Cff] text-[#E6DDC6] p-8 rounded-lg'>
// 					<p className='text-xl mb-4'>{errorMessage}</p>
// 					<button
// 						onClick={() => navigate('/dashboard')}
// 						className='bg-[#BE794A] hover:bg-[#61463A] px-6 py-2 rounded-full'
// 					>
// 						Return to Dashboard
// 					</button>
// 				</div>
// 			</div>
// 		)
// 	}

// 	return (
// 		<div
// 			className={`backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-80' : 'bg-backdrop-40'}`}
// 		>
// 			<section className='flex'>
// 				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
// 					<GameScore
// 						player1Score={player1Score}
// 						player2Score={player2Score}
// 						isPaused={isPaused}
// 					/>

// 					<Timer isPaused={isPaused} timeRemaining={timeRemaining} />

// 					<div className='flex-1 w-full flex max-lg:flex-wrap max-lg:justify-around justify-between font-dreamscape-sans'>
// 						<Player
// 							isPaused={isPaused}
// 							PlayerName={playerData.player1.name}
// 							GameMode='remote'
// 						/>

// 						<RemotePongTable
// 							isPaused={isPaused}
// 							handlePause={handlePause}
// 							backgroundId={settings?.backgroundId}
// 							isGameOver={isGameOver}
// 							player1Color={settings?.player1Color}
// 							player2Color={settings?.player2Color}
// 							ballColor={settings?.ballColor}
// 							paddleHeight={settings?.paddleHeight}
// 							ballRadius={settings?.ballRadius}
// 							gameSocket={gameSocket}
// 							playerId={playerId}
// 							isCountdownActive={countdown > 0}
// 						/>

// 						<Player
// 							isPaused={isPaused}
// 							PlayerName={playerData.player2.name}
// 							GameMode='remote'
// 						/>
// 					</div>
// 				</div>
// 			</section>

// 			{countdown > 0 && !gameStarted && <CountdownTimer count={countdown} />}

// 			{isGameOver && (
// 				<GameOverPopup
// 					winner={winner}
// 					finalScore={finalScore}
// 					onClose={() => navigate('/dashboard')}
// 				/>
// 			)}

// 			{showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
// 		</div>
// 	)
// }










// src/pages/Game/RemoteGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GameWebSocket from '../../services/GameWebSocket';
import GameStateMonitor from '../../components/Game/GameStateMonitor';
import GameDebugPanel from '../../components/Game/GameDebugPanel';
import MessageMonitor from '../../components/Game/MessageMonitor';
import GameTestingControls from '../../components/Game/GameTestingControls';

const RemoteGameTest = () => {
    // Navigation and routing
    const location = useLocation();
    const navigate = useNavigate();

    // Core game state
    const [gameId, setGameId] = useState(null);
    const [playerNumber, setPlayerNumber] = useState(null);
    const [gameState, setGameState] = useState(null);
    const [status, setStatus] = useState('connecting');
    const [isConnected, setIsConnected] = useState(false);

    // Debug and monitoring state
    const [messages, setMessages] = useState([]);
    const [eventLog, setEventLog] = useState([]);
    const [debugInfo, setDebugInfo] = useState({
        lastUpdate: Date.now(),
        updateCount: 0,
        fps: 0,
        latency: 0
    });

    // Game statistics
    const [gameStats, setGameStats] = useState({
        paddleMoves: 0,
        ballPositionUpdates: 0,
        collisions: 0,
        scores: {
            player1: 0,
            player2: 0
        }
    });

    // Control states
    const [isPaused, setIsPaused] = useState(false);
    const [isAutoPilot, setIsAutoPilot] = useState(false);
    const [showDebugPanel, setShowDebugPanel] = useState(true);

    // Refs
    const gameSocketRef = useRef(null);
    const gameLoopRef = useRef(null);
    const lastUpdateTimeRef = useRef(Date.now());

    // Utility functions
    const addMessage = (direction, data) => {
        setMessages(prev => [
            ...prev, 
            {
                time: new Date().toLocaleTimeString(),
                direction,
                data
            }
        ].slice(-50)); // Keep last 50 messages
    };

    const addLogEntry = (message, type = 'info') => {
        setEventLog(prev => [
            ...prev,
            {
                time: new Date().toLocaleTimeString(),
                type,
                message
            }
        ].slice(-100)); // Keep last 100 entries
    };

    const updateDebugInfo = () => {
        const now = Date.now();
        const timeSinceLastUpdate = now - debugInfo.lastUpdate;
        
        setDebugInfo(prev => ({
            lastUpdate: now,
            updateCount: prev.updateCount + 1,
            fps: Math.round(1000 / timeSinceLastUpdate),
            latency: prev.latency
        }));
    };

    // Game control functions
    const movePaddle = (direction) => {
        if (!gameSocketRef.current?.isSocketConnected() || !gameState) return;

        const currentY = gameState[`player${playerNumber}`]?.y || 0;
        const moveAmount = direction === 'up' ? -20 : 20;
        const newY = Math.max(0, Math.min(300, currentY + moveAmount));

        gameSocketRef.current.send({
            type: 'paddle_move',
            y: newY
        });
        addMessage('sent', { type: 'paddle_move', y: newY });
        
        setGameStats(prev => ({
            ...prev,
            paddleMoves: prev.paddleMoves + 1
        }));
    };

    const togglePause = () => {
        if (!gameSocketRef.current?.isSocketConnected()) return;

        const newPauseState = !isPaused;
        gameSocketRef.current.send({
            type: newPauseState ? 'pause_game' : 'resume_game'
        });
        setIsPaused(newPauseState);
        addLogEntry(`Game ${newPauseState ? 'paused' : 'resumed'}`);
    };

    const toggleAutoPilot = () => {
        setIsAutoPilot(!isAutoPilot);
        addLogEntry(`AutoPilot ${!isAutoPilot ? 'enabled' : 'disabled'}`);
    };


    // Game loop and auto-pilot
    useEffect(() => {
        if (isAutoPilot && gameState?.ball && !isPaused) {
            const autoPilotInterval = setInterval(() => {
                const ballY = gameState.ball.y;
                const paddleY = gameState[`player${playerNumber}`]?.y || 0;
                const paddleCenter = paddleY + 55; // Half paddle height

                if (Math.abs(ballY - paddleCenter) > 10) {
                    movePaddle(ballY > paddleCenter ? 'down' : 'up');
                }
            }, 50);

            return () => clearInterval(autoPilotInterval);
        }
    }, [isAutoPilot, gameState, isPaused, playerNumber]);

    // Main WebSocket setup
    useEffect(() => {
        if (!location.state?.gameId) {
            navigate('/dashboard');
            return;
        }

        const { gameId } = location.state;
        setGameId(gameId);
        addLogEntry(`Initializing game ${gameId}`);

        // Create and configure WebSocket
        gameSocketRef.current = new GameWebSocket();

        // Connection handlers
        gameSocketRef.current.on('connect', () => {
            setIsConnected(true);
            setStatus('connected');
            addLogEntry('Connected to game server', 'success');
        });

        gameSocketRef.current.on('disconnect', () => {
            setIsConnected(false);
            setStatus('disconnected');
            addLogEntry('Disconnected from game server', 'warning');
            setIsPaused(true);
        });

        gameSocketRef.current.on('error', (error) => {
            setStatus('error');
            addLogEntry(`WebSocket error: ${error.message}`, 'error');
        });

        // Game state handlers
        gameSocketRef.current.on('game_info', (data) => {
            setPlayerNumber(data.player_number);
            setGameState(data.state);
            addMessage('received', { type: 'game_info', data });
            addLogEntry(`Assigned as Player ${data.player_number}`, 'info');
        });

        gameSocketRef.current.on('state_update', (changes) => {
            setGameState(prev => {
                const newState = { ...prev, ...changes };
                updateDebugInfo();
                return newState;
            });
            addMessage('received', { type: 'state_update', changes });
        });

        gameSocketRef.current.on('paddle_update', (data) => {
            addMessage('received', { type: 'paddle_update', data });
            setGameStats(prev => ({
                ...prev,
                paddleMoves: prev.paddleMoves + 1
            }));
        });

        gameSocketRef.current.on('ball_update', (data) => {
            addMessage('received', { type: 'ball_update', data });
            setGameStats(prev => ({
                ...prev,
                ballPositionUpdates: prev.ballPositionUpdates + 1,
                collisions: data.collision ? prev.collisions + 1 : prev.collisions
            }));
        });

        gameSocketRef.current.on('score_update', (data) => {
            addMessage('received', { type: 'score_update', data });
            setGameStats(prev => ({
                ...prev,
                scores: {
                    ...prev.scores,
                    [data.player]: prev.scores[data.player] + 1
                }
            }));
        });

        gameSocketRef.current.on('game_paused', () => {
            setIsPaused(true);
            addLogEntry('Game paused');
        });

        gameSocketRef.current.on('game_resumed', () => {
            setIsPaused(false);
            addLogEntry('Game resumed');
        });

        // Connect to game
        gameSocketRef.current.connect(gameId);

        // Cleanup
        return () => {
            if (gameSocketRef.current) {
                addLogEntry('Cleaning up game connection');
                gameSocketRef.current.disconnect();
            }
        };
    }, [location.state, navigate]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!isConnected || isPaused) return;

            switch (e.key) {
                case 'ArrowUp':
                    movePaddle('up');
                    break;
                case 'ArrowDown':
                    movePaddle('down');
                    break;
                case ' ':
                    togglePause();
                    break;
                case 'a':
                    toggleAutoPilot();
                    break;
                case 'd':
                    setShowDebugPanel(prev => !prev);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isConnected, isPaused]);

    return (
        <div className="min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary p-4"
            tabIndex={0}>
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Remote Game Testing Panel</h1>
                        <p className="text-sm">Game ID: {gameId} | Player: {playerNumber} | Status: {status}</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => setShowDebugPanel(prev => !prev)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            {showDebugPanel ? 'Hide' : 'Show'} Debug
                        </button>
                        <button
                            onClick={() => {
                                gameSocketRef.current?.disconnect();
                                navigate('/dashboard');
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Exit Game
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-12 gap-4">
                    {/* Game View and Controls */}
                    <div className="col-span-8 space-y-4">
                        {/* Game Canvas */}
                        <div className="bg-black rounded-lg p-4">
                            <GameStateMonitor 
                                gameState={gameState} 
                                showTrails={showDebugPanel}
                            />
                            {showDebugPanel && <GameDebugPanel gameState={gameState} />}
                        </div>

                        {/* Game Controls */}
                        <div className="bg-backdrop-80 rounded-lg p-4">
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    onClick={() => movePaddle('up')}
                                    disabled={!isConnected || isPaused}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                >
                                    Move Up (↑)
                                </button>
                                <button
                                    onClick={() => movePaddle('down')}
                                    disabled={!isConnected || isPaused}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                >
                                    Move Down (↓)
                                </button>
                                <button
                                    onClick={togglePause}
                                    disabled={!isConnected}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded disabled:opacity-50"
                                >
                                    {isPaused ? 'Resume (Space)' : 'Pause (Space)'}
                                </button>
                                <button
                                    onClick={toggleAutoPilot}
                                    disabled={!isConnected}
                                    className={`px-4 py-2 ${isAutoPilot ? 'bg-red-500' : 'bg-green-500'} text-white rounded disabled:opacity-50`}
                                >
                                    {isAutoPilot ? 'Disable AutoPilot (A)' : 'Enable AutoPilot (A)'}
                                </button>
                            </div>
                        </div>

                        {/* Game Stats */}
                        <div className="bg-backdrop-80 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-2">Game Stats</h3>
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">FPS</p>
                                    <p className="text-xl">{debugInfo.fps}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Paddle Moves</p>
                                    <p className="text-xl">{gameStats.paddleMoves}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Ball Updates</p>
                                    <p className="text-xl">{gameStats.ballPositionUpdates}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Collisions</p>
                                    <p className="text-xl">{gameStats.collisions}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monitoring Panels */}
                    <div className="col-span-4 space-y-4">
                        {/* WebSocket Messages */}
                        <div className="bg-backdrop-80 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-2">WebSocket Messages</h3>
                            <MessageMonitor messages={messages} />
                        </div>

                        {/* Event Log */}
                        <div className="bg-backdrop-80 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-2">Event Log</h3>
                            <div className="bg-black bg-opacity-20 p-4 rounded overflow-auto max-h-96">
                                {eventLog.map((entry, index) => (
                                    <div 
                                        key={index} 
                                        className={`mb-2 ${
                                            entry.type === 'error' ? 'text-red-400' :
                                            entry.type === 'warning' ? 'text-yellow-400' :
                                            entry.type === 'success' ? 'text-green-400' :
                                            'text-white'
                                        }`}
                                    >
                                        <span className="text-gray-400">{entry.time}</span>
                                        <span className="ml-2">{entry.message}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testing Controls */}
                        <div className="bg-backdrop-80 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-2">Testing Controls</h3>
                            <GameTestingControls 
                                onTest={(type, data) => {
                                    if (gameSocketRef.current?.isSocketConnected()) {
                                        gameSocketRef.current.send({ type, ...data });
                                        addLogEntry(`Sent test: ${type}`);
                                    }
                                }}
                                isConnected={isConnected}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoteGameTest;