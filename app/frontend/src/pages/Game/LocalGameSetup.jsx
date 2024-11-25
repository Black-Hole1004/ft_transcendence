import './Game.css'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GAME_CONSTRAINTS } from '../../constants/gameConstants'

import { MuiColorInput } from 'mui-color-input'

import GameCustomizationPanel from '../../components/Game/Local/GameCustomizationPanel'


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
		duration: GAME_CONSTRAINTS.DURATION.DEFAULT,
		isBackgroundVisible: true,
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

	const [ballSize, setBallSize] = useState(8)
	const [paddleSize, setPaddleSize] = useState(35)
	const [player1Name, setPlayer1Name] = useState('')
	const [player2Name, setPlayer2Name] = useState('')
	const [gameDuration, setGameDuration] = useState(30)
	const [ballColor, setBallColor] = useState('#FBFBEE')
	const [player1Color, setPlayer1Color] = useState('#FBFBEE')
	const [player2Color, setPlayer2Color] = useState('#FBFBEE')
	const [removeBackground, setRemoveBackground] = useState(false)
	// const { backgroundId } = location.state || { backgroundId: 1 }

	// const [attacks, setAttacks] = useState(1)
	// const [powerUps, setPowerUps] = useState(1)

	const minBallSize = 5
	const maxBallSize = 100

	const minPaddleSize = 5
	const maxPaddleSize = 100

	// const maxPowerUps = 3
	// const maxAttacks = 3

	const handleSubmit = (e) => {
		e.preventDefault()
		if (player1Name && player2Name) {
			navigate('/local-game', {
				state: {
					mode: 'local',
					player1: { name: player1Name, color: player1Color },
					player2: { name: player2Name, color: player2Color },
					ballColor: ballColor,
					duration: gameDuration,
					backgroundId: removeBackground ? null : backgroundId,
					paddleSize,
					ballSize,
					powerUps,
					attacks,
				},
			})
		}
	}

	const generateRandomName = () => {
		return 'Player ' + Math.floor(Math.random() * 1000)
	}

	const generateRandomColor = () => {
		return '#' + Math.floor(Math.random() * 16777215).toString(16)
	}

	const handleRandomColors = () => {
		setBallColor(generateRandomColor())
		setPlayer1Name(generateRandomName())
		setPlayer2Name(generateRandomName())
		setPlayer1Color(generateRandomColor())
		setPlayer2Color(generateRandomColor())
	}

	const resetToDefault = () => {
		setBallSize(8)
		setPaddleSize(35)
		setPlayer1Name('')
		setPlayer2Name('')
		setBallColor('#FBFBEE')
		setPlayer1Color('#FBFBEE')
		setPlayer2Color('#FBFBEE')
		setRemoveBackground(false)

		// setAttacks(1)
		// setPowerUps(1)
	}

	return (
		<section className='flex justify-center'>
			<div
				className='flex max-w-[96%] max-lp:flex-col max-lp:gap-3 p-4
				border-1.5 border-primary rounded-lg game-customization-card aspect-video'
			>
				{/* <div className='flex-1 flex flex-col lp:pr-4'>
					<h3 className='title-size font-heavy text-2xl mt-5 mb-8'>
						Personalize Your Game
					</h3>
					<div className='flex-1 flex flex-col justify-between max-lp:gap-7'>
						<div className='flex flex-col'>
							<PersonalizeGame
								id={'paddleSize'}
								size={paddleSize}
								minSize={minPaddleSize}
								maxSize={maxPaddleSize}
								setSize={setPaddleSize}
							/>
							<PersonalizeGame
								id={'ballSize'}
								size={ballSize}
								minSize={minBallSize}
								maxSize={maxBallSize}
								setSize={setBallSize}
							/>
							<div className='labels font-medium text-primary'>
								<FormControlLabel
									control={
										<Checkbox
											onChange={(e) => setRemoveBackground(e.target.checked)}
											sx={{
												'& .MuiSvgIcon-root': {
													fontSize:
														'clamp(1rem, 0.177vw + 0.967rem, 1.25rem)',
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
							</div>
						</div>
						<div className='flex flex-col gap-2'>
							<h2 className='font-heavy labels text-primary'>Preview</h2>
							<div
								className={`relative self-center w-[92%] max-w-[500px] aspect-video border border-primary rounded-lg overflow-hidden
								${removeBackground ? 'bg-black' : ''}`}
							>
								<img
									src={`/assets/images/tables/table${backgroundId}.png`}
									className={`${removeBackground ? 'hidden' : ''} select-none brightness-[50%]`}
									alt='table image'
								/>
								<div
									className={`absolute top-1/2 left-2 z-10 transform -translate-y-1/2
									w-3 ring-1 ring-primary rounded-lg`}
									style={{
										height: `${paddleSize}%`,
										background: `${player1Color}`,
									}}
								></div>
								<div
									className={`absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2
									aspect-square border-0.7 border-primary rounded-full`}
									style={{
										height: `${ballSize}%`,
										background: `${ballColor}`,
									}}
								></div>
								<div
									className={`absolute top-1/2 right-2 z-10 transform -translate-y-1/2
									w-3 border-0.7 border-primary rounded-lg`}
									style={{
										height: `${paddleSize}%`,
										background: `${player2Color}`,
									}}
								></div>
							</div>
						</div>
					</div>
				</div> */}

				<GameCustomizationPanel
					players={players}
					gameConfig={gameConfig}
					backgroundId={backgroundId}
					onGameConfigUpdate={updateGameConfig}
				/>

				<div className='flex-1 flex flex-col lp:pl-4'>
					<h3 className='title-size font-heavy text-2xl mt-5 mb-8'>Prepare for Battle</h3>
					<form
						onSubmit={handleSubmit}
						className='flex-1 flex flex-col max-lp:gap-12 justify-between'
					>
						<div className='flex flex-col gap-4'>
							<MatchConfiguration
								name={'Player 1'}
								playerId={'player1Name'}
								colorId={'player1Color'}
								setValue={setPlayer1Name}
								setColor={setPlayer1Color}
								textInputValue={player1Name}
								colorInputValue={player1Color}
							/>
							<MatchConfiguration
								name={'Player 2'}
								playerId={'player2Name'}
								colorId={'player2Color'}
								setValue={setPlayer2Name}
								setColor={setPlayer2Color}
								textInputValue={player2Name}
								colorInputValue={player2Color}
							/>
							<MatchConfiguration
								name={'Ball'}
								colorId={'ballColor'}
								setColor={setBallColor}
								playerId={'gameDuration'}
								setValue={setGameDuration}
								colorInputValue={ballColor}
								textInputValue={gameDuration}
							/>
						</div>
						<div className=' flex flex-col gap-2'>
							<button
								type='button'
								onClick={handleRandomColors}
								className='font-medium labels w-full p-2 border border-border bg-[rgb(183,170,156,8%)] text-primary rounded
									transition duration-200 ease-in hover:bg-[rgb(183,170,156,30%)]'
							>
								Generate Random Values
							</button>
							<button
								type='button'
								onClick={resetToDefault}
								className='font-medium labels w-full p-2 border border-border bg-[rgb(183,170,156,8%)] text-primary rounded
									transition duration-200 ease-in hover:bg-[rgb(183,170,156,30%)]'
							>
								Reset to Default
							</button>

							<button
								type='submit'
								className='font-dreamscape labels w-full p-2 bg-primary text-secondary rounded brightness-90
									hover:scale-[1.02] hover:brightness-100 transition duration-200 ease-in'
							>
								Start Game
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

const MatchConfiguration = ({
	name,
	colorId,
	playerId,
	setColor,
	setValue,
	textInputValue,
	colorInputValue,
}) => {
	return (
		<div className='flex flex-col gap-2'>
			<h2 className='font-heavy labels text-primary'>{name}</h2>
			<div className='flex justify-between max-ml:flex-col max-ml:gap-2'>
				<div className='flex flex-col flex-1 ml-2'>
					<label className='font-regular text-light labels' htmlFor={playerId}>
						{name === 'Ball' ? 'Game duration (seconds)' : 'Player Name'}
					</label>
					<input
						type='text'
						id={playerId}
						value={textInputValue}
						onChange={(e) => setValue(e.target.value)}
						placeholder={`${name === 'Ball' ? 'Game duration (seconds)' : 'Player Name'}`}
						className='inputs border border-border rounded-lg bg-[rgb(183,170,156,8%)] placeholder:text-border
						text-primary placeholder:font-regular placeholders outline-none w-[90%]'
						required
					/>
				</div>
				<div className='flex flex-col ml:w-[30%] w-[50%] max-ml:ml-2'>
					<label className='font-regular text-light labels' htmlFor={colorId}>
						{name === 'Ball' ? 'Ball Color' : 'Paddle Color'}
					</label>
					<MuiColorInput
						id={colorId}
						format='hex'
						value={colorInputValue}
						onChange={(color) => setColor(color)}
						className='labels' //
						sx={{
							// Border
							border: 1,
							borderRadius: 2,
							borderColor: '#646464',

							// Colors
							backgroundColor: 'rgb(183,170,156,8%)',

							'& .MuiOutlinedInput-input': {
								color: '#FBFBEE',
								fontSize: 'clamp(0.563rem, 0.398vw + 0.488rem, 1.125rem)',
								paddingTop: 'clamp(0.375rem, 0.177vw + 0.342rem, 0.625rem)',
								paddingBottom: 'clamp(0.375rem, 0.177vw + 0.342rem, 0.625rem)',
								paddingRight: '0px',
							},

							'& .MuiOutlinedInput-root': {
								paddingLeft: 'clamp(0.438rem, 0.221vw + 0.396rem, 0.75rem)',
								paddingRight: 'clamp(0.438rem, 0.221vw + 0.396rem, 0.75rem)',

								// Normal state
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: 'transparent',
								},
								// Hover state
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: 'transparent',
								},
								// Focus state
								'&:focus .MuiOutlinedInput-notchedOutline': {
									borderColor: 'transparent',
								},
							},

							'& .MuiColorInput-Button': {
								padding: '0px',
								borderRadius: '20%',
								width: 'clamp(1.125rem, 0.265vw + 1.075rem, 1.5rem)',
								height: 'clamp(1.125rem, 0.265vw + 1.075rem, 1.5rem)',
							},
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default LocalGameSetup
