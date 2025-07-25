import React, { useEffect, useRef, useState } from 'react'
import MonteCarloAI from '../../services/MonteCarloAI'

const AIPongTable = ({
	isPaused,
	handlePause,
	backgroundId,
	updateScore,
	isGameOver,
	resetParameters,
	difficulty,
}) => {
	// Canvas setup with standard game dimensions
	const [canvasSize] = useState({ width: 800, height: 400 })
	const canvasRef = useRef(null)
	const containerRef = useRef(null)
	const requestRef = useRef(null)
	const lastTimeRef = useRef(null)
	const aiRef = useRef(null)
	const [width, setWidth] = useState(window.innerWidth);

	// Initialize AI with only difficulty parameter
	if (!aiRef.current) {
		aiRef.current = new MonteCarloAI(difficulty)
	}

	// Game constants for standardized gameplay
	const CONSTANTS = {
		paddleWidth: 16,
		paddleHeight: 80,
		paddleX: 5,
		ballRadius: 10,
		ballInitialSpeed: 2,
		ballAcceleration: 0.05,
		paddleSpeed: 600,
		maxBallSpeed: 10,
		maxCanvasWidth: 1200,
		playerColor: '#FFFFFF', // White for player
		aiColor: '#FF0000', // Red for AI
		ballColor: '#FFFFFF', // White for ball
	}

	// Paddle position states
	const [playerY, setPlayerY] = useState(200 - CONSTANTS.paddleHeight / 2)
	const [aiY, setAiY] = useState(200 - CONSTANTS.paddleHeight / 2)
	const [isPlayerMovingUp, setIsPlayerMovingUp] = useState(false)
	const [isPlayerMovingDown, setIsPlayerMovingDown] = useState(false)

	// Initialize ball with randomized direction
	const ballsRef = useRef([
		{
			x: canvasSize.width / 2,
			y: canvasSize.height / 2,
			radius: CONSTANTS.ballRadius,
			speed: CONSTANTS.ballInitialSpeed,
			velocityX: Math.random() > 0.5 ? 5 : -5,
			velocityY: (Math.random() - 0.5) * 8,
			color: CONSTANTS.ballColor,
		},
	])

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		const ai = aiRef.current

		// Handle ball collision with paddles
		const handleCollision = (ball, paddle, isAI) => {
			ball.velocityX = -ball.velocityX

			if (isAI) {
				ai.recordHit({ x: ball.x, y: ball.y }, paddle.y)
			}

			// Adjust ball position and add some randomness to vertical velocity
			if (paddle.x < canvasSize.width / 2) {
				ball.x = paddle.x + paddle.width + ball.radius
				// ball.velocityY += (Math.random()) * 2
			} else {
				ball.x = paddle.x - ball.radius
				// ball.velocityY += (Math.random()) * 2
			}

			// Increase ball speed with each hit
			ball.speed = Math.min(ball.speed + CONSTANTS.ballAcceleration, CONSTANTS.maxBallSpeed)
		}

		const updateGame = (time) => {
			if (isPaused || isGameOver) return

			const deltaTime = (time - lastTimeRef.current) / 1000
			lastTimeRef.current = time

			ballsRef.current.forEach((ball) => {
				// Update ball position
				const nextX = ball.x + ball.velocityX * ball.speed
				const nextY = ball.y + ball.velocityY * ball.speed

				// Handle wall collisions
				if (nextY + ball.radius > canvasSize.height || nextY - ball.radius < 0) {
					ball.velocityY = -ball.velocityY
					ball.y =
						nextY + ball.radius > canvasSize.height
							? canvasSize.height - ball.radius
							: ball.radius
				} else {
					ball.y = nextY
				}

				// AI prediction and movement
				const prediction = ai.predictBallPosition(
					{ x: ball.x, y: ball.y },
					{ x: ball.velocityX * ball.speed, y: ball.velocityY * ball.speed },
					{ height: CONSTANTS.paddleHeight }
				)


				const aiSpeed = ai.getAdjustedSpeed(CONSTANTS.paddleSpeed) * deltaTime;
				const targetY = prediction.y - CONSTANTS.paddleHeight / 2;
				const currentY = aiY;
				const distance = targetY - currentY;

				// Add deadzone to prevent micro-movements
				const deadzone = 5;
				if (Math.abs(distance) > deadzone) {
					const smoothing = 0.5; // Reduces jittery movement
					const movement = Math.sign(distance) * Math.min(Math.abs(distance) * smoothing, aiSpeed);
					
					setAiY(prev => Math.max(0, 
						Math.min(canvasSize.height - CONSTANTS.paddleHeight, prev + movement)));
				}


				// Check paddle collisions
				const playerPaddle = {
					x: CONSTANTS.paddleX,
					y: playerY,
					width: CONSTANTS.paddleWidth,
					height: CONSTANTS.paddleHeight,
				}
				const aiPaddle = {
					x: canvasSize.width - CONSTANTS.paddleWidth - CONSTANTS.paddleX,
					y: aiY,
					width: CONSTANTS.paddleWidth,
					height: CONSTANTS.paddleHeight,
				}

				// Handle collisions and scoring
				if (checkCollision(ball, playerPaddle)) {
					handleCollision(ball, playerPaddle, false)
				} else if (checkCollision(ball, aiPaddle)) {
					handleCollision(ball, aiPaddle, true)
				} else {
					ball.x = nextX
				}

				// Check for scoring
				if (ball.x < 0 || ball.x > canvasSize.width) {
					const scorer = ball.x < 0 ? 'ai' : 'player'
					if (scorer === 'ai') {
						ai.recordHit({ x: ball.x, y: ball.y }, aiY)
					} else {
						ai.recordMiss()
					}
					updateScore(scorer)
					resetBall()
				}
			})

			// Update player paddle position
			if (isPlayerMovingUp) {
				setPlayerY((prev) => Math.max(prev - CONSTANTS.paddleSpeed * deltaTime, 0))
			}
			if (isPlayerMovingDown) {
				setPlayerY((prev) =>
					Math.min(
						prev + CONSTANTS.paddleSpeed * deltaTime,
						canvasSize.height - CONSTANTS.paddleHeight
					)
				)
			}

			drawGame()
			requestRef.current = requestAnimationFrame(updateGame)
		}

		const drawGame = () => {
			ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

			// Draw background
			if (backgroundId) {
				const background = new Image()
				background.src = `/assets/images/tables/table${backgroundId}.${backgroundId > 6 ? 'gif' : 'webp'}`
				ctx.drawImage(background, 0, 0, canvasSize.width, canvasSize.height)
			}

			// Draw paddles
			drawPaddle(CONSTANTS.paddleX, playerY, CONSTANTS.playerColor)
			drawPaddle(
				canvasSize.width - CONSTANTS.paddleWidth - CONSTANTS.paddleX,
				aiY,
				CONSTANTS.aiColor
			)

			// Draw ball
			ballsRef.current.forEach(drawBall)
		}

		const drawPaddle = (x, y, color) => {
			ctx.fillStyle = color
			ctx.beginPath()
			const radius = 8
			// Draw paddle with rounded corners
			ctx.moveTo(x + radius, y)
			ctx.lineTo(x + CONSTANTS.paddleWidth - radius, y)
			ctx.quadraticCurveTo(
				x + CONSTANTS.paddleWidth,
				y,
				x + CONSTANTS.paddleWidth,
				y + radius
			)
			ctx.lineTo(x + CONSTANTS.paddleWidth, y + CONSTANTS.paddleHeight - radius)
			ctx.quadraticCurveTo(
				x + CONSTANTS.paddleWidth,
				y + CONSTANTS.paddleHeight,
				x + CONSTANTS.paddleWidth - radius,
				y + CONSTANTS.paddleHeight
			)
			ctx.lineTo(x + radius, y + CONSTANTS.paddleHeight)
			ctx.quadraticCurveTo(
				x,
				y + CONSTANTS.paddleHeight,
				x,
				y + CONSTANTS.paddleHeight - radius
			)
			ctx.lineTo(x, y + radius)
			ctx.quadraticCurveTo(x, y, x + radius, y)
			ctx.closePath()
			ctx.fill()
		}

		const drawBall = (ball) => {
			ctx.beginPath()
			ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
			ctx.fillStyle = ball.color
			ctx.fill()
			ctx.closePath()
		}

		const checkCollision = (ball, paddle) => {
			return (
				ball.x + ball.radius > paddle.x &&
				ball.x - ball.radius < paddle.x + paddle.width &&
				ball.y + ball.radius > paddle.y &&
				ball.y - ball.radius < paddle.y + paddle.height
			)
		}

		const resetBall = () => {
			const angle = ((Math.random() - 0.5) * Math.PI) / 2
			ballsRef.current = [
				{
					x: canvasSize.width / 2,
					y: canvasSize.height / 2,
					radius: CONSTANTS.ballRadius,
					speed: CONSTANTS.ballInitialSpeed,
					velocityX: Math.cos(angle) * (Math.random() > 0.5 ? 1 : -1) * 5,
					velocityY: Math.sin(angle) * 5,
					color: CONSTANTS.ballColor,
				},
			]
		}

		requestRef.current = requestAnimationFrame(updateGame)
		return () => cancelAnimationFrame(requestRef.current)
	}, [isPaused, isGameOver, playerY, aiY, backgroundId])

	const handleKeyDown = (e) => {
		e.preventDefault()
		if ((e.type === 'pointerdown' || e.type === 'mousedown') && e.target.id === '1') setIsPlayerMovingUp(true)
		if ((e.type === 'pointerdown' || e.type === 'mousedown') && e.target.id === '2') setIsPlayerMovingDown(true)
		if (e.key === 'ArrowUp') setIsPlayerMovingUp(true)
		if (e.key === 'ArrowDown') setIsPlayerMovingDown(true)
	}
				
	const handleKeyUp = (e) => {
		e.preventDefault()
		if ((e.type === 'pointerup' || e.type === 'mouseup') && e.target.id === '1') setIsPlayerMovingUp(false)
		if ((e.type === 'pointerup' || e.type === 'mouseup') && e.target.id === '2') setIsPlayerMovingDown(false)
		if (e.key === 'ArrowUp') setIsPlayerMovingUp(false)
		if (e.key === 'ArrowDown') setIsPlayerMovingDown(false)
	}

	// Handle keyboard controls
	useEffect(() => {

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [])

	window.addEventListener('resize', () => {
		setWidth(window.innerWidth)
	})

	return (
		<div
			ref={containerRef}
			className='flex flex-col items-center gap-7 max-lg:order-first max-lg:w-full'
		>
							<div
					className={`relative aspect-video bg-cover bg-center border rounded-2xl overflow-hidden
					${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
					style={{
						width: 'clamp(18.125rem, 40.265vw + 10.575rem, 75rem)',
						maxWidth: `${CONSTANTS.maxCanvasWidth}px`,
					}}
				>
					<div
						className='absolute inset-0 bg-cover bg-center brightness-50 rounded-2xl'
						style={{
							backgroundImage: `url('/assets/images/tables/table${backgroundId}.${backgroundId > 6 ? 'gif' : 'webp'}')`,
						}}
					/>

					<canvas
						ref={canvasRef}
						width={canvasSize.width}
						height={canvasSize.height}
						className='absolute top-0 left-0 rounded-2xl'
						style={{
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
				{isPaused && (
					<div>
						<p
							className='text-[100px] font-dreamscape text-center leading-[1.01] game-paused
							absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
						>
							GAME PAUSED
						</p>
					</div>
				)}
			{!isGameOver && (
				<button
					onClick={handlePause}
					className='pause flex items-center gap-3 brightness-[1] leading-[0.95]'
				>
					<img onContextMenu={(e) => e.preventDefault()} src={`/assets/images/icons/${isPaused ? 'play' : 'pause'}.svg`} alt='pause icon' />
					<p className='align-middle'>{isPaused ? 'resume' : 'pause'}</p>
				</button>
			)}
			{width <= 768 && (
				<div className='w-[86%] flex justify-between'>
					<button className='w-[15%]' onContextMenu={(e) => e.preventDefault()} onPointerUp={handleKeyUp} onPointerDown={handleKeyDown}>
						<img src='/assets/images/icons/up.svg' id='1' />
					</button>
					<button className='w-[15%]' onContextMenu={(e) => e.preventDefault()} onPointerUp={handleKeyUp} onPointerDown={handleKeyDown}>
						<img src='/assets/images/icons/down.svg' id='2' />					
					</button>
				</div>
			)}
		</div>
	)
}

export default AIPongTable