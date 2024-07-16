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

	console.log(width)
	return (
		<div
			ref={containerRef}
			className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'
		>
			<Header />
			<section className='flex justify-center'>
				<div className='lp:mx-container-x-lp mx-container-x-ms container-card mt-20 relative'>


					<div
						className={`${width >= 1024 ? 'user-info-lp' : 'user-info-ms'}
							bg-no-repeat lp:self-start overflow-hidden`}
					>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
						<p>hdfgj</p>
					</div>

					<div
						className={`${width >= 1024 ? 'rank-card-lp' : 'rank-card-ms'}
							bg-no-repeat lp:absolute lp:right-0 lp:top-0`}
					>

					</div>

					<div
						className={`${width >= 1024 ? 'match-history-lp' : 'match-history-ms'}
							bg-no-repeat lp:absolute lp:bottom-0 lp:right-0`}
					>
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
