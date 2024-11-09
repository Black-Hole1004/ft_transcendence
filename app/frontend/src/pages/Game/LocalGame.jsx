import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom' // Make sure this is included

import './Game.css'
import GameScore from '../../components/Game/GameScore'
import Player from '../../components/Game/Player'
import PongTable from '../../components/Game/PongTable'
import Timer from '../../components/Game/Timer'
import Confetti from 'react-confetti'

//--smoky-black: #0E0B0Aff;
const GameOverPopup = ({ winner, onRestart, onClose }) => (
	<div className='fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50'>
		<div className='bg-[#0E0B0A] border-2 border-[#76797Cff] text-[#E6DDC6] rounded-lg shadow-xl w-[480px] overflow-hidden relative'>
			<div
				className="h-60 bg-[url('path/to/venus-pingpong-background.jpg')] bg-cover bg-center relative"
				style={{ filter: 'brightness(1.2)' }}
			>
				{' '}
				{/* Increase brightness */}
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#0E0B0A]'></div>
				{/* Centering GAME OVER Text */}
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

const LocalGame = () => {
	const navigate = useNavigate()
	const [isPaused, setIsPaused] = useState(false)
	const [isGameOver, setIsGameOver] = useState(false)
	const [player1Score, setPlayer1Score] = useState(0)
	const [player2Score, setPlayer2Score] = useState(0)
	const [showConfetti, setShowConfetti] = useState(false)
	const [winner, setWinner] = useState(null)

	const [powerups, setPowerups] = useState([])
	const [attacks, setAttacks] = useState([])

	const location = useLocation()
	const { mode, player1, player2, ballColor, duration, backgroundId, paddleHeight, ballRadius } =
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
		setIsPaused(true)
		setShowRestartPopup(true)
		setWinner(getWinner())
		setShowConfetti(true)
		setTimeout(() => setShowConfetti(false), 5000) // Stop confetti after 5 seconds
	}
	;``
	return (
		<div
			className={` backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-80' : 'bg-backdrop-40'}`}
		>
			<section className='flex'>
				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
					<GameScore
						player1Score={player1Score}
						player2Score={player2Score}
						isPaused={isPaused}
					/>
					<Timer isPaused={isPaused} timeRemaining={timeRemaining} />
					<div className='flex-1 w-full flex max-lg:flex-wrap max-lg:justify-around justify-between font-dreamscape-sans'>
						<div className='justify-center items-center w-1/4'>
							<Player
								isPaused={isPaused}
								PlayerName={player1.name}
								BadgeName={player1.badge}
								playerImage={player1.image}
								badgeImage={player1.badgeImage}
								GameMode={mode}
							/>
						</div>
						<div className='justify-center items-center w-1/2'>
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
								paddleHeight={paddleHeight}
								ballRadius={ballRadius}
								powerups={powerups}
								attacks={attacks}
							/>
						</div>
						<div className='justify-center items-center w-1/4'>
							<Player
								isPaused={isPaused}
								PlayerName={player2.name}
								BadgeName={player2.badge}
								playerImage={player2.image}
								badgeImage={player2.badgeImage}
								GameMode={mode}
							/>
						</div>
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

export default LocalGame
