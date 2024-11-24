import './Game.css'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { MuiColorInput } from 'mui-color-input'

import Slider from '@mui/material/Slider'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

const LocalGameSetup = () => {
	const [player1Name, setPlayer1Name] = useState('')
	const [player2Name, setPlayer2Name] = useState('')
	const [gameDuration, setGameDuration] = useState(30)
	const [player1Color, setPlayer1Color] = useState('#ffffff')
	const [player2Color, setPlayer2Color] = useState('#ffffff')
	const [ballColor, setBallColor] = useState('#ffffff')
	const [paddleSize, setPaddleSize] = useState(35)
	const [ballSize, setBallSize] = useState(8)
	const [removeBackground, setRemoveBackground] = useState(false)
	const [powerUps, setPowerUps] = useState(1)
	const [attacks, setAttacks] = useState(1)
	const location = useLocation()
	const navigate = useNavigate()
	const { backgroundId } = location.state || { backgroundId: 1 }

	const canvasWidth = 800
	const canvasHeight = 400
	const maxPaddleSize = 100
	const minPaddleSize = 5
	const maxBallSize = 100
	const minBallSize = 5
	const maxPowerUps = 3
	const maxAttacks = 3

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

	const generateRandomColor = () => {
		return '#' + Math.floor(Math.random() * 16777215).toString(16)
	}

	const generateRandomName = () => {
		return 'Player ' + Math.floor(Math.random() * 1000)
	}

	const handleRandomColors = () => {
		setPlayer1Color(generateRandomColor())
		setPlayer2Color(generateRandomColor())
		setBallColor(generateRandomColor())
		setPlayer1Name(generateRandomName())
		setPlayer2Name(generateRandomName())
	}

	const resetToDefault = () => {
		setPlayer1Color('#ffffff')
		setPlayer2Color('#ffffff')
		setBallColor('#ffffff')
		setPaddleSize(35)
		setBallSize(8)
		setRemoveBackground(false)
		setPowerUps(1)
		setAttacks(1)
	}

	// const GamePreview = ({
	// 	player1Color,
	// 	player2Color,
	// 	ballColor,
	// 	paddleSize,
	// 	ballSize,
	// 	backgroundId,
	// 	removeBackground,
	// }) => {
	// 	const canvasRef = useRef(null)
	// 	const scale = 0.75
	// 	const scaledWidth = canvasWidth * scale
	// 	const scaledHeight = canvasHeight * scale

	// 	useEffect(() => {
	// 		const canvas = canvasRef.current
	// 		const ctx = canvas.getContext('2d')

	// 		ctx.fillStyle = '#000000'
	// 		ctx.fillRect(0, 0, scaledWidth, scaledHeight)

	// 		if (!removeBackground) {
	// 			const backgroundImage = new Image()
	// 			backgroundImage.src = `/assets/images/tables/table${backgroundId}.png`
	// 			backgroundImage.onload = () => {
	// 				ctx.drawImage(backgroundImage, 0, 0, scaledWidth, scaledHeight)
	// 				drawGameElements()
	// 			}
	// 			backgroundImage.onerror = () => {
	// 				console.error('Failed to load background image')
	// 				drawGameElements()
	// 			}
	// 		} else {
	// 			drawGameElements()
	// 		}

	// 		function drawGameElements() {
	// 			const paddleWidth = 15 * scale
	// 			ctx.fillStyle = player1Color
	// 			ctx.fillRect(
	// 				10,
	// 				(scaledHeight - paddleSize * scale) / 2,
	// 				paddleWidth,
	// 				paddleSize * scale
	// 			)
	// 			ctx.beginPath()
	// 			ctx.arc(
	// 				10 + paddleWidth / 2,
	// 				(scaledHeight - paddleSize * scale) / 2,
	// 				paddleWidth / 2,
	// 				0,
	// 				Math.PI * 2
	// 			)
	// 			ctx.arc(
	// 				10 + paddleWidth / 2,
	// 				(scaledHeight + paddleSize * scale) / 2,
	// 				paddleWidth / 2,
	// 				0,
	// 				Math.PI * 2
	// 			)
	// 			ctx.closePath()
	// 			ctx.fill()

	// 			ctx.fillStyle = player2Color
	// 			ctx.fillRect(
	// 				scaledWidth - paddleWidth - 10,
	// 				(scaledHeight - paddleSize * scale) / 2,
	// 				paddleWidth,
	// 				paddleSize * scale
	// 			)
	// 			ctx.beginPath()
	// 			ctx.arc(
	// 				scaledWidth - paddleWidth - 10 + paddleWidth / 2,
	// 				(scaledHeight - paddleSize * scale) / 2,
	// 				paddleWidth / 2,
	// 				0,
	// 				Math.PI * 2
	// 			)
	// 			ctx.arc(
	// 				scaledWidth - paddleWidth - 10 + paddleWidth / 2,
	// 				(scaledHeight + paddleSize * scale) / 2,
	// 				paddleWidth / 2,
	// 				0,
	// 				Math.PI * 2
	// 			)
	// 			ctx.closePath()
	// 			ctx.fill()

	// 			ctx.beginPath()
	// 			ctx.arc(scaledWidth / 2, scaledHeight / 2, (ballSize + 2) * scale, 0, Math.PI * 2)
	// 			ctx.fillStyle = ballColor
	// 			ctx.fill()
	// 		}
	// 	}, [
	// 		player1Color,
	// 		player2Color,
	// 		ballColor,
	// 		paddleSize,
	// 		ballSize,
	// 		backgroundId,
	// 		removeBackground,
	// 		scaledWidth,
	// 		scaledHeight,
	// 	])

	// 	return (
	// 		<canvas
	// 			ref={canvasRef}
	// 			width={scaledWidth}
	// 			height={scaledHeight}
	// 			className='border rounded'
	// 			style={{
	// 				width: `${scaledWidth}px`,
	// 				height: `${scaledHeight}px`,
	// 				background: '#000000',
	// 				borderRadius: '20px',
	// 			}}
	// 		/>
	// 	)
	// }

	return (
		<section className='flex justify-center mt-40'>
			<div
				className='flex max-w-[96%] max-lp:flex-col max-lp:gap-3 p-4
				border-1.5 border-primary rounded-lg game-customization-card aspect-video'
			>

				<div className='flex-1 flex flex-col lp:pr-4'>
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
							</div>
						</div>
						<div className='flex flex-col'>
							<h2 className='font-heavy labels text-primary'>Preview</h2>
							<div
								className={`relative self-center w-[92%] aspect-video border border-primary rounded-lg overflow-hidden
								${removeBackground ? 'bg-black' : ''}`}
							>
								<img
									src={`/assets/images/tables/table${backgroundId}.png`}
									className={`${removeBackground ? 'hidden' : ''} select-none brightness-[50%]`}
									alt='table image'
								/>
								<div
									className={`absolute top-1/2 left-2 z-10 transform -translate-y-1/2
									w-3 border-0.7 border-border rounded-lg`}
									style={{
										height: `${paddleSize}%`,
										background: `${player1Color}`,
									}}
								></div>
								<div
									className={`absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2
									aspect-square border-0.7 border-border rounded-full`}
									style={{
										height: `${ballSize}%`,
										background: `${ballColor}`,
									}}
								></div>
								<div
									className={`absolute top-1/2 right-2 z-10 transform -translate-y-1/2
									w-3 border-0.7 border-border rounded-lg`}
									style={{
										height: `${paddleSize}%`,
										background: `${player2Color}`,
									}}
								></div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex-1 flex flex-col lp:pl-4 lp:border-l border-border'>
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
						<div className='font-medium flex flex-col gap-2'>
							<button
								type='button'
								onClick={handleRandomColors}
								className='labels w-full p-2 border border-border bg-[rgb(183,170,156,8%)] text-primary rounded'
							>
								Generate Random Values
							</button>
							<button
								type='button'
								onClick={resetToDefault}
								className='labels w-full p-2 border border-border bg-[rgb(183,170,156,8%)] text-primary rounded'
							>
								Reset to Default
							</button>

							<button
								type='submit'
								className='labels w-full p-2 bg-primary text-backdrop-80 rounded hover:'
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

const PersonalizeGame = ({ id, size, minSize, maxSize, setSize }) => {
	return (
		<div className='flex flex-col gap-6'>
			<label className='font-regular text-light labels' htmlFor={id}>
				Paddle Size: {size}%
			</label>
			<Slider
				id={id}
				aria-label='Default'
				value={size}
				min={minSize}
				max={maxSize}
				valueLabelDisplay='auto'
				onChange={(e) => setSize(parseInt(e.target.value))}
				sx={{
					// Thumb
					'& .MuiSlider-thumb': {
						width: 18,
						height: 18,
						backgroundColor: '#FBFBEE',
						border: '2px solid #FBFBEE',

						// Remove ripple effect shadows
						'&::before': {
							boxShadow: 'none',
						},
						'&::after': {
							boxShadow: 'none',
						},

						// Hover state
						'&:hover': {
							boxShadow: '0 0 0 8px rgba(251, 251, 238, 0.16)',
						},

						// Active state (while dragging)
						'&.Mui-active': {
							boxShadow: '0 0 0 14px rgba(251, 251, 238, 0.3)',
						},
					},

					// Track
					'& .MuiSlider-track': {
						height: 8,
						backgroundColor: '#FBFBEE',
						border: 'none',
					},

					// Rail
					'& .MuiSlider-rail': {
						height: 6,
						backgroundColor: '#48433E',
						opacity: 1,
					},

					// Value Label
					'& .MuiSlider-valueLabel': {
						color: '#1B1611',
						backgroundColor: '#FBFBEE',
						fontSize: 'clamp(0.563rem, 0.398vw + 0.488rem, 1.125rem)',

						paddingTop: 0,
						paddingBottom: '1px',
						paddingLeft: '6px',
						paddingRight: '6px',
						borderRadius: '2px',
					},
				}}
			/>
		</div>
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
