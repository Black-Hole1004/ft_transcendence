import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import './Game.css'
import Header from '../../components/Header'
import GameScore from '../../components/Game/GameScore'
import Player from '../../components/Game/Player'
import PongTable from '../../components/Game/PongTable'
import Timer from '../../components/Game/Timer'

const Game = () => {
	const [isPaused, setIsPaused] = useState(false)

   // Get query parameters using useLocation and query-string
   const location = useLocation()
   const { backgroundId } = queryString.parse(location.search)

   const handlePause = () => {
		setIsPaused(!isPaused)
	}

	return (
		<div className={`min-h-screen backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-80' : 'bg-backdrop-40'}`} >
			<Header />
			<section className='flex'>
				<div className='flex-1 margin-page flex flex-col items-center gap-8'>
					<GameScore isPaused = {isPaused} />
					<Timer isPaused={isPaused} />
					<div className='flex-1 w-full flex justify-between font-dreamscape-sans max-lg:flex-wrap max-lg:justify-around'>
						<Player isPaused={isPaused}  PlayerName={"mouad55"}  BadgeName={"celestial master"}  playerImage={"/assets/images/moudrib.jpeg"} badgeImage={"/assets/images/Achievements/celestial-master.svg"} />
						<PongTable isPaused={isPaused} handlePause={handlePause} backgroundId={backgroundId || 1} />
						<Player isPaused={isPaused}  PlayerName={"Ahmaymou"}  BadgeName={"galactic trailblazer"}  playerImage={"/assets/images/lmoudir.jpg"} badgeImage={"/assets/images/Achievements/galactic-trailblazer.svg"} />
					</div>
				</div>
			</section>
		</div>
	)
}

export default Game
