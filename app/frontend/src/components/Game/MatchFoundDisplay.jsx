import React, { useState } from 'react';

const MatchFoundDisplay = ({ matchData, countdown }) => {
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
        <div className='min-h-screen w-full bg-black flex flex-col items-center justify-center'>
            {/* Title */}
            <h1 className='text-7xl font-bold text-white mb-24 tracking-wider scale-90 sm:scale-100'>
                Match Found!
            </h1>

            {/* Players Container - Always horizontal */}
            <div className='w-full max-w-[95%] xl:max-w-7xl px-4 xl:px-20 flex items-center justify-between relative'>
                {/* Player 1 */}
                <div className='flex flex-col items-center scale-75 sm:scale-90 md:scale-100'>
                    {/* Profile Picture */}
                    <div className='w-64 h-64 rounded-full overflow-hidden border-4 border-white mb-6'>
                        <img
                            src={getImageUrl(currentUser.profile_picture, 'profile')}
                            alt={currentUser.username}
                            className='w-full h-full object-cover'
                            onError={(e) => {
                                console.log('Profile image load error:', e);
                                e.target.src = '/assets/images/default-avatar.png';
                            }}
                        />
                    </div>
                    {/* Username */}
                    <h2 className='text-4xl font-bold text-white mb-4'>{currentUser.username}</h2>
                    {/* Badge */}
                    {currentUser.badge && (
                        <div className='flex flex-col items-center'>
                            <img
                                src={getImageUrl(currentUser.badge.image, 'badge')}
                                alt={currentUser.badge.name}
                                className='w-24 h-24 object-contain mb-2'
                                onError={(e) => {
                                    console.log('Badge image load error:', e);
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span className='text-[#FFD700] font-semibold tracking-wider text-xl'>
                                {currentUser.badge.name}
                            </span>
                        </div>
                    )}
                </div>
                
                {/* VS  and Countdown */}
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center scale-75 sm:scale-90 md:scale-100'>
                    <span className='text-8xl font-bold text-white mb-8'>VS</span>
                    {countdown && (
                        <div className='text-9xl font-bold text-gray-500 animate-pulse'>
                            {countdown}
                        </div>
                    )}
                </div>

                {/* Player 2 */}
                <div className='flex flex-col items-center scale-75 sm:scale-90 md:scale-100'>
                    {/* Profile Picture */}
                    <div className='w-64 h-64 rounded-full overflow-hidden border-4 border-white mb-6'>
                        <img
                            src={getImageUrl(opponent.profile_picture, 'profile')}
                            alt={opponent.username}
                            className='w-full h-full object-cover'
                            onError={(e) => {
                                console.log('Profile image load error:', e);
                                e.target.src = '/assets/images/default-avatar.png';
                            }}
                        />
                    </div>
                    {/* Username */}
                    <h2 className='text-4xl font-bold text-white mb-4'>{opponent.username}</h2>
                    {/* Badge */}
                    {opponent.badge && (
                        <div className='flex flex-col items-center'>
                            <img
                                src={getImageUrl(opponent.badge.image, 'badge')}
                                alt={opponent.badge.name}
                                className='w-24 h-24 object-contain mb-2'
                                onError={(e) => {
                                    console.log('Badge image load error:', e);
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span className='text-[#FFD700] font-semibold tracking-wider text-xl'>
                                {opponent.badge.name}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchFoundDisplay;