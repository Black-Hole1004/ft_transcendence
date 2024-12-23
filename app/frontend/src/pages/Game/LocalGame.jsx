import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './Game.css'
import Confetti from 'react-confetti'
import Timer from '../../components/Game/Timer'
import Player from '../../components/Game/Player'
import GameScore from '../../components/Game/GameScore'
import PongTable from '../../components/Game/PongTable'

const GameOverPopup = ({ winner, onRestart, onClose }) => (
	<>
		<div class='fixed inset-0 bg-black bg-opacity-90 z-10'></div>
		{/* <div
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
				<p className='text-2xl font-medium mb-20'>A cosmic deadlock! The match ends in a tie.</p>
			)}
			<div className='w-full flex justify-between my-10 lg:gap-10 gap-6'>
				<button
					onClick={onRestart}
					className='font-dreamscape bg-primary text-secondary py-3 flex-1 rounded
					hover:scale-[1.01] hover:brightness-100 transition-all duration-300 ease-in-out
					hover:outline hover:outline-offset-2 hover:outline-2 hover:outline-primary'
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
		</div> */}

		<div
			className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lp:px-10 px-3 z-20 w-[40rem]
			flex flex-col justify-center rounded text-center gameoverpopup' //bg-secondary bg-opacity-60 border border-primary
		>
			{/* Result Banner */}

			<h1
				className={`font-dreamscape text-6xl drop-shadow-[0_2px_10px_rgba(255,206,158,0.5)] ${
					winner ? 'text-online' : 'text-defeat'
				}`}
			>
				{winner ? 'YOU WON' : 'YOU LOST'}
			</h1>

			{/* Content Section */}
			<div className='flex flex-col gap-2'>
				{/* Player Stats */}
				<div className='flex items-center gap-4 mb-3'>
					<img
						src={'/assets/images/moudrib.jpeg'}
						alt={'mouad55'}
						className='rounded-full ring-1 ring-primary object-cover'
						onError={(e) => {
							e.target.src = '/assets/images/default-avatar.png'
						}}
					/>
					<div className='flex flex-col items-start'>
						<h3 className='font-heavy text-primary'>{'mouad55'}</h3>
						<p className='achievement-name font-dreamscape-sans text-level'>
							{'celestial master'}
						</p>
						<p className='font-medium text-border leading-none'>Score: {'4'}</p>
					</div>
				</div>

				{/* XP Change */}
				<div className='bg-border bg-opacity-20 rounded p-4'>
					<h3 className='text-primary font-heavy text-start mb-4'>
						Your Experience Update
					</h3>
					<div className='ml-2'>
						<div className='flex justify-between text-lg font-medium'>
							<span className='text-gray-400'>Previous XP</span>
							<span className='text-primary'>{'12313'}</span>
						</div>
						<div className='flex justify-between text-lg font-medium'>
							<span className='text-gray-400'>XP Change</span>
							<span className={`${winner ? 'text-online' : 'text-defeat'}`}>
								{232 >= 0 ? `+${232}` : 232}
							</span>
						</div>
						<div className='flex justify-between text-lg font-medium'>
							<span className='text-gray-400'>New XP</span>
							<span className='text-primary'>{'13215'}</span>
						</div>
					</div>
				</div>

				<div className='bg-border bg-opacity-20 rounded p-4'>
					<h3 className='text-primary font-heavy mb-4 text-start'>Current Achievement</h3>
					<div className='flex items-center gap-4'>
						<div>
							<img
								src={'/assets/images/Achievements/celestial-master.png'}
								alt={'celestial master'}
								className='w-16 h-16 object-contain hover:scale-105 transition duration-500'
								onError={(e) => {
									e.target.style.display = 'none'
								}}
							/>
						</div>
						<div className='flex-1 flex flex-col'>
							<p className='font-dreamscape-sans text-xl text-level mb-2'>
								{'celestial master'}
							</p>
							<div className='flex justify-between text-sm text-primary font-medium'>
								<span>{'0'}xp</span>
								<span>{'2000'}xp</span>
							</div>
							<div className='h-2 rounded-md bg-[rgb(121,118,110,0.7)] mt-1 flex items-center overflow-hidden'>
								<div
									className='rounded-lg h-full bg-level transition-all duration-1000 ease-out'
									style={{
										width: `${64}%`,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='w-full flex justify-between mb-5 lg:gap-10 gap-6'>
				<button
					onClick={onRestart}
					className='font-dreamscape bg-primary text-secondary py-3 flex-1 rounded
					hover:scale-[1.03] transition-all duration-300 ease-in-out'
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
