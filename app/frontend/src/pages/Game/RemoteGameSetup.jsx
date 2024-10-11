import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RemoteGameSetup = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { backgroundId } = location.state || {}

    const handleStartRemoteGame = () => {
        // Here you would typically set up the remote game connection
        // For now, we'll just navigate to the game page
        navigate('/remote-game', { 
            state: { 
                mode: 'remote',
                backgroundId 
            } 
        })
    }

    return (
        <div className="min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary flex items-center justify-center">
            <div className="bg-backdrop-80 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Remote Game Setup</h2>
                <p className="mb-4">Waiting for opponent...</p>
                <button 
                    onClick={handleStartRemoteGame} 
                    className="w-full p-2 bg-primary text-backdrop-80 rounded hover:bg-primary-dark transition"
                >
                    Start Remote Game
                </button>
            </div>
        </div>
    )
}

export default RemoteGameSetup