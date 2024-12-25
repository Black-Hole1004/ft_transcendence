import { useEffect, useState } from 'react';

const GameOverPopup = ({ winner, loser, currentPlayerId, onRestart, onClose }) => {

	const isWinner = winner?.id === currentPlayerId
	const isDraw = winner?.score === loser?.score;
    const [progressWidth, setProgressWidth] = useState(0);

	// Get current player's stats based on whether they won or lost
	const currentPlayerStats = isWinner ? winner : loser

	const getFullImageUrl = (path) => {
		if (!path) return '/assets/images/default-avatar.png'
		if (path.startsWith('http')) return path
		const PathComplete = `${import.meta.env.VITE_BASE_URL}${path}`
		return PathComplete
	}

	// Memoize the image URLs for current player
	const profileImageUrl = getFullImageUrl(currentPlayerStats?.profile_picture)
	const badgeImageUrl = getFullImageUrl(currentPlayerStats?.badge?.image)

	useEffect(() => {
		const timer = setTimeout(() => {
			setProgressWidth(currentPlayerStats?.badge?.progress_percentage || 0);
		}, 500);
		return () => clearTimeout(timer);
	}, [currentPlayerStats?.badge?.progress_percentage]);


	return (
		<>
			<div class='fixed inset-0 bg-black bg-opacity-90 z-10'></div>
			<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lp:px-10 px-3 z-20 w-[40rem]
			flex flex-col justify-center bg-secondary bg-opacity-60 border-1.5 border-primary rounded text-center gameoverpopup'>
					{/* Result Banner */}



					<h1 className={`font-dreamscape text-6xl tracking-wider ${
						isDraw 
							? 'text-border drop-shadow-[0_2px_10px_rgba(128,128,128,0.8)]'
							: isWinner 
								? 'text-online drop-shadow-[0_2px_10px_rgba(70,233,210,0.8)]'
								: 'text-defeat drop-shadow-[0_2px_10px_rgba(245,78,98,0.8)]'
					}`}>
						{isDraw ? 'IT\'S A DRAW' : isWinner ? 'YOU WON' : 'YOU LOST'}
					</h1>


					{/* Content Section */}
					<div className='flex flex-col gap-2'>
						{/* Player Stats */}
						<div className='flex items-center gap-4'>
							<img
								src={profileImageUrl}
								alt={currentPlayerStats?.username}
								className='rounded-full ring-1 ring-primary object-cover'
								onError={(e) => {
									e.target.src = '/assets/images/default-avatar.png'
								}}
							/>
							<div className='flex flex-col items-start'>
								<h2 className='font-heavy text-primary'>{currentPlayerStats?.username}</h2>
								<p className='achievement-name font-dreamscape-sans text-level'>{currentPlayerStats?.badge?.name}</p>
								<p className='font-medium text-border leading-none'>Score: {currentPlayerStats?.score}</p>
							</div>
						</div>

						{/* XP Change */}
						<div className='bg-border bg-opacity-20 rounded p-4'>
							<h3 className='text-primary font-heavy text-start mb-4'>
								Your Experience Update
							</h3>
							<div className='ml-2'>
								<div className='flex justify-between text-lg font-medium'>
									<span className='text-gray-400'>Previous XP</span>
									<span className='text-primary'>{currentPlayerStats?.old_xp}</span>
							</div>
								<div className='flex justify-between text-lg font-medium'>
									<span className='text-gray-400'>XP Change</span>
									<span className={`${ 
											isDraw ? 'text-yellow-400' 
											: isWinner 
												? 'text-online' 
												: 'text-defeat'
									}`}>
										{currentPlayerStats?.xp_change >= 0 
											? `+${currentPlayerStats?.xp_change}` 
											: currentPlayerStats?.xp_change}
								</span>
								</div>
								<div className='flex justify-between text-lg font-medium'>
									<span className='text-gray-400'>New XP</span>
									<span className='text-primary'>{currentPlayerStats?.new_xp}</span>
								</div>
							</div>
						</div>

						<div className='bg-border bg-opacity-20 rounded p-4'>
							<h3 className='text-primary font-heavy mb-4 text-start'>Current Achievement</h3>
							<div className='flex items-center gap-4'>
								<div>
									<img
										src={badgeImageUrl}
										alt={currentPlayerStats?.badge?.name}
										className='w-16 h-16 object-contain hover:scale-105 transition duration-500'
										onError={(e) => {
											e.target.style.display = 'none';
										}}
									/>
								</div>
								<div className='flex-1 flex flex-col'>
									<p className='font-dreamscape-sans text-xl text-level mb-2'>
										{currentPlayerStats?.badge?.name}
									</p>
									<div className='flex justify-between text-sm text-primary font-medium'>
										<span>{currentPlayerStats?.badge?.current_threshold}xp</span>
										<span>{currentPlayerStats?.badge?.next_threshold}xp</span>
									</div>
									<div className='h-2 rounded-md bg-[rgb(121,118,110,0.7)] mt-1 flex items-center overflow-hidden'>
										<div
											className='rounded-lg h-full bg-level transition-all duration-1000 ease-out'
											style={{
												width: `${progressWidth}%`
											}}
										/>
									</div>
								</div>
							</div>
						</div>


						{/* Action Buttons */}
						<div className='w-full flex justify-between mb-5 lg:gap-10 gap-6'>
							<button
								onClick={onRestart}
								className='font-dreamscape bg-primary text-secondary py-3 flex-1 rounded
								hover:scale-[1.03] transition-all duration-300 ease-in-out'
							>
								Play Again
							</button>
							<button
								onClick={onClose}
								className='font-heavy text-primary py-3 border border-border rounded flex-1
								bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out hover:bg-[rgb(183,170,156,30%)]'
							>
								Return to Base
							</button>
						</div>
					</div>
			</div>
		</>
	);
};

export default GameOverPopup