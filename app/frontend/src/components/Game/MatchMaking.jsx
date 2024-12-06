import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MatchmakingService from '../../services/MatchmakingService'
import './MatchMaking.css'
import MatchFoundDisplay from './MatchFoundDisplay';
import Player from './Player'


// Main Matchmaking component
const Matchmaking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState('connecting');
    const [opponent, setOpponent] = useState(null);
    
    const [matchData, setMatchData] = useState(null);
    // const [countdown, setCountdown] = useState(null);
    const [matchmakingService] = useState(new MatchmakingService());

    useEffect(() => {
        const settings = location.state?.settings;
        console.log('Initializing matchmaking with settings:', settings);

        matchmakingService.connect();

        matchmakingService.on('connect', () => {
            console.log('Connected to matchmaking service');
            setStatus('connected');
            matchmakingService.findMatch(settings);
        });

        matchmakingService.on('searching', (data) => {
            console.log('Searching for opponent:', data);
            setStatus('searching');
        });

        matchmakingService.on('match_found', async (data) => {
            console.log('Match found with data:', data);
            setStatus('match_found');
            setOpponent(data.opponent);
            setMatchData(data);

            // Start countdown
            // for (let i = 3; i > 0; i--) {
            //     setCountdown(i);
            //     await new Promise((r) => setTimeout(r, 1000));
            // }

            if (!data.game_id) {
                console.error('Server did not provide game_id');
                setStatus('error');
                return;
            }

            const settings = location.state?.settings || {
                backgroundId: 1,
                paddleHeight: 110,
                ballRadius: 15,
                powerUps: 1,
                attacks: 1,
                Player1Color: '#ffffff',
                Player2Color: '#ffffff',
                BallColor: '#ffffff',
                duration: 30,
            };

            navigate('/remote-game', {
                state: {
                    playerNumber: data.player_number,
                    matchData: data,
                    gameId: data.game_id,
                    opponent: data.opponent,
                    currentUser: data.current_user,
                    settings: settings,
                },
            });
    
            // navigate('/game-test', {
            //     state: {
            //         gameId: data.game_id,
            //         playerNumber: data.player_number,
            //         opponent: data.opponent,
            //         currentUser: data.current_user,
            //         settings: settings,
            //     },
            // });
            
        });

        return () => {
            console.log('Cleaning up matchmaking');
            matchmakingService.disconnect();
        };
    }, []);

    const handleCancel = () => {
        console.log('Cancelling search');
        matchmakingService.cancelSearch();
        navigate('/remote-game-setup');
    };

    return (
        <div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary flex items-center justify-center'>
            {status === 'match_found' ? (
                <MatchFoundDisplay matchData={matchData} /> /* countdown={countdown} */
            ) : (
                <div className='w-1/3 min-w-[400px]'>
                    <div className='w-full flex flex-col items-center gap-8 bg-backdrop-80 p-12 rounded-lg shadow-xl'>
                        <h2 className='text-3xl font-bold'>Finding Opponent</h2>
                        <div className='text-xl text-center'>
                            {status === 'connecting' && 'Connecting to server...'}
                            {status === 'connected' && 'Connected, starting search...'}
                            {status === 'searching' && 'Searching for opponent...'}
                            {status === 'error' && 'Error finding match'}
                        </div>

                        <div className='loading-indicator'>
                            <div className='paddle left'></div>
                            <div className='ball'></div>
                            <div className='paddle right'></div>
                        </div>

                        <button 
                            onClick={handleCancel}
                            className='px-8 py-3 bg-primary text-backdrop-80 rounded-lg hover:bg-opacity-90 transition-all font-bold'
                        >
                            Cancel
                        </button>

                        <div className='text-sm text-gray-400 text-center'>
                            <p>Current Status: {status}</p>
                            <p>WebSocket State: {matchmakingService.socket?.readyState}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Matchmaking;