// frontend/src/pages/Game/RemoteGameSetup.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const RemoteGameSetup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { backgroundId } = location.state || { backgroundId: 1 };
    const [isLoading, setIsLoading] = useState(false);
    
    const [settings, setSettings] = useState({
        paddleHeight: 110,
        ballRadius: 15,
        powerUps: 1,
        attacks: 1,
        player1Color: '#ffffff',
        player2Color: '#ffffff',
        ballColor: '#ffffff',
        duration: 30,
        backgroundId
    });

const handleFindOpponent = () => {
        console.log('Navigating to matchmaking with settings:', settings);
        navigate('/matchmaking', { 
            state: { 
                settings,
                from: 'remote-game-setup' // this for debugging
            } 
        });
    };



    return (
        <div className="min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary">
            <div className="flex flex-col lg:flex-row bg-backdrop-80 p-6 rounded-lg shadow-lg w-full max-w-7xl">
                {/* Left Side - Game Customization */}
                <div className="w-full lg:w-1/2 lg:pr-6 mb-6 lg:mb-0">
                    <h3 className="text-xl font-bold mb-4">Game Customization</h3>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Paddle Height: {settings.paddleHeight}px
                        </label>
                        <input
                            type="range"
                            min="50"
                            max="350"
                            value={settings.paddleHeight}
                            onChange={(e) => setSettings(prev => ({
                                ...prev,
                                paddleHeight: parseInt(e.target.value)
                            }))}
                            className="w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Ball Radius: {settings.ballRadius}px
                        </label>
                        <input
                            type="range"
                            min="5"
                            max="100"
                            value={settings.ballRadius}
                            onChange={(e) => setSettings(prev => ({
                                ...prev,
                                ballRadius: parseInt(e.target.value)
                            }))}
                            className="w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Power-ups: {settings.powerUps}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="3"
                            value={settings.powerUps}
                            onChange={(e) => setSettings(prev => ({
                                ...prev,
                                powerUps: parseInt(e.target.value)
                            }))}
                            className="w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Attacks: {settings.attacks}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="3"
                            value={settings.attacks}
                            onChange={(e) => setSettings(prev => ({
                                ...prev,
                                attacks: parseInt(e.target.value)
                            }))}
                            className="w-full"
                        />
                    </div>

                    {/* Color settings */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Ball Color</label>
                        <input
                            type="color"
                            value={settings.ballColor}
                            onChange={(e) => setSettings(prev => ({
                                ...prev,
                                ballColor: e.target.value
                            }))}
                            className="w-8 h-8"
                        />
                    </div>
                </div>

                {/* Right Side - Preview and Start */}
                <div className="w-full lg:w-1/2 lg:pl-6 lg:border-l lg:border-gray-600">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-4">Game Preview</h3>
                        <div className="border rounded p-4">
                            <p>Selected Background: {backgroundId}</p>
                            <p>Paddle Height: {settings.paddleHeight}px</p>
                            <p>Ball Radius: {settings.ballRadius}px</p>
                            <p>Power-ups: {settings.powerUps}</p>
                            <p>Attacks: {settings.attacks}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleFindOpponent}
                        className="w-full p-2 bg-primary text-backdrop-80 rounded hover:bg-primary-dark transition"
                    >
                        Find Opponent
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RemoteGameSetup;