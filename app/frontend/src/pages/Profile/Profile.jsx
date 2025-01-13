import React, { useEffect, useRef, useState } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import MatchStats from '../../components/Profile/MatchStats'
import ProfileBio from '../../components/Profile/ProfileBio'
import ProgressBar from '../../components/Profile/ProgressBar'
import AboutSection from '../../components/Profile/AboutSection'
import UserStatsGraph from '../../components/Profile/UserStatsGraph'
import useAuth from '../../context/AuthContext'

const USER_API = import.meta.env.VITE_USER_API
const BASE_URL = import.meta.env.VITE_BASE_URL
import { useParams } from 'react-router-dom'


const Profile = () => {
	const { username_fetched } = useParams();
	console.log(username_fetched);
	const { getAuthHeaders } = useAuth()
	const containerRef = useRef(null)
	const [width, setWidth] = useState(window.innerWidth)

	const [stats, setStats] = useState({
		total_games: 0,
		games_won: 0,
		win_rate: 0,
		xp: 0
	});
	const [matchHistory, setMatchHistory] = useState([]);
	const [achievement, setAchievement] = useState({
		current: {
			name: '',
			image: '',
			current_threshold: 0,
			next_threshold: 0,
			progress_percentage: 0
		},
		overall_progress: 0
	});
	const fetchProfileStats = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/profile/stats`, {
				headers: getAuthHeaders()
			});
			const data = await response.json();
			console.log('data: ', data)
			if (response.ok) {
				setStats(data.stats);
				setAchievement(data.achievement);
				setMatchHistory(data.match_history);
			} else {
				setError(data.error || 'Failed to fetch profile stats');
			}
		} catch (error) {
			console.error('Failed to fetch profile stats:', error);
		}
	};

	console.log(stats);
	console.log(matchHistory);
	console.log(achievement);

	
	window.addEventListener('resize', () => {
		setWidth(window.innerWidth)
	})

	const [first_name, setFirst_name] = useState('')
	const [last_name, setLast_name] = useState('')
	const [email, setEmail] = useState('')
	const [mobile_number, setMobile_number] = useState('')
	const [username, setUsername] = useState('')
	const [bio, setBio] = useState('')
	const [profile_picture, setProfile_picture] = useState('')
	const [date_joined_formatted, setDate_joined_formatted] = useState('')


	const [user, setUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		mobile_number: '',
		username: '',
		bio: '',
		profile_picture: '',
		date_joined_formatted: ''
	})

	const fetchUser = async () => {
		try {
			const response = await fetch(USER_API, {
				method: 'GET',
				headers: getAuthHeaders(),
			})
			const data = await response.json()
			if (response.ok) {
				return data
			} else {
				console.log('Failed to fetch user data')
				// logout();
				return null
			}
		} catch (error) {
			console.log(error)
			// logout();
			return null
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await fetchUser();
			if (fetchedData)
				setUser(fetchedData);
		};
		fetchData();
		fetchProfileStats();
	}, []);

	useEffect(() => {
		if (!user)
			return;
		setFirst_name(user.first_name);
		setLast_name(user.last_name);
		setEmail(user.email);
		setMobile_number(user.mobile_number);
		setUsername(user.username);
		setBio(user.bio);
		setProfile_picture(user.profile_picture);
		setDate_joined_formatted(user.date_joined_formatted);
	}, [user]);

	console.log('user --------->', user);

	/************************************************************************ */
	return (
		<section ref={containerRef} className='flex justify-center'>
			<div
				className='lp:mt-20 my-10 relative flex flex-col max-lp:gap-y-3
					lp:mx-container-x-lp mx-container-x-ms lp:h-profile-cards lp:w-profile-cards w-[96%]'
			>
				<div
					className={`${width >= 1024 ? 'user-info-lp' : 'border border-primary rounded-xl'}
						lp:self-start max-ms:w-full flex flex-col`}
				>
					<div className='font-dreamscape text-primary cards-title text-center relative'>
						<Link to={'/dashboard'}>
							<img
								src='./assets/images/icons/arrow.svg'
								className='arrow absolute left-[4%]'
								alt='arrow icon'
							/>
						</Link>
						<h1>profile</h1>
					</div>
					<ProfileBio src={`${BASE_URL}${profile_picture}`} bio={bio} />
					<div
						className='lp:ml-about-lp flex font-medium mtb:flex-row flex-col lp:justify-start mtb:justify-around
						xl:gap-20 lg:gap-10 gap-3 max-lp:ml-0 mt-2'
					>
						<AboutSection first_name={first_name} last_name={last_name} email={email} mobile_number={mobile_number} username={username} bio={bio} data_joined_formatted={date_joined_formatted} />
						<div className='flex flex-col items-center gap-2'>
							<p className='titles max-mtb:self-start max-mtb:ml-3'>
								Overall Progression
							</p>
							<div className='progressbar justify-self-center aspect-square'>
								<ProgressBar value={achievement.overall_progress} />
								{/* <AnimatedProgressBar targetProgress={achievement.current.progress_percentage} /> */}
							</div>
						</div>
					</div>
					<UserStatsGraph />
				</div>
				{/* RANK: Achievement information and progress */}
				<div className={`${width >= 1024 ? 'rank-card-lp' : 'border border-primary rounded-xl'}
						bg-no-repeat lp:absolute lp:right-0 lp:top-0 rank flex flex-col`}>
					<div className='font-dreamscape text-primary cards-title text-center'>
						<h1 className='lg:pl-20 lp:pl-14'>rank</h1>
					</div>
					<div className='flex-1 flex items-center justify-center'>
						<img
							src={`${BASE_URL}${achievement.current.image}`}
							className='hover:scale-[1.05] transition duration-500 select-none'
							alt='achievement badge'
						/>
						<div className='flex flex-col gap-6'>
							<div>
								<p className='font-dreamscape-sans text-level text-center achievement-title'>
									{achievement.current.name}
								</p>
								<div className='flex justify-between text-primary font-medium progress'>
									<p>{achievement.current.current_threshold}xp</p>
									<p>{achievement.current.next_threshold}xp</p>
								</div>
								<div className='level xl:h-[10px] tb:h-2 h-[7px] rounded-md bg-[rgb(121,118,110,0.7)] mt-[2px] flex items-center'>
									<div
										className='rounded-lg h-full bg-level'
										style={{
											width: `${achievement.current.progress_percentage}%`,
										}}
										></div>
								</div>
							</div>
							<div className='text-center achievement-title mb-2'>
								<pre className='font-medium text-primary'>Current XP:   <span className='text-light'>{stats.xp} xp</span></pre>
							</div>
						</div>
					</div>
				</div>

				{/* MATCH HISTORY : 5 recent matches */}
				<div
					className={`${width >= 1024 ? 'match-history-lp' : 'border border-primary rounded-xl'}
						lp:absolute lp:bottom-0 lp:right-0 flex flex-col justify-between`}
				>
					<div className='font-dreamscape text-primary cards-title text-center'>
						<h1 className='lg:pl-40 lp:pl-28'>match history</h1>
					</div>
					<div
						className={`match-history flex-1 flex mtb:flex-row flex-col
						${matchHistory.length ? 'lp:justify-end' : ''} mtb:justify-around justify-center mb-3`}
					>
						<div className='flex flex-col items-center lp:gap-3 gap-2 lp:self-end self-center'>
							<p className='titles lp:self-center self-start font-medium'>
								Win Rate
							</p>
							<div className='win-rate justify-self-center aspect-square'>
								<ProgressBar value={stats.win_rate}/>
							</div>
						</div>
						<div className='flex flex-col gap-1 max-mtb:self-center'>
							{matchHistory.map((match, index) => (
								<MatchStats 
									key={index}
									currentPlayer={match.current_player}
									opponent={match.opponent}
									result={match.result}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Profile
