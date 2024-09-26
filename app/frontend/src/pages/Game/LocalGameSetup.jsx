import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const LocalGameSetup = () => {
	const [player1Name, setPlayer1Name] = useState('')
	const [player2Name, setPlayer2Name] = useState('')
	const [gameDuration, setGameDuration] = useState(30)
	const [player1Color, setPlayer1Color] = useState('#ffffff')
	const [player2Color, setPlayer2Color] = useState('#ffffff')
	const [ballColor, setBallColor] = useState('#ffffff')
	const [paddleHeight, setPaddleHeight] = useState(100)
	const [ballRadius, setBallRadius] = useState(10)
	const location = useLocation()
	const navigate = useNavigate()
	const { backgroundId } = location.state || { backgroundId: 1 }

	const canvasWidth = 800
	const canvasHeight = 400
	const maxPaddleHeight = 350
	const minPaddleHeight = 50
	const maxBallRadius = 100
	const minBallRadius = 5

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
					backgroundId,
					paddleHeight,
					ballRadius,
				},
			})
		}
	}

	const generateRandomColor = () => {
		return '#' + Math.floor(Math.random() * 16777215).toString(16)
	}

	const handleRandomColors = () => {
		setPlayer1Color(generateRandomColor())
		setPlayer2Color(generateRandomColor())
		setBallColor(generateRandomColor())
	}

	const resetToDefault = () => {
		setPlayer1Color('#ffffff')
		setPlayer2Color('#ffffff')
		setBallColor('#ffffff')
		setPaddleHeight(100)
		setBallRadius(10)
	}

	const GamePreview = ({
		player1Color,
		player2Color,
		ballColor,
		paddleHeight,
		ballRadius,
		backgroundId,
	}) => {
		const canvasRef = useRef(null)
		const scale = 0.75 // Scale factor for the preview
		const scaledWidth = canvasWidth * scale
		const scaledHeight = canvasHeight * scale

		useEffect(() => {
			const canvas = canvasRef.current
			const ctx = canvas.getContext('2d')

			// Clear canvas and set a background color
			ctx.fillStyle = '#000000' // Black background
			ctx.fillRect(0, 0, scaledWidth, scaledHeight)

			// Draw background
			const backgroundImage = new Image()
			backgroundImage.src = `/assets/images/tables/table${backgroundId}.png`
			backgroundImage.onload = () => {
				ctx.drawImage(backgroundImage, 0, 0, scaledWidth, scaledHeight)
				drawGameElements()
			}
			backgroundImage.onerror = () => {
				console.error('Failed to load background image')
				drawGameElements()
			}

			function drawGameElements() {
				// Draw paddles
				const paddleWidth = 10 * scale
				ctx.fillStyle = player1Color
				ctx.fillRect(
					10,
					(scaledHeight - paddleHeight * scale) / 2,
					paddleWidth,
					paddleHeight * scale
				)
				ctx.fillStyle = player2Color
				ctx.fillRect(
					scaledWidth - paddleWidth - 10,
					(scaledHeight - paddleHeight * scale) / 2,
					paddleWidth,
					paddleHeight * scale
				)

				// Draw ball
				ctx.beginPath()
				ctx.arc(scaledWidth / 2, scaledHeight / 2, ballRadius * scale, 0, Math.PI * 2)
				ctx.fillStyle = ballColor
				ctx.fill()
			}
		}, [
			player1Color,
			player2Color,
			ballColor,
			paddleHeight,
			ballRadius,
			backgroundId,
			scaledWidth,
			scaledHeight,
		])

		return (
			<canvas
				ref={canvasRef}
				width={scaledWidth}
				height={scaledHeight}
				className='border rounded'
				style={{
					width: `${scaledWidth}px`,
					height: `${scaledHeight}px`,
					background: '#000000',
					borderRadius: '20px',
				}}
			/>
		)
	}

	return (
		<div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary flex items-center justify-center'>
			<div className='flex flex-col lg:flex-row bg-backdrop-80 p-6 rounded-lg shadow-lg w-full max-w-7xl'>
				<div className='w-full lg:w-1/2 lg:pr-6 mb-6 lg:mb-0'>
					<h3 className='text-xl font-bold mb-4'>Game Customization</h3>

					<div className='mb-4'>
						<label className='block text-sm font-bold mb-2' htmlFor='paddleHeight'>
							Paddle Height: {paddleHeight}px
						</label>
						<input
							id='paddleHeight'
							type='range'
							min={minPaddleHeight}
							max={maxPaddleHeight}
							value={paddleHeight}
							onChange={(e) => setPaddleHeight(parseInt(e.target.value))}
							className='w-full'
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-sm font-bold mb-2' htmlFor='ballRadius'>
							Ball Radius: {ballRadius}px
						</label>
						<input
							id='ballRadius'
							type='range'
							min={minBallRadius}
							max={maxBallRadius}
							value={ballRadius}
							onChange={(e) => setBallRadius(parseInt(e.target.value))}
							className='w-full'
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-sm font-bold mb-2'>Preview</label>
						<GamePreview
							player1Color={player1Color}
							player2Color={player2Color}
							ballColor={ballColor}
							paddleHeight={paddleHeight}
							ballRadius={ballRadius}
							backgroundId={backgroundId}
						/>
					</div>
				</div>

				<div className='w-full lg:w-1/2 lg:pl-6 lg:border-l lg:border-gray-600'>
					<form onSubmit={handleSubmit} className='w-full md:w-2/3 pl-6'>
						<h2 className='text-2xl font-bold mb-4'>Local Game Setup</h2>

						{/* Form Inputs */}
						<div className='mb-4'>
							<label className='block text-sm font-bold mb-2' htmlFor='player1Name'>
								Player 1 Name
							</label>
							<input
								id='player1Name'
								type='text'
								value={player1Name}
								onChange={(e) => setPlayer1Name(e.target.value)}
								placeholder='Enter Player 1 name'
								className='w-full p-2 bg-white text-black rounded placeholder-gray-400'
								required
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-sm font-bold mb-2' htmlFor='player1Color'>
								Player 1 Paddle Color
							</label>
							<div className='flex items-center'>
								<input
									id='player1Color'
									type='color'
									value={player1Color}
									onChange={(e) => setPlayer1Color(e.target.value)}
									className='w-8 h-8 mr-2'
								/>
								<span className='mr-2'>{player1Color}</span>
							</div>
						</div>

						<div className='mb-4'>
							<label className='block text-sm font-bold mb-2' htmlFor='player2Name'>
								Player 2 Name
							</label>
							<input
								id='player2Name'
								type='text'
								value={player2Name}
								onChange={(e) => setPlayer2Name(e.target.value)}
								placeholder='Enter Player 2 name'
								className='w-full p-2 bg-white text-black rounded placeholder-gray-400'
								required
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-sm font-bold mb-2' htmlFor='player2Color'>
								Player 2 Paddle Color
							</label>
							<div className='flex items-center'>
								<input
									id='player2Color'
									type='color'
									value={player2Color}
									onChange={(e) => setPlayer2Color(e.target.value)}
									className='w-8 h-8 mr-2'
								/>
								<span className='mr-2'>{player2Color}</span>
							</div>
						</div>

						<div className='mb-4'>
							<label className='block text-sm font-bold mb-2' htmlFor='gameDuration'>
								Game Duration (seconds)
							</label>
							<input
								id='gameDuration'
								type='number'
								value={gameDuration}
								onChange={(e) => setGameDuration(parseInt(e.target.value))}
								placeholder='Game duration (seconds)'
								className='w-full p-2 bg-white text-black rounded placeholder-gray-400'
								required
								min='10'
								max='300'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-sm font-bold mb-2' htmlFor='ballColor'>
								Ball color
							</label>
							<div className='flex items-center'>
								<input
									id='ballColor'
									type='color'
									value={ballColor}
									onChange={(e) => setBallColor(e.target.value)}
									className='w-8 h-8 mr-2'
								/>
								<span className='mr-2'>{ballColor}</span>
							</div>
						</div>

						<button
							type='button'
							onClick={handleRandomColors}
							className='w-full p-2 mb-4 bg-secondary text-primary rounded hover:bg-secondary-dark transition'
						>
							Generate Random Colors
						</button>
						<button
							type='button'
							onClick={resetToDefault}
							className='w-full p-2 mb-4 bg-secondary text-primary rounded hover:bg-secondary-dark transition'
						>
							Reset to Default
						</button>

						<button
							type='submit'
							className='w-full p-2 bg-primary text-backdrop-80 rounded hover:bg-primary-dark transition'
						>
							Start Game
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default LocalGameSetup
