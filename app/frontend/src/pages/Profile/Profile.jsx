import React, { useEffect, useRef, useState } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import ProfileBio from '../../components/Profile/ProfileBio'
import ProgressBar from '../../components/Profile/ProgressBar'
import AboutSection from '../../components/Profile/AboutSection'
import UserStatsGraph from '../../components/Profile/UserStatsGraph'

const Profile = () => {
	const containerRef = useRef(null)
	const [width, setWidth] = useState(0)

	useEffect(() => {
		const calculateWidth = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.getBoundingClientRect().width
				setWidth(containerWidth)
			}
		}

		calculateWidth()

		window.addEventListener('resize', calculateWidth)

		return () => {
			window.removeEventListener('resize', calculateWidth)
		}
	}, [])


	const wins = 102
	const totalGames = 123
	
	const [winRate, setWinRate] = useState(null)

	useEffect(() => {
		setWinRate((wins / totalGames * 100).toFixed(2))
	}, [totalGames])

	const xp = 5445
	const progress = xp % 2000
	const progressStart = xp > 10000 ? 8000 : Math.floor(xp / 2000) * 2000
	const [achievementProgress, setAchievementProgress] = useState(null)

	useEffect(() => {
		setAchievementProgress((progress * 100) / 2000)
	}, [achievementProgress])

	const [level, setLevel] = useState(null)

	useEffect(() => {
		setLevel(xp > 10000 ? 100 : (xp * 100) / 10000)
	}, [level])

	return (
		<div
			ref={containerRef}
			className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary'
		>
			<Header />
			<section className='flex justify-center'>
				<div className='lp:mt-20 my-10 relative flex flex-col max-lp:gap-y-3
					lp:mx-container-x-lp mx-container-x-ms lp:h-profile-cards lp:w-profile-cards'>
					<div
						className={`${width >= 1024 ? 'user-info-lp' : 'border border-primary rounded-xl'}
						lp:self-start max-ms:w-full flex flex-col`}
					>
						{/* first part */}
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
						{/* second part */}
						<ProfileBio />
						{/* third part */}
						<div
							className='infos-chart flex font-medium mtb:flex-row flex-col lp:justify-start mtb:justify-around
							xl:gap-20 lg:gap-10 gap-3 max-mtb:ml-0 mt-2'
						>
							<AboutSection />
							<div className='flex flex-col items-center gap-2'>
								<p className='titles max-mtb:self-start max-mtb:ml-3'>
									Achievements Progression
								</p>
								<div className='progressbar justify-self-center'>
									<ProgressBar value={level}/>
								</div>
							</div>
						</div>
						{/* fourth part */}
						<UserStatsGraph />
					</div>

					<div
						className={`${width >= 1024 ? 'rank-card-lp' : 'border border-primary rounded-xl'}
						bg-no-repeat lp:absolute lp:right-0 lp:top-0 rank flex flex-col`}
					>
						<div className='font-dreamscape text-primary cards-title text-center'>
							<h1 className='lg:pl-20 lp:pl-14'>rank</h1>
						</div>
						<div className='flex-1 flex items-center justify-center'>
							<div>
								<img
									src='./assets/images/Achievements/celestial-master.png'
									className='hover:scale-[1.05] transition duration-500 select-none'
									alt='achievement badge'
								/>
							</div>
							<div className='flex flex-col '>
								<p className='font-dreamscape-sans text-level text-center achievement-title'>
									celestial master
								</p>
								<div className='flex justify-between text-primary font-medium progress'>
									<p>{progressStart}xp</p>
									<p>{progressStart + 2000}xp</p>
								</div>
								<div className='level xl:h-[11px] tb:h-2 h-[7px] rounded-md bg-[rgb(121,118,110,0.7)] mt-[2px] flex items-center'>
									<div
										className={`lp:mx-2 mx-1 rounded-lg h-[65%] bg-level`}
										style={{
											width: `${xp > 10000 ? 100 : achievementProgress}%`,
										}}
									></div>
								</div>
							</div>
						</div>
					</div>

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
									<ProgressBar value={winRate}/>
								</div>
							</div>
							<div className='flex flex-col gap-1'>
								{/* Match 1 */}
								<div
									className='flex-1 flex justify-between
									bg-[rgba(121,118,110,0.2)] backdrop-blur-ms rounded-lg match-infos'
								>
									<div className='flex items-center gap-2'>
										<img
											src='./assets/images/moudrib.jpeg'
											className='border border-online match-winner'
											alt='player image'
										/>
										<div className='points flex'>
											<img
												src='./assets/images/Achievements/celestial-master.png'
												alt='achievement badge'
											/>
											<p className='text-online self-end'>+45</p>
										</div>
									</div>
									<div className='flex flex-col items-center justify-center result'>
										<p className='font-dreamscape-sans text-online'>victory</p>
										<p className='font-dreamscape text-primary'>7 - 0</p>
									</div>
									<div className='flex items-center gap-2'>
										<div className='points flex'>
											<p className='text-defeat self-end'>-33</p>
											<img
												src='./assets/images/Achievements/celestial-master.png'
												alt='achievement badge'
											/>
										</div>
										<img
											src='./assets/images/moudrib.jpeg'
											className='border border-defeat match-loser'
											alt='player image'
										/>
									</div>
								</div>

								{/* Match 2 */}
								<div
									className='flex-1 flex justify-between
									bg-[rgba(121,118,110,0.2)] backdrop-blur-ms rounded-lg match-infos'
								>
									<div className='flex items-center gap-2'>
										<img
											src='./assets/images/moudrib.jpeg'
											className='border border-online match-winner'
											alt=''
										/>
										<div className='points flex'>
											<img
												src='./assets/images/Achievements/celestial-master.png'
												alt=''
											/>
											<p className='text-online self-end'>+45</p>
										</div>
									</div>
									<div className='flex flex-col items-center justify-center result'>
										<p className='font-dreamscape-sans text-online'>victory</p>
										<p className='font-dreamscape text-primary'>7 - 0</p>
									</div>
									<div className='flex items-center gap-2'>
										<div className='points flex'>
											<p className='text-defeat self-end'>-33</p>
											<img
												src='./assets/images/Achievements/celestial-master.png'
												alt=''
											/>
										</div>
										<img
											src='./assets/images/moudrib.jpeg'
											className='border border-defeat match-loser'
											alt=''
										/>
									</div>
								</div>

								{/* Match 3 */}
								<div
									className='flex-1 flex justify-between
									bg-[rgba(121,118,110,0.2)] backdrop-blur-ms rounded-lg match-infos'
								>
									<div className='flex items-center gap-2'>
										<img
											src='./assets/images/moudrib.jpeg'
											className='border border-online match-winner'
											alt=''
										/>
										<div className='points flex'>
											<img
												src='./assets/images/Achievements/celestial-master.png'
												alt=''
											/>
											<p className='text-online self-end'>+45</p>
										</div>
									</div>
									<div className='flex flex-col items-center justify-center result'>
										<p className='font-dreamscape-sans text-online'>victory</p>
										<p className='font-dreamscape text-primary'>7 - 0</p>
									</div>
									<div className='flex items-center gap-2'>
										<div className='points flex'>
											<p className='text-defeat self-end'>-33</p>
											<img
												src='./assets/images/Achievements/celestial-master.png'
												alt=''
											/>
										</div>
										<img
											src='./assets/images/moudrib.jpeg'
											className='border border-defeat match-loser'
											alt=''
										/>
									</div>
								</div>

								{/* Match 4 */}
								<div
									className='flex-1 flex justify-between
									bg-[rgba(121,118,110,0.2)] backdrop-blur-ms rounded-lg match-infos'
								>
									<div className='flex items-center gap-2'>
										<img
											src='./assets/images/moudrib.jpeg'
											className='border border-online match-winner'
											alt=''
										/>
										<div className='points flex'>
											<img
												src='./assets/images/Achievements/celestial-master.png'
												alt=''
											/>
											<p className='text-online self-end'>+45</p>
										</div>
									</div>
									<div className='flex flex-col items-center justify-center result'>
										<p className='font-dreamscape-sans text-online'>victory</p>
										<p className='font-dreamscape text-primary'>7 - 0</p>
									</div>
									<div className='flex items-center gap-2'>
										<div className='points flex'>
											<p className='text-defeat self-end'>-33</p>
											<img
												src='./assets/images/Achievements/celestial-master.png'
												alt=''
											/>
										</div>
										<img
											src='./assets/images/moudrib.jpeg'
											className='border border-defeat match-loser'
											alt=''
										/>
									</div>
								</div>

								{/* Match 5 */}
								<div
									className='flex-1 flex justify-between
									bg-[rgba(121,118,110,0.2)] backdrop-blur-ms rounded-lg match-infos'
								>
									<div className='flex items-center gap-2'>
										<img
											src='./assets/images/moudrib.jpeg'
											className='border border-online match-winner'
											alt=''
										/>
										<div className='points flex'>
											<img
												src='./assets/images/Achievements/celestial-master.png'
												alt=''
											/>
											<p className='text-online self-end'>+45</p>
										</div>
									</div>
									<div className='flex flex-col items-center justify-center result'>
										<p className='font-dreamscape-sans text-online'>victory</p>
										<p className='font-dreamscape text-primary'>7 - 0</p>
									</div>
									<div className='flex items-center gap-2'>
										<div className='points flex'>
											<p className='text-defeat self-end'>-33</p>
											<img
												src='./assets/images/Achievements/celestial-master.png'
												alt=''
											/>
										</div>
										<img
											src='./assets/images/moudrib.jpeg'
											className='border border-defeat match-loser'
											alt=''
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Profile
