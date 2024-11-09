// src/components/Game/GameStateMonitor.jsx
import React, { useRef, useEffect, useState } from 'react';

const GameStateMonitor = ({ gameState, scale = 0.5 }) => {
    const canvasRef = useRef(null);
    const [ballTrail, setBallTrail] = useState([]);
    const maxTrailLength = 10;

    useEffect(() => {
        if (!gameState?.ball || !canvasRef.current) return;

        // Update ball trail
        setBallTrail(prev => {
            const newTrail = [...prev, { x: gameState.ball.x, y: gameState.ball.y }];
            return newTrail.slice(-maxTrailLength);
        });

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = 800 * scale;
        const height = 400 * scale;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        // Draw center line
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(width/2, 0);
        ctx.lineTo(width/2, height);
        ctx.strokeStyle = 'white';
        ctx.stroke();

        // Draw ball trail
        ballTrail.forEach((pos, index) => {
            const alpha = (index + 1) / maxTrailLength;
            ctx.beginPath();
            ctx.arc(
                pos.x * scale,
                pos.y * scale,
                gameState.ball.radius * scale * 0.5,
                0,
                Math.PI * 2
            );
            ctx.fillStyle = `rgba(255, 165, 0, ${alpha * 0.5})`;
            ctx.fill();
        });

        // Draw paddles with collision zones
        [
            { paddle: gameState.player1, x: 10, color: 'rgba(0, 128, 255, 0.8)' },
            { paddle: gameState.player2, x: width - 30, color: 'rgba(0, 255, 128, 0.8)' }
        ].forEach(({ paddle, x, color }) => {
            if (paddle) {
                // Draw paddle
                ctx.fillStyle = color;
                ctx.fillRect(
                    x * scale,
                    paddle.y * scale,
                    20 * scale,
                    110 * scale
                );

                // Draw collision zone
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.setLineDash([2, 2]);
                ctx.strokeRect(
                    (x - 5) * scale,
                    (paddle.y - 5) * scale,
                    30 * scale,
                    120 * scale
                );
            }
        });

        // Draw ball with velocity vector
        if (gameState.ball) {
            // Draw ball
            ctx.beginPath();
            ctx.arc(
                gameState.ball.x * scale,
                gameState.ball.y * scale,
                gameState.ball.radius * scale,
                0,
                Math.PI * 2
            );
            ctx.fillStyle = 'white';
            ctx.fill();

            // Draw velocity vector
            ctx.beginPath();
            ctx.moveTo(
                gameState.ball.x * scale,
                gameState.ball.y * scale
            );
            ctx.lineTo(
                (gameState.ball.x + gameState.ball.velocityX * 2) * scale,
                (gameState.ball.y + gameState.ball.velocityY * 2) * scale
            );
            ctx.strokeStyle = 'yellow';
            ctx.setLineDash([]);
            ctx.stroke();
        }

        // Draw boundaries
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(0, 0, width, height);

    }, [gameState, scale, ballTrail]);

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                width={800 * scale}
                height={400 * scale}
                className="border border-white rounded"
            />
            <div className="absolute top-2 left-2 text-xs text-white bg-black bg-opacity-50 p-2 rounded">
                Ball Speed: {gameState?.ball?.speed?.toFixed(2) || 0}
            </div>
        </div>
    );
};

export default GameStateMonitor;