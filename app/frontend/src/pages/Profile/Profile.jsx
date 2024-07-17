import React, { useEffect, useRef, useState } from 'react'
import './Profile.css'
import Header from '../../components/Header'

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

	const xp = 12445
	const progress = xp % 2000
	const progressStart = xp > 10000 ? 8000 : Math.floor(xp / 2000) * 2000
	const [level, setLevel] = useState(null)

	useEffect(() => {
		setLevel((progress * 100) / 2000)
	}, [level])

	console.log(width)
	return (
		<div
			ref={containerRef}
			className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'
		>
			<Header />
			<section className='flex justify-center'>
				<div className='lp:mx-container-x-lp mx-container-x-ms container-card my-20 relative'>
					<div
						className={`${width >= 1024 ? 'user-info-lp' : 'user-info-ms'} bg-no-repeat lp:self-start overflow-hidden`}
					>
						{/* first part */}
						<div className='font-dreamscape text-primary card-title text-center relative'>
							<button className='absolute left-[4%]'>
								<img
									src='./assets/images/icons/arrow.svg'
									className='arrow'
									alt='arrow icon'
								/>
							</button>
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
							<div className='flex flex-col text-primary'>
								<p className='font-heavy'>BIO</p>
								<p className='font-medium'>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Nostrum hic magnam sequi odit ad, nobis molestiae, quaerat
									adipisci accusamus quibusdam ipsum, possimus eveniet similique
									deserunt eius porro nam ab dignissimos.
								</p>
							</div>
						</div>
					</div>

					<div
						className={`${width >= 1024 ? 'rank-card-lp' : 'rank-card-ms'}
							bg-no-repeat lp:absolute lp:right-0 lp:top-0 rank flex flex-col`}
					>
						<div className='font-dreamscape text-primary card-title text-center'>
							<h1>rank</h1>
						</div>
						<div className='flex-1 flex items-center justify-center'>
							<div>
								<img
									src='./assets/images/Achievements/celestial-master.svg'
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
										style={{ width: `${xp > 10000 ? 100 : level}%` }}
									></div>
								</div>
							</div>
						</div>
					</div>

					<div
						className={`${width >= 1024 ? 'match-history-lp' : 'match-history-ms'} bg-no-repeat lp:absolute lp:bottom-0 lp:right-0`}
					>
						<div className='font-dreamscape text-primary card-title text-center'>
							<h1>match history</h1>
						</div>
					</div>

					{/* <img
						src={`${width >= 1024 ? './assets/images/Profile/user-info-lp.svg' : './assets/images/Profile/user-info-ms.svg'}`}
						className='lp:w-[67.5%] lp:self-start'
						alt=''
					>
					</img>
					<img
						src={`${width >= 1024 ? './assets/images/Profile/rank-card-lp.svg' : './assets/images/Profile/rank-card-ms.svg'}`}
						className='lp:absolute lp:w-[40%] lp:right-0 lp:top-0'
						alt=''
					/>
					<img
						src={`${width >= 1024 ? './assets/images/Profile/match-history-lp.svg' : './assets/images/Profile/match-history-ms.svg'}`}
						className='lp:absolute lp:w-[53%] lp:right-0 lp:bottom-0'
						alt=''
					/> */}
				</div>
			</section>
		</div>
	)
}

export default Profile
