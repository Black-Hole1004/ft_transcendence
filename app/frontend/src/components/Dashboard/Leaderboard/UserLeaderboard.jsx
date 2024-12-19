import React from 'react';

function UserLeaderboard({ rank, nickname, achievement, xp, profilePicture }) {
    // Helper to truncate long usernames
    const truncateUsername = (username) => {
        if (username.length > 13) {
            return username.substring(0, 12) + '...';
        }
        return username;
    };

    const getAchievementImage = (achievementName) => {
        const formattedName = achievementName.toLowerCase().replace(/\s+/g, '-');
        return `/assets/images/Achievements/${formattedName}.png`;
    };
	
	const getProfilePicture = (path) => {
        if (!path) return '/assets/images/default-avatar.png';
        if (path.startsWith('http')) return path;
        return `${import.meta.env.VITE_BASE_URL}${path}`;
    };

    return (
        <div className='flex items-center justify-between p-2 mb-2 bg-[rgba(27,22,17,0.7)] rounded-lg hover:bg-[rgba(27,22,17,0.9)] transition-all duration-300'>
            <div className='flex items-center gap-3'>
                <span className='text-lg font-bold min-w-[30px]'>#{rank}</span>
                <img
                    src={getProfilePicture(profilePicture)}
                    alt={nickname}
                    className='w-10 h-10 rounded-full object-cover'
                    onError={(e) => {
                        e.target.src = '/assets/images/default-avatar.png';
                    }}
                />
                <div>
                    <p className='font-medium'>{truncateUsername(nickname)}</p>
                    <p className='text-sm text-[#BE794A]'>{achievement}</p>
                </div>
            </div>
            <div className='flex flex-col items-center w-16'>
                <img 
                    src={getAchievementImage(achievement)}
                    alt={achievement}
                    className='w-6 h-6 mb-1'
                    onError={(e) => {
                        console.log('Failed to load achievement image:', e);
                        e.target.style.display = 'none';
                    }}
                />
                <span className='font-bold text-sm'>{xp.toLocaleString()}</span>
            </div>
        </div>
    );
}

export default UserLeaderboard;