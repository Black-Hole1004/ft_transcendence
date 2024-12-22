import React, { useState } from 'react'
import './Custom.css'
import { useNavigate, useLocation } from 'react-router-dom'

const Custom = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [backgroundId, setBackgroundId] = useState(1)
    const mode = location.state?.mode; // Get the mode from the location state
    

    const [step, setStep] = useState(1)
    const xp = 6231

    // Handle click for background selection
    const handleClick = (id) => {
        // Only allow click if background is unlocked
        if (xp / 1000 >= id || id === 1) {
            setBackgroundId(id)
        }
    }

    const handleStart = () => {
        if (mode === 'training') {
            // For AI mode, go directly to AI setup
            navigate('/ai-game-setup', { state: { backgroundId } });
        } else {
            // For 1vs1 mode, show the local/remote choice
            setStep(2);
        }
    };
    


    const handleGameModeSelect = (mode) => {
        if (mode === 'local') {
            navigate('/local-game-setup', { state: { backgroundId } })
        } else {
            // Get access token from cookies
            const cookies = document.cookie.split(';');
            const accessToken = cookies.find(cookie => cookie.trim().startsWith('access_token='))?.split('=')[1];

            if (!accessToken) {
                console.error('No access token found in cookies');
                return;
            }

            // Decode JWT token to get user ID
            try {
                const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
                const userId = decodedToken.user_id;
                navigate('/matchmaking', { 
                    state: { 
                        backgroundId : backgroundId,
                        currentUser : { id: userId }
                    } 
                });

            } catch (error) {
                console.error('Error decoding JWT token:', error);
            }
        }
    }

    return (
        <div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary'>
            <section>
                <div className='page-margin flex flex-col'>
                    {step === 1 && (
                        <>
                            {/* The chosen background */}
                            <div className='flex justify-center'>
                                <div
                                    key={backgroundId}
                                    className='lp:border-2 border border-primary overflow-hidden selected-table mtb:w-select-table w-full rounded-2xl relative'
                                    style={{
                                        background: `url('/assets/images/tables/table${backgroundId}.png')`,
                                        backgroundSize: 'cover',
                                    }}>
                                    <div className='w-full h-full flex justify-center items-center bg-backdrop-40'>
                                        <div className='absolute top-8 left-3 paddles bg-primary rounded-full'></div>
                                        <button onClick={handleStart} className='font-dreamscape start-button'>Start</button>
                                        <div className='absolute bottom-4 right-3 paddles bg-primary rounded-full '></div>
                                    </div>
                                </div>
                            </div>

                            <div className='select-message flex justify-center items-center'>
                                <h1 className='font-dreamscape-sans'>Select Table</h1>
                            </div>

                            {/* Background selection grid */}
                            <div className='grid lg:gap-8 tb:gap-6 gap-4 lg:grid-cols-4 lg:grid-rows-2 lp:grid-cols-3 lp:grid-rows-3 grid-cols-2 grid-rows-4'>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
                                    <button
                                        key={id}
                                        onClick={() => handleClick(id)}
                                        className={`tables border border-primary rounded-xl overflow-hidden outline-none hover:scale-[1.05] transition duration-500`}
                                        style={{
                                            background: `url('/assets/images/tables/table${id}.png')`,
                                            backgroundSize: 'cover',
                                        }}
                                        disabled={xp / 1000 < id && id > 1 ? true : false}
                                    >
                                        {/* Overlay to show locked backgrounds */}
                                        <div className={`h-full w-full flex justify-center items-center ${xp / 1000 < id && id > 1 ? 'bg-backdrop-80' : ''}`}>
                                            {xp / 1000 < id && id > 1 && (
                                                <img src='/assets/images/icons/Lock.svg' alt='Locked' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <div className="bg-backdrop-80 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Choose Game Mode</h2>
                            <button onClick={() => handleGameModeSelect('local')} className="w-full p-2 mb-2 bg-primary text-backdrop-80 rounded hover:bg-primary-dark transition">
                                Local Game
                            </button>
                            <button onClick={() => handleGameModeSelect('remote')} className="w-full p-2 bg-primary text-backdrop-80 rounded hover:bg-primary-dark transition">
                                Remote Game
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Custom