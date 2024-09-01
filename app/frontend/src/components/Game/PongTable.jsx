import React, { useEffect, useRef } from 'react';

function PongTable(props) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const paddleWidth = 10;
        const paddleHeight = 100;
        const ballRadius = 10;

        let playerY = (canvas.height - paddleHeight) / 2;
        let aiY = (canvas.height - paddleHeight) / 2;
        let ballX = canvas.width / 2;
        let ballY = canvas.height / 2;
        let ballSpeedX = 2;
        let ballSpeedY = 2;

        // Draw elements
        const draw = () => {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw paddles
            ctx.fillStyle = 'white';
            ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
            ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

            // Draw ball
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        };

        // Update game state
        const update = () => {
            if (!props.isPaused) {
                // Move ball
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                // Ball collision with top/bottom
                if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
                    ballSpeedY = -ballSpeedY;
                }

                // Ball collision with paddles (basic logic)
                if (ballX - ballRadius < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
                    ballSpeedX = -ballSpeedX;
                }

                if (ballX + ballRadius > canvas.width - paddleWidth && ballY > aiY && ballY < aiY + paddleHeight) {
                    ballSpeedX = -ballSpeedX;
                }

                // Reset ball if out of bounds
                if (ballX < 0 || ballX > canvas.width) {
                    ballX = canvas.width / 2;
                    ballY = canvas.height / 2;
                    ballSpeedX = -ballSpeedX;
                }
            }

            draw();
        };

        // Game loop
        const intervalId = setInterval(update, 1000 / 60); // 60 FPS

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [props.isPaused]);

    return (
        <div className='flex flex-col items-center gap-7 max-lg:order-first max-lg:w-full'>
            <canvas ref={canvasRef} id='game-table' width={800} height={400} className={`game-table border ${props.isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}></canvas>
            <button onClick={props.handlePause} className='pause flex items-center gap-3 brightness-[1] leading-[0.95]'>
                <img src={`/assets/images/icons/${props.isPaused ? 'play' : 'pause'}.svg`} alt='' />
                <p className='align-middle'>{props.isPaused ? 'resume' : 'pause'}</p>
            </button>
        </div>
    );
}

export default PongTable;
