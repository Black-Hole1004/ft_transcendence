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
								src={'/assets/images/moudrib.jpeg'}
								alt={'mouad55'}
								className='object-cover  rounded-full'
								onError={(e) => {
									console.log('Profile image load error:', e);
									e.target.src = '/assets/images/default-avatar.png';
								}}
							/>
							<img
								src={'/assets/images/Achievements/celestial-master.png'}
								alt={'mouad55'}
								className='absolute z-10 bottom-0 -left-5 w-[60%]'
							/>
						</div>
						{/* Username */}
						<div>
							<h2 className='font-dreamscape-sans text-primary leading-none'>
								{'mouad55'}
							</h2>
							<h6 className='font-dreamscape-sans text-level'>Celestial Master</h6>
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
								src={'/assets/images/lmoudir.jpg'}
								alt={'mouad55'}
								className='object-cover  rounded-full'
								onError={(e) => {
									console.log('Profile image load error:', e);
									e.target.src = '/assets/images/default-avatar.png';
								}}
							/>
							<img
								src={'/assets/images/Achievements/galactic-trailblazer.png'}
								alt={'lmoudir'}
								className='absolute z-10 bottom-0 -right-5 w-[60%]'
							/>
						</div>
						{/* Username */}
						<div>
							<h2 className='font-dreamscape-sans text-primary leading-none'>
								{'lmoudir'}
							</h2>
							<h6 className='font-dreamscape-sans text-level'>Galactic Trailblazer</h6>
						</div>
					</div>

				</div>
			</div>
		</section>
	);
};

export default Match;