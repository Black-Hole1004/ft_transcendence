import React, { useEffect, useRef, useState } from 'react'
import './UserProfile.css'
import { Link } from 'react-router-dom'
import MatchStats from '../../components/UserProfile/MatchStats'
import ProfileBio from '../../components/UserProfile/ProfileBio'
import ProgressBar from '../../components/UserProfile/ProgressBar'
import AboutSection from '../../components/UserProfile/AboutSection'
import UserStatsGraph from '../../components/UserProfile/UserStatsGraph'
import useAuth from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'


const USER_API = import.meta.env.VITE_USER_API
const BASE_URL = import.meta.env.VITE_BASE_URL
const GET_USER_PROFILE_BY_USERNAME = import.meta.env.VITE_GET_USER_PROFILE_BY_USERNAME
import { useParams } from 'react-router-dom'


const UserProfile = () => {
	const navigate = useNavigate();
	const { profile_name } = useParams();
	const { getAuthHeaders } = useAuth();

	const containerRef = useRef(null);
	const [width, setWidth] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [user, setUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		mobile_number: '',
		username: '',
		display_name: '',
		bio: '',
		profile_picture: '',
		date_joined_formatted: '',
	});
	const [stats, setStats] = useState({
		total_games: 0,
		games_won: 0,
		win_rate: 0,
		xp: 0,
	});
	const [matchHistory, setMatchHistory] = useState([]);
	const [achievement, setAchievement] = useState({
		current: {
			name: '',
			image: '',
			current_threshold: 0,
			next_threshold: 0,
			progress_percentage: 0,
		},
		overall_progress: 0,
	});

	const fetchProfileStats = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/profile/stats/${profile_name}/`, {
				headers: getAuthHeaders(),
			});
			if (!response.ok) throw new Error('Failed to fetch profile stats');
			const data = await response.json();
			setStats(data.stats);
			setAchievement(data.achievement);
			setMatchHistory(data.match_history);
		} catch (error) {
			setError(error.message);
			navigate(`/users/${profile_name}/not_found`);
		}
	};

	const fetchUserByUserName = async () => {
		try {
			const response = await fetch(`${GET_USER_PROFILE_BY_USERNAME}${profile_name}/`, {
				headers: getAuthHeaders(),
			});
			if (!response.ok) throw new Error('User not found');
			const data = await response.json();
			setUser(data);
		} catch (error) {
			setError(error.message);
			navigate(`/users/${profile_name}/not_found`);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await Promise.all([fetchUserByUserName(), fetchProfileStats()]);
			setLoading(false);
		};
		fetchData();
	}, [profile_name]);

	useEffect(() => {
		const calculateWidth = () => {
			if (containerRef.current) {
				setWidth(containerRef.current.getBoundingClientRect().width);
			}
		};
		calculateWidth();
		window.addEventListener('resize', calculateWidth);
		return () => window.removeEventListener('resize', calculateWidth);
	}, []);

	if (loading) return <Loader />;
	if (error) return <p>{error}</p>;

	/************************************************************************ */

	return (
		<section ref={containerRef} className='flex justify-center'>
			<div
				className='lp:mt-20 my-10 relative flex flex-col max-lp:gap-y-3
					lp:mx-container-x-lp mx-container-x-ms lp:h-profile-cards lp:w-profile-cards'
			>
				<div
					className={`${width >= 1024 ? 'user-info-lp' : 'border border-primary rounded-xl'}
						lp:self-start max-ms:w-full flex flex-col`}
				>
					<div className='font-dreamscape text-primary cards-title text-center relative'>
						<Link to={'/dashboard'}>
							<img
								src='../../../dist/assets/images/icons/arrow.svg'
								className='arrow absolute left-[4%]'
								alt='arrow icon'
							/>
						</Link>
						<h1>profile</h1>
					</div>
					<ProfileBio src={`${BASE_URL}${user.profile_picture}`} bio={user.bio} />
					<div
						className='lp:ml-about-lp flex font-medium mtb:flex-row flex-col lp:justify-start mtb:justify-around
						xl:gap-20 lg:gap-10 gap-3 max-lp:ml-0 mt-2'
					>
						<AboutSection first_name={user.first_name} last_name={user.last_name} email={user.email} mobile_number={user.mobile_number} username={user.username} display_name={user.display_name} bio={user.bio} date_joined_formatted={user.date_joined_formatted} />
						<div className='flex flex-col items-center gap-2'>
							<p className='titles max-mtb:self-start max-mtb:ml-3'>
								Overall Progression
							</p>
							<div className='progressbar justify-self-center'>
								<ProgressBar value={achievement.overall_progress} />
								{/* <AnimatedProgressBar targetProgress={achievement.current.progress_percentage} /> */}
							</div>
						</div>
					</div>
					<UserStatsGraph profile_name={profile_name} />
				</div>
				{/* RANK: Achievement information and progress */}
				<div className={`${width >= 1024 ? 'rank-card-lp' : 'border border-primary rounded-xl'}
						bg-no-repeat lp:absolute lp:right-0 lp:top-0 rank flex flex-col`}>
					<div className='font-dreamscape text-primary cards-title text-center'>
						<h1 className='lg:pl-20 lp:pl-14'>rank</h1>
					</div>
					<div className='flex-1 flex items-center justify-center'>
						<div>
							<img
								src={`${BASE_URL}${achievement.current.image}`}
								className='hover:scale-[1.05] transition duration-500 select-none'
								alt='achievement badge'
							/>
						</div>
						<div className='flex flex-col'>
							<p className='font-dreamscape-sans text-level text-center achievement-title'>
								{achievement.current.name.toLowerCase()}
							</p>
							<div className='flex justify-between text-primary font-medium progress'>
								<p>{achievement.current.current_threshold}xp</p>
								<p>{achievement.current.next_threshold}xp</p>
							</div>
							<div className='level xl:h-[11px] tb:h-2 h-[7px] rounded-md bg-[rgb(121,118,110,0.7)] mt-[2px] flex items-center'>
								<div
									className='lp:mx-2 mx-1 rounded-lg h-[65%] bg-level'
									style={{
										width: `${achievement.current.progress_percentage}%`,
									}}
								></div>
							</div>
							<div className='flex justify-center text-primary font-medium progresstitles lp:self-center self-start font-medium'>
								<p>{stats.xp} xp</p>
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
						className='match-history flex-1 flex mtb:flex-row flex-col
							justify-end max-lp:self-center mb-3'
					>
						<div className='flex flex-col items-center lp:gap-3 gap-2 lp:self-end self-center'>
							<p className='titles lp:self-center self-start font-medium'>
								Win Rate
							</p>
							<div className='win-rate justify-self-center'>
								<ProgressBar value={stats.win_rate} />
							</div>
						</div>


						<div className='flex flex-col gap-1'>
							{matchHistory.map((match, index) => (
								<MatchStats
									key={index}
									currentPlayer={match.current_player}
									opponent={match.opponent}
									result={match.result}
									startTime={match.start_time}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}


export default UserProfile
