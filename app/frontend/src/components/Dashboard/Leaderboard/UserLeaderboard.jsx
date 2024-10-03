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
		<div
			className='user-container flex items-center justify-between font-dreamscape-sans
		rounded-md hover:bg-[rgba(183,170,156,0.2)]'
		>
			<div className='h-full flex items-center xl:gap-3 tb:gap-2 gap-1 w-[68%]'>
				<p className='nickname-size'>{'#' + `${rank}`}</p>
				<img
					src='/assets/images/lmoudir.jpg'
					className='h-[80%] rounded-full tb:border border-0.7 border-primary select-none'
					alt='user-image'
					loading='eager'
				/>
				<div className='flex flex-wrap items-center overflow-hidden'>
					<p className='text-primary nickname-size leading-[1] truncate mr-1'>
						{nickname}
					</p>
					<p className='text-achievement achievement-name '> {achievement}</p>
				</div>
			</div>
			<div className='h-full mx-1 flex items-center'>
				<img
					src={achievementData.icon}
					className='h-[60%] select-none'
					alt='achievement-icon'
					loading='eager'
				/>
				<p className={`xp text-primary leading-[1]`}>{`${xp}` + 'xp'}</p>
			</div>
		</div>
	)
}

export default UserLeaderboard
