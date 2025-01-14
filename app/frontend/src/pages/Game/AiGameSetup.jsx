import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AIGameSetup = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { backgroundId } = location.state || { backgroundId: 1 }
	const [difficulty, setDifficulty] = useState('medium')

	const difficultyInfo = {
		easy: {
			name: 'Easy',
			description: 'Slower reactions, makes more mistakes',
		},
		medium: {
			name: 'Medium',
			description: 'Balanced difficulty',
		},
		hard: {
			name: 'Hard',
			description: 'Quick reactions, highly competitive',
		},
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		navigate('/ai-game', {
			state: {
				mode: 'AI',
				difficulty: difficulty,
				backgroundId: backgroundId,
			},
		})
	}

	const previewConfig = {
		paddle: { size: 33 },
		ball: { size: 6 },
		players: {
			player1: { color: '#FFFFFF' },
			player2: { color: '#FF0000' },
		},
		isBackgroundVisible: true,
	}

	return (
		<div className='min-h-screen   text-primary flex items-center justify-center'>
			<div className='flex flex-col p-6 rounded-lg shadow-lg w-full max-w-2xl'>
				<h2 className='text-2xl font-bold mb-6'>AI Game Setup</h2>

				<div className='mb-6'>
					<label className='block text-sm font-bold mb-4'>Select Difficulty</label>
					<div className='grid grid-cols-1 gap-4'>
						{Object.entries(difficultyInfo).map(([key, info]) => (
							<div
								key={key}
								className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                                    ${
										difficulty === key
											? 'border-primary bg-primary bg-opacity-10'
											: 'border-gray-600 hover:border-primary'
									}`}
								onClick={() => setDifficulty(key)}
							>
								<h3 className='text-lg font-bold'>{info.name}</h3>
								<p className='text-sm text-gray-400'>{info.description}</p>
							</div>
						))}
					</div>
				</div>

				<div className='relative self-center w-[88%] max-w-[500px] aspect-video border border-primary rounded overflow-hidden pointer-events-none bg-transparent'>
					<img
						src={`/assets/images/tables/table${backgroundId}.${backgroundId > 6 ? 'gif' : 'webp'}`}
						className='select-none brightness-[50%]'
						alt='table'
					/>
					<div
						className='absolute top-1/2 left-2 z-10 transform -translate-y-1/2 w-2.5 ring-1 ring-primary rounded-lg'
						style={{
							height: `${previewConfig.paddle.size}%`,
							background: previewConfig.players.player1.color,
						}}
					></div>
					<div
						className='absolute top-1/2 right-2 z-10 transform -translate-y-1/2 w-2.5 ring-1 ring-primary rounded-lg'
						style={{
							height: `${previewConfig.paddle.size}%`,
							background: previewConfig.players.player2.color,
						}}
					></div>
					<div
						className='absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 aspect-square ring-1 ring-primary rounded-full'
						style={{
							height: `${previewConfig.ball.size}%`,
							background: previewConfig.players.player1.color,
						}}
					></div>
				</div>

				<button
					onClick={handleSubmit}
					className='p-3 hover:bg-primary-dark transition font-bold mt-6 font-dreamscape labels w-full p-2 bg-primary text-secondary rounded
                    hover:scale-[1.015] transition-all duration-300 ease-in'
				>
					Start Game
				</button>
			</div>
		</div>
	)
}

export default AIGameSetup
