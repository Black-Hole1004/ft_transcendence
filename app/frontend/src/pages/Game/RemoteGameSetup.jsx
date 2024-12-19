// frontend/src/pages/Game/RemoteGameSetup.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RemoteGameSetup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { backgroundId } = location.state || { backgroundId: 1 };
    
    const [settings, setSettings] = useState({
        paddleHeight: 110,
        ballRadius: 15,
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
            } 
        });
    };


    return (
        <div className="min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary">
            <div className="flex flex-col lg:flex-row bg-backdrop-80 p-6 rounded-lg shadow-lg w-full max-w-7xl">

                {/* Right Side - Preview and Start */}
                <div className="w-full lg:w-1/2 lg:pl-6 lg:border-l lg:border-gray-600">
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