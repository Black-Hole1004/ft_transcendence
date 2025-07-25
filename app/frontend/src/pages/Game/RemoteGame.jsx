import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Game.css'
import GameScore from '../../components/Game/GameScore'
import RemotePlayer from '../../components/Game/RemotePlayer'
import RemotePongTable from '../../components/Game/RemotePongTable'
import Timer from '../../components/Game/Timer'
import Confetti from 'react-confetti'
import GameWebSocket from '../../services/GameWebSocket'
import GameOverPopup from '../../components/Game/GameOverPopup'
import Loader from '../../components/Loader/Loader'
import { useAlert } from '../../components/AlertContext'

const RemoteGame = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const socketRef = useRef(null)
	const { triggerAlert } = useAlert()

	// Location state data
	const { gameId, playerNumber, opponent, currentUser, backgroundId } = location.state || {}

	useEffect(() => {
        // Protect against direct access to the game
        if (!gameId || !playerNumber || !opponent || !currentUser || !backgroundId) {
			navigate('/dashboard', { replace: true }); // Using replace to prevent back button issues
		}
	}, [gameId, playerNumber, opponent, currentUser, backgroundId, navigate]);
    
    // Return a placeholder or loading state while navigating
    if (!gameId || !playerNumber || !opponent || !currentUser || !backgroundId) {
		return <Loader />;
	}

	// Determine which player info to show on each side
	const rightPlayer = currentUser // Current player always on right
	const leftPlayer = opponent // Opponent always on left

	const [rightScore, setRightScore] = useState(0) // Current player's score
	const [leftScore, setLeftScore] = useState(0) // Opponent's score

	const [opponentDisconnected, setOpponentDisconnected] = useState(false)

	// Game state
	const [gameState, setGameState] = useState(null)
	const [isPaused, setIsPaused] = useState(false)
	const [isGameOver, setIsGameOver] = useState(false)
	const [showRestartPopup, setShowRestartPopup] = useState(false)
	const [showConfetti, setShowConfetti] = useState(false)
	const [winner, setWinner] = useState(null)
	const [loser, setLoser] = useState(null)

	const [timeRemaining, setTimeRemaining] = useState(120)

	// Pause/Resume state
	const [pausingPlayer, setPausingPlayer] = useState(null)
	const [pausesRemaining, setPausesRemaining] = useState({ 1: 3, 2: 3 })

	// WebSocket setup and event handling
	useEffect(() => {
		const ws = new GameWebSocket()
		socketRef.current = ws

		// Connect to game
		ws.connect(gameId, playerNumber, currentUser.id)

		// Event handlers
		ws.on('game_info', (data) => {
			setGameState(data.state)
			// sleep one second before sending ready
			setTimeout(() => handleReady(), 1000)
			setTimeout(() => handleStartGame(), 1000)
			handleStartGame()
		})

		ws.on('game_state_update', (data) => {
			// Update game state
			setGameState((prev) => ({
				...prev,
				ball: data.state.ball,
				player1: data.state.player1,
				player2: data.state.player2,
				time_remaining: data.state.time_remaining,
				player1_score: data.state.player1.score,
				player2_score: data.state.player2.score,
			}))

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

			//set winner
			const winner_user = {
				username: data.winner_user.username,
				id: data.winner_user.id,
				old_xp: data.winner_user.old_xp,
				new_xp: data.winner_user.new_xp,
				xp_change: data.winner_user.xp_change,
				score: data.winner_user.score,
				badge: data.winner_user.badge,
				profile_picture: data.winner_user.profile_picture,
			}
			setWinner(winner_user)

			//set loser
			const loser_user = {
				username: data.loser_user.username,
				id: data.loser_user.id,
				old_xp: data.loser_user.old_xp,
				new_xp: data.loser_user.new_xp,
				xp_change: data.loser_user.xp_change,
				score: data.loser_user.score,
				badge: data.loser_user.badge,
				profile_picture: data.loser_user.profile_picture,
			}
			setLoser(loser_user)

			setShowConfetti(true)
			setTimeout(() => setShowConfetti(false), 5000)
		})

		ws.on('player_quit', (data) => {
			// Handle when other player quits
			setIsGameOver(true)
			setWinner(currentUser) // Set current player as winner since other player quit
			setLoser(opponent)
			setShowRestartPopup(true)
		})

		// Add these new event handlers
		ws.on('player_temporary_disconnect', (data) => {
			// Only show disconnect message if it's the other player who disconnected
			if (data.player !== playerNumber) {
				setOpponentDisconnected(true)
				setIsPaused(true) // Pause the game
			}
		})

		ws.on('player_reconnected', (data) => {
			if (data.player !== playerNumber) {
				setOpponentDisconnected(false)
				setIsPaused(false) // Resume the game
			}
		})


		return () => ws.disconnect()
	}, [gameId])


	useEffect(() => {
		// Check ready players after 6 seconds
		const timeoutId = setTimeout(() => {
			socketRef.current?.send({ type: 'check_ready_players' })
		}, 11000); // 11 seconds
	
		// Listen for server response about ready players
		if (socketRef.current) {
			socketRef.current.on('ready_players_count', (data) => {
				if (data.ready_count === 1) {
					triggerAlert('error', 'Opponent did not join the game');
					navigate('/dashboard');
				}
			});
		}
	
		return () => {
			clearTimeout(timeoutId);
			if (socketRef.current) {
				socketRef.current.off('ready_players_count');
			}
		};
	}, []);

	// Send paddle move to server (up or down)
	const handlePaddleMove = (action) => {
		// action should be 'startUp', 'startDown', 'stopUp', or 'stopDown'
		socketRef.current?.sendPaddleMove(action)
	}

	const handlePause = () => {
		if (!socketRef.current || !playerNumber) return

		if (isGameOver) {
			return
		}

		// Check if can pause
		if (!isPaused && pausesRemaining[playerNumber] <= 0) {
			return
		}
		// Check if can resume
		if (isPaused && pausingPlayer !== playerNumber) {
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

	const handleQuitGame = () => {
		if (!socketRef.current || !playerNumber) return

		socketRef.current.send({
			type: 'quit_game',
			player: playerNumber,
		})
		// Navigate back to custom and search for new game
		navigate('/custom')
	}

	const handleClose = () => {
		setShowRestartPopup(false)
		navigate('/dashboard')
	}

	const restartGame = () => {
		if (!socketRef.current || !playerNumber) return
		setShowRestartPopup(false)
		// navgate back to match making
		navigate('/custom')
	}

	return (
		<>
			<section
				className={`relative flex-1 margin-page flex flex-col items-center gap-8 ${isPaused ? 'bg-backdrop-40' : ''}`}
			>
				<div className='flex flex-col'>
					{/* Game controls */}
					<div className='flex justify-center gap-4'>
					</div>
					{/* Score and Timer */}
					<GameScore
						player1Score={leftScore} // Opponent's score (left side)
						player2Score={rightScore} // Player's score (right side)
						isPaused={isPaused}
					/>
					<Timer isPaused={isPaused} timeRemaining={timeRemaining} />
				</div>

				{/* Main game area */}
				<div className='relative w-full flex justify-center items-center font-dreamscape-sans matchmaking'>
					{/* Left side - Always opponent */}
					<RemotePlayer
						id={1}
						isPaused={isPaused}
						PlayerName={leftPlayer.username}
						BadgeName={leftPlayer.badge?.name}
						playerImage={leftPlayer.profile_picture}
						badgeImage={leftPlayer.badge?.image}
					/>
					<RemotePlayer
						id={2}
						isPaused={isPaused}
						PlayerName={rightPlayer.username}
						BadgeName={rightPlayer.badge?.name}
						playerImage={rightPlayer.profile_picture}
						badgeImage={rightPlayer.badge?.image}
					/>
					<RemotePongTable
						gameState={gameState} // gameState is an object with keys: ball, player1, player2, time_remaining
						onPaddleMove={handlePaddleMove}
						playerNumber={playerNumber}
						isPaused={isPaused}
						handlePause={handlePause}
						backgroundId={backgroundId}
						isGameOver={isGameOver}
						pausesRemaining={pausesRemaining}
						pausingPlayer={pausingPlayer}
						opponentDisconnected={opponentDisconnected}
					/>
					{/* Right side - Always current player */}
				</div>
			</section>

			{showRestartPopup && (
				<GameOverPopup
					winner={winner}
					loser={loser}
					currentPlayerId={currentUser.id}
					onRestart={restartGame}
					onClose={handleClose}
				/>
			)}
			{winner && showConfetti && (
				<Confetti
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100vw',
						height: '100vh',
						zIndex: 20,
					}}
					recycle={false}
					numberOfPieces={500}
				/>
			)}
		</>
	)
}

export default RemoteGame
