import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GameWebSocket from '../../services/GameWebSocket'
import GameScore from '../../components/Game/GameScore'
import Player from '../../components/Game/Player'
import RemotePongTable from '../../components/Game/RemotePongTable'
import Timer from '../../components/Game/Timer'
import Confetti from 'react-confetti'

const GameOverPopup = ({ winner, onRestart, onClose }) => (
	<div className='fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50'>
		<div className='bg-[#0E0B0A] border-2 border-[#76797Cff] text-[#E6DDC6] rounded-lg shadow-xl w-[480px] overflow-hidden relative'>
			<div className='h-60 relative' style={{ filter: 'brightness(1.2)' }}>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#0E0B0A]'></div>
				<div className='absolute inset-0 flex flex-col items-center justify-center'>
					<h2 className='text-5xl font-bold text-[#E6DDC6] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider'>
						GAME OVER
					</h2>
				</div>
			</div>

			<div className='p-8 relative z-10'>
				{winner && (
					<div className='text-center'>
						<p className='text-4xl font-bold mb-4 text-[#BE794A]'>{winner}</p>
						<p className='text-lg mb-6 text-[#E6DDC6] opacity-90'>Victory achieved!</p>
					</div>
				)}

				<div className='flex justify-center space-x-6 mt-8'>
					<button
						onClick={onRestart}
						className='bg-[#BE794A] hover:bg-[#61463A] text-[#E6DDC6] font-bold py-3 px-8 rounded-full transition'
					>
						Play Again
					</button>
					<button
						onClick={onClose}
						className='bg-transparent hover:bg-[#61463A] text-[#E6DDC6] font-bold py-3 px-8 rounded-full border-2 border-[#BE794A] transition'
					>
						Return to Menu
					</button>
				</div>
			</div>
		</div>
	</div>
)

export default function RemoteGame() {
	const location = useLocation()
	const navigate = useNavigate()
	const gameSocket = useRef(null)
	const [gameState, setGameState] = useState({
		player1Score: 0,
		player2Score: 0,
		winner: null,
		playerNumber: null,
		isGameOver: false,
	})
	const [showConfetti, setShowConfetti] = useState(false)
	const [timeRemaining, setTimeRemaining] = useState(60)

	const { gameId, settings } = location.state || {}

	useEffect(() => {
		if (!gameId) {
			console.log('No game ID provided, redirecting to custom')
			navigate('/custom')
			return
		}

		console.log('Initializing game with ID:', gameId)
		gameSocket.current = new GameWebSocket()

		gameSocket.current.on('connect', () => {
			console.log('Connected to game server')
		})

		gameSocket.current.on('game_info', (data) => {
			console.log('Received game info:', data)
			setGameState((prev) => ({
				...prev,
				playerNumber: data.player_number,
			}))
			gameSocket.current.sendPlayerReady()
		})

		gameSocket.current.on('state_update', (state) => {
			console.log('Received state update:', state)
			setGameState((prev) => ({
				...prev,
				player1Score: state.scores?.[1] ?? prev.player1Score,
				player2Score: state.scores?.[2] ?? prev.player2Score,
			}))
		})

		gameSocket.current.on('game_ended', (data) => {
			console.log('Game ended:', data)
			setGameState((prev) => ({
				...prev,
				isGameOver: true,
				winner: `Player ${data.winner}`,
			}))
			setShowConfetti(true)
			setTimeout(() => setShowConfetti(false), 5000)
		})

		console.log('Connecting to game...')
		gameSocket.current.connect(gameId)

		return () => {
			console.log('Cleaning up game component')
			gameSocket.current?.disconnect()
		}
	}, [gameId, navigate])

	const handleRestart = () => {
		console.log('Requesting game restart')
		if (gameSocket.current) {
			gameSocket.current.sendRestartGame()
		}
	}

	const handleClose = () => {
		console.log('Closing game')
		navigate('/custom')
	}

	return (
		<div className='backdrop-blur-sm text-primary'>
			<section className='flex'>
				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
					<GameScore
						player1Score={gameState.player1Score}
						player2Score={gameState.player2Score}
					/>
					<Timer timeRemaining={timeRemaining} />

					<div className='flex-1 w-full flex max-lg:flex-wrap max-lg:justify-around justify-between'>
						<Player PlayerName='Player 1' GameMode='remote' />

						<RemotePongTable
							gameSocket={gameSocket.current}
							isGameOver={gameState.isGameOver}
							settings={settings}
							playerNumber={gameState.playerNumber}
						/>

						<Player PlayerName='Player 2' GameMode='remote' />
					</div>
				</div>
			</section>

			{gameState.isGameOver && (
				<GameOverPopup
					winner={gameState.winner}
					onRestart={handleRestart}
					onClose={handleClose}
				/>
			)}

			{showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
		</div>
	)
}
