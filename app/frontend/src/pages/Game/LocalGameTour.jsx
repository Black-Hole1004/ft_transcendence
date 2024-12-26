import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './Game.css'
import Confetti from 'react-confetti'
import Timer from '../../components/Game/Timer'
import Player from '../../components/Game/Player'
import GameScore from '../../components/Game/GameScore'
import PongTable from '../../components/Game/PongTable'

import { useTournament } from '../../context/TournamentContext'

const SuddenDeathMessage = () => (
	<div className='fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600/90 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse'>
		<span className='font-bold'>SUDDEN DEATH!</span>
		<span className='ml-2'>First PLayer To Score Wins !!</span>
	</div>
)

// --smoky-black: #0E0B0Aff;
const GameOverPopup = ({ winner, onQuit, onProceed }) => (
	<>
		<div class='fixed inset-0 bg-black bg-opacity-90 z-10'></div>
		<div
			className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lp:px-10 px-3 z-20
			flex flex-col justify-center items-center bg-secondary bg-opacity-60 border-1.5 border-primary rounded-xl gameoverpopup'
		>
			{winner ? (
				<h1 className='font-dreamscape'>VICTORY ACHIEVED</h1>
			) : (
				<h1 className='font-dreamscape'>GAME OVER</h1>
			)}
			{winner ? (
				<div className='font-heavy mb-20'>
					<p className='text-left text-2xl'>Cosmic Champion:</p>
					<h3 className='players-usernames font-dreamscape-sans pt-3 pb-7 text-center glow drop-shadow-[0_2px_10px_rgba(255,206,158,0.5)]'>
						{winner.name}
					</h3>
					<p className='text-lg text-center'>
						Your stellar skills have conquered the arena!
					</p>
				</div>
			) : (
				<p className='text-2xl font-medium mb-20'>
					A cosmic deadlock! The match ends in a tie.
				</p>
			)}
			<div className='w-full flex justify-between my-10 lg:gap-10 gap-6'>
				<button
					onClick={onQuit}
					className='font-dreamscape bg-primary text-secondary py-3 flex-1 rounded
					hover:scale-[1.01] hover:brightness-100 transition-all duration-300 ease-in-out
					hover:outline hover:outline-offset-2 hover:outline-2 hover:outline-primary'
				>
					Quit The Tournament
				</button>
				<button
					onClick={onProceed}
					className='font-heavy text-primary py-3 border border-border rounded flex-1
					bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out hover:bg-[rgb(183,170,156,30%)]'
				>
					Proceed To The Next Round
				</button>
			</div>
		</div>
	</>
)

