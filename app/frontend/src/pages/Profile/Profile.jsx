import React, { useEffect, useRef, useState } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbar } from 'react-circular-progressbar'
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area} from 'recharts'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Scatter,
	Line,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'

const Profile = () => {
	const data = [
		// { name: '', min: 0, pv: 2400, amt: 2400 },
		{ name: 'Mon', min: 80, pv: 2400, amt: 2400 },
		{ name: 'Tue', min: 60, pv: 2400, amt: 2400 },
		{ name: 'Wed', min: 150, pv: 2400, amt: 2400 },
		{ name: 'Thu', min: 130, pv: 2400, amt: 2400 },
		{ name: 'Fri', min: 240, pv: 2400, amt: 2400 },
		{ name: 'Sat', min: 290, pv: 2400, amt: 2400 },
		{ name: 'Sun', min: 240, pv: 2400, amt: 2400 },
	]
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

	const xp = 5445
	const progress = xp % 2000
	const progressStart = xp > 10000 ? 8000 : Math.floor(xp / 2000) * 2000
	const [achievementProgress, setAchievementProgress] = useState(null)

	useEffect(() => {
		setAchievementProgress((progress * 100) / 2000)
	}, [achievementProgress])

	const [level, setLevel] = useState(null)

	useEffect(() => {
		setLevel((xp * 100) / 10000)
	}, [level])

	return (
		<div
			ref={containerRef}
			className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary'
		>
			<Header />
			<section className='flex justify-center'>
				<div className='lp:mx-container-x-lp mx-container-x-ms container-card my-20 relative flex flex-col max-lp:gap-y-3'>
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
						<div className='flex items-center'>
							<div>
								<img
									src='./assets/images/moudrib.jpeg'
									className='profile-image rounded-full lg:border-2 border border-primary'
									alt='profile image'
								/>
							</div>
							<div className='flex flex-col text-primary max-w-[50%] lg:gap-y-3 gap-y-1 font-medium'>
								<p className='titles'>BIO</p>
								<p className='bio-content'>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Nostrum hic magnam sequi odit ad, nobis molestiae, quaerat
									adipisci accusamus quibusdam ipsum, possimus eveniet similique
									deserunt eius porro nam ab dignissimos.
								</p>
							</div>
						</div>

						{/* third part */}
						<div
							className='infos-chart flex font-medium mtb:flex-row flex-col lp:justify-start mtb:justify-around
							xl:gap-20 lg:gap-10 gap-3 max-mtb:ml-0 mt-2'
						>
							<div className='flex flex-col items-center gap-2'>
								<p className='titles self-start max-mtb:ml-3'>About</p>
								<div className='about rounded-xl flex flex-col justify-around font-medium text-primary max-ms:w-full'>
									<div className='line1 flex justify-between items-center'>
										<div className='flex items-center gap-3'>
											<img src='./assets/images/icons/Name.svg' alt='' />
											<p>Full Name</p>
										</div>
										<div>
											<p>Mouad Oudrib</p>
										</div>
									</div>
									<div className='line2 flex justify-between items-center'>
										<div className='flex items-center gap-3'>
											<img src='./assets/images/icons/username.svg' alt='' />
											<p>Username</p>
										</div>
										<div>
											<p>moudrib</p>
										</div>
									</div>
									<div className='line3 flex justify-between items-center'>
										<div className='flex items-center gap-3'>
											<img src='./assets/images/icons/Email.svg' alt='' />
											<p>Email</p>
										</div>
										<div>
											<p>transcendence@gmail.com</p>
										</div>
									</div>
									<div className='line4 flex justify-between items-center'>
										<div className='flex items-center gap-3'>
											<img src='./assets/images/icons/Calendar.svg' alt='' />
											<p>Joined</p>
										</div>
										<div>
											<p>April 2024</p>
										</div>
									</div>
									<div className='line5 flex justify-between items-center'>
										<div className='flex items-center gap-3'>
											<img src='./assets/images/icons/Phone.svg' alt='' />
											<p>Phone</p>
										</div>
										<div>
											<p>+212611223344</p>
										</div>
									</div>
								</div>
							</div>
							<div className='flex flex-col items-center gap-2'>
								<p className='titles max-mtb:self-start max-mtb:ml-3'>
									Achievements Progression
								</p>
								<div className='progressbar justify-self-center'>
									<CircularProgressbar
										value={level}
										text={`${level > 100 ? 100 : level}%`}
										styles={{
											trail: {
												stroke: '#79624C',
											},
											path: {
												stroke: '#FFCE9E',
												transition: 'stroke-dashoffset 3s ease 0s',
											},
											text: {
												fill: '#FBFBEE',
												fontSize:
													'clamp(0.625rem, 0.221vw + 0.584rem, 0.938rem)',
											},
										}}
									/>
								</div>
							</div>
						</div>
						{/* fourth part */}
						<div
							className='font-medium rounded-xl mt-2 lp:ml-2 chart-card max-lp:self-center flex flex-col
						lp:h-chart-lp h-chart-ms lp:w-chart-lp w-chart-ms'
						>
							<p className='text-primary chart-title m-2'>
								Weekly User Engagement: Time Spent on Platform
							</p>
							<ResponsiveContainer width='95%' height='90%' className={'self-center'}>
								<AreaChart data={data}>
									<defs>
										<linearGradient id='min' x1='0' y1='0' x2='0' y2='1'>
											<stop
												offset='5%'
												stopColor='#FFCE9E'
												stopOpacity={0.8}
											/>
											<stop
												offset='95%'
												stopColor='#FFCE9E'
												stopOpacity={0}
											/>
										</linearGradient>
									</defs>
									<XAxis
										dataKey='name'
										scale='point'
										padding={{ left: 15, right: 15 }}
										axisLine={false}
										tickLine={false}
										tick={{
											fontSize: 'clamp(0.625rem, 0.354vw + 0.559rem, 1.125rem)',
											fill: '#FBFBEE',
										}}
									/>
									<Tooltip
										cursor={{
											stroke: '#FBFBEE',
										}}
										contentStyle={{
											backgroundColor: '#79624C', 
											border: '1px solid #FBFBEE',
											borderRadius: '5px'
										}}
									/>
									<Area
										type='monotone'
										dataKey='min'
										stroke='#FFCE9E'
										fillOpacity={1}
										fill='url(#min)'
										strokeWidth={2}
										dot={{
											stroke: '#79624C',
											strokeWidth: 2.5,
											r: 4,
											fill: '#FFCE9E',
										}}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
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
									className='hover:scale-[1.05] transition duration-500'
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
						bg-no-repeat lp:absolute lp:bottom-0 lp:right-0 flex flex-col justify-between`}
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
									<CircularProgressbar
										value={level}
										text={`${level > 100 ? 100 : level}%`}
										styles={{
											trail: {
												stroke: '#79624C',
											},
											path: {
												stroke: '#FFCE9E',
												transition: 'stroke-dashoffset 3s ease 0s',
											},
											text: {
												fill: '#FBFBEE',
												fontSize:
													'clamp(0.625rem, 0.221vw + 0.584rem, 0.938rem)',
											},
										}}
									/>
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
