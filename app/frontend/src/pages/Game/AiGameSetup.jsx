import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AIGameSetup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { backgroundId } = location.state || { backgroundId: 1 };

    // Player and game settings
    const [playerName, setPlayerName] = useState('');
    const [gameDuration, setGameDuration] = useState(60);
    const [playerColor, setPlayerColor] = useState('#ffffff');
    const [ballColor, setBallColor] = useState('#ffffff');
    const [paddleHeight, setPaddleHeight] = useState(110);
    const [ballRadius, setBallRadius] = useState(15);
    const [removeBackground, setRemoveBackground] = useState(false);

    // AI settings
    const [aiDifficulty, setAiDifficulty] = useState('medium');
    const [aiBehavior, setAiBehavior] = useState('balanced');

    // Constants
    const canvasWidth = 800;
    const canvasHeight = 400;
    const maxPaddleHeight = 350;
    const minPaddleHeight = 50;
    const maxBallRadius = 100;
    const minBallRadius = 5;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerName) {
            navigate('/ai-game', {
                state: {
                    mode: 'AI',
                    player: { 
                        name: playerName, 
                        color: playerColor 
                    },
                    ai: {
                        difficulty: aiDifficulty,
                        behavior: aiBehavior,
                        color: '#ff0000' // Default AI color
                    },
                    ballColor,
                    duration: gameDuration,
                    backgroundId: removeBackground ? null : backgroundId,
                    paddleHeight,
                    ballRadius,
                }
            });
        }
    };

    const generateRandomName = () => {
        return 'Player ' + Math.floor(Math.random() * 1000);
    };

    const resetToDefault = () => {
        setPlayerColor('#ffffff');
        setBallColor('#ffffff');
        setPaddleHeight(110);
        setBallRadius(15);
        setRemoveBackground(false);
        setAiDifficulty('medium');
        setAiBehavior('balanced');
    };

    // Game Preview Component
    const GamePreview = () => {
        const canvasRef = useRef(null);
        const scale = 0.75;
        const scaledWidth = canvasWidth * scale;
        const scaledHeight = canvasHeight * scale;

        useEffect(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Draw background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, scaledWidth, scaledHeight);

            if (!removeBackground) {
                const backgroundImage = new Image();
                backgroundImage.src = `/assets/images/tables/table${backgroundId}.${backgroundId > 6 ? 'gif' : 'webp'}`;
                backgroundImage.onload = () => {
                    ctx.drawImage(backgroundImage, 0, 0, scaledWidth, scaledHeight);
                    drawGameElements();
                };
            } else {
                drawGameElements();
            }

            function drawGameElements() {
                const paddleWidth = 15 * scale;

                // Draw player paddle
                ctx.fillStyle = playerColor;
                ctx.fillRect(
                    10,
                    (scaledHeight - paddleHeight * scale) / 2,
                    paddleWidth,
                    paddleHeight * scale
                );

                // Draw AI paddle (red color)
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(
                    scaledWidth - paddleWidth - 10,
                    (scaledHeight - paddleHeight * scale) / 2,
                    paddleWidth,
                    paddleHeight * scale
                );

                // Draw ball
                ctx.beginPath();
                ctx.arc(
                    scaledWidth / 2,
                    scaledHeight / 2,
                    ballRadius * scale,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = ballColor;
                ctx.fill();
            }
        }, [playerColor, ballColor, paddleHeight, ballRadius, backgroundId, removeBackground]);

        return (
            <canvas
                ref={canvasRef}
                width={scaledWidth}
                height={scaledHeight}
                className="border rounded"
                style={{
                    width: `${scaledWidth}px`,
                    height: `${scaledHeight}px`,
                    background: '#000000',
                    borderRadius: '20px',
                }}
            />
        );
    };

    return (
        <div className="min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary flex items-center justify-center">
            <div className="flex flex-col lg:flex-row bg-backdrop-80 p-6 rounded-lg shadow-lg w-full max-w-7xl">
                {/* Left Side - Game Customization */}
                <div className="w-full lg:w-1/2 lg:pr-6 mb-6 lg:mb-0">
                    <h3 className="text-xl font-bold mb-4">Game Customization</h3>

                    {/* Paddle Height Slider */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Paddle Height: {paddleHeight}px
                        </label>
                        <input
                            type="range"
                            min={minPaddleHeight}
                            max={maxPaddleHeight}
                            value={paddleHeight}
                            onChange={(e) => setPaddleHeight(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    {/* Ball Radius Slider */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Ball Radius: {ballRadius}px
                        </label>
                        <input
                            type="range"
                            min={minBallRadius}
                            max={maxBallRadius}
                            value={ballRadius}
                            onChange={(e) => setBallRadius(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    {/* AI Difficulty Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">AI Difficulty</label>
                        <select
                            value={aiDifficulty}
                            onChange={(e) => setAiDifficulty(e.target.value)}
                            className="w-full p-2 bg-white text-black rounded"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    {/* AI Behavior Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">AI Behavior</label>
                        <select
                            value={aiBehavior}
                            onChange={(e) => setAiBehavior(e.target.value)}
                            className="w-full p-2 bg-white text-black rounded"
                        >
                            <option value="balanced">Balanced</option>
                            <option value="aggressive">Aggressive</option>
                            <option value="defensive">Defensive</option>
                        </select>
                    </div>

                    {/* Game Preview */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Preview</label>
                        <GamePreview />
                    </div>
                </div>

                {/* Right Side - Player Setup */}
                <div className="w-full lg:w-1/2 lg:pl-6 lg:border-l lg:border-gray-600">
                    <form onSubmit={handleSubmit} className="w-full md:w-2/3 pl-6">
                        <h2 className="text-2xl font-bold mb-4">Player Setup</h2>

                        {/* Player Name Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                                Player Name
                            </label>
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full p-2 bg-white text-black rounded placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Player Color Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                                Paddle Color
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="color"
                                    value={playerColor}
                                    onChange={(e) => setPlayerColor(e.target.value)}
                                    className="w-8 h-8 mr-2"
                                />
                                <span className="mr-2">{playerColor}</span>
                            </div>
                        </div>

                        {/* Game Duration Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                                Game Duration (seconds)
                            </label>
                            <input
                                type="number"
                                value={gameDuration}
                                onChange={(e) => setGameDuration(parseInt(e.target.value))}
                                className="w-full p-2 bg-white text-black rounded placeholder-gray-400"
                                required
                                min="10"
                                max="300"
                            />
                        </div>

                        {/* Ball Color Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                                Ball Color
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="color"
                                    value={ballColor}
                                    onChange={(e) => setBallColor(e.target.value)}
                                    className="w-8 h-8 mr-2"
                                />
                                <span className="mr-2">{ballColor}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <button
                            type="button"
                            onClick={() => {
                                setPlayerName(generateRandomName());
                            }}
                            className="w-full p-2 mb-4 bg-secondary text-primary rounded hover:bg-secondary-dark transition"
                        >
                            Generate Random Name
                        </button>

                        <button
                            type="button"
                            onClick={resetToDefault}
                            className="w-full p-2 mb-4 bg-secondary text-primary rounded hover:bg-secondary-dark transition"
                        >
                            Reset to Default
                        </button>

                        <button
                            type="submit"
                            className="w-full p-2 bg-primary text-backdrop-80 rounded hover:bg-primary-dark transition"
                        >
                            Start Game
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AIGameSetup;
