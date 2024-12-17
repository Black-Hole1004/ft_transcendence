import './Game.css'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GAME_CONSTRAINTS } from '../../constants/gameConstants'

import GameCustomizationPanel from '../../components/Game/Local/GameCustomizationPanel'
import GamePreparationPanel from '../../components/Game/Local/GamePreparationPanel'

const LocalGameSetup = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const defaultBackgroundId = 1

	// Game configuration state
	const [gameConfig, setGameConfig] = useState({
		paddle: {
			size: GAME_CONSTRAINTS.PADDLE.DEFAULT_SIZE,
		},
		ball: {
			size: GAME_CONSTRAINTS.BALL.DEFAULT_SIZE,
			color: GAME_CONSTRAINTS.COLORS.DEFAULT,
		},
		isBackgroundVisible: true,
		duration: GAME_CONSTRAINTS.DURATION.DEFAULT,
	})

	// Player configuration state
	const [players, setPlayers] = useState({
		player1: {
			name: '',
			color: GAME_CONSTRAINTS.COLORS.DEFAULT,
		},
		player2: {
			name: '',
			color: GAME_CONSTRAINTS.COLORS.DEFAULT,
		},
	})

	const { backgroundId = defaultBackgroundId } = location.state || {}

	const updatePlayerConfig = (playerId, field, value) => {
		// console.log('value: ', value)
		setPlayers((prev) => ({
			...prev,
			[playerId]: {
				...prev[playerId],
				[field]: value,
			},
		}))
	}

	const updateGameConfig = (field, value) => {
		setGameConfig((prev) => ({
			...prev,
			[field]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('ballColor: ', gameConfig.ball.color)
		if (players.player1.name && players.player2.name) {
			navigate('/local-game', {
				state: {
					mode: 'local',
					duration: gameConfig.duration,
					ballSize: gameConfig.ball.size,
					ballColor: gameConfig.ball.color,
					paddleSize: gameConfig.paddle.size,
					
					backgroundId: gameConfig.isBackgroundVisible ? backgroundId : null,
					player1: { name: players.player1.name, color: players.player1.color },
					player2: { name: players.player2.name, color: players.player2.color },
				},
			})
		}
	}

	const generateRandomName = () => `Player ${Math.floor(Math.random() * 1000)}`

	const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

	const generateRandomConfigurations = () => {
		setPlayers({
			player1: {
				name: generateRandomName(),
				color: generateRandomColor(),
			},
			player2: {
				name: generateRandomName(),
				color: generateRandomColor(),
			},
		})
		updateGameConfig('ball', { ...gameConfig.ball, color: generateRandomColor() })
	}

	const resetConfigurations = () => {
		setPlayers({
			player1: {
				name: '',
				color: GAME_CONSTRAINTS.COLORS.DEFAULT,
			},
			player2: {
				name: '',
				color: GAME_CONSTRAINTS.COLORS.DEFAULT,
			},
		})
		setGameConfig({
			paddle: {
				size: GAME_CONSTRAINTS.PADDLE.DEFAULT_SIZE,
			},
			ball: {
				size: GAME_CONSTRAINTS.BALL.DEFAULT_SIZE,
				color: GAME_CONSTRAINTS.COLORS.DEFAULT,
			},
			duration: GAME_CONSTRAINTS.DURATION.DEFAULT,
			isBackgroundVisible: true,
		})
	}

	return (
		<section className='flex justify-center'>
			<div
				className='flex max-w-[96%] max-lp:flex-col max-lp:gap-3 p-4
				border-1.5 border-primary rounded-lg game-customization-card aspect-video'
			>
				<GameCustomizationPanel
					players={players}
					gameConfig={gameConfig}
					backgroundId={backgroundId}
					onGameConfigUpdate={updateGameConfig}
				/>

				<GamePreparationPanel
					players={players}
					gameConfig={gameConfig}
					onSubmit={handleSubmit}
					onReset={resetConfigurations}
					onPlayerUpdate={updatePlayerConfig}
					onGameConfigUpdate={updateGameConfig}
					onRandomize={generateRandomConfigurations}
				/>
			</div>
		</section>
	)
}

export default LocalGameSetup
