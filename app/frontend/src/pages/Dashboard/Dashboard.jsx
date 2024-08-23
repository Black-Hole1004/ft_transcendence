import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import Header from '../../components/Header'
import GameModes from '../../components/Dashboard/GameModes'
import Achievements from '../../components/Dashboard/Achievements'
import FriendsList from '../../components/Dashboard/FriendsList/FriendsList'
import Leaderboard from '../../components/Dashboard/Leaderboard/Leaderboard'
import CongratulatoryMessage from '../../components/Dashboard/CongratulatoryMessage'

const Dashboard = () => {
	const xp = 6445
	const [level, setLevel] = useState(null)

	useEffect(() => {
		setLevel((xp * 100) / 10000)
	}, [level])

	return (
		<div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary overflow-hidden'>
			<Header />
			<section className='flex lg:flex-row flex-col'>
				<div className='lg:w-5/12 flex flex-col'>
					<CongratulatoryMessage achievementId={5} />
					<div className='flex mtb:flex-row flex-col lg:justify-between justify-around items-center gap-y-10 cards-padding'>
						<FriendsList />
						<Leaderboard />
					</div>
				</div>
				<div
					className='flex flex-col flex-1 rightside-my
					lg:mr-modes-right-lg lg:ml-modes-left-lg
					ml:ml-modes-left-ms ml:mr-modes-right-ms'
				>
					<GameModes />
					<Achievements level={level} />
				</div>
			</section>
		</div>
	)
}

export default Dashboard
