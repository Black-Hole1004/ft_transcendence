import './Dashboard.css'
import GameModes from '../../components/Dashboard/GameModes'
import Achievements from '../../components/Dashboard/Achievements'
import FriendsList from '../../components/Dashboard/FriendsList/FriendsList'
import Leaderboard from '../../components/Dashboard/Leaderboard/Leaderboard'
import CongratulatoryMessage from '../../components/Dashboard/CongratulatoryMessage'
import useAuth from '../../context/AuthContext'
import { useEffect, useState } from 'react'

const Dashboard = () => {

	const { authTokens, logout, getAuthHeaders } = useAuth();

	const xp = 6445
	const [level, setLevel] = useState(null)

	useEffect(() => {
		setLevel((xp * 100) / 10000)
	}, [level])





	/************************************************************************ */


	return (
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
	)
}

export default Dashboard
