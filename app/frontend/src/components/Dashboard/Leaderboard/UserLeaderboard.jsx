const achievements = {
	'celestial master': {
		icon: '/assets/images/Achievements/celestial-master.png',
	},
	'galactic trailblazer': {
		icon: '/assets/images/Achievements/galactic-trailblazer.png',
	},
	'stellar voyager': {
		icon: '/assets/images/Achievements/stellar-voyager.png',
	},
	'cosmic explorer': {
		icon: '/assets/images/Achievements/cosmic-explorer.png',
	},
	'novice astronaut': {
		icon: '/assets/images/Achievements/novice-astronaut.png',
	},
}

function UserLeaderboard({ rank, nickname, achievement, xp }) {
	const achievementData = achievements[achievement]

	return (
		<div className='flex items-center justify-between font-dreamscape-sans'>
			<div className='flex-1 flex items-center xl:gap-3 tb:gap-2 ms:gap-1 text-primary '>
				<p className='nickname-size'>{'#' + `${rank}`}</p>
				<img
					src='/assets/images/moudrib.jpeg'
					className='user-image rounded-full tb:border border-0.7 border-primary select-none'
					alt='user-image'
					loading='lazy'
				/>
				<div className='flex flex-col justify-center'>
					<p className='nickname-size leading-[1]'>{`${nickname}` + ' '}</p>
					<p className='text-achievement achievement-name'> {achievement}</p>
				</div>
			</div>
			<div className='flex items-center gap-1'>
				<img
					src={achievementData.icon}
					className='achievement-icon-ldr select-none'
					alt='achievement-icon'
					loading='lazy'
				/>
				<p className={`xp text-primary leading-[1]`}>{`${xp}` + 'xp'}</p>
			</div>
		</div>
	)
}

export default UserLeaderboard
