import React, { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import _ from 'lodash';
import GameWebSocket from '../../services/GameWebSocket';

const GameTester = ({ gameId }) => {
	const [gameState, setGameState] = useState(null);
	const [debugInfo, setDebugInfo] = useState({});
	const [connected, setConnected] = useState(false);
	const [playerNumber, setPlayerNumber] = useState(null);
	const canvasRef = useRef(null);
	const wsRef = useRef(null);

	const keysRef = useRef(new Set());
	const frameRef = useRef(null);

	// for intrpolaration of ball movement
	const [ballPosition, setBallPosition] = useState({ x: 400, y: 200 });
	const lastBallUpdate = useRef({ x: 400, y: 200 });
	const interpolationFrame = useRef(null);

	// timer
	const [timeRemaining, setTimeRemaining] = useState(65);

	// pasuse/resume game
	const [isPaused, setIsPaused] = useState(false);
	const [pausingPlayer, setPausingPlayer] = useState(null);
	const [pausesRemaining, setPausesRemaining] = useState({ 1: 3, 2: 3 });
	// Format time function
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		let str = `${mins}:${secs.toString().padStart(2, '0')}`;
		return str;
	};

	const interpolateBallPosition = useCallback(() => {
		const INTERPOLATION_FACTOR = 0.7;

		setBallPosition((current) => {
			const dx = lastBallUpdate.current.x - current.x;
			const dy = lastBallUpdate.current.y - current.y;

			return {
				x: current.x + dx * INTERPOLATION_FACTOR,
				y: current.y + dy * INTERPOLATION_FACTOR,
			};
		});

		interpolationFrame.current = requestAnimationFrame(
			interpolateBallPosition,
		);
	}, []);

	// Start interpolation when component mounts
	useEffect(() => {
		interpolationFrame.current = requestAnimationFrame(
			interpolateBallPosition,
		);

		return () => {
			if (interpolationFrame.current) {
				cancelAnimationFrame(interpolationFrame.current);
			}
		};
	}, [interpolateBallPosition]);

	useEffect(() => {
		const ws = new GameWebSocket();
		wsRef.current = ws;

		// Connect and set up handlers
		ws.connect(gameId);

		ws.on('connect', () => {
			console.log('Connected to game');
			setConnected(true);
		});

		ws.on('error', (error) => {
			console.error('WebSocket error:', error); // Debug print
		});

		ws.on('game_info', (data) => {
			console.log('Received game info:', data);
			console.log('Initial game state:', data.state);
			setPlayerNumber(data.player_number);
			// Transform the state to match the format we need
			setGameState({
				...data.state,
				player1_paddle: {
					x: data.state.player1.x,
					y: data.state.player1.y,
				},
				player2_paddle: {
					x: data.state.player2.x,
					y: data.state.player2.y,
				},
			});
			setDebugInfo((prev) => ({ ...prev, settings: data.settings }));
		});

		ws.on('ball_update', (data) => {
			lastBallUpdate.current = data.state.ball;
			if (data.state.time_remaining !== undefined) {
				setTimeRemaining(data.state.time_remaining);
			}
		});

		ws.on('paddles_update', (data) => {
			setGameState((prev) => ({
				...prev,
				player1_paddle: data.paddles['1'],
				player2_paddle: data.paddles['2'],
			}));
		});

		ws.on('score_update', (data) => {
			setDebugInfo((prev) => ({
				...prev,
				scores: data.scores,
				lastScorer: data.scorer,
			}));
		});

		// Add pause/resume handlers
		ws.on('game_paused', (data) => {
			console.log('Received pause data:', data); // Debug log
			console.log('Game paused by player:', data.player);
			setIsPaused(true);
			setPausingPlayer(data.player);
			console.log(
				'Pauses remaining received from backend:',
				data.pauses_remaining,
			);
			setPausesRemaining(data.pauses_remaining);
			console.log(
				'Pauses remaining assigned: pausesRemaining',
				pausesRemaining,
			);
		});

		ws.on('pause_timeout', (data) => {
			setIsPaused(false);
			setPausingPlayer(null);
			// Optionally show a message
			console.log(`Player ${data.player} lost due to pause timeout`);
		});

		ws.on('game_resumed', (data) => {
			console.log('Game resumed by player:', data.player);
			setIsPaused(false);
			setPausingPlayer(null);
		});

		ws.on('game_started', (data) => {
			console.log('Game started:', data);
		});

		return () => ws.disconnect();
	}, [gameId, setGameState, setDebugInfo]);

	// Handle pause/resume
	const handlePauseGame = () => {
		if (!wsRef.current || !playerNumber) return;

		// check if the player has remaining pauses (can pause)
		if (!isPaused && pausesRemaining[playerNumber] <= 0) {
			console.log('No more pauses remaining');
			return;
		}
		// check if player can resume
		if (isPaused && pausingPlayer !== playerNumber) {
			console.log('Only the pausing player can resume the game');
			return;
		}

		if (isPaused) {
			wsRef.current.send({ type: 'resume_game' });
		} else {
			wsRef.current.send({ type: 'pause_game' });
		}
	};

	// Draw game state on canvas
	useEffect(() => {
		// Add this at the start of the effect
		if (!gameState || !canvasRef.current) {
			console.log('No game state available or canvas not ready'); // Debug
			return;
		}

		if (!canvasRef.current || !gameState || !debugInfo.settings) return;

		const ctx = canvasRef.current.getContext('2d');
		const canvas = canvasRef.current;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw background
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw center line
		ctx.setLineDash([5, 15]);
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, 0);
		ctx.lineTo(canvas.width / 2, canvas.height);
		ctx.strokeStyle = 'white';
		ctx.stroke();

		// Draw ball with trail effect
		if (gameState.ball) {
			ctx.shadowBlur = 20;
			ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
			ctx.beginPath();
			ctx.arc(
				// gameState.ball.x,
				// gameState.ball.y,
				ballPosition.x,
				ballPosition.y,
				debugInfo.settings?.ballRadius || 10,
				0,
				Math.PI * 2,
			);
			ctx.fillStyle = 'red';
			ctx.fill();
			ctx.closePath();
			ctx.shadowBlur = 0;
		}

		// Draw paddles with rounded corners
		const drawPaddle = (x, y, color) => {
			const width = debugInfo.settings?.paddle_width || 20;
			const height = debugInfo.settings?.paddle_height || 110;
			const radius = 10;

			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			ctx.lineTo(x + width, y + height - radius);
			ctx.quadraticCurveTo(
				x + width,
				y + height,
				x + width - radius,
				y + height,
			);
			ctx.lineTo(x + radius, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();
			ctx.fill();
		};

		// Actually draw the paddles - ADD THIS!
		if (gameState.player1_paddle) {
			drawPaddle(
				gameState.player1_paddle.x,
				gameState.player1_paddle.y,
				'rgba(0, 123, 255, 0.8)',
			);
		}

		if (gameState.player2_paddle) {
			drawPaddle(
				gameState.player2_paddle.x,
				gameState.player2_paddle.y,
				'rgba(40, 167, 69, 0.8)',
			);
		}
	}, [gameState, ballPosition, debugInfo.settings]);

	// trthrottle the paddle movement : to avoid sending too many messages
	const throttledSendPaddleMove = useCallback(
		_.throttle((newY) => {
			if (wsRef.current) {
				wsRef.current.sendPaddleMove(newY);
			}
		}, 22), // About 30 updates per second
		[wsRef],
	);

	const movePaddle = useCallback(() => {
		if (!wsRef.current || !playerNumber || !gameState) return;

		const PADDLE_SPEED = 50;
		let currentY =
			playerNumber === 1
				? gameState.player1_paddle?.y || 0
				: gameState.player2_paddle?.y || 0;
		let newY = currentY;

		// Calculate new position based on keys
		if (keysRef.current.has('ArrowUp')) {
			newY = Math.max(0, currentY - PADDLE_SPEED);
		} else if (keysRef.current.has('ArrowDown')) {
			const maxY = 400 - (gameState.player1_paddle?.height || 110);
			newY = Math.min(maxY, currentY + PADDLE_SPEED);
		}

		// Only send if position changed
		// if (newY !== currentY) {
		// 	wsRef.current.sendPaddleMove(newY)
		// }
		// Only send if significant change occurred
		if (newY !== null && Math.abs(newY - currentY) >= 5) {
			throttledSendPaddleMove(newY);
		}

		// Request next frame
		frameRef.current = requestAnimationFrame(movePaddle);
	}, [playerNumber, gameState]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
			e.preventDefault();
			keysRef.current.add(e.key);
		};

		const handleKeyUp = (e) => {
			if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
			keysRef.current.delete(e.key);
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		// Start animation frame
		frameRef.current = requestAnimationFrame(movePaddle);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current);
			}
			keysRef.current.clear();
		};
	}, [movePaddle]);

	const handleStartGame = () => {
		wsRef.current?.send({ type: 'start_game' });
	};

	const handlePlayerReady = () => {
		wsRef.current?.send({ type: 'player_ready' });
	};

	return (
		<div className="p-4 bg-gray-900 text-white min-h-screen">
			<div className="max-w-7xl mx-auto">
				<div className="mb-6 bg-gray-800 rounded-lg p-4">
					<h2 className="text-2xl font-bold text-blue-400 mb-2">
						Game Mechanics Tester
					</h2>
					<div className="flex gap-4">
						<div className="px-4 py-2 bg-gray-700 rounded">
							Status:{' '}
							<span
								className={
									connected
										? 'text-green-400'
										: 'text-red-400'
								}
							>
								{connected ? 'Connected' : 'Disconnected'}
							</span>
						</div>
						<div className="px-4 py-2 bg-gray-700 rounded">
							Player:{' '}
							<span className="text-yellow-400">
								{playerNumber
									? `Player ${playerNumber}`
									: 'Not assigned'}
							</span>
						</div>
					</div>
				</div>

				<div className="mb-4 text-center">
					<p>
						Pauses Remaining - P1: {pausesRemaining[1]} P2:{' '}
						{pausesRemaining[2]}
					</p>
					{isPaused && <p>Paused by Player {pausingPlayer}</p>}
				</div>

				<div className="flex gap-4 mb-6">
					<button
						onClick={handleStartGame}
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
					>
						Start Game
					</button>
					<button
						onClick={handlePlayerReady}
						className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
					>
						Ready
					</button>
					<button
						onClick={handlePauseGame}
						disabled={
							(!isPaused && pausesRemaining[playerNumber] <= 0) ||
							(isPaused && pausingPlayer !== playerNumber)
						}
						className={`px-6 py-3 rounded transition-colors ${
							isPaused
								? 'bg-green-600 hover:bg-green-700'
								: 'bg-yellow-600 hover:bg-yellow-700'
						} ${
							(!isPaused && pausesRemaining[playerNumber] <= 0) ||
							(isPaused && pausingPlayer !== playerNumber)
								? 'opacity-50 cursor-not-allowed'
								: ''
						}`}
					>
						{isPaused
							? 'Resume Game'
							: `Pause Game (${pausesRemaining[playerNumber]} left)`}
					</button>
				</div>

				<div className="flex gap-8 flex-wrap">
					<div className="bg-gray-800 rounded-lg p-4 flex-grow">
						<div className="relative">
							{/* Timer */}
							<div className="text-4xl font-bold text-center mb-4">
								{formatTime(timeRemaining)}
								{/* Debug display */}
								<div className="text-sm text-gray-400">
									Raw time: {timeRemaining}s
								</div>
							</div>
							{/* Canvas */}
							<canvas
								ref={canvasRef}
								width={800}
								height={400}
								className="rounded-lg bg-black w-full"
								style={{ aspectRatio: '2/1' }}
							/>
							{/* Controls overlay */}
							<div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded">
								<div className="flex justify-between text-sm">
									<div>Player 1: W/S keys</div>
									<div>Player 2: ↑/↓ arrows</div>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-gray-800 rounded-lg p-4 w-96">
						<div className="mb-4">
							<h3 className="text-lg font-bold text-blue-400 mb-2">
								Debug Controls
							</h3>
							<div className="space-y-2">
								<button
									onClick={() =>
										wsRef.current?.send({
											type: 'pause_game',
										})
									}
									className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded transition-colors"
								>
									Toggle Pause
								</button>
							</div>
						</div>

						<h3 className="text-lg font-bold text-blue-400 mb-2">
							Debug Info
						</h3>
						<div className="bg-gray-900 rounded p-3 mb-4 overflow-auto max-h-40">
							<pre className="text-xs text-gray-300 whitespace-pre-wrap">
								{JSON.stringify(debugInfo, null, 2)}
							</pre>
						</div>

						<h3 className="text-lg font-bold text-blue-400 mb-2">
							Game State
						</h3>
						<div className="bg-gray-900 rounded p-3 overflow-auto max-h-40">
							<pre className="text-xs text-gray-300 whitespace-pre-wrap">
								{JSON.stringify(gameState, null, 2)}
							</pre>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameTester;
