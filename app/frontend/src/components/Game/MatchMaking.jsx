import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MatchmakingService from '../../services/MatchmakingService'
import './MatchMaking.css'
import MatchFoundDisplay from './MatchFoundDisplay';

import Button from '../Home/Buttons/Button'


// Main Matchmaking component
const Matchmaking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState('connecting');
    const [opponent, setOpponent] = useState(null);
    
    const [matchData, setMatchData] = useState(null);
    const [matchmakingService] = useState(new MatchmakingService());
    const [count, setCountdown] = useState(5);

    useEffect(() => {

        const currentUserId = location.state?.currentUser?.id;

        if (currentUserId === undefined) {
            console.error('No user ID provided in location state');
            navigate('/dashboard');
            return;
        }

        matchmakingService.connect(currentUserId);

        matchmakingService.on('connect', () => {
            setStatus('connected');
            matchmakingService.findMatch();
        });

        matchmakingService.on('error', (error) => {
            console.error('Matchmaking error:', error);
            setStatus('error');
            // Optionally redirect back or show error message
        });

        matchmakingService.on('timeout', (data) => {
            console.log('Search timeout:', data);
            setStatus('timeout');
        });


        matchmakingService.on('searching', (data) => {
            setStatus('searching');
        });

        matchmakingService.on('match_found', async (data) => {
            setStatus('match_found');
            setOpponent(data.opponent);
            setMatchData(data);

            if (!data.game_id) {
                console.error('Server did not provide game_id');
                setStatus('error');
                return;
            }

            const backgroundId = location.state?.backgroundId || 1;
            
            // Start countdown
            for (let i = 5; i > 0; i--) {
                setCountdown(i);
                await new Promise((r) => setTimeout(r, 1000));
            }

            navigate('/remote-game', {
                state: {
                    playerNumber: data.player_number,
                    gameId: data.game_id,
                    opponent: data.opponent,
                    currentUser: data.current_user,
                    backgroundId : backgroundId,
                },
            });        
        });

        return () => {
            matchmakingService.disconnect();
        };
    }, []);

    const handleCancel = () => {
        console.log('Cancelling search');
        matchmakingService.cancelSearch();
        navigate('/dashboard');
    };

    return (
        <section className='flex justify-center absolute h-screen w-screen
            top-[44%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-backdrop-40'>
            {status === 'match_found' ? (
                <MatchFoundDisplay matchData={matchData} countdown={count} />
            ) : status === 'timeout' ? (
                <div className='w-1/3 min-w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='w-full flex flex-col items-center gap-8 p-12 text-center'>
                        <h2 className='text-3xl font-heavy'>Time Out</h2>
                        <p className='font-medium'>No opponent found at the moment, Please try again later.</p>
                        <Button onClick={() => navigate('/custom')}
                            className={'py-3 px-6 rounded border border-border font-medium buttons-text remove-button'}>
                            Back to Menuu
                        </Button>
                    </div>
                </div>
            ) : (
                <div className='w-1/3 min-w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='w-full flex flex-col items-center gap-8 p-12'>
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
        </section>
    );
};

export default Matchmaking;