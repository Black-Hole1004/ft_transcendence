import React, { useState } from 'react';

const MatchFoundDisplay = ({ matchData, countdown, statement }) => {
    const [showDebug, setShowDebug] = useState(false);

    if (!matchData?.current_user || !matchData?.opponent) {
        return <div className='text-primary'>Loading match data...</div>;
    }

    const currentUser = matchData.current_user;
    const opponent = matchData.opponent;

    const getImageUrl = (path, type = 'profile') => {
        if (!path) {
            return '/assets/images/default-avatar.png';
        }    
        if (path.startsWith('http')) {
            return path;
        }
        const fullUrl = `${import.meta.env.VITE_BASE_URL}${path}`;
        return fullUrl;
    };

    return (
		<section className='flex justify-center'>
			<div className='fixed inset-0 bg-black bg-opacity-50 z-10'></div>
			{/* Title */}
			<div className='absolute top-[44%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>

				<h1 className='statement text-[80%] text-center font-dreamscape text-light mb-32'>
					{statement}
				</h1>
		
				{/* Players Container - Always horizontal */}
				<div className='matchmaking flex justify-center items-center'>
					{/* Player 1 */}
					<div className='avatar flex flex-col items-center xl:gap-12 lg:gap-10 tb:gap-5 gap-3'>
						{/* Profile Picture */}
						<div className='relative rounded-full border border-primary'>
							<img
								src={getImageUrl(currentUser.profile_picture, 'profile')}
								alt={currentUser.username}
								className='match-user-image aspect-square object-cover rounded-full'
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
					<div className='flex flex-col items-center'>
						<h1 className='font-dreamscape text-primary'>VS</h1>
						{countdown ? (
							<div className='countdown text-9xl font-bold text-light animate-pulse'>
								{countdown}
							</div>
						) : <></>
						}
					</div>
					
					{/* Player 2 */}
					<div className='avatar flex flex-col items-center  lg:gap-10 tb:gap-5 gap-3'>
						{/* Profile Picture */}
						<div className='relative rounded-full border border-primary'>
							<img
								src={getImageUrl(opponent.profile_picture, 'profile')}
								alt={opponent.username}
								className='match-user-image aspect-square object-cover rounded-full'
								onError={(e) => {
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

export default MatchFoundDisplay;