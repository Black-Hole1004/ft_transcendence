import { useEffect, useRef, useState } from 'react';

const RemotePongTable = ({ 
	gameState,
	onPaddleMove,
	playerNumber,
	isPaused,
	handlePause,
	isGameOver,
	pausesRemaining,
	pausingPlayer,
	backgroundId
}) => {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const requestRef = useRef(null);

	// Canvas size state
	const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });
	const MAX_CANVAS_WIDTH = 1200;

	// Keyboard state for smooth movement
	const [isUpPressed, setIsUpPressed] = useState(false);
	const [isDownPressed, setIsDownPressed] = useState(false);

	// this function will transform the coordinates based on the player number

	useEffect(() => {
		if (!gameState || !canvasRef.current) return;
		
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// Clear and prepare the canvas
		const clearCanvas = (ctx) => {
			ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
			// ctx.fillStyle = 'black';
			// ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
		};

		// Draw the center line
		const drawCenterLine = (ctx) => {
			ctx.setLineDash([5, 15]);
			ctx.beginPath();
			ctx.moveTo(canvasSize.width / 2, 0);
			ctx.lineTo(canvasSize.width / 2, canvasSize.height);
			ctx.strokeStyle = 'white';
			ctx.stroke();
		};

		// Draw a single paddle
		const drawPaddle = (ctx, x, y, color) => {
			const width = 20;   // paddle width
			const height = 110; // paddle height
			const radius = 10;  // corner radius

			// Add glow effect
			ctx.shadowBlur = 6;
			ctx.shadowColor = color;
			ctx.fillStyle = color;
			ctx.beginPath();
			
			// Draw rounded rectangle
			ctx.moveTo(x + radius, y);
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			ctx.lineTo(x + width, y + height - radius);
			ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			ctx.lineTo(x + radius, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			
			ctx.closePath();
			ctx.fill();
			ctx.shadowBlur = 0;
		};

		// Draw ball with glow effect
		const drawBall = (ctx, ball) => {
			if (!ball) return;
			
			ctx.shadowBlur = 6;
			ctx.shadowColor = 'white';
			ctx.beginPath();

			// Transform ball x-position based on player perspective
			const ballX = playerNumber === 2 ? (canvasSize.width - ball.x) : ball.x;
			
			ctx.arc(
				ballX,
				ball.y,
				10,
				0,
				Math.PI * 2
			);
			ctx.fillStyle = 'white';
			ctx.fill();
			ctx.closePath();
			ctx.shadowBlur = 0;
		};

		// Draw paddles based on player perspective
		const drawPaddles = (ctx, gameState, playerNumber) => {
			if (!gameState.player1 || !gameState.player2) return;

			const PADDLE_RIGHT_X = canvasSize.width - 30; // Right side position
			const PADDLE_LEFT_X = 10;    // Left side position

			if (playerNumber === 1) {
				// Player 1's view - current player on right
				drawPaddle(ctx, PADDLE_RIGHT_X, gameState.player1.y, 'white');  // Me
				drawPaddle(ctx, PADDLE_LEFT_X, gameState.player2.y, 'white');   // Opponent
			} else {
				// Player 2's view - current player on right
				drawPaddle(ctx, PADDLE_RIGHT_X, gameState.player2.y, 'white');  // Me
				drawPaddle(ctx, PADDLE_LEFT_X, gameState.player1.y, 'white');   // Opponent
			}
		};

		// Main draw function that coordinates everything
		const draw = () => {
			if (!gameState || !canvasRef.current) return;
			
			const ctx = canvasRef.current.getContext('2d');
			
			// Execute drawing functions in order
			clearCanvas(ctx);
			drawCenterLine(ctx);
			drawBall(ctx, gameState.ball);
			drawPaddles(ctx, gameState, playerNumber);
		};
		

		// Create animation loop
		const animate = () => {
			draw();
			requestRef.current = requestAnimationFrame(animate);
		};

		// Start animation
		animate();

		// Cleanup
		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current);
			}
		};
	}, [gameState, canvasSize.width, canvasSize.height]);

	// Handle keyboard input for paddle movement
	useEffect(() => {
		const handleKeyDown = (e) => {            
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				onPaddleMove('startUp');
			}
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				onPaddleMove('startDown');
			}
		};
		
		const handleKeyUp = (e) => {
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				onPaddleMove('stopUp');
			}
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				onPaddleMove('stopDown');
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [onPaddleMove]);


	useEffect(() => {
		if (!gameState || isPaused) return;

		const movePaddle = () => {
			if (isUpPressed) {
				onPaddleMove('up');
			}
			if (isDownPressed) {
				onPaddleMove('down');
			}
		};

		const intervalId = setInterval(movePaddle, 16); // ~60fps

		return () => clearInterval(intervalId);
	}, [isPaused, isUpPressed, isDownPressed, onPaddleMove]);

	return (
		<div ref={containerRef} className="relative flex flex-col items-center lp:gap-7 gap-3 max-lp:w-full">
			<canvas
				ref={canvasRef}
				width={canvasSize.width}
				height={canvasSize.height}
				className={`game-table aspect-video border ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
				style={{ 
					borderRadius: '25px', 
					width: '100%', 
					height: 'auto', 
					maxWidth: `${MAX_CANVAS_WIDTH}px`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundImage: `url('/assets/images/tables/table${backgroundId}.webp')`,
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
					disabled={
						(!isPaused && pausesRemaining[playerNumber] <= 0) || 
						(isPaused && pausingPlayer !== playerNumber)
					}
					className={`pause flex items-center gap-3 brightness-[1] leading-[0.95] ${
						(!isPaused && pausesRemaining[playerNumber] <= 0) || 
						(isPaused && pausingPlayer !== playerNumber)
							? 'opacity-50 cursor-not-allowed'
							: ''
					}`}
				>
					<img 
						src={`/assets/images/icons/${isPaused ? 'play' : 'pause'}.svg`} 
						alt="" 
					/>
					<p className="align-middle">
						{isPaused ? 'resume' : `pause (${pausesRemaining[playerNumber]} left)`}
					</p>
				</button>
			)}
		</div>
	);
};

export default RemotePongTable;