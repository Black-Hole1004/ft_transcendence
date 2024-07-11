import React from 'react'
import './Dashboard.css'
import Header from '../../components/Header'
import FriendsList from '../../components/Dashboard/FriendsList'
import Leaderboard from '../../components/Dashboard/Leaderboard'

function CongratulatoryMessage() {
	return (
		<div className='full-message flex flex-col'>
			<h1 className='message-title font-heavy leading-[3]'>
				Congratulations, Celestial Master!
			</h1>
			<p className='message-body font-medium'>
				You've ascended to the highest echelons of cosmic mastery, basking in the brilliance
				of the Sun itself. As a true luminary of the cosmos, your journey knows no bounds.
				Shine on, and may your light guide others to new celestial heights!
			</p>
		</div>
	)
}

const Dashboard = () => {
	return (
		<div className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex-grow flex lg:flex-row ms:flex-col'>
				<div className='lg:w-5/12 w-full flex flex-col'>
					<CongratulatoryMessage />
					<div
						className='flex mtb:flex-row flex-col lg:justify-between mtb:justify-around ms:items-center gap-y-10
						lp:pl-cards-section-pl lp:pr-cards-section-pr'
					>
						<FriendsList />
						<Leaderboard />
					</div>
				</div>
				<div className='lg:flex-1 ms:flex-none rightside-margin'>
					<div className='relative w-full modes font-dreamscape-sans text-primary select-none'>
						<button className='absolute flex items-center hover:text-[rgba(0,0,0,0)] duration-500'>
							<img
								src='/assets/images/shape.svg'
								className='brightness-[.5] hover:scale-[1.05] hover:brightness-100 transition duration-500 lg:h-tournaments-lg'
								alt='tournament-background'
							/>
							<h1 className='absolute left-[5%] modes-font pointer-events-none'>
								tournaments
							</h1>
						</button>
						<button className='absolute right-0 hover:text-[rgba(0,0,0,0)] duration-500'>
							<img
								src='/assets/images/training.svg'
								className='brightness-[.5] hover:scale-[1.05] hover:brightness-100 transition duration-500 lg:h-training-lg'
								alt='training-background'
							/>
							<h1 className='absolute top-[40%] right-[10%] modes-font pointer-events-none'>
								training
							</h1>
						</button>
						<button className='absolute bottom-5 right-0 transition hover:text-[rgba(0,0,0,0)] duration-500'>
							<img
								src='/assets/images/1v1.svg'
								className='brightness-[.5] hover:scale-[1.05] hover:brightness-100 transition duration-500 lg:h-1vs1-lg'
								alt='1vs1-background'
							/>
							<h1 className='absolute top-[40%] right-[30%] modes-font pointer-events-none'>
								1 vs 1
							</h1>
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Dashboard
