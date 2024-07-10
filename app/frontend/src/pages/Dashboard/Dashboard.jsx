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
				<div className='lg:flex-1 ms:flex-none rightside-padding'>
					<div className='game-modes flex'>
						<div
							className='flex items-center transition w-[66%] h-[620px]
							text-primary hover:text-[rgba(0,0,0,0)] duration-500 hover:scale-[1.03] shape'
						>
							<h1 className='absolute left-20 z-10 font-dreamscape-sans text-center modes-font select-none'>
								tournaments
							</h1>
						</div>
						<div className='w-[34%] h-[620px]'></div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Dashboard
