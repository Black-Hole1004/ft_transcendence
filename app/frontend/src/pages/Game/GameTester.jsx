import React, { useEffect, useRef, useState } from 'react'
import GameWebSocket from '../../services/GameWebSocket'

const GameTester = ({ gameId }) => {
	const [gameState, setGameState] = useState(null)
	const [debugInfo, setDebugInfo] = useState({})
	const [connected, setConnected] = useState(false)
	const [playerNumber, setPlayerNumber] = useState(null)
	const [isMovingUp, setIsMovingUp] = useState(false);
	const [isMovingDown, setIsMovingDown] = useState(false);
	const canvasRef = useRef(null)
	const wsRef = useRef(null)

	useEffect(() => {
		const ws = new GameWebSocket()
		wsRef.current = ws

		// Connect and set up handlers
		ws.connect(gameId)

		ws.on('connect', () => {
			console.log('Connected to game')
			setConnected(true)
		})

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);  // Debug print
        });

        ws.on('game_info', (data) => {
            console.log('Received game info:', data)
            console.log('Initial game state:', data.state);
            setPlayerNumber(data.player_number)
            // Transform the state to match the format we need
            setGameState({
                ...data.state,
                player1_paddle: {
                    x: data.state.player1.x,
                    y: data.state.player1.y
                },
                player2_paddle: {
                    x: data.state.player2.x,
                    y: data.state.player2.y
                }
            })
            setDebugInfo((prev) => ({ ...prev, settings: data.settings }))
        })
        
		// ws.on('state_update', (data) => {
		// 	console.log('Received state update:', data);
		// 	setGameState(prev => {
		// 		if (!data.state) {
		// 			console.error('Received invalid state update:', data);
		// 			return prev;
		// 		}
		
		// 		return {
		// 			...prev,
		// 			ball: data.state.ball || prev.ball,
		// 			player1_paddle: data.state.player1_paddle || prev.player1_paddle,
		// 			player2_paddle: data.state.player2_paddle || prev.player2_paddle,
		// 		};
		// 	});
		// });
		
		// ws.on('paddles_update', (data) => {
		// 	console.log('Paddle update received:', data);
		// 	setGameState((prev) => {
		// 		console.log('Previous state:', prev);
				
		// 		const newState = {
		// 			...prev,
		// 			player1_paddle: {
		// 				...prev.player1_paddle,  // Keep existing paddle properties
		// 				x: data.paddles['1'].x,  // Update x
		// 				y: data.paddles['1'].y   // Update y
		// 			},
		// 			player2_paddle: {
		// 				...prev.player2_paddle,  // Keep existing paddle properties
		// 				x: data.paddles['2'].x,  // Update x
		// 				y: data.paddles['2'].y   // Update y
		// 			}
		// 		};
				
		// 		console.log('New state:', newState);
		// 		return newState;
		// 	});
		// });
		ws.on('ball_update', (data) => {
			setGameState(prev => ({
				...prev,
				ball: data.state.ball
			}));
		});
		
		ws.on('paddles_update', (data) => {
			setGameState(prev => ({
				...prev,
				player1_paddle: data.paddles['1'],
				player2_paddle: data.paddles['2']
			}));
		});

		ws.on('score_update', (data) => {
			setDebugInfo((prev) => ({
				...prev,
				scores: data.scores,
				lastScorer: data.scorer,
			}))
		})

		ws.on('game_started', (data) => {
			console.log('Game started:', data);
		});
		
		return () => {
			ws.disconnect()
		}
	}, [gameId, setGameState, setDebugInfo])

	// Draw game state on canvas
	useEffect(() => {

        // Add this at the start of the effect
		if (!gameState) {
			console.log('No game state available');
			return;
		}
		

        if (gameState) {
            console.log('Current game state:', {
                ball: gameState.ball,
                player1: gameState.player1_paddle,
                player2: gameState.player2_paddle
            });
        }
            
        if (!canvasRef.current || !gameState || !debugInfo.settings) return
    
        const ctx = canvasRef.current.getContext('2d')
        const canvas = canvasRef.current
    
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        // Draw background
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    
        // Draw center line
        ctx.setLineDash([5, 15])
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, 0)
        ctx.lineTo(canvas.width / 2, canvas.height)
        ctx.strokeStyle = 'white'
        ctx.stroke()
    
        // Draw ball with trail effect
        if (gameState.ball) {
            ctx.shadowBlur = 20
            ctx.shadowColor = 'rgba(255, 0, 0, 0.5)'
            ctx.beginPath()
            ctx.arc(
                gameState.ball.x,
                gameState.ball.y,
                debugInfo.settings?.ballRadius || 10,
                0,
                Math.PI * 2
            )
            ctx.fillStyle = 'red'
            ctx.fill()
            ctx.closePath()
            ctx.shadowBlur = 0
        }
    
        // Draw paddles with rounded corners
        const drawPaddle = (x, y, color) => {
            const width = debugInfo.settings?.paddle_width || 20
            const height = debugInfo.settings?.paddle_height || 110
            const radius = 10
    
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.moveTo(x + radius, y)
            ctx.lineTo(x + width - radius, y)
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
            ctx.lineTo(x + width, y + height - radius)
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
            ctx.lineTo(x + radius, y + height)
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
            ctx.lineTo(x, y + radius)
            ctx.quadraticCurveTo(x, y, x + radius, y)
            ctx.closePath()
            ctx.fill()
        }
    
        // Actually draw the paddles - ADD THIS!
        if (gameState.player1_paddle) {
            console.log('Drawing player 1 paddle:', gameState.player1_paddle); // Debug
            drawPaddle(
                gameState.player1_paddle.x,
                gameState.player1_paddle.y,
                'rgba(0, 123, 255, 0.8)'
            )
        }
    
        if (gameState.player2_paddle) {
            console.log('Drawing player 2 paddle:', gameState.player2_paddle); // Debug
            drawPaddle(
                gameState.player2_paddle.x,
                gameState.player2_paddle.y,
                'rgba(40, 167, 69, 0.8)'
            )
        }
    }, [gameState, debugInfo.settings]) // Make sure to include debugInfo.settings in dependencies for this effect because we use it in the effect

	// Handle paddle movement for testing
	const handleKeyDown = (e) => {
		if (!wsRef.current || !playerNumber) return

		const STEP = 10
		let newY = null

		if (playerNumber === 1) {
			if (e.key === 'ArrowUp') newY = (gameState?.player1_paddle?.y || 0) - STEP
			if (e.key === 'ArrowDown') newY = (gameState?.player1_paddle?.y || 0) + STEP
		} else {
			if (e.key === 'ArrowUp') newY = (gameState?.player2_paddle?.y || 0) - STEP
			if (e.key === 'ArrowDown') newY = (gameState?.player2_paddle?.y || 0) + STEP
		}

		if (newY !== null) {
			wsRef.current.sendPaddleMove(newY)
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [playerNumber, gameState])

	const handleStartGame = () => {
		wsRef.current?.send({ type: 'start_game' })
	}

	const handlePlayerReady = () => {
		wsRef.current?.send({ type: 'player_ready' })
	}

	return (
		<div className='p-4 bg-gray-900 text-white min-h-screen'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-6 bg-gray-800 rounded-lg p-4'>
					<h2 className='text-2xl font-bold text-blue-400 mb-2'>Game Mechanics Tester</h2>
					<div className='flex gap-4'>
						<div className='px-4 py-2 bg-gray-700 rounded'>
							Status:{' '}
							<span className={connected ? 'text-green-400' : 'text-red-400'}>
								{connected ? 'Connected' : 'Disconnected'}
							</span>
						</div>
						<div className='px-4 py-2 bg-gray-700 rounded'>
							Player:{' '}
							<span className='text-yellow-400'>
								{playerNumber ? `Player ${playerNumber}` : 'Not assigned'}
							</span>
						</div>
					</div>
				</div>

				<div className='flex gap-4 mb-6'>
					<button
						onClick={handleStartGame}
						className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
					>
						Start Game
					</button>
					<button
						onClick={handlePlayerReady}
						className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors'
					>
						Ready
					</button>
				</div>

				<div className='flex gap-8 flex-wrap'>
					<div className='bg-gray-800 rounded-lg p-4 flex-grow'>
						<div className='relative'>
							<canvas
								ref={canvasRef}
								width={800}
								height={400}
								className='rounded-lg bg-black w-full'
								style={{ aspectRatio: '2/1' }}
							/>
							{/* Controls overlay */}
							<div className='absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded'>
								<div className='flex justify-between text-sm'>
									<div>Player 1: W/S keys</div>
									<div>Player 2: ↑/↓ arrows</div>
								</div>
							</div>
						</div>
					</div>

					<div className='bg-gray-800 rounded-lg p-4 w-96'>
						<div className='mb-4'>
							<h3 className='text-lg font-bold text-blue-400 mb-2'>Debug Controls</h3>
							<div className='space-y-2'>
								<button
									onClick={() => wsRef.current?.send({ type: 'pause_game' })}
									className='w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded transition-colors'
								>
									Toggle Pause
								</button>
							</div>
						</div>

						<h3 className='text-lg font-bold text-blue-400 mb-2'>Debug Info</h3>
						<div className='bg-gray-900 rounded p-3 mb-4 overflow-auto max-h-40'>
							<pre className='text-xs text-gray-300 whitespace-pre-wrap'>
								{JSON.stringify(debugInfo, null, 2)}
							</pre>
						</div>

						<h3 className='text-lg font-bold text-blue-400 mb-2'>Game State</h3>
						<div className='bg-gray-900 rounded p-3 overflow-auto max-h-40'>
							<pre className='text-xs text-gray-300 whitespace-pre-wrap'>
								{JSON.stringify(gameState, null, 2)}
							</pre>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameTester
