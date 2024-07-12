import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import Header from '../../components/Header'
import FriendsList from '../../components/Dashboard/FriendsList/FriendsList'
import Leaderboard from '../../components/Dashboard/Leaderboard/Leaderboard'
import CongratulatoryMessage from '../../components/Dashboard/CongratulatoryMessage'

function Button({ image, title, className, mode }) {
	return (
		<button className={`absolute hover:text-[rgba(0,0,0,0)] duration-500 ${className}`}>
			<img
				src={`/assets/images/${image}`}
				className='brightness-[.5] hover:scale-[1.05] hover:brightness-100 transition duration-500'
				alt='tournament-background'
			/>
			<h1 className={`absolute modes-font pointer-events-none top-[40%] ${title}`}>{mode}</h1>
		</button>
	)
}

function GameModes() {
	return (
		<div className='relative w-full lg:h-shapes-lg ms:h-shapes-ms font-dreamscape-sans text-primary select-none modes'>
			<Button
				image={'tournaments.svg'}
				title={'lg:left-[5%] lp:left-[15%] ms:left-[12%]'}
				className={'w-[67%]'}
				mode={'tournaments'}
			></Button>
			<Button
				image={'training.svg'}
				title={'right-[10%]'}
				className={'right-0 w-[42%]'}
				mode={'training'}
			></Button>
			<Button
				image={'1vs1.svg'}
				title={'right-[30%]'}
				className={
					'right-0 w-[53%] lg:bottom-2 lp:bottom-4 tb:bottom-3 ml:bottom-2 ms:bottom-1'
				}
				mode={'1 vs 1'}
			></Button>
		</div>
	)
}

function Badge({ image, title, level }) {
	return (
		<div className={`text-center ${level < 20 && image == 'novice-astronaut' ? 'grayscale'
		: level < 40 && image == 'cosmic-explorer' ? 'grayscale'
		: level < 60 && image == 'stellar-voyager' ? 'grayscale'
		: level < 80 && image == 'galactic-trailblazer' ? 'grayscale'
		: level < 100 && image == 'celestial-master' ? 'grayscale' : ''}`}>
		<img
			src={`./assets/images/Achievements/${image}.svg`}
			className='hover:scale-[1.2] transition duration-500'
			alt={`${title} Badge`}
		/>
		<p className='achievements-titles-font font-dreamscape-sans'>
			{title}
		</p>
	</div>
	)
}

function Achievements({ level }) {
	return (
		<div
			className='border-1.5 border-[rgba(255,206,157,.4)] rounded-xl bg-[rgba(27,22,17,0.5)]
		lg:h-achievements-lg achivements-padding'
		>
			<h1 className='font-dreamscape-sans text-primary text-center leading-[1.02] achievements'>
				Achievements
			</h1>
			<div className='flex justify-between items-center text-level select-none'>
				<Badge image={'novice-astronaut'} title={'Novice Astronaut'} level={level}/>
				<Badge image={'cosmic-explorer'} title={'Cosmic Explorer'} level={level}/>
				<Badge image={'stellar-voyager'} title={'Stellar Voyager'} level={level}/>
				<Badge image={'galactic-trailblazer'} title={'Galactic Trailblazer'} level={level}/>
				<Badge image={'celestial-master'} title={'Celestial Master'} level={level}/>
			</div>
			<div
				className='text-primary levels-font
			xl:mt-4 lp:mt-3 mtb:mt-2 ms:mt-1'
			>
				<div className='flex justify-between'>
					<p>0xp</p>
					<p>2000xp</p>
					<p>4000xp</p>
					<p>6000xp</p>
					<p>8000xp</p>
					<p>10000xp</p>
				</div>
				<div className='w-full xl:h-[11px] tb:h-2 ms:h-[7px] rounded-md bg-[rgb(121,118,110,0.7)] mt-[2px] flex items-center'>
					<div
						className={`lp:mx-2 ms:mx-1 rounded-lg h-[65%] bg-level`}
						style={{ width: `${level}%` }}
					></div>
				</div>
			</div>
		</div>
	)
}

const Dashboard = () => {
	const xp = 6445
	const [level, setLevel] = useState(null)

	useEffect(() => {
		setLevel((xp * 100) / 10000)
	}, [level])

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
				<div
					className='flex flex-col flex-1 rightside-mt mb-10
					lg:mr-modes-right-lg lg:ml-modes-left-lg ml:ml-modes-left-ms ml:mr-modes-right-ms'
				>
					<GameModes />
					<Achievements level={level} />
				</div>
			</section>
		</div>
	)
}

export default Dashboard
