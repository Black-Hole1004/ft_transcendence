import React, { useEffect, useRef, useState } from 'react'

export default function RemotePongTable({ gameSocket, isGameOver, settings, playerNumber }) {
	const canvasRef = useRef(null)
	const requestRef = useRef(null)
	const [gameState, setGameState] = useState({
		ball: { x: 400, y: 200, radius: settings?.ballRadius || 15 },
		player1: { y: 150, height: settings?.paddleHeight || 110 },
		player2: { y: 150, height: settings?.paddleHeight || 110 },
	})

	const paddleWidth = 20
	const paddleX = 5
	const canvasWidth = 800
	const canvasHeight = 400

	// Handle state updates from server
	useEffect(() => {
        if (!gameSocket) return;
    
        const handleStateUpdate = (state) => {
            console.log('PongTable received state update:', state);  // Debug log
            
            setGameState(prev => {
                const newState = {
                    ball: {
                        ...prev.ball,
                        x: state.ball?.x ?? prev.ball.x,
                        y: state.ball?.y ?? prev.ball.y
                    },
                    player1: {
                        ...prev.player1,
                        y: state.paddles?.[1]?.y ?? prev.player1.y,
                        height: prev.player1.height
                    },
                    player2: {
                        ...prev.player2,
                        y: state.paddles?.[2]?.y ?? prev.player2.y,
                        height: prev.player2.height
                    }
                };
                console.log('Updating game state from:', prev, 'to:', newState);  // Debug log
                return newState;
            });
        };
    
        console.log('Setting up state update handler');  // Debug log
        gameSocket.on('state_update', handleStateUpdate);
    
        return () => {
            console.log('Cleaning up state update handler');  // Debug log
            gameSocket.on('state_update', null);
        };
    }, [gameSocket]);

	// Handle mouse movement
	useEffect(() => {
		const canvas = canvasRef.current

		const handleMouseMove = (e) => {
			if (!gameSocket) return

			const rect = canvas.getBoundingClientRect()
			const y = (e.clientY - rect.top) * (canvasHeight / rect.height)

			// Only send paddle position if we're the correct player
			if (playerNumber === 1 || playerNumber === 2) {
				console.log('Sending paddle move:', { player: playerNumber, y })
				gameSocket.sendPaddleMove(y)
			}
		}

		canvas.addEventListener('mousemove', handleMouseMove)
		return () => canvas.removeEventListener('mousemove', handleMouseMove)
	}, [gameSocket, playerNumber])

	// Render game
	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')

		const renderGame = () => {
			// Clear canvas
			ctx.clearRect(0, 0, canvasWidth, canvasHeight)

			// Draw background
			if (settings?.backgroundId) {
				const background = new Image()
				background.src = `/assets/images/tables/table${settings.backgroundId}.png`
				ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight)
			} else {
				// Draw black background if no image
				ctx.fillStyle = '#000000'
				ctx.fillRect(0, 0, canvasWidth, canvasHeight)
			}

			// Draw paddles
			ctx.fillStyle = settings?.player1Color || '#FFFFFF'
			drawPaddle(ctx, paddleX, gameState.player1.y, gameState.player1.height)

			ctx.fillStyle = settings?.player2Color || '#FFFFFF'
			drawPaddle(
				ctx,
				canvasWidth - paddleWidth - paddleX,
				gameState.player2.y,
				gameState.player2.height
			)

			// Draw ball
			ctx.fillStyle = settings?.ballColor || '#FFFFFF'
			drawBall(ctx, gameState.ball)

			requestRef.current = requestAnimationFrame(renderGame)
		}

		renderGame()
		return () => cancelAnimationFrame(requestRef.current)
	}, [gameState, settings])

	const drawPaddle = (ctx, x, y, height) => {
		ctx.fillRect(x, y, paddleWidth, height)
		ctx.beginPath()
		ctx.arc(x + paddleWidth / 2, y, paddleWidth / 2, 0, Math.PI * 2)
		ctx.arc(x + paddleWidth / 2, y + height, paddleWidth / 2, 0, Math.PI * 2)
		ctx.fill()
	}

	const drawBall = (ctx, ball) => {
		ctx.beginPath()
		ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
		ctx.fill()
		ctx.closePath()
	}

	return (
		<div className='flex flex-col items-center gap-7 max-lg:order-first max-lg:w-full'>
			<canvas
				ref={canvasRef}
				width={canvasWidth}
				height={canvasHeight}
				className='game-table border'
				style={{
					borderRadius: '25px',
					width: '100%',
					height: 'auto',
					maxWidth: '1200px',
				}}
			/>
		</div>
	)
}
