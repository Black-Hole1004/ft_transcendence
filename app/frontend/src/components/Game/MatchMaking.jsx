import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MatchmakingService from '../../services/MatchmakingService'
import './MatchMaking.css'
import MatchFoundDisplay from './MatchFoundDisplay';


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

        matchmakingService.connect();

        matchmakingService.on('connect', () => {
            setStatus('connected');
            matchmakingService.findMatch();
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
                    matchData: data,
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
        navigate('/remote-game-setup');
    };

    return (
        <div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary flex items-center justify-center'>
            {status === 'match_found' ? (
                <MatchFoundDisplay matchData={matchData} countdown={count} />
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