import './TournametSetup.css'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GAME_CONSTRAINTS } from '../../constants/gameConstants'

import Inputs from '../../components/Game/Local/Inputs'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import GamePreview from '../../components/Game/Local/GamePreview'

const TournamentSetup = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const defaultBackgroundId = 1

	const CANVAS_HEIGHT = 400 // my actual game canvas height
	const CANVAS_WIDTH = 800 // my actual game canvas width

	const calculatePaddleHeight = (percentage) => {
		// Convert percentage to actual pixels
		return Math.round((percentage / 100) * CANVAS_HEIGHT)
	}

	const calculateBallRadius = (percentage) => {
		// Convert percentage to a reasonable ball size
		// Using smaller divisor to keep ball from getting too big
		return Math.round((percentage / 100) * (CANVAS_HEIGHT) / 2)
	}

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
		player3: {
			name: '',
			color: GAME_CONSTRAINTS.COLORS.DEFAULT,
		},
		player4: {
			name: '',
			color: GAME_CONSTRAINTS.COLORS.DEFAULT,
		},
	})

	const { backgroundId } = location.state || {}

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
		if (players.player1.name && players.player2.name && players.player3.name && players.player4.name) {
			console.log('player1: ', players.player1.name)
			console.log('player2: ', players.player2.name)
			// navigate('/TournamentAhaloui', {
			navigate('/Tournament', {
				state: {
					mode: 'local',

					duration: gameConfig.duration ? gameConfig.duration : GAME_CONSTRAINTS.DURATION.DEFAULT,
					paddleSize: calculatePaddleHeight(GAME_CONSTRAINTS.PADDLE.DEFAULT_SIZE - 10),
					ballSize: calculateBallRadius(GAME_CONSTRAINTS.BALL.DEFAULT_SIZE - 1),
					ballColor: gameConfig.ball.color ? gameConfig.ball.color : GAME_CONSTRAINTS.COLORS.DEFAULT,

					backgroundId: gameConfig.isBackgroundVisible ? backgroundId : null,
					player1: { name: players.player1.name, color: players.player1.color },
					player2: { name: players.player2.name, color: players.player2.color },
					player3: { name: players.player3.name, color: players.player3.color },
					player4: { name: players.player4.name, color: players.player4.color },

				},
				isFromGame : false
			})
		}
	}

	const generateRandomName = () => `Player${Math.floor(Math.random() * 1000)}`

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
			player3: {
				name: generateRandomName(),
				color: generateRandomColor(),
			},
			player4: {
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
			player3: {
				name: '',
				color: GAME_CONSTRAINTS.COLORS.DEFAULT,
			},
			player4: {
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

	console.log('players: ==========>', players)

	return (
		<section className='flex justify-center'>
			<div
				className='flex max-w-[96%] flex-col tb:gap-4 gap-2 p-4
				border border-primary rounded game-customization-card aspect-video'
			>
				<div className='flex-1 flex flex-col'>
					<h3 className='title-size font-heavy text-2xl mt-5 mb-6'>Prepare for Battle</h3>
					<div
						onSubmit={handleSubmit}
						className='flex-1 flex flex-col max-lp:gap-12 justify-between'
					>
						<div className='flex flex-col gap-4'>
							<div className='flex justify-between max-tb:flex-col gap-2'>
								<Inputs
									id={'Player 1'}
									value={players.player1}
									setValue={(field, value) => updatePlayerConfig('player1', field, value)}
									/>
								<Inputs
									id={'Player 2'}
									value={players.player2}
									setValue={(field, value) => updatePlayerConfig('player2', field, value)}
									/>
							</div>
							<div className='flex justify-between max-tb:flex-col gap-2'>
								<Inputs
									id={'Player 3'}
									value={players.player3}
									setValue={(field, value) => updatePlayerConfig('player3', field, value)}
								/>
								<Inputs
									id={'Player 4'}
									value={players.player4}
									setValue={(field, value) => updatePlayerConfig('player4', field, value)}
									/>
							</div>

						</div>
					</div>
				</div>
				<div className='flex-1 flex flex-col justify-between max-lp:gap-7'>
					<div className='flex max-tb:flex-col gap-2'>
						<div className='flex-1 labels font-medium text-primary max-tb:order-2'>
							<FormControlLabel
								control={
									<Checkbox
										onChange={(e) =>
											updateGameConfig('isBackgroundVisible', !e.target.checked)
										}
										sx={{
											'& .MuiSvgIcon-root': {
												fontSize: 'clamp(1rem, 0.177vw + 0.967rem, 1.25rem)',
											},
											color: '#FBFBEE',
											'&.Mui-checked': {
												color: '#FBFBEE',
											},
										}}
									/>
								}
								label='Remove Background' // font-family
							/>
							<GamePreview players={players} gameConfig={gameConfig} backgroundId={backgroundId} />
						</div>
						<div className='flex-1 flex flex-col justify-between'>
							<div className='max-tb:mb-10'>
								<Inputs
									id={'Ball'}
									value={gameConfig.ball}
									duration={gameConfig.duration}
									setDuration={(duration) => updateGameConfig('duration', duration)}
									setValue={(value) =>
										updateGameConfig('ball', { ...gameConfig.ball, color: value })
									}
								/>
							</div>
							<div className='flex flex-col gap-2 ml-2'>
								<button
									type='button'
									onClick={generateRandomConfigurations}
									className='font-medium labels w-full p-2 border border-border text-primary rounded
									bg-[rgb(183,170,156,8%)] transition duration-200 ease-in hover:bg-[rgb(183,170,156,30%)]'
									>
									Generate Random Values
								</button>
								<button
									type='button'
									onClick={resetConfigurations}
									className='font-medium labels w-full p-2 border border-border text-primary rounded
									bg-[rgb(183,170,156,8%)] transition duration-200 ease-in hover:bg-[rgb(183,170,156,30%)]'
								>
									Reset to Default
								</button>

								<button
									type='submit'
									onClick={handleSubmit}
									className='font-dreamscape labels w-full p-2 bg-primary text-secondary rounded brightness-90
									hover:scale-[1.02] hover:brightness-100 transition duration-200 ease-in'
									>
									Start Tournament
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TournamentSetup