import React from 'react'
import './Dashboard.css'
import Header from '../../components/Header'

function CongratulatoryMessage() {
	return (
		<div className='full-message fles flex-col'>
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
					<div className='flex mtb:flex-row flex-col lg:justify-between mtb:justify-around ms:items-center gap-y-5
					lp:pl-cards-section-pl lp:pr-cards-section-pr'>
						<div
							className='flex flex-col items-center lp:w-fl-ldr-custom w-[300px]
						rounded-xl card-height card-color'
						>
							<h1 className='font-dreamscape-sans'>FRIENDS LIST</h1>
						</div>
						<div
							className='flex flex-col items-center lp:w-fl-ldr-custom w-[300px]
						rounded-xl card-height card-color'
						>
							<h1 className='font-dreamscape-sans'>LEADERBOARD</h1>
						</div>
					</div>
				</div>
				{/* <div className='w-screen lg:flex-1 flex-none'>

				</div> */}
			</section>
		</div>
	)
}

export default Dashboard
