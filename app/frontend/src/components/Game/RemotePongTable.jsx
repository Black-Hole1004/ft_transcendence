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
	backgroundId,
	opponentDisconnected,
}) => {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const requestRef = useRef(null);
	const [width, setWidth] = useState(window.innerWidth);

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
		};

		// Draw a single paddle
		const drawPaddle = (ctx, x, y, color) => {
			const width = 16;   // paddle width
			const height = 80; // paddle height
			const radius = 8.6;  // corner radius

			// Add glow effect
			ctx.shadowBlur = 0;
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
			
			ctx.shadowBlur = 0;
			ctx.shadowColor = 'white';
			ctx.beginPath();

			// Transform ball x-position based on player perspective
			const ballX = playerNumber === 2 ? (canvasSize.width - ball.x) : ball.x;
			
			ctx.arc(
				ballX,
				ball.y,
				10, // ball radius 
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

			const PADDLE_RIGHT_X = canvasSize.width - 16 - 5; // Right side position
			const PADDLE_LEFT_X = 5;    // Left side position

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

	const handleKeyDown = (e) => {
		e.preventDefault();
		if ((e.type === 'pointerdown' || e.type === 'mousedown') && e.target.id === '1') onPaddleMove('startUp')
		if ((e.type === 'pointerdown' || e.type === 'mousedown') && e.target.id === '2') onPaddleMove('startDown')
		if (e.key === 'ArrowUp') onPaddleMove('startUp')
		if (e.key === 'ArrowDown') onPaddleMove('startDown')
	};
	
	const handleKeyUp = (e) => {
		e.preventDefault();
		if ((e.type === 'pointerup' || e.type === 'mouseup') && e.target.id === '1') onPaddleMove('stopUp')
		if ((e.type === 'pointerup' || e.type === 'mouseup') && e.target.id === '2') onPaddleMove('stopDown')
		if (e.type === 'mouseup' && e.target.id === '1') onPaddleMove('stopUp');
		if (e.type === 'mouseup' && e.target.id === '2') onPaddleMove('stopDown');
		if (e.key === 'ArrowUp') onPaddleMove('stopUp');
		if (e.key === 'ArrowDown') onPaddleMove('stopDown');
	};

	// Handle keyboard input for paddle movement
	useEffect(() => {
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

	window.addEventListener('resize', () => {
		setWidth(window.innerWidth)
	})

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
					backgroundImage: `url('/assets/images/tables/table${backgroundId}.${backgroundId > 6 ? 'gif' : 'webp'}')`,
				}}
			/>
			{isPaused && (
				<div>
					<p
						className='text-[100px] font-dreamscape text-center leading-[1.01] game-paused
					absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
					>
						{opponentDisconnected ? 'OPPONENT DISCONNECTED...' : 'GAME PAUSED'}
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
						onContextMenu={(e) => e.preventDefault()}
						src={`/assets/images/icons/${isPaused ? 'play' : 'pause'}.svg`} 
						alt="" 
					/>
					<p className="align-middle">
						{isPaused ? 'resume' : `pause (${pausesRemaining[playerNumber]} left)`}
					</p>
				</button>
			)}
			{width <= 768 && (
				<div className='w-[86%] flex justify-between mb-4'>
					<button className='w-[15%]' onContextMenu={(e) => e.preventDefault()} onPointerUp={handleKeyUp} onPointerDown={handleKeyDown}>
						<img src='/assets/images/icons/up.svg' id='1' />
					</button>
					<button className='w-[15%]' onContextMenu={(e) => e.preventDefault()} onPointerUp={handleKeyUp} onPointerDown={handleKeyDown}>
						<img src='/assets/images/icons/down.svg' id='2' />					
					</button>
				</div>
			)}
		</div>
	);
};

export default RemotePongTable;