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
	const { gameId, playerNumber, opponent, currentUser, settings, state } = location.state || {}

	// Game state
    const [gameState, setGameState] = useState({
        paddles: {
            '1': { y: 150 },
            '2': { y: 150 }
        }
    });

	const [isPaused, setIsPaused] = useState(false)
	const [isGameOver, setIsGameOver] = useState(false)
	const [player1Score, setPlayer1Score] = useState(0)
	const [player2Score, setPlayer2Score] = useState(0)
	const [timeRemaining, setTimeRemaining] = useState(settings?.duration || 60)

    // Initialize WebSocket when component mounts
    useEffect(() => {
        socketRef.current = new GameWebSocket();

        // Set up WebSocket event handlers
        socketRef.current.on('state_update', (newState) => {
            setGameState(newState);
            // Update scores
            setPlayer1Score(newState.scores['1']);
            setPlayer2Score(newState.scores['2']);
        });

        // socketRef.current.on('game_ended', handleGameOver);

        // Connect to game
        socketRef.current.connect(gameId);

        return () => socketRef.current.disconnect();
    }, [gameId]);

	// Handle paddle movement
	const handlePaddleMove = (newY) => {
		socketRef.current.sendPaddleMove(newY);
	};

	// Handle pause
	const handlePause = () => {
		if (!isGameOver) {
			setIsPaused(!isPaused)
		}
	}

	// Timer effect
	useEffect(() => {
		if (isPaused || isGameOver) return

		if (timeRemaining > 0) {
			const timerId = setInterval(() => {
				setTimeRemaining((prevTime) => prevTime - 1)
			}, 1000)
			return () => clearInterval(timerId)
		}
	}, [timeRemaining, isPaused, isGameOver])

	return (
		<div
			className={`backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-80' : 'bg-backdrop-40'}`}
		>
			<section className='flex'>
				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
					{/* Score Component */}
					<GameScore
						player1Score={player1Score}
						player2Score={player2Score}
						isPaused={isPaused}
					/>

					{/* Timer Component */}
					<Timer isPaused={isPaused} timeRemaining={timeRemaining} />

					<div className='flex-1 w-full flex max-lg:flex-wrap max-lg:justify-around justify-between font-dreamscape-sans'>
						<div className='justify-center items-center w-1/4'>
							<RemotePlayer
								isPaused={isPaused}
								PlayerName={playerNumber === 1 ? currentUser.username : opponent.username}
								BadgeName={playerNumber === 1 ? currentUser.badge?.name : opponent.badge?.name}
								playerImage={playerNumber === 1 ? currentUser.profile_picture : opponent.profile_picture}
								badgeImage={playerNumber === 1 ? currentUser.badge?.image : opponent.badge?.image}
								GameMode='remote'
							/>
						</div>
						<div className='justify-center items-center w-1/2'>
							<RemotePongTable
								gameState={gameState}
								onPaddleMove={handlePaddleMove}
								playerNumber={playerNumber}
								isPaused={isPaused}

								handlePause={handlePause}
								backgroundId={settings?.backgroundId}
								isGameOver={isGameOver}
								player1Color={settings?.player1Color}
								player2Color={settings?.player2Color}
								ballColor={settings?.ballColor}
								paddleHeight={settings?.paddleHeight}
								ballRadius={settings?.ballRadius}
							/>
						</div>

						<div className='justify-center items-center w-1/4'>
							<RemotePlayer
								isPaused={isPaused}
								PlayerName={ playerNumber === 2 ? currentUser.username : opponent.username}
								BadgeName={playerNumber === 2 ? currentUser.badge?.name : opponent.badge?.name}
								playerImage={playerNumber === 2 ? currentUser.profile_picture : opponent.profile_picture}
								badgeImage={playerNumber === 2 ? currentUser.badge?.image : opponent.badge?.image}
								GameMode='remote'
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default RemoteGame
