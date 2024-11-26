import React, { useRef, useEffect } from 'react';

const RemotePongTable = ({ 
    isPaused,
    handlePause,
    backgroundId,
    isGameOver,
    player1Color,
    player2Color,
    ballColor,
    paddleHeight,
    ballRadius
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    
    // For now, just draw a basic background
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background image if provided
        if (backgroundId) {
            const background = new Image();
            background.src = `/assets/images/tables/table${backgroundId}.png`;
            background.onload = () => {
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            };
        }
    }, [backgroundId]);

    return (
        <div ref={containerRef} className="flex flex-col items-center gap-7 max-lg:order-first max-lg:w-full">
            <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className={`game-table border ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
                style={{ borderRadius: '25px', width: '100%', height: 'auto', maxWidth: '1200px' }}
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

export default RemotePongTable;