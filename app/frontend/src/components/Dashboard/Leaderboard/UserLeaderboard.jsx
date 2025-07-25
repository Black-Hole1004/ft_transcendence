
function UserLeaderboard({ rank, nickname, achievement, xp, profilePicture, isCurrentUser }) {

	const getAchievementImage = (achievementName) => {
		const formattedName = achievementName.toLowerCase().replace(/\s+/g, '-')
		return `/assets/images/Achievements/${formattedName}.png`
	}

	const getProfilePicture = (path) => {
		if (!path) return '/assets/images/avatar.jpg'
		if (path.startsWith('http')) return path
		return `${import.meta.env.VITE_BASE_URL}${path}`
	}

	const containerClasses = `user-container flex items-center justify-between font-dreamscape-sans
		rounded-md transition-all duration-300
		${isCurrentUser 
			? 'bg-[rgba(183,170,156,0.2)] hover:bg-[rgba(183,170,156,0.4)]'
			: 'hover:bg-[rgba(183,170,156,0.2)]'
		}`;

	return (
		<div className={containerClasses}>
			<div className='h-full flex items-center xl:gap-3 tb:gap-2 gap-1 w-[68%]'>
				<p className={`nickname-size`}>#{rank}</p>
				<img
					src={getProfilePicture(profilePicture)}
					alt={nickname}
					className='h-[70%] aspect-square object-cover rounded-full ring-1 ring-primary select-none'
					onError={(e) => {
						e.target.src = '/assets/images/avatar.jpg'
					}}
				/>
				<div className='flex flex-wrap items-center overflow-hidden'>
					<p className='text-primary nickname-size leading-[1] truncate mr-1'>{nickname}</p>
					<p className='text-achievement achievement-name'>{achievement}</p>
				</div>
			</div>
			<div className='h-full mx-1 flex flex-col items-center justify-center'>
				<img
					src={getAchievementImage(achievement)}
					alt={achievement}
					className='h-[60%] select-none'
					onError={(e) => {
						e.target.style.display = 'none'
					}}
				/>
				<span
					className={`achievements-titles-font`}
				>
					{`${xp.toLocaleString()}XP`}
				</span>
			</div>
		</div>
	)
}


export default UserLeaderboard