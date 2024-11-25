import './Dashboard.css'
import GameModes from '../../components/Dashboard/GameModes'
import Achievements from '../../components/Dashboard/Achievements'
import FriendsList from '../../components/Dashboard/FriendsList/FriendsList'
import Leaderboard from '../../components/Dashboard/Leaderboard/Leaderboard'
import CongratulatoryMessage from '../../components/Dashboard/CongratulatoryMessage'
import useAuth from '../../context/AuthContext'
import { useEffect, useState } from 'react'

// rightside-my lg:mr-modes-right-lg lg:ml-modes-left-lg ml:ml-modes-left-ms ml:mr-modes-right-ms

const Dashboard = () => {
	const { authTokens, logout, getAuthHeaders } = useAuth();

	const xp = 6445
	const [level, setLevel] = useState(null)

	useEffect(() => {
		setLevel((xp * 100) / 10000)
	}, [level])

	/************************************************************************ */

	return (
		<section className='flex lg:flex-row flex-col lg:pl-section-lg
		rightside-my lg:mr-modes-right-lg lg:ml-modes-left-lg ml:ml-modes-left-ms ml:mr-modes-right-ms'>
			<div className='lg:w-5/12 flex flex-col justify-between max-lg:mb-8 max-mtb:mb-4 max-lg:mx-2'>
				<CongratulatoryMessage />
				<div className='flex mtb:flex-row flex-col max-mtb:gap-y-3 gap-x-1 lg:justify-between justify-around lg:pr-cards-lg max-mtb:pr-0'>
					<FriendsList />
					<Leaderboard />
				</div>
			</div>
			<div
				className='flex flex-col flex-1'
			>
				<GameModes />
				<Achievements level={level} />
			</div>
		</section>
	)
}

export default Dashboard
