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
        <div className='fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className='bg-[#0E0B0A] border-2 border-[#76797C] rounded-2xl shadow-2xl w-[55rem] overflow-hidden'>
                {/* Result Banner */}



                <div className='h-40 bg-backdrop-80 backdrop-blur-sm border-b-2 border-[#76797C] flex items-center justify-center'>
                    <h1 className={`font-dreamscape text-6xl tracking-wider ${
                        isDraw 
                            ? 'text-yellow-500' 
                            : isWinner 
                                ? 'text-emerald-500' 
                                : 'text-red-500'
                    }`}>
                        {isDraw ? 'IT\'S A DRAW' : isWinner ? 'YOU WON' : 'YOU LOST'}
                    </h1>
                </div>


				

                {/* Content Section */}
                <div className='p-8 space-y-6'>
                    {/* Player Stats */}
                    <div className='flex items-center gap-4'>
                        <img
                            src={profileImageUrl}
                            alt={currentPlayerStats?.username}
                            className='w-16 h-16 rounded-full border-2 border-[#BE794A] object-cover'
                            onError={(e) => {
                                e.target.src = '/assets/images/default-avatar.png'
                            }}
                        />
                        <div>
                            <h2 className='text-xl font-bold text-[#E6DDC6]'>{currentPlayerStats?.username}</h2>
                            <p className='text-[#BE794A]'>{currentPlayerStats?.badge?.name}</p>
                            <p className='text-sm text-gray-400'>Score: {currentPlayerStats?.score}</p>
                        </div>
                    </div>

                    {/* XP Change */}
                    <div className='bg-[#1A1A1A] rounded-lg p-4 space-y-2'>
                        <h3 className='text-[#E6DDC6] font-semibold'>Your Experience Update</h3>
                        <div className='flex justify-between text-lg'>
                            <span className='text-gray-400'>Previous XP</span>
                            <span className='text-[#E6DDC6]'>{currentPlayerStats?.old_xp}</span>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <span className='text-gray-400'>XP Change</span>
							<span className={`${ 
									isDraw ? 'text-yellow-400' 
									: isWinner 
										? 'text-emerald-400' 
										: 'text-red-400'
							}`}>
								{currentPlayerStats?.xp_change >= 0 
									? `+${currentPlayerStats?.xp_change}` 
									: currentPlayerStats?.xp_change}
						</span>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <span className='text-gray-400'>New XP</span>
                            <span className='text-[#E6DDC6]'>{currentPlayerStats?.new_xp}</span>
                        </div>
                    </div>

                    {/* Badge Info */}
                    {/* <div className='bg-[#1A1A1A] rounded-lg p-4 flex items-center gap-4'>
                        <img
                            src={badgeImageUrl}
                            alt={currentPlayerStats?.badge?.name}
                            className='w-12 h-12 object-contain'
                            onError={(e) => {
                                e.target.style.display = 'none'
                            }}
                        />
                        <div>
                            <h3 className='text-[#E6DDC6] font-semibold'>{currentPlayerStats?.badge?.name}</h3>
                            <p className='text-gray-400 text-sm'>Current Achievement</p>
                        </div>
                    </div> */}

					<div className='bg-[#1A1A1A] rounded-lg p-4'>
                        <h3 className='text-[#E6DDC6] font-semibold mb-4'>Current Achievement</h3>
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
                                <p className='font-dreamscape-sans text-xl text-[#E6DDC6] mb-2'>
                                    {currentPlayerStats?.badge?.name}
                                </p>
                                <div className='flex justify-between text-sm text-primary font-medium'>
                                    <span>{currentPlayerStats?.badge?.current_threshold}xp</span>
                                    <span>{currentPlayerStats?.badge?.next_threshold}xp</span>
                                </div>
                                <div className='h-2 rounded-md bg-[rgb(121,118,110,0.7)] mt-1 flex items-center overflow-hidden'>
                                    <div
                                        className='mx-1 rounded-lg h-[65%] bg-[#BE794A] transition-all duration-1000 ease-out'
                                        style={{
                                            width: `${progressWidth}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Action Buttons */}
                    <div className='flex gap-4 pt-4'>
                        <button
                            onClick={onRestart}
                            className='flex-1 bg-[#BE794A] hover:bg-[#61463A] text-[#E6DDC6] font-bold py-3 rounded-full transition-all transform hover:scale-105'
                        >
                            Play Again
                        </button>
                        <button
                            onClick={onClose}
                            className='flex-1 bg-transparent border-2 border-[#BE794A] text-[#E6DDC6] font-bold py-3 rounded-full hover:bg-[#61463A] transition-all transform hover:scale-105'
                        >
                            Return to Base
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameOverPopup