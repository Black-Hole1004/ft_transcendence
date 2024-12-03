import React, { useEffect, useRef, useState } from 'react'
import { forwardRef } from 'react'

const PongTable = forwardRef(
	(
		{
			isPaused,
			handlePause,
			backgroundId,
			updateScore,
			isGameOver,
			resetParameters,
			player1Color,
			player2Color,
			ballColor,
			paddleSize,
			ballSize,
		},
		ref
	) => {
		const [canvasHeight, setCanvasHeight] = useState(400) // Set this to your actual canvas height
		const [originalPaddleHeight, setOriginalPaddleHeight] = useState(80) // Set this to your original paddle height

		const canvasRef = useRef(null)
		const containerRef = useRef(null)
		const requestRef = useRef(null)
		const lastTimeRef = useRef(null)

		const paddleWidth = 20
		const paddleX = 5
		const BallInitialSpeed = 0.5
		const BallAcceleration = 0.1
		const paddleSpeed = 300
		const MAX_BALL_SPEED = 8

		const [playerY, setPlayerY] = useState(200 - paddleSize / 2)
		const [aiY, setAiY] = useState(200 - paddleSize / 2)
		const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 })

		const MAX_CANVAS_WIDTH = 1200

		const [player, setPlayer] = useState({
			name: 'Player 1',
			x: paddleX,
			y: playerY,
			width: paddleWidth,
			height: paddleSize,
			color: player1Color || 'white',
			score: 0,
			won: false,
			isPowerupActive: false,
			isAttackActive: false,
		})

		const [ai, setAi] = useState({
			name: 'Player 2',
			x: 800 - paddleWidth - paddleX,
			y: aiY,
			width: paddleWidth,
			height: paddleSize,
			color: player2Color || 'white',
			score: 0,
			won: false,
			isPowerupActive: false,
			isAttackActive: false,
		})

		const ballsRef = useRef([
			{
				x: 400,
				y: 200,
				radius: ballSize,
				speed: BallInitialSpeed,
				velocityX: 5,
				velocityY: 5,
				color: ballColor || 'white',
			},
		])

		const [isLeftPlayerMovingUp, setIsLeftPlayerMovingUp] = useState(false)
		const [isLeftPlayerMovingDown, setIsLeftPlayerMovingDown] = useState(false)

		const [isRightPlayerMovingUp, setIsRightPlayerMovingUp] = useState(false)
		const [isRightPlayerMovingDown, setIsRightPlayerMovingDown] = useState(false)

		useEffect(() => {
			ballsRef.current = [
				{
					x: 400,
					y: 200,
					radius: ballSize,
					speed: BallInitialSpeed,
					velocityX: 5,
					velocityY: 5,
					color: ballColor || 'white',
				},
			]
			setPlayerY(200 - paddleSize / 2)
			setAiY(200 - paddleSize / 2)
		}, [resetParameters, ballSize, ballColor, paddleSize])

		useEffect(() => {
			const canvas = canvasRef.current
			const ctx = canvas.getContext('2d')
			const canvasWidth = canvas.width
			const canvasHeight = canvas.height

			const drawPaddle = (paddle) => {
				ctx.fillStyle = paddle.color
				ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
				ctx.beginPath()
				ctx.arc(paddle.x + paddle.width / 2, paddle.y, paddle.width / 2, 0, Math.PI, true)
				ctx.arc(
					paddle.x + paddle.width / 2,
					paddle.y + paddle.height,
					paddle.width / 2,
					0,
					Math.PI,
					false
				)
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

			const draw = () => {
				ctx.clearRect(0, 0, canvasWidth, canvasHeight)
				drawPaddle(player)
				drawPaddle(ai)
				ballsRef.current.forEach(drawBall)
			}

			const collisionDetection = (ball, paddle) => {
				const paddleTop = paddle.y
				const paddleBottom = paddle.y + paddle.height
				const paddleLeft = paddle.x
				const paddleRight = paddle.x + paddle.width

				const ballTop = ball.y - ball.radius
				const ballBottom = ball.y + ball.radius
				const ballLeft = ball.x - ball.radius
				const ballRight = ball.x + ball.radius

				return (
					ballRight > paddleLeft &&
					ballLeft < paddleRight &&
					ballBottom > paddleTop &&
					ballTop < paddleBottom
				)
			}

			const handlePaddleCollision = (ball, paddle) => {
				ball.velocityX = -ball.velocityX

				if (paddle.x < 400) {
					ball.x = paddle.x + paddle.width + ball.radius
				} else {
					ball.x = paddle.x - ball.radius
				}

				ball.speed += BallAcceleration
				if (ball.speed > MAX_BALL_SPEED) {
					ball.speed = MAX_BALL_SPEED
				}
			}

			const resetBall = () => {
				ballsRef.current = [
					{
						x: canvasWidth / 2,
						y: canvasHeight / 2,
						radius: ballSize,
						speed: BallInitialSpeed,
						velocityX: -ballsRef.current[0].velocityX,
						velocityY: ballsRef.current[0].velocityY,
						color: ballColor || 'white',
					},
				]
			}

			const updateGame = (time) => {
				if (isPaused || isGameOver) return

				const deltaTime = (time - lastTimeRef.current) / 1000
				lastTimeRef.current = time

				ballsRef.current.forEach((ball) => {
					const nextX = ball.x + ball.velocityX * ball.speed
					const nextY = ball.y + ball.velocityY * ball.speed

					if (nextY + ball.radius > canvasHeight || nextY - ball.radius < 0) {
						ball.velocityY = -ball.velocityY
						ball.y =
							nextY + ball.radius > canvasHeight
								? canvasHeight - ball.radius
								: ball.radius
					} else {
						ball.y = nextY
					}

					if (collisionDetection(ball, player)) {
						handlePaddleCollision(ball, player)
					} else if (collisionDetection(ball, ai)) {
						handlePaddleCollision(ball, ai)
					} else {
						ball.x = nextX
					}

					if (ball.x < 0 || ball.x > canvasWidth) {
						updateScore(ball.x < 0 ? 2 : 1)
						resetBall()
					}
				})

				if (isLeftPlayerMovingUp) {
					setPlayerY((prev) => Math.max(prev - paddleSpeed * deltaTime, 0))
				}
				if (isLeftPlayerMovingDown) {
					setPlayerY((prev) =>
						Math.min(prev + paddleSpeed * deltaTime, canvasHeight - player.height)
					)
				}

				if (isRightPlayerMovingUp) {
					setAiY((prev) => Math.max(prev - paddleSpeed * deltaTime, 0))
				}
				if (isRightPlayerMovingDown) {
					setAiY((prev) =>
						Math.min(prev + paddleSpeed * deltaTime, canvasHeight - ai.height)
					)
				}

				draw()
				requestRef.current = requestAnimationFrame(updateGame)
			}

			requestRef.current = requestAnimationFrame(updateGame)

			return () => cancelAnimationFrame(requestRef.current)
		}, [
			isPaused,
			isGameOver,
			player,
			ai,
			updateScore,
			isLeftPlayerMovingUp,
			isLeftPlayerMovingDown,
			isRightPlayerMovingUp,
			isRightPlayerMovingDown,
		])

		useEffect(() => {
			const handleKeyDown = (event) => {
				if (event.key === 'w' || event.key === 'W') {
					setIsLeftPlayerMovingUp(true)
				}
				if (event.key === 's' || event.key === 'S') {
					setIsLeftPlayerMovingDown(true)
				}
				if (event.key === 'ArrowUp') {
					setIsRightPlayerMovingUp(true)
				}
				if (event.key === 'ArrowDown') {
					setIsRightPlayerMovingDown(true)
				}
				if (event.key === '1') {
					console.log('Trying to use powerup from AI' + ai.powerups)
					setAi((prev) => ({
						...prev,
						isPowerupActive: true,
						powerups: prev.powerups - 1,
					}))
					stretchPaddleToFullHeight(setAi)
					setTimeout(() => {
						setAi((prev) => ({ ...prev, isPowerupActive: false }))
						resetPaddleHeight(setAi)
					}, 4500)
				}

				if (event.key === '2') {
					console.log('Trying to use attack from AI')
					setAi((prev) => ({ ...prev, isAttackActive: true, attacks: prev.attacks - 1 }))
					createTripleBall()
					setTimeout(() => setAi((prev) => ({ ...prev, isAttackActive: false })), 4500)
				}
				if (event.key === '3') {
					console.log('Trying to use attack from player')
					setPlayer((prev) => ({
						...prev,
						isAttackActive: true,
						attacks: prev.attacks - 1,
					}))
					createTripleBall()
					setTimeout(
						() => setPlayer((prev) => ({ ...prev, isAttackActive: false })),
						4500
					)
				}

				if (event.key === '4') {
					console.log('Trying to use powerup from player')
					setPlayer((prev) => ({
						...prev,
						isPowerupActive: true,
						powerups: prev.powerups - 1,
					}))
					stretchPaddleToFullHeight(setPlayer)
					setTimeout(() => {
						setPlayer((prev) => ({ ...prev, isPowerupActive: false }))
						resetPaddleHeight(setPlayer)
					}, 4500)
				}
			}

			const handleKeyUp = (event) => {
				if (event.key === 'w' || event.key === 'W') {
					setIsLeftPlayerMovingUp(false)
				}
				if (event.key === 's' || event.key === 'S') {
					setIsLeftPlayerMovingDown(false)
				}
				if (event.key === 'ArrowUp') {
					setIsRightPlayerMovingUp(false)
				}
				if (event.key === 'ArrowDown') {
					setIsRightPlayerMovingDown(false)
				}
			}

			window.addEventListener('keydown', handleKeyDown)
			window.addEventListener('keyup', handleKeyUp)

			return () => {
				window.removeEventListener('keydown', handleKeyDown)
				window.removeEventListener('keyup', handleKeyUp)
			}
		}, [player, ai])

		useEffect(() => {
			setPlayer((prev) => ({ ...prev, y: playerY }))
			setAi((prev) => ({ ...prev, y: aiY }))
		}, [playerY, aiY, canvasHeight, originalPaddleHeight])

		// Add this function to stretch the paddle to full height
		const stretchPaddleToFullHeight = (setPaddle) => {
			setPaddle((prev) => {
				const newHeight = canvasHeight
				const newY = 0 // Set to 0 to position at the top of the canvas
				return { ...prev, height: newHeight, y: newY }
			})
		}

		// Add this function to reset the paddle to its original height
		const resetPaddleHeight = (setPaddle) => {
			setPaddle((prev) => {
				const newHeight = originalPaddleHeight
				const newY = (canvasHeight - originalPaddleHeight) / 2 // Center the paddle vertically
				return { ...prev, height: newHeight, y: newY }
			})
		}

		const createTripleBall = () => {
			const originalBall = ballsRef.current[0]
			const newBalls = [
				{ ...originalBall },
				{ ...originalBall, angle: originalBall.angle - Math.PI / 6 },
				{ ...originalBall, angle: originalBall.angle + Math.PI / 6 },
			]
			ballsRef.current = newBalls
			setTimeout(() => {
				ballsRef.current = [originalBall]
			}, 5000)
		}

		return (
			<div
				ref={containerRef}
				className='relative flex flex-col items-center lp:gap-7 gap-3 max-lg:w-full'
			>
				<canvas
					ref={canvasRef}
					width={canvasSize.width}
					height={canvasSize.height}
					className={`game-table aspect-video border ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
					style={{
						width: '100%',
						height: 'auto',
						borderRadius: '25px',
						maxWidth: `${MAX_CANVAS_WIDTH}px`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundImage: `url('/assets/images/tables/table${backgroundId}.png')`,
					}}
				/>
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
						className='pause flex items-center gap-3 brightness-[1] select-none'
					>
						<img
							src={`/assets/images/icons/${isPaused ? 'play' : 'pause'}.svg`}
							alt=''
						/>
						<p className='align-middle'>{isPaused ? 'resume' : 'pause'}</p>
					</button>
				)}
			</div>
		)
	}
)

export default PongTable
