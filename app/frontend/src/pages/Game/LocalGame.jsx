import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './Game.css'
import Timer from '../../components/Game/Timer'
import Player from '../../components/Game/Player'
import GameScore from '../../components/Game/GameScore'
import PongTable from '../../components/Game/PongTable'
import Confetti from 'react-confetti'

const GameOverPopup = ({ winner, onRestart, onClose }) => (
	<>
		<div class='fixed inset-0 bg-black bg-opacity-90 z-10'></div>
		<div
			className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lp:px-10 px-3 z-20
			flex flex-col justify-center items-center bg-secondary bg-opacity-60 border-1.5 border-primary rounded-xl gameoverpopup'
		>
			<h2 className='font-dreamscape '>GAME OVER</h2>
			{winner ? (
				<div className='font-heavy'>
					<p className='text-left text-2xl'>Cosmic Champion:</p>
					<h3 className='players-usernames font-dreamscape-sans pt-3 pb-7 text-center glow drop-shadow-[0_2px_10px_rgba(255,206,158,0.5)]'>
						{winner.name}
					</h3>
					<p className='text-lg text-center'>
						Your stellar skills have conquered the arena!
					</p>
				</div>
			) : (
				<p className='text-2xl font-medium'>A cosmic deadlock! The match ends in a tie.</p>
			)}
			<div className='w-full flex justify-between my-10 lg:gap-10 gap-6'>
				<button
					onClick={onRestart}
					className='font-heavy bg-primary text-secondary py-3 flex-1
				rounded-2xl transition duration-300 ease-in-out transform hover:scale-105'
				>
					Play Again
				</button>
				<button
					onClick={onClose}
					className='font-heavy text-primary py-3 rounded-2xl border-2 border-primary flex-1
				hover:bg-[rgba(251,251,238,.2)] transition duration-300 ease-in-out transform hover:scale-105'
				>
					Return to Base
				</button>
			</div>
		</div>
	</>
)

const LocalGame = () => {
	const navigate = useNavigate()
	const [isPaused, setIsPaused] = useState(false)
	const [isGameOver, setIsGameOver] = useState(false)
	const [player1Score, setPlayer1Score] = useState(0)
	const [player2Score, setPlayer2Score] = useState(0)
	const [showConfetti, setShowConfetti] = useState(false)
	const [winner, setWinner] = useState(null)

	const location = useLocation()
	const { mode, player1, player2, ballColor, duration, backgroundId, paddleSize, ballSize } =
		location.state || {}

	const [timeRemaining, setTimeRemaining] = useState(duration || 60)
	const [showRestartPopup, setShowRestartPopup] = useState(false)
	const [resetParameters, setResetParameters] = useState(false)

	const handlePause = () => {
		if (!isGameOver) {
			setIsPaused(!isPaused)
		}
	}

	const updateScore = (player) => {
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
		if (player1Score > player2Score) return player1
		if (player2Score > player1Score) return player2
		return null
	}

	const handleClose = () => {
		setShowRestartPopup(false)
		navigate('/local-game-setup')
	}

	const restartGame = () => {
		setPlayer1Score(0)
		setPlayer2Score(0)
		setTimeRemaining(duration || 60)
		setIsGameOver(false)
		setIsPaused(false)
		setShowRestartPopup(false)
		setResetParameters((prev) => !prev) // Toggle this to reset the game
		setWinner(null)
	}

	const gameOver = () => {
		setIsGameOver(true)
		setIsPaused(false)
		setShowRestartPopup(true)
		setWinner(getWinner())
		setShowConfetti(true)
		setTimeout(() => setShowConfetti(false), 8000) // Stop confetti after 5 seconds
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
					<Timer isPaused={isPaused} timeRemaining={timeRemaining} />
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
					<GameOverPopup winner={winner} onRestart={restartGame} onClose={handleClose} />
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
