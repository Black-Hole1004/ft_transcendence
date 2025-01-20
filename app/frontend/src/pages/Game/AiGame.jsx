import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Game.css'
import GameScore from '../../components/Game/GameScore'
import AiPongTable from '../../components/Game/AiPongTable'
import Timer from '../../components/Game/Timer'
import Confetti from 'react-confetti'

const GameOverPopup = ({ winner, onRestart, onClose }) => (
	<>
		<div className='fixed inset-0 bg-black bg-opacity-90 z-10'></div>
		<div
			className='absolute top-[44%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 lp:px-10 px-3 z-20
			flex flex-col justify-center items-center gameoverpopup'
		>
			{winner ? (
				<h1 className='font-dreamscape'>VICTORY ACHIEVED</h1>
			) : (
				<h1 className='font-dreamscape'>GAME OVER</h1>
			)}
			{winner ? (
				<div className='font-heavy'>
					<p className='text-left'>Cosmic Champion:</p>
					<h3 className='players-usernames font-dreamscape-sans pt-3 pb-7 text-center glow drop-shadow-[0_2px_10px_rgba(255,206,158,0.5)]'>
						{winner.name}
					</h3>
					<p className='text-center'>
						Your stellar skills have conquered the arena!
					</p>
				</div>
			) : (
				<p className='font-medium'>A cosmic deadlock! The match ends in a tie.</p>
			)}
			<div className='w-full flex justify-between my-10 lg:gap-10 gap-6'>
				<button
					onClick={onRestart}
					className='font-dreamscape bg-primary text-secondary py-3 flex-1 rounded
					hover:scale-[1.03] hover:brightness-100 transition-all duration-300 ease-in-out'
				>
					Play Again
				</button>
				<button
					onClick={onClose}
					className='font-heavy text-primary py-3 border border-border rounded flex-1
					bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out hover:bg-[rgb(183,170,156,30%)]'
				>
					Personalize Game
				</button>
			</div>
		</div>

	</>
)

const AIGame = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const backgroundId = location.state?.backgroundId || 3

	const [difficulty, setDifficulty] = useState('easy')
	
	// State management
	const [isPaused, setIsPaused] = useState(false)
	const [isGameOver, setIsGameOver] = useState(false)
	const [playerScore, setPlayerScore] = useState(0)
	const [aiScore, setAiScore] = useState(0)
	const [showConfetti, setShowConfetti] = useState(false)
	const [winner, setWinner] = useState(null)
	const [timeRemaining, setTimeRemaining] = useState(60) // Default to 60 seconds
	const [showRestartPopup, setShowRestartPopup] = useState(false)
	const [resetParameters, setResetParameters] = useState(false)

	// Default colors
	const playerColor = '#FFFFFF' // White for player
	const aiColor = '#FF0000' // Red for AI

	const handlePause = () => {
		if (!isGameOver) {
			setIsPaused(!isPaused)
		}
	}

	// Score update handler
	const updateScore = (scorer) => {
		if (scorer === 'player') {
			setPlayerScore((prev) => prev + 1)
		} else if (scorer === 'ai') {
			setAiScore((prev) => prev + 1)
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
		} else if (timeRemaining === 0) {
			gameOver()
		}
	}, [timeRemaining, isPaused, isGameOver])

	const getWinner = () => {
		if (playerScore > aiScore) return { name: 'Player' }
		if (aiScore > playerScore) return { name: 'AI' }
		return null
	}

	const handleClose = () => {
		setShowRestartPopup(false)
        navigate('/custom', { state: { mode: 'AI' } })
	}

	const restartGame = () => {
		setPlayerScore(0)
		setAiScore(0)
		setTimeRemaining(60)
		setIsGameOver(false)
		setIsPaused(false)
		setShowRestartPopup(false)
		setResetParameters((prev) => !prev)
		setWinner(null)
	}

	const gameOver = () => {
		setIsGameOver(true)
		setIsPaused(true)
		setShowRestartPopup(true)
		setWinner(getWinner())
		setShowConfetti(true)
		setTimeout(() => setShowConfetti(false), 5000)
	}

	return (
		<>
			<section className={`relative flex-1 margin-page flex flex-col items-center gap-8 ${isPaused ? 'bg-backdrop-40' : ''}`}>
				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
					<GameScore
						player1Score={playerScore}
						player2Score={aiScore}
						isPaused={isPaused}
						/>
					<Timer isPaused={isPaused} timeRemaining={timeRemaining} />
					<div className='flex-1 w-full flex max-lg:flex-wrap max-lg:justify-around justify-between font-dreamscape-sans'>
						<AiPongTable
							isPaused={isPaused}
							handlePause={handlePause}
							backgroundId={backgroundId}
							updateScore={updateScore}
							isGameOver={isGameOver}
							resetParameters={resetParameters}
							player1Color={playerColor}
							player2Color={aiColor}
							difficulty={difficulty}
						/>
					</div>
				</div>
			</section>
			{showRestartPopup && (
				<GameOverPopup winner={winner} onRestart={restartGame} onClose={handleClose} />
			)}
			{showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
		</>
	)
}

export default AIGame;