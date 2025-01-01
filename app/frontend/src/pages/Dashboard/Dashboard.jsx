import './Dashboard.css'
import GameModes from '../../components/Dashboard/GameModes'

import Loader from '../../components/Loader/Loader'

import Achievements from '../../components/Dashboard/Achievements'
import FriendsList from '../../components/Dashboard/FriendsList/FriendsList'
import Leaderboard from '../../components/Dashboard/Leaderboard/Leaderboard'
import CongratulatoryMessage from '../../components/Dashboard/CongratulatoryMessage'
import useAuth from '../../context/AuthContext'
import { useEffect, useState } from 'react'


const Dashboard = () => {
	const { authTokens, logout, getAuthHeaders } = useAuth();
	const [leaderboardData, setLeaderboardData] = useState([]);
	const [achievements, setAchievements] = useState(null);
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null);
	const [currentAchievement, setCurrentAchievement] = useState([]);
	const [title, setTitle] = useState('Dashboard');
	const [description, setDescription] = useState('Welcome to your dashboard!');
	const [body, setBody] = useState('You have no new achievements to claim.');


	useEffect(() => {
		const fetchData = async () => {
			try {
				const baseUrl = import.meta.env.VITE_BASE_URL || '';
				// get current logged in user data --------------------------------------------------------------
				const userDataUrl = `${baseUrl}/api/user/me/`;
				const userResponse = await fetch(userDataUrl, {
					headers: getAuthHeaders()
				});
				if (!userResponse.ok) {
					throw new Error('Failed to fetch user data');
				}
				const userJson = await userResponse.json();
				setUserData(userJson);
				console.log('user data:', userJson);

				setCurrentAchievement(userJson.badge)
				setTitle(userJson.badge.title);
				setBody(userJson.badge.body);
				setDescription(userJson.badge.description);


				// get leaderboard data --------------------------------------------------------------
				const leaderboardUrl = `${baseUrl}/api/user/leaderboard/`;
				const leaderboardResponse = await fetch(leaderboardUrl, {
					method: 'GET',
					credentials: 'include',
					headers: getAuthHeaders()
				});
				const responseText = await leaderboardResponse.text();
				if (!leaderboardResponse.ok) {
					throw new Error(`Leaderboard fetch failed: ${leaderboardResponse.status}`);
				}
				// Only try to parse as JSON if it's actually JSON
				const leaderboardData = JSON.parse(responseText);
				setLeaderboardData(leaderboardData.users);
				

				// get achievements data --------------------------------------------------------------
				const achievementsUrl = `${baseUrl}/api/user/achievements/`;
				const achievementsResponse = await fetch(achievementsUrl, {
					method: 'GET',
					credentials: 'include',
					headers: getAuthHeaders()
				});
				if (!achievementsResponse.ok) {
					throw new Error(`Achievements fetch failed: ${achievementsResponse.status}`);
				}
				const achievementsJson = await achievementsResponse.json();
				setAchievements(achievementsJson.achievements);
	
			} catch (error) {
				console.error('Error fetching data:', error);
				console.error('Full error details:', {
					message: error.message,
					stack: error.stack
				});
			} finally {
				setLoading(false);
			}
		};
	
		fetchData();
	}, []);
	/************************************************************************ */
	if (loading) return <Loader />;

	return (
		<>
			<section className='flex lg:flex-row flex-col lg:pl-section-lg
			rightside-my lg:mr-modes-right-lg lg:ml-modes-left-lg ml:ml-modes-left-ms ml:mr-modes-right-ms'>
				<div className='lg:w-5/12 flex flex-col justify-between max-lg:mb-8 max-mtb:mb-4 max-lg:mx-2 lg:pr-cards-lg'>
					<CongratulatoryMessage title={title} description={description} body={body} />
					<div className='flex mtb:flex-row flex-col max-mtb:gap-y-3 gap-x-1 lg:justify-between justify-around max-mtb:pr-0'>
						<FriendsList />
						<Leaderboard users={leaderboardData} />
					</div>
				</div>
				<div className='flex flex-col flex-1 justify-between max-ml:p-1'>
					<GameModes />
					<Achievements 
						achievements={achievements}
						currentXp={userData?.xp || 0}
					/>
				</div>
			</section>
		</>
	)
}

export default Dashboard