const LocalGame = () => {
	const navigate = useNavigate()
	// code ahaloui added
	const { setSemiFinal1winner, setSemiFinal2winner, setFinalWinner, setTournamentState, resetTournament, setTournamentData } =
		useTournament()
	const [isSuddenDeath, setIsSuddenDeath] = useState(false)

	const [isPaused, setIsPaused] = useState(false)
	const [isGameOver, setIsGameOver] = useState(false)
	const [player1Score, setPlayer1Score] = useState(0)
	const [player2Score, setPlayer2Score] = useState(0)
	const [showConfetti, setShowConfetti] = useState(false)
	const [winner, setWinner] = useState(null)

	const location = useLocation()
	const {
		mode,
		player1,
		player2,
		ballColor,
		duration,
		backgroundId,
		paddleSize,
		ballSize,
		tournamentRound,
	} = location.state || {}

	const [timeRemaining, setTimeRemaining] = useState(duration || 60)
	const [showRestartPopup, setShowProceedPopup] = useState(false)
	const [resetParameters, setResetParameters] = useState(false)

	const [firstPlayerToScore, setFirstPlayerToScore] = useState(null)

	const handlePause = () => {
		if (!isGameOver) {
			setIsPaused(!isPaused)
		}
	}

	const updateScore = (player) => {
		// During sudden death, immediately end game on score
		if (isSuddenDeath) {
			const scoringPlayer = player === 1 ? player1 : player2
			setFirstPlayerToScore(scoringPlayer)
			handleTournamentWinner(scoringPlayer) // Directly handle winner
			return
		}

		// Normal game scoring
		if (player === 2) {
			setPlayer2Score((prevScore) => prevScore + 1)
		} else if (player === 1) {
			setPlayer1Score((prevScore) => prevScore + 1)
		}
	}

	useEffect(() => {
		if (isPaused || isGameOver) {
			return
		}
		if (timeRemaining > 0) {
			const timerId = setInterval(() => {
				setTimeRemaining((prevTime) => prevTime - 1)
			}, 1000)
			return () => clearInterval(timerId)
		} else if (timeRemaining === 0) {
			gameOver()
		}
	}, [timeRemaining, isPaused, isGameOver])

	const getWinner = () => {
		if (player1Score > player2Score) {
			return player1
		} else if (player2Score > player1Score) {
			return player2
		} else {
			if (tournamentRound) {
				if (isSuddenDeath && firstPlayerToScore) {
					return firstPlayerToScore
				}
				setIsSuddenDeath(true)
				setIsGameOver(false)
				setTimeRemaining(30)
				return null
			}
			return null
		}
	}

	// Update handleProceed for tournament flow
	const handleProceed = () => {
		setShowProceedPopup(false)
		navigate('/tournament', {
			replace: true,
			isFromGame: true,
		})
	}

	const quitTournament = () => {
		resetTournament() // ADDED
		setTournamentData(null) // ADDED

		setShowProceedPopup(false)
		navigate('/dashboard')
	}

	const gameOver = () => {
		const winner = getWinner()

		if (!winner && tournamentRound) {
			setIsSuddenDeath(true)
			setTimeRemaining(30)
			setIsGameOver(false)
			setIsPaused(false)
			setFirstPlayerToScore(null)
			return
		}

		handleTournamentWinner(winner)
	}

	// Helper function for tournament progression
	const handleTournamentWinner = (winner) => {
		setIsGameOver(true)
		setIsPaused(false)
		setShowProceedPopup(true)
		setWinner(winner)
		setIsSuddenDeath(false)

		if (!tournamentRound) return

		switch (tournamentRound) {
			case 'semifinal1':
				setSemiFinal1winner(winner)
				setTournamentState('semifinal2')
				break
			case 'semifinal2':
				setSemiFinal2winner(winner)
				setTournamentState('final')
				break
			case 'final':
				setFinalWinner(winner)
				setTournamentState('completed')
				break
		}
	}

	return (
		<>
			<section
				className={`relative flex-1 margin-page flex flex-col items-center gap-8 ${isPaused ? 'bg-backdrop-40' : ''}`}
			>
				<div className='flex flex-col'>
					<GameScore
						player1Score={player1Score}
						player2Score={player2Score}
						isPaused={isPaused}
					/>
					<Timer
						isPaused={isPaused}
						timeRemaining={timeRemaining}
						isSuddenDeath={isSuddenDeath}
					/>
					{/* Add the sudden death message here */}
					{isSuddenDeath && <SuddenDeathMessage />}
				</div>
				<div className='relative w-full flex justify-center font-dreamscape-sans'>
					<Player
						id={1}
						isPaused={isPaused}
						PlayerName={player1.name}
						BadgeName={player1.badge}
						playerImage={player1.image}
						badgeImage={player1.badgeImage}
						GameMode={mode}
					/>
					<Player
						id={2}
						isPaused={isPaused}
						PlayerName={player2.name}
						BadgeName={player2.badge}
						playerImage={player2.image}
						badgeImage={player2.badgeImage}
						GameMode={mode}
					/>
					<PongTable
						isPaused={isPaused}
						handlePause={handlePause}
						backgroundId={backgroundId}
						updateScore={updateScore}
						isGameOver={isGameOver}
						resetParameters={resetParameters}
						player1Color={player1.color}
						player2Color={player2.color}
						ballColor={ballColor}
						paddleSize={paddleSize}
						ballSize={ballSize}
					/>
				</div>
				{showRestartPopup && (
					<GameOverPopup
						winner={winner}
						onQuit={quitTournament}
						onProceed={handleProceed}
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
			</section>
		</>
	)
}

export default LocalGame
