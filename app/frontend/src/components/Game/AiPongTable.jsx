import React, { useEffect, useRef, useState } from 'react';

const AIPongTable = ({
	isPaused,
	handlePause,
	backgroundId,
	updateScore,
	isGameOver,
	resetParameters,
	player1Color, // human player color
	player2Color, // AI color
	ballColor,
	paddleHeight,
	ballRadius,
	powerups,
	attacks,
	aiDifficulty, // NEW: AI difficulty setting
	aiBehavior, // NEW: AI behavior setting
	// onBallMove, // NEW: Callback to track ball position
}) => {
	// Basic canvas setup
	const [canvasSize] = useState({ width: 800, height: 400 });
	const [canvasHeight] = useState(400);
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const requestRef = useRef(null);
	const lastTimeRef = useRef(null);

	// Game constants
	const paddleWidth = 20;
	const paddleX = 5;
	const BallInitialSpeed = 0.5;
	const BallAcceleration = 0.1;
	const paddleSpeed = 300;
	const MAX_BALL_SPEED = 8;
	const MAX_CANVAS_WIDTH = 1200;

	// Player and AI positions
	const [playerY, setPlayerY] = useState(200 - paddleHeight / 2);
	const [aiY, setAiY] = useState(200 - paddleHeight / 2);

	// Player and AI states
	const [player, setPlayer] = useState({
		name: 'Player',
		x: paddleX,
		y: playerY,
		width: paddleWidth,
		height: paddleHeight,
		color: player1Color || 'white',
		powerups: powerups,
		attacks: attacks,
		isPowerupActive: false,
		isAttackActive: false,
	});

	const [ai, setAi] = useState({
		name: 'AI',
		x: 800 - paddleWidth - paddleX,
		y: aiY,
		width: paddleWidth,
		height: paddleHeight,
		color: player2Color || 'red',
		powerups: powerups,
		attacks: attacks,
		isPowerupActive: false,
		isAttackActive: false,
	});

	// Ball state
	const ballsRef = useRef([
		{
			x: 400,
			y: 200,
			radius: ballRadius,
			speed: BallInitialSpeed,
			velocityX: 5,
			velocityY: 5,
			color: ballColor || 'white',
		},
	]);

	// Player movement flags (only for Up/Down arrows)
	const [isPlayerMovingUp, setIsPlayerMovingUp] = useState(false);
	const [isPlayerMovingDown, setIsPlayerMovingDown] = useState(false);

	// AI Movement Logic - NEW
	const calculateAIMove = (ballPos) => {
		const getAISpeed = () => {
			console.log('aiDifficulty:', aiDifficulty);
			switch (aiDifficulty) {
				case 'easy':
					return paddleSpeed * 0.25; // 25% of max speed, very slow
				case 'medium':
					return paddleSpeed * 0.4; // 40% of max speed, medium speed
				case 'hard':
					return paddleSpeed * 0.8; // 80% of max speed, very fast
				default:
					return paddleSpeed * 0.4; // Default to medium speed
			}
		};

		// Get target position based on behavior
		const getTargetY = () => {
			// Calculate predicted ball position
			const distanceToAI = ai.x - ballPos.x;
			const timeToIntercept =
				distanceToAI / (ballPos.velocityX * ballPos.speed);
			const predictedY =
				ballPos.y + ballPos.velocityY * ballPos.speed * timeToIntercept;

			console.log('predictedY:', predictedY);
			// Add behavior-specific positioning
			switch (aiBehavior) {
				case 'aggressive':
					// Move ahead of the ball and try to intercept early
					return (
						predictedY -
						paddleHeight * 0.5 +
						(ballPos.x > canvasSize.width / 2 ? 30 : -30)
					); // Moves forward when ball approaches

				case 'defensive':
					// Stay back and wait for the ball
					return (
						predictedY +
						paddleHeight * 0.3 +
						(ballPos.x > canvasSize.width / 2 ? -40 : 0)
					); // Stays back

				case 'balanced':
				default:
					// Standard positioning
					return predictedY;
			}
		};

		// Add difficulty-specific "mistakes"
		const addDifficultyVariation = (targetY) => {
			switch (aiDifficulty) {
				case 'easy':
					// Large random movements and delayed reactions
					const randomMiss = Math.random() < 0.3; // 30% chance to make a mistake
					if (randomMiss) {
						return targetY + (Math.random() - 0.5) * 100; // Big random offset
					}
					break;

				case 'medium':
					// Smaller random movements
					return targetY + (Math.random() - 0.5) * 30; // Small random offset

				case 'hard':
					// Minimal randomness for slight imperfection
					return targetY + (Math.random() - 0.5) * 10; // Very small random offset
			}
			return targetY;
		};

		const clampPosition = (position) => {
			// Keep paddle within canvas bounds
			return Math.max(0, Math.min(canvasHeight - paddleHeight, position));
		};

		const aiSpeed = getAISpeed();
		let targetY = getTargetY();
		targetY = addDifficultyVariation(targetY);
		console.log('ai behavior:', aiBehavior);
		// Add behavior-specific movement patterns
		switch (aiBehavior) {
			case 'aggressive':
				// Move more rapidly with bigger steps
				const aggressiveMove = (targetY - ai.y) * 1.2;
				return clampPosition(
					ai.y +
						Math.min(Math.abs(aggressiveMove), aiSpeed) *
							Math.sign(aggressiveMove),
				);

			case 'defensive':
				// Move more cautiously with smaller steps
				const defensiveMove = (targetY - ai.y) * 0.8;
				return clampPosition(
					ai.y +
						Math.min(Math.abs(defensiveMove), aiSpeed * 0.7) *
							Math.sign(defensiveMove),
				);

			case 'balanced':
			default:
				// Standard movement
				const move = targetY - ai.y;
				return clampPosition(
					ai.y + Math.min(Math.abs(move), aiSpeed) * Math.sign(move),
				);
		}
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const canvasWidth = canvas.width;
		const canvasHeight = canvas.height;

		const background = new Image();
		background.src = `/assets/images/tables/table${backgroundId}.${backgroundId > 6 ? 'gif' : 'webp'}`;

		// Drawing functions stay the same
		const drawPaddle = (paddle) => {
			ctx.fillStyle = paddle.color;
			ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
			ctx.beginPath();
			ctx.arc(
				paddle.x + paddle.width / 2,
				paddle.y,
				paddle.width / 2,
				0,
				Math.PI,
				true,
			);
			ctx.arc(
				paddle.x + paddle.width / 2,
				paddle.y + paddle.height,
				paddle.width / 2,
				0,
				Math.PI,
				false,
			);
			ctx.closePath();
			ctx.fill();
		};

		const drawBall = (ball) => {
			ctx.beginPath();
			ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
			ctx.fillStyle = ball.color;
			ctx.fill();
			ctx.closePath();
		};

		const draw = () => {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			if (backgroundId) {
				ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
			}
			drawPaddle(player);
			drawPaddle(ai);
			ballsRef.current.forEach(drawBall);
		};

		// Collision logic stays the same
		const collisionDetection = (ball, paddle) => {
			const paddleTop = paddle.y;
			const paddleBottom = paddle.y + paddle.height;
			const paddleLeft = paddle.x;
			const paddleRight = paddle.x + paddle.width;

			const ballTop = ball.y - ball.radius;
			const ballBottom = ball.y + ball.radius;
			const ballLeft = ball.x - ball.radius;
			const ballRight = ball.x + ball.radius;

			return (
				ballRight > paddleLeft &&
				ballLeft < paddleRight &&
				ballBottom > paddleTop &&
				ballTop < paddleBottom
			);
		};

		const handlePaddleCollision = (ball, paddle) => {
			ball.velocityX = -ball.velocityX;

			if (paddle.x < 400) {
				ball.x = paddle.x + paddle.width + ball.radius;
				// randomize ball angle a bit
				ball.velocityY += Math.random() * 2;
			} else {
				ball.x = paddle.x - ball.radius;
				// randomize ball angle a bit
				ball.velocityY -= Math.random() * 2;
			}

			ball.speed += BallAcceleration;
			if (ball.speed > MAX_BALL_SPEED) {
				ball.speed = MAX_BALL_SPEED;
			}
		};

		const resetBall = () => {
			ballsRef.current = [
				{
					x: canvasWidth / 2,
					y: canvasHeight / 2,
					radius: ballRadius,
					speed: BallInitialSpeed,
					// randomize starting direction
					// velocityX: (-ballsRef.current[0].velocityX)
					velocityX: Math.random() > 0.5 ? 5 : -5,
					// velocityY: ballsRef.current[0].velocityY,
					velocityY: Math.random() > 0.5 ? 5 : -5,
					color: ballColor || 'white',
				},
			];
		};

		const updateGame = (time) => {
			if (isPaused || isGameOver) return;

			const deltaTime = (time - lastTimeRef.current) / 1000;
			lastTimeRef.current = time;

			// Update ball positions
			ballsRef.current.forEach((ball) => {
				const nextX = ball.x + ball.velocityX * ball.speed;
				const nextY = ball.y + ball.velocityY * ball.speed;

				// Ball wall collisions
				if (
					nextY + ball.radius > canvasHeight ||
					nextY - ball.radius < 0
				) {
					ball.velocityY = -ball.velocityY;
					ball.y =
						nextY + ball.radius > canvasHeight
							? canvasHeight - ball.radius
							: ball.radius;
				} else {
					ball.y = nextY;
				}

				// Paddle collisions
				if (collisionDetection(ball, player)) {
					handlePaddleCollision(ball, player);
				} else if (collisionDetection(ball, ai)) {
					handlePaddleCollision(ball, ai);
				} else {
					ball.x = nextX;
				}

				// Scoring
				if (ball.x < 0 || ball.x > canvasWidth) {
					updateScore(ball.x < 0 ? 'ai' : 'player'); // Changed to use 'ai' and 'player'
					resetBall();
				}
			});

			// Update player paddle
			if (isPlayerMovingUp) {
				setPlayerY((prev) =>
					Math.max(prev - paddleSpeed * deltaTime, 0),
				);
			}
			if (isPlayerMovingDown) {
				setPlayerY((prev) =>
					Math.min(
						prev + paddleSpeed * deltaTime,
						canvasHeight - player.height,
					),
				);
			}

			// Update AI paddle with deltaTime for smooth movement
			const newAiY = calculateAIMove(ballsRef.current[0]);
			setAiY((prev) => {
				const diff = newAiY - prev;
				const movement =
					Math.min(Math.abs(diff), paddleSpeed * deltaTime) *
					Math.sign(diff);
				return prev + movement;
			});

			draw();
			requestRef.current = requestAnimationFrame(updateGame);
		};

		requestRef.current = requestAnimationFrame(updateGame);

		return () => cancelAnimationFrame(requestRef.current);
	}, [
		isPaused,
		isGameOver,
		player,
		ai,
		updateScore,
		isPlayerMovingUp,
		isPlayerMovingDown,
		backgroundId,
		aiDifficulty,
		aiBehavior,
	]);

	useEffect(() => {
		const handleKeyDown = (event) => {
			event.preventDefault(); // Prevent scrolling
			if (event.key === 'ArrowUp') {
				setIsPlayerMovingUp(true);
			}
			if (event.key === 'ArrowDown') {
				setIsPlayerMovingDown(true);
			}
		};

		const handleKeyUp = (event) => {
			event.preventDefault(); // Prevent scrolling
			if (event.key === 'ArrowUp') {
				setIsPlayerMovingUp(false);
			}
			if (event.key === 'ArrowDown') {
				setIsPlayerMovingDown(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [player, ai]);

	useEffect(() => {
		setPlayer((prev) => ({ ...prev, y: playerY }));
		setAi((prev) => ({ ...prev, y: aiY }));
	}, [playerY, aiY, canvasHeight]);

	return (
		<div
			ref={containerRef}
			className="flex flex-col items-center gap-7 max-lg:order-first max-lg:w-full"
		>
			<canvas
				ref={canvasRef}
				width={canvasSize.width}
				height={canvasSize.height}
				className={`game-table border ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
				style={{
					width: '100%',
					height: 'auto',
					borderRadius: '25px',
					maxWidth: `${MAX_CANVAS_WIDTH}px`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundImage: `url('/assets/images/tables/table${backgroundId}.${backgroundId > 6 ? 'gif' : 'webp'}')`,
				}}
			/>
			{!isGameOver && (
				<button
					onClick={handlePause}
					className="pause flex items-center gap-3 brightness-[1] leading-[0.95]"
				>
					<img
						src={`/assets/images/icons/${isPaused ? 'play' : 'pause'}.svg`}
						alt=""
					/>
					<p className="align-middle">
						{isPaused ? 'resume' : 'pause'}
					</p>
				</button>
			)}
		</div>
	);
};

export default AIPongTable;
