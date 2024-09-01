import React, { useState } from 'react'
import './Game.css'
import Header from '../../components/Header'
import GameScore from '../../components/Game/GameScore'
import Player from '../../components/Game/Player'
import PongTable from '../../components/Game/PongTable'

const Game = () => {
	const [isPaused, setIsPaused] = useState(false)

	const handlePause = () => {
		setIsPaused(!isPaused)
	}

	return (
		<div className={`min-h-screen backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-80' : 'bg-backdrop-40'}`} >	
			{/*component 1 : the header/nav bar */}
			<Header />
			<section className='flex'>
				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
				 	{/*component 2 : the game score */}
					<GameScore isPaused = {isPaused} />

					<div className='flex-1 w-full flex justify-between font-dreamscape-sans max-lg:flex-wrap max-lg:justify-around'>
						{/*component 3 : Player on the left - PLayer*/}
						<Player isPaused={isPaused}  PlayerName={"mouad55"}  BadgeName={"celestial master"}  playerImage={"/assets/images/moudrib.jpeg"} badgeImage={"/assets/images/Achievements/celestial-master.svg"} />
						{/*component 4 : the game table */}
						<PongTable isPaused={isPaused} handlePause={handlePause} />
						{/*component 5 : Player on the right */}
						<Player isPaused={isPaused}  PlayerName={"Ahmaymou"}  BadgeName={"galactic trailblazer"}  playerImage={"/assets/images/lmoudir.jpg"} badgeImage={"/assets/images/Achievements/galactic-trailblazer.svg"} />
					</div>
				</div>
			</section>
		</div>
	)
}

export default Game
