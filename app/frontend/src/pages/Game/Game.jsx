import React, { useEffect, useState } from 'react'
import './Game.css'
import Header from '../../components/Header'

const Game = () => {
	const [backgroundId, setBackgroundId] = useState(1)

	const handleClick = (id) => {
		setBackgroundId(id)
	}

	const xp = 6231

	return (
		<div className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex-grow flex'>
				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
					<div className='score border-1.5 border-primary rounded-xl'>
						<p className='font-dreamscape leading-[1.125] text-center'>1 - 3</p>
					</div>
					<div className='flex-1 w-full flex justify-between'>
						<div className='flex flex-col items-center font-dreamscape-sans'>
							<img
								src='/assets/images/moudrib.jpeg'
								className='rounded-full border-2 border-primary user-photo'
								alt='user photo'
							/>
							<p className='players-usernames'>mouad55</p>
							<img
								src='/assets/images/Achievements/celestial-master.svg'
								className='achievements-icons hover:scale-[1.2] transition duration-500'
								alt=''
							/>
							<p className='text-level badge-name'>celestial master</p>
						</div>
						<canvas id='game-table' className='game-table border'>

						</canvas>
						<div className='flex flex-col items-center font-dreamscape-sans'>
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
