import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MatchmakingService from '../../services/MatchmakingService'
import './MatchMaking.css'
import MatchFoundDisplay from './MatchFoundDisplay'
import SearchingAnimation from './Remote/SearchingAnimation'
import Button from '../Home/Buttons/Button'


const Matchmaking = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [opponentFound, setOpponentFound] = useState(false)
    const [status, setStatus] = useState('connecting')
    const [matchData, setMatchData] = useState(null)
    const [matchmakingService] = useState(new MatchmakingService())
    const [count, setCountdown] = useState(5)
    const [errorMessage, setErrorMessage] = useState('')
    const [statement, setStatement] = useState('')

    useEffect(() => {
		const currentUser = location.state?.currentUser
        const currentUserId = currentUser?.id
        const isDirectMatch = location.state?.isDirectMatch
        const invitationId = location.state?.invitationId
        

		if (!currentUser || !currentUserId) {
            console.error('No user data available. Redirecting to dashboard...')
            navigate('/dashboard', { replace: true }) // Using replace to prevent back button issues
            return
        }

        if (matchmakingService.isConnected()) {
            matchmakingService.disconnect()
        }
        setMatchData(null)
        setStatus('connecting')

        // Cancel any ongoing matchmaking before starting new one
        matchmakingService.cancelSearch(); // CAUSES ERROR

        matchmakingService.connect(currentUserId)

        matchmakingService.on('connect', () => {
            setStatus('connected');
            
            if (isDirectMatch) {
                console.log('Starting direct match CURRENT USER:', currentUser)
                matchmakingService.initiateDirectMatch (
                    invitationId,
                    currentUserId
                );
                setStatus('waiting for opponent');
            } else {
                console.log('Starting random matchmaking');
                matchmakingService.findMatch();
                setStatus('searching');
            }
        });

        matchmakingService.on('error', (error) => {
            console.error('Matchmaking error:', error)
            setStatus('error')
            setErrorMessage(error.message)
        })

        matchmakingService.on('inGame', (data) => {
            console.log('User already in game:', data)
            setStatus('inGame')
            setErrorMessage(data.message)
        })

        matchmakingService.on('alreadySearching', (data) => {
            console.log('Already searching:', data)
            setStatus('searching') // Keep showing searching animation
            setErrorMessage(data.message)
        })

        matchmakingService.on('timeout', (data) => {
            console.log('Search timeout:', data)
            setStatus('timeout')
        })

        matchmakingService.on('searching', (data) => {
            setStatus('searching')
        })

        matchmakingService.on('match_found', async (data) => {
            setStatus('match_found')
            setStatement('match found')
            setOpponentFound(true) 
            setMatchData(data)

            if (!data.game_id) {
                console.error('Server did not provide game_id')
                setStatus('error')
                setErrorMessage('Invalid game data received')
                return
            }

            // get the countdown from the server
            if (data.countdown !== undefined) {
                setCountdown(data.countdown);
            }

            // Navigate when countdown is complete and server signals
            if (data.should_navigate) {
                const backgroundId = location.state?.backgroundId || 3;
                navigate('/remote-game', {
                    state: {
                        playerNumber: data.player_number,
                        gameId: data.game_id,
                        opponent: data.opponent,
                        currentUser: data.current_user,
                        backgroundId: backgroundId,
                    },
                });
            }
        });

        matchmakingService.on('direct_match', async (data) => {
            setStatus('match_found')
            setStatement('Friendly Match')
            setOpponentFound(true)
            setMatchData(data)

            if (!data.game_id) {
                console.error('Server did not provide game_id')
                setStatus('error')
                setErrorMessage('Invalid game data received')
                return
            }

            const backgroundId = location.state?.backgroundId || 1

            // get the countdown from the server
            if (data.countdown !== undefined) {
                setCountdown(data.countdown);
            }

            // Navigate when countdown is complete and server signals
            if (data.should_navigate) {
                const backgroundId = location.state?.backgroundId || 3;
                navigate('/remote-game', {
                    state: {
                        playerNumber: data.player_number,
                        gameId: data.game_id,
                        opponent: data.opponent,
                        currentUser: data.current_user,
                        backgroundId: backgroundId,
                    },
                });
            }
        });

        return () => {
            matchmakingService.disconnect()
        }
    }, [location.state])  // Trigger the effect whenever the location state changes

    const handleCancel = () => {
        console.log('Cancelling search')
        matchmakingService.cancelSearch()
        navigate('/custom')
    }

    const renderContent = () => {
        switch (status) {
            case 'match_found':
                return <MatchFoundDisplay matchData={matchData} countdown={count} statement={statement} />
            case 'timeout':
                return (
                    <div className='w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    flex flex-col items-center gap-8 text-center z-20 timeout'>
                        <h2 className='players-usernames font-heavy'>Time Out</h2>
                        <p className='font-medium'>No opponent found at the moment, Please try again later.</p>
                        <Button onClick={() => navigate('/custom')}
                            className={'py-3 px-6 rounded border border-border font-medium buttons-text remove-button'}>
                            Back to Menu
                        </Button>
                    </div>
                )
            
            case 'error':
            case 'inGame':
                return (
                    <div className='w-1/3 min-w-[400px]'>
                        <div className='w-full flex flex-col items-center gap-8 bg-backdrop-80 p-12 rounded-lg shadow-xl'>
                            <h2 className='text-3xl font-bold'>Error</h2>
                            <p>{errorMessage}</p>
                            <button
                                onClick={() => navigate('/custom')}
                                className='px-8 py-3 bg-primary text-backdrop-80 rounded-lg hover:bg-opacity-90 transition-all font-bold'
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                )
            
            default:
                return (
                    <div className='w-1/3 min-w-[400px] flex flex-col items-center'>
                        <div className='flex-grow flex items-center justify-center relative'>
                            {status === 'searching' ? (
                                    <SearchingAnimation opponentFound={opponentFound} handleCancel={handleCancel}/>
                            ) : null}
                        </div>
                    </div>
                )
        }
    }

    return (
        <section className='flex justify-center flex-1'>
            <div className='fixed inset-0 bg-black bg-opacity-50 z-10'></div>
            {renderContent()}
        </section>
    )
}

export default Matchmaking