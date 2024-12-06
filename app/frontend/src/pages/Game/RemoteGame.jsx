import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GameScore from '../../components/Game/GameScore'
import RemotePlayer from '../../components/Game/RemotePlayer'
import Timer from '../../components/Game/Timer'
import RemotePongTable from '../../components/Game/RemotePongTable'
import GameWebSocket from '../../services/GameWebSocket'
import './Game.css'

const RemoteGame = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const socketRef = useRef(null)

    // Get data passed from matchmaking
    const { gameId, playerNumber, opponent, currentUser, settings } = location.state || {}

	// pause/resume game mechanics
	const [pausingPlayer, setPausingPlayer] = useState(null);
	const [pausesRemaining, setPausesRemaining] = useState({ 1: 3, 2: 3 });

    // Game state
    const [gameState, setGameState] = useState(null)
    const [isPaused, setIsPaused] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(settings?.duration || 60)

    useEffect(() => {
        const ws = new GameWebSocket()
        socketRef.current = ws

        // Connect to game
        ws.connect(gameId)

        // Set up event handlers
        ws.on('game_info', (data) => {
            console.log('Received initial game state:', data)
            setGameState(data.state)
        })

        ws.on('ball_update', (data) => {
            setGameState(prev => ({
                ...prev,
                ball: data.state.ball
            }))
            setTimeRemaining(data.state.time_remaining)
        })

        ws.on('paddles_update', (data) => {
            setGameState(prev => ({
                ...prev,
                player1_paddle: data.paddles['1'],
                player2_paddle: data.paddles['2']
            }))
        })

        ws.on('score_update', (data) => {
            setPlayer1Score(data.scores['1'])
            setPlayer2Score(data.scores['2'])
        })

        ws.on('game_paused', (data) => {
			setIsPaused(true);
			setPausingPlayer(data.player);
			setPausesRemaining(data.pauses_remaining);
		});

        ws.on('game_resumed', () => {
			setIsPaused(false);
			setPausingPlayer(null);
		});

        ws.on('game_started', () => setIsPaused(false))
        ws.on('game_ended', () => setIsGameOver(true))

        // Cleanup
        return () => ws.disconnect()
    }, [gameId])

    const handlePaddleMove = (newY) => {
        socketRef.current?.sendPaddleMove(newY)
    }

    // const handlePause = () => {
    //     if (!isGameOver) {
    //         socketRef.current?.send({ 
    //             type: isPaused ? 'resume_game' : 'pause_game' 
    //         })
    //     }
    // }

	const handlePause = () => {
		if (!socketRef.current || !playerNumber) return;
		
		if (isGameOver) {
			console.log('Game is over, cannot pause');
			return;
		}

		// Check if can pause
		if (!isPaused && pausesRemaining[playerNumber] <= 0) {
			console.log('No more pauses remaining');
			return;
		}
		// Check if can resume
		if (isPaused && pausingPlayer !== playerNumber) {
			console.log('Only the pausing player can resume the game');
			return;
		}
	
		socketRef.current.send({ 
			type: isPaused ? 'resume_game' : 'pause_game' 
		});
	};

    const handleReady = () => {
        socketRef.current?.send({ type: 'player_ready' })
    }

    const handleStartGame = () => {
        socketRef.current?.send({ type: 'start_game' })
    }

    return (
        <div className={`backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-80' : 'bg-backdrop-40'}`}>
            <section className='flex'>
                <div className='flex-1 margin-page flex flex-col items-center gap-8'>
                    {/* Game controls */}
                    <div className="flex gap-4">
                        <button onClick={handleReady}>Ready</button>
                        <button onClick={handleStartGame}>Start Game</button>
                    </div>

                    {/* Score and Timer */}
                    <GameScore
                        player1Score={player1Score}
                        player2Score={player2Score}
                        isPaused={isPaused}
                    />
                    <Timer isPaused={isPaused} timeRemaining={timeRemaining} />
                    
                    {/* Main game area */}
                    <div className='flex-1 w-full flex max-lg:flex-wrap max-lg:justify-around justify-between'>
                        <RemotePlayer
                            isPaused={isPaused}
                            PlayerName={playerNumber === 1 ? currentUser.username : opponent.username}
                            BadgeName={playerNumber === 1 ? currentUser.badge?.name : opponent.badge?.name}
                            playerImage={playerNumber === 1 ? currentUser.profile_picture : opponent.profile_picture}
                            GameMode="remote"
                        />

                        <RemotePongTable
                            gameState={gameState}
                            onPaddleMove={handlePaddleMove}
                            playerNumber={playerNumber}
                            isPaused={isPaused}
                            handlePause={handlePause}
                            backgroundId={settings?.backgroundId}
                            isGameOver={isGameOver}
                        />
						
						{!isGameOver && (
							<button
								onClick={handlePause}
								disabled={
									(!isPaused && pausesRemaining[playerNumber] <= 0) || 
									(isPaused && pausingPlayer !== playerNumber)
								}
								className={`pause flex items-center gap-3 ${
									((!isPaused && pausesRemaining[playerNumber] <= 0) || 
									(isPaused && pausingPlayer !== playerNumber))
									? 'opacity-50 cursor-not-allowed'
									: ''
								}`}
							>
								<img 
									src={`/assets/images/icons/${isPaused ? 'play' : 'pause'}.svg`} 
									alt="" 
								/>
								<p className="align-middle">
									{isPaused ? 'resume' : `pause (${pausesRemaining[playerNumber]} left)`}
								</p>
							</button>
						)}

                        <RemotePlayer
                            isPaused={isPaused}
                            PlayerName={playerNumber === 2 ? currentUser.username : opponent.username}
                            BadgeName={playerNumber === 2 ? currentUser.badge?.name : opponent.badge?.name}
                            playerImage={playerNumber === 2 ? currentUser.profile_picture : opponent.profile_picture}
                            GameMode="remote"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RemoteGame
