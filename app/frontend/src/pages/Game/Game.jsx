import React, { useState } from 'react'
import './Game.css'
import Header from '../../components/Header'

const Game = () => {
	const [isPaused, setIsPaused] = useState(false)

	const handlePause = () => {
		setIsPaused(!isPaused)
	}

	return (
		<div
			className={`min-h-screen backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-80' : 'bg-backdrop-40'}`}
		>
			<Header />
			<section className='flex'>
				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
					<div
						className={`score border-1.5 border-primary rounded-xl ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
					>
						<p className='font-dreamscape leading-[1.125] text-center'>1 - 3</p>
					</div>
					<div className='flex-1 w-full flex justify-between font-dreamscape-sans max-lg:flex-wrap max-lg:justify-around'>
						<div
							className={`flex flex-col items-center ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
						>
							<img
								src='/assets/images/moudrib.jpeg'
								className='rounded-full border-2 border-primary user-photo'
								alt='user photo'
							/>
							<p className='players-usernames truncate'>mouad55</p>
							<img
								src='/assets/images/Achievements/celestial-master.svg'
								className='achievements-icons hover:scale-[1.2] transition duration-500'
								alt=''
							/>
							<p className='text-level badge-name'>celestial master</p>
						</div>
						<div className='flex flex-col items-center gap-7 max-lg:order-first max-lg:w-full'>
							<canvas
								id='game-table'
								className={`game-table border ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
							></canvas>
							<button
								onClick={handlePause}
								className='pause flex items-center gap-3 brightness-[1] leading-[0.95]'
							>
								<img
									src={`/assets/images/icons/${isPaused ? 'play' : 'pause'}.svg`}
									alt=''
								/>
								<p className='align-middle'>{isPaused ? 'resume' : 'pause'}</p>
							</button>
						</div>
						<div
							className={`flex flex-col items-center ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
						>
							<img
								src='/assets/images/lmoudir.jpg'
								className='rounded-full border-2 border-primary user-photo'
								alt='user photo'
							/>
							<p className='players-usernames'>Ahmaymou</p>
							<img
								src='/assets/images/Achievements/galactic-trailblazer.svg'
								className='achievements-icons hover:scale-[1.2] transition duration-500'
								alt=''
							/>
							<p className='text-level badge-name'>galactic trailblazer</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Game
