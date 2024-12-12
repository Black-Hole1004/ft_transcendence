import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Game.css'
import GameScore from '../../components/Game/GameScore'
import RemotePlayer from '../../components/Game/RemotePlayer'
import RemotePongTable from '../../components/Game/RemotePongTable'
import Timer from '../../components/Game/Timer'
import Confetti from 'react-confetti'
import GameWebSocket from '../../services/GameWebSocket'

const GameOverPopup = ({ winner, onRestart, onClose }) => (
	<div className='fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50'>
		<div className='bg-[#0E0B0A] border-2 border-[#76797Cff] text-[#E6DDC6] rounded-lg shadow-xl w-[480px] overflow-hidden relative'>
			<div
				className="h-60 bg-[url('path/to/venus-pingpong-background.jpg')] bg-cover bg-center relative"
				style={{ filter: 'brightness(1.2)' }}
			>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#0E0B0A]'></div>
				<div className='absolute inset-0 flex flex-col items-center justify-center'>
					<h2 className='text-5xl font-bold text-[#E6DDC6] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider'>
						GAME OVER
					</h2>
				</div>
			</div>

			<div className='p-8 relative z-10'>
				{winner ? (
					<div className='text-center'>
						<p className='text-2xl mb-2'>Cosmic Champion:</p>
						<p className='text-4xl font-bold mb-4 text-[#BE794A] glow drop-shadow-[0_2px_10px_rgba(190,121,74,0.8)]'>
							{winner.name}
						</p>
						<p className='text-lg mb-6 text-[#E6DDC6] opacity-90'>
							Your stellar skills have conquered the arena!
						</p>
					</div>
				) : (
					<p className='text-2xl text-center mb-6'>
						A cosmic deadlock! The match ends in a tie.
					</p>
				)}

				<div className='flex justify-center space-x-6 mt-8'>
					<button
						onClick={onRestart}
						className='bg-[#BE794A] hover:bg-[#61463A] text-[#E6DDC6] font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
					>
						Play Again
					</button>
					<button
						onClick={onClose}
						className='bg-transparent hover:bg-[#61463A] text-[#E6DDC6] font-bold py-3 px-8 rounded-full border-2 border-[#BE794A] transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
					>
						Return to Base
					</button>
				</div>
			</div>
		</div>
	</div>
)

