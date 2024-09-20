import { color } from 'chart.js/helpers';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ScrollRestoration } from 'react-router-dom';

function PongTable(props) {
    const canvasRef = useRef(null);
    const { isPaused, handlePause, backgroundId, isGameOver } = props;
    let canvasWidth;
    let canvasHeight;
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvasWidth = canvas.width;
            canvasHeight = canvas.height;
      
          console.log('Canvas width:', canvasWidth);
          console.log('Canvas height:', canvasHeight);
        }
      }, []);

    const [playerY, setPlayerY] = useState(150);
    const [aiY, setAiY] = useState(150); // Initially AI control, but this will now be controlled by Player 2
    const paddleHeight = 95;
    const paddleX = 3.6;
    const paddleY = canvasHeight / 2 - paddleHeight / 2;
    const paddleWidth = 15;
    const ballRadius = 12;

    let ballX = 400;
    let ballY = 200;
    let ballSpeedX = 2;
    let ballSpeedY = 2;

    const player = {
        name: 'Player 1',
        x: paddleX,
        y: playerY,
        width: paddleWidth,
        height: paddleHeight,
        color: 'white',
        score: 0,
        won : false
    };

    const ai = {
        name: 'Player 2',
        x: canvasWidth - paddleWidth - paddleX,
        y: paddleY,
        width: paddleWidth,
        height: paddleHeight,
        color: 'white',
        score: 0,
        won : false
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const background = new Image();
        background.src = `/assets/images/tables/table${backgroundId}.png`;
        
        const drawPaddles = () => {
            // Draw paddles
            ctx.fillStyle = 'white';
            ctx.fillRect(5, playerY, paddleWidth, paddleHeight);
            ctx.fillRect(canvas.width - paddleWidth - 5, aiY, paddleWidth, paddleHeight);
            // make the top and bottom lines of the paddle rounded
            //top of the left paddle
            ctx.beginPath();
            ctx.arc(5 + paddleWidth / 2, playerY, paddleWidth / 2, 0, Math.PI, true);
            ctx.closePath();
            ctx.fill();
            //bottom of the left paddle
            ctx.beginPath();
            ctx.arc(5 + paddleWidth / 2, playerY + paddleHeight, paddleWidth / 2, 0, Math.PI, false);
            ctx.closePath();
            ctx.fill();
            //top of the right paddle
            ctx.beginPath();
            ctx.arc(canvas.width - paddleWidth / 2 - 5, aiY, paddleWidth / 2, 0, Math.PI, true);
            ctx.closePath();
            ctx.fill();
            //bottom of the right paddle
            ctx.beginPath();
            ctx.arc(canvas.width - paddleWidth / 2 - 5, aiY + paddleHeight, paddleWidth / 2, 0, Math.PI, false);
            ctx.closePath();
            ctx.fill();
        };

        const drawBall = () => {
            // Draw ball
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        };
        const draw = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw background
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            // Draw paddles
            drawPaddles();
            // Draw ball
            drawBall();
        };

        const update = () => {
            if (isPaused) {
                return;
            }
            if (!isPaused && !isGameOver) {
                // Move ball
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                // Ball collision with top/bottom
                if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
                    ballSpeedY = -ballSpeedY;
                }

                // Ball collision with paddles
                if (ballX - ballRadius < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
                    ballSpeedX = -ballSpeedX;
                }
                if (ballX + ballRadius > canvas.width - paddleWidth && ballY > aiY && ballY < aiY + paddleHeight) {
                    ballSpeedX = -ballSpeedX;
                }

                // Reset ball if out of bounds and update score
                if (ballX < 0 || ballX > canvas.width) {
                    ballX = canvas.width / 2; 
                    ballY = canvas.height / 2;
                    ballSpeedX = -ballSpeedX;
                    // Update score based on who missed the ball
                    if (ballX < 0) {
                        // Player 2 (right side) scores
                        props.updateScore(1);
                    } else {
                        // Player 1 (left side) scores
                        props.updateScore(2);
                    }
                }
                draw();
            }
        };

        // Handle player controls
        const handleKeyDown = (event) => {
            if (!isPaused) {
                switch (event.key) {
                    // Player 1 controls (W/S)
                    case 'w':
                        setPlayerY((prevY) => Math.max(prevY - 10, 0)); // Move paddle up
                        break;
                    case 's':
                        setPlayerY((prevY) => Math.min(prevY + 10, canvas.height - paddleHeight)); // Move paddle down
                        break;

                    // Player 2 controls (Up/Down Arrows)
                    case 'ArrowUp':
                        setAiY((prevY) => Math.max(prevY - 10, 0)); // Move paddle up
                        break;
                    case 'ArrowDown':
                        setAiY((prevY) => Math.min(prevY + 10, canvas.height - paddleHeight)); // Move paddle down
                        break;
                    default:
                        break;
                }
            }
        };

        // Set up keyboard listeners
        window.addEventListener('keydown', handleKeyDown);

        // Game loop
        const intervalId = setInterval(update, 1000 / 60); // 60 FPS

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(intervalId);
        };
    }, [isPaused, playerY, aiY, backgroundId, isGameOver]);

    return (
        <div className='flex flex-col items-center gap-7 max-lg:order-first max-lg:w-full'>
            <canvas ref={canvasRef} id='game-table' width={800} height={400} className={`game-table border ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
                style={{ borderRadius: '25px' }}
            ></canvas>
            {!isGameOver && (
                <button onClick={handlePause} className='pause flex items-center gap-3 brightness-[1] leading-[0.95]'>
                    <img src={`/assets/images/icons/${isPaused ? 'play' : 'pause'}.svg`} alt='' />
                    <p className='align-middle'>{isPaused ? 'resume' : 'pause'}</p>
                </button>
            )}
        </div>
    );
}

export default PongTable;
