import Button from '../../Home/Buttons/Button'

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

function UserFriendsList({ nickname, achievement, status, isFriend }) {
	const achievementData = achievements[achievement]

	return (
		<div className='flex items-center justify-between gap-5 font-dreamscape-sans'>
			<div className='flex-1 flex items-center xl:gap-3 tb:gap-2 gap-1 '>
				<img
					src={achievementData.icon}
					className='achievement-icon-fr select-none'
					alt='achievement-icon'
					loading='lazy'
				/>
				<img
					src='/assets/images/moudrib.jpeg'
					className='user-image rounded-full tb:border border-0.7 border-primary select-none'
					alt='user-image'
					loading='lazy'
				/>
				<div className='flex flex-wrap items-center overflow-hidden'>
					<p className='text-primary nickname-size leading-[1] truncate'>{nickname}</p>
					<p className='text-achievement achievement-name ml-1'> {achievement}</p>
				</div>
			</div>
			<div>
				{isFriend ? (
					<p
						className={` ${status == 'online' ? 'text-online' : status == 'offline' ? 'text-offline' : 'text-defeat'} status`}
					>
						{status}
					</p>
				) : (
					<Button className={'font-heavy add-friend-button lg:rounded-lg rounded'}>
						Add Friend
					</Button>
				)}
			</div>
		</div>
	)
}

export default UserFriendsList