const RemoteGame = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const socketRef = useRef(null)

	// Location state data
	const { gameId, playerNumber, opponent, currentUser, settings } = location.state || {}

	// adjusting the player info based on the playerNumber, so that the current player is always on the right side
	const isSelfOnRight = true;
	// Determine which player info to show on each side
	const rightPlayer = currentUser;  // Current player always on right
	const leftPlayer = opponent;      // Opponent always on left
	
	const [rightScore, setRightScore] = useState(0); // Current player's score
    const [leftScore, setLeftScore] = useState(0);  // Opponent's score

	// Game state
	const [gameState, setGameState] = useState(null)
	const [isPaused, setIsPaused] = useState(false)
	const [isGameOver, setIsGameOver] = useState(false)
	const [showRestartPopup, setShowRestartPopup] = useState(false)
	const [showConfetti, setShowConfetti] = useState(false)
	const [winner, setWinner] = useState(null)
	const [player1Score, setPlayer1Score] = useState(0)
	const [player2Score, setPlayer2Score] = useState(0)
	const [timeRemaining, setTimeRemaining] = useState(settings?.duration || 60)

	// Pause/Resume state
	const [pausingPlayer, setPausingPlayer] = useState(null)
	const [pausesRemaining, setPausesRemaining] = useState({ 1: 3, 2: 3 })

	// WebSocket setup and event handling
	useEffect(() => {
		const ws = new GameWebSocket()
		socketRef.current = ws

		// Connect to game
		console.log('Connecting to game:', gameId, 'as player', playerNumber, 'with user_id', currentUser.id)
		ws.connect(gameId, playerNumber, currentUser.id)

		// Event handlers
		ws.on('game_info', (data) => {
			console.log('Received initial game state:', data)
			setGameState(data.state)
		})

		ws.on('game_state_update', (data) => {
			console.log('Received game state update: => ' , data)	
			// Update game state
			setGameState(prev => ({
				...prev,
				ball: data.state.ball,
				player1: data.state.player1,
				player2: data.state.player2,
				time_remaining: data.state.time_remaining,
				player1_score: data.state.player1.score,
				player2_score: data.state.player2.score,
			}));

			// Update time remaining
			setTimeRemaining(data.state.time_remaining)

			// Update player scores - based on player number : if playerNumber is 1, then player1 score is rightScore
			if (playerNumber === 1) {
				setRightScore(data.state.player1.score) // my score (player 1)
				setLeftScore(data.state.player2.score) // opponent's score (player 2)
			} else {
				setRightScore(data.state.player2.score) // my score (player 2)
				setLeftScore(data.state.player1.score) // opponent's score (player 1)
			}

			// Update winner
			if (data.state.winner) {
				setWinner(data.state.winner) // 
			}

		});

		ws.on('score_update', (data) => {
			setPlayer1Score(data.scores['1'])
			setPlayer2Score(data.scores['2'])
		})

		ws.on('game_paused', (data) => {
			setIsPaused(true)
			setPausingPlayer(data.player)
			setPausesRemaining(data.pauses_remaining)
		})

		ws.on('game_resumed', () => {
			setIsPaused(false)
			setPausingPlayer(null)
		})

		ws.on('game_started', () => setIsPaused(false))

		ws.on('game_ended', (data) => {
			setIsGameOver(true)
			setShowRestartPopup(true)
			setWinner(data.winner)
			setShowConfetti(true)
			setTimeout(() => setShowConfetti(false), 5000)
		})

		return () => ws.disconnect()
	}, [gameId])

	// Send paddle move to server (up or down)
	const handlePaddleMove = (action) => {  // action should be 'startUp', 'startDown', 'stopUp', or 'stopDown'
		socketRef.current?.sendPaddleMove(action);
	}

	const handlePause = () => {
		if (!socketRef.current || !playerNumber) return

		if (isGameOver) {
			console.log('Game is over, cannot pause')
			return
		}

		// Check if can pause
		if (!isPaused && pausesRemaining[playerNumber] <= 0) {
			console.log('No more pauses remaining')
			return
		}
		// Check if can resume
		if (isPaused && pausingPlayer !== playerNumber) {
			console.log('Only the pausing player can resume the game')
			return
		}

		socketRef.current.send({
			type: isPaused ? 'resume_game' : 'pause_game',
		})
	}

	const handleReady = () => {
		socketRef.current?.send({ type: 'player_ready' })
	}

	const handleStartGame = () => {
		socketRef.current?.send({ type: 'start_game' })
	}

	const handleClose = () => {
		setShowRestartPopup(false)
		navigate('/remote-game-setup')
	}

	const restartGame = () => {
		socketRef.current?.send({ type: 'restart_game' })
		setShowRestartPopup(false)
	}

	return (
		<div
			className={`backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-35' : 'bg-backdrop-40'}`}
		>
			<section className='flex'>
				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
					{/* Game controls */}
					<div className='flex gap-4'>
						<button
							onClick={handleReady}
							className='bg-[#BE794A] hover:bg-[#61463A] text-[#E6DDC6] font-bold py-2 px-6 rounded-full transition duration-300'
						>
							Ready
						</button>
						<button
							onClick={handleStartGame}
							className='bg-[#BE794A] hover:bg-[#61463A] text-[#E6DDC6] font-bold py-2 px-6 rounded-full transition duration-300'
						>
							Start Game
						</button>
					</div>

					{/* Score and Timer */}
					<GameScore
						player1Score={leftScore}  // Opponent's score (left side)
						player2Score={rightScore} // Player's score (right side)
						isPaused={isPaused}
					/>
					<Timer isPaused={isPaused} timeRemaining={timeRemaining} />

					{/* Main game area */}
					<div className='flex-1 w-full flex max-lg:flex-wrap max-lg:justify-around justify-between font-dreamscape-sans'>
						{/* Left side - Always opponent */}
						<RemotePlayer
							isPaused={isPaused}
							PlayerName={leftPlayer.username}
							BadgeName={leftPlayer.badge?.name}
							playerImage={leftPlayer.profile_picture}
							badgeImage={leftPlayer.badge?.image}
						/>

						<RemotePongTable
							gameState={gameState}  // gameState is an object with keys: ball, player1, player2, time_remaining
							onPaddleMove={handlePaddleMove}
							playerNumber={playerNumber}
							isPaused={isPaused}
							handlePause={handlePause}
							backgroundId={settings?.backgroundId}
							isGameOver={isGameOver}
							pausesRemaining={pausesRemaining}
							pausingPlayer={pausingPlayer}
							isSelfOnRight={isSelfOnRight} // Current player is always on right to handle perspective
						/>
						{/* Right side - Always current player */}
						<RemotePlayer
							isPaused={isPaused}
							PlayerName={rightPlayer.username}
							BadgeName={rightPlayer.badge?.name}
							playerImage={rightPlayer.profile_picture}
							badgeImage={rightPlayer.badge?.image}
						/>
					</div>
				</div>
			</section>

			{showRestartPopup && (
				<GameOverPopup winner={winner} onRestart={restartGame} onClose={handleClose} />
			)}
			{showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
		</div>
	)
}

export default RemoteGame
