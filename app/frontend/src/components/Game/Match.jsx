import './MatchMaking.css'

const Match = ({ matchData, countdown, statement }) => {

	return (
		<section className='flex justify-center'>
			<div className='fixed inset-0 bg-black bg-opacity-50 z-10'></div>
			{/* Title */}
			<div className='absolute top-[44%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>

				<h1 className='text-7xl font-heavy text-white mb-24'>
					{statement}
				</h1>
		
				{/* Players Container - Always horizontal */}
				<div className='matchmaking flex justify-center items-center gap-3'>
					{/* Player 1 */}
					<div className='avatar aspect-square flex flex-col items-center xl:gap-12 lg:gap-10 tb:gap-5 gap-3'>
						{/* Profile Picture */}
						<div className='relative rounded-full border border-primary'>
							<img
								src={getImageUrl(currentUser.profile_picture, 'profile')}
								alt={currentUser.username}
								className='object-cover rounded-full'
								onError={(e) => {
									e.target.src = '/assets/images/default-avatar.png';
								}}
							/>
							{currentUser.badge && (
								<img
									src={getImageUrl(currentUser.badge.image, 'badge')}
									alt={currentUser.badge.name}
									className='absolute z-10 bottom-0 -left-5 w-[60%]'
								/>
							)}
						</div>
						{/* Username */}
						<div>
							<h2 className='font-dreamscape-sans text-primary leading-none'>
								{currentUser.username}
							</h2>
							<h6 className='font-dreamscape-sans text-level'>{currentUser.badge.name}</h6>
						</div>
					</div>
					
					{/* VS  and Countdown */}
					<div className=''>
						<h1 className='font-dreamscape text-primary'>VS</h1>
						{countdown && (
							<div className='text-9xl font-bold text-gray-500 animate-pulse'>
								{countdown}
							</div>
						)}
					</div>
					
					{/* Player 2 */}
					<div className='avatar aspect-square flex flex-col items-center  lg:gap-10 tb:gap-5 gap-3'>
						{/* Profile Picture */}
						<div className='relative rounded-full border border-primary'>
							<img
								src={getImageUrl(opponent.profile_picture, 'profile')}
								alt={opponent.username}
								className='object-cover rounded-full'
								onError={(e) => {
									console.log('Profile image load error:', e);
									e.target.src = '/assets/images/default-avatar.png';
								}}
							/>
							{opponent.badge && (
								<img
								src={getImageUrl(opponent.badge.image, 'badge')}
								alt={opponent.badge.name}
								className='absolute z-10 bottom-0 -right-5 w-[60%]'
								/>
							)}
						</div>
						{/* Username */}
						<div>
							<h2 className='font-dreamscape-sans text-primary leading-none'>
								{opponent.username}
							</h2>
							<h6 className='font-dreamscape-sans text-level'>{opponent.badge.name}</h6>
						</div>
					</div>

				</div>
			</div>
		</section>
	);
};

export default Match;