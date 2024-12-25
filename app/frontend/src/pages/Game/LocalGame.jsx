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
	<div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600/90 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
		<span className="font-bold">SUDDEN DEATH!</span>
		<span className="ml-2">First point wins!</span>
	</div>
);

import { useTournament } from '../../context/TournamentContext'

const SuddenDeathMessage = () => (
	<div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600/90 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
		<span className="font-bold">SUDDEN DEATH!</span>
		<span className="ml-2">First point wins!</span>
	</div>
);

//--smoky-black: #0E0B0Aff;
const GameOverPopup = ({ winner, onRestart, onClose }) => (
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
		</div>


	</>
)

const LocalGame = () => {


	const navigate = useNavigate()

	// code ahaloui added
	const {
		setSemiFinal1winner,
		setSemiFinal2winner,
		setFinalWinner,
		setTournamentState
	} = useTournament();
	const [isSuddenDeath, setIsSuddenDeath] = useState(false);

	const [isPaused, setIsPaused] = useState(false)
	const [isGameOver, setIsGameOver] = useState(false)
	const [player1Score, setPlayer1Score] = useState(0)
	const [player2Score, setPlayer2Score] = useState(0)
	const [showConfetti, setShowConfetti] = useState(false)
	const [winner, setWinner] = useState(null)

<<<<<<< HEAD
	const [powerups, setPowerups] = useState([])
	const [attacks, setAttacks] = useState([])

=======
>>>>>>> master
	const location = useLocation()
	const { mode, player1, player2, ballColor, duration, backgroundId, paddleSize, ballSize, tournamentRound } = location.state || {}

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

	// const getWinner = () => {
	// 	if (player1Score > player2Score) return player1
	// 	if (player2Score > player1Score) return player2
	// 	return null
	// }

	const getWinner = () => {
		if (player1Score > player2Score) {
			return player1;
		} else if (player2Score > player1Score) {
			return player2;
		} else {
			// If scores are equal
			if (tournamentRound) { // If this is a tournament match
				setIsSuddenDeath(true);
				setIsGameOver(false);
				setTimeRemaining(30); // Set 30 seconds for sudden death
				return null;
			}
			return null; // For non-tournament games, just return null for a tie
		}
	};

	// const handleClose = () => {
	// 	setShowRestartPopup(false)
	// 	navigate('/local-game-setup')
	// }
	// Update handleClose for tournament flow
	const handleClose = () => {
		setShowRestartPopup(false);
		if (tournamentRound) {
			navigate('/tournament', { replace: true });
		} else {
			navigate('/local-game-setup');
		}
	};



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
		const winner = getWinner();

		// If there's a tie in tournament mode
		if (!winner && tournamentRound) {
			setIsSuddenDeath(true);
			setTimeRemaining(30); // 30 seconds sudden death round
			setIsGameOver(false);
			setIsPaused(false);
			return; // Don't proceed with normal game over
		}

		// Normal game over flow
		setIsGameOver(true);
<<<<<<< HEAD
		setIsPaused(true);
=======
		setIsPaused(false); // changed to false
>>>>>>> master
		setShowRestartPopup(true);
		setWinner(winner);

		// Handle tournament progression
		if (tournamentRound && winner) {
			switch (tournamentRound) {
				case 'semifinal1':
					setSemiFinal1winner(winner);
					setTournamentState('semifinal2');
					break;
				case 'semifinal2':
					setSemiFinal2winner(winner);
					setTournamentState('final');
					break;
				case 'final':
					setFinalWinner(winner);
					setTournamentState('completed');
					break;
			}
		}
	};
<<<<<<< HEAD
	useEffect(() => {
		if (isSuddenDeath && timeRemaining === 0) {
			// If sudden death time expires, use a tiebreaker (e.g., higher XP)
			const tiebreakerWinner = player1.xp > player2.xp ? player1 : player2;
=======

	useEffect(() => {
		if (isSuddenDeath && timeRemaining === 0) {
			// If sudden death time expires, use a tiebreaker (e.g., higher XP)
			const tiebreakerWinner = (player1.xp > player2.xp) ? player1 : player2; // should be changed.
>>>>>>> master
			setIsGameOver(true);
			setIsPaused(true);
			setShowRestartPopup(true);
			setWinner(tiebreakerWinner);
			setIsSuddenDeath(false);

			// Handle tournament progression
			if (tournamentRound) {
				switch (tournamentRound) {
					case 'semifinal1':
						setSemiFinal1winner(tiebreakerWinner);
						setTournamentState('semifinal2');
						break;
					case 'semifinal2':
						setSemiFinal2winner(tiebreakerWinner);
						setTournamentState('final');
						break;
					case 'final':
						setFinalWinner(tiebreakerWinner);
						setTournamentState('completed');
						break;
				}
			}
		}
	}, [timeRemaining, isSuddenDeath]);
<<<<<<< HEAD
	return (
		<>
			<section className='flex'>
				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
=======
	
	return (
		<>
			<section
				className={`relative flex-1 margin-page flex flex-col items-center gap-8 ${isPaused ? 'bg-backdrop-40' : ''}`}
			>
				<div className='flex flex-col'>
>>>>>>> master
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
<<<<<<< HEAD
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
								paddleSize={paddleSize}
								ballSize={ballSize}
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
=======
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
>>>>>>> master
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
<<<<<<< HEAD
			{showRestartPopup && (
				<GameOverPopup winner={winner} onRestart={restartGame} onClose={handleClose} />
			)}
			{showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
=======
>>>>>>> master
		</>
	)
}

export default LocalGame











