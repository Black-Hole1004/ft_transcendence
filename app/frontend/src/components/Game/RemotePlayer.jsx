import React from 'react';

const RemotePlayer = (props) => {
    // Function to construct full image URLs
    const getImageUrl = (path, type = 'profile') => {
        if (!path) {
            console.log(`No ${type} image path provided`);
            return '/assets/images/default-avatar.png';
        }
        
        console.log(`Original ${type} image path:`, path);
        
        if (path.startsWith('http')) {
            console.log(`Using complete URL for ${type}:`, path);
            return path;
        }

        const fullUrl = `${import.meta.env.VITE_BASE_URL}${path}`;
        console.log(`Constructed ${type} URL:`, fullUrl);
        return fullUrl;
    };

    const trimName = (name) => {
        if (name.length > 11) {
            return name.slice(0, 11) + '...';
        }
        return name;
    };

    const displayName = trimName(props.PlayerName);

    return (
        <div className={`flex flex-col items-center ${props.isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`} >
            <img 
                src={getImageUrl(props.playerImage)} 
                className='rounded-full border-2 border-primary user-photo' 
                alt='user photo'
                onError={(e) => {
                    e.target.src = '/assets/images/default-avatar.png';
                }}
            />
            <p className='players-usernames truncate'>{displayName}</p>
            <img 
                src={getImageUrl(props.badgeImage, 'badge')} 
                className='achievements-icons hover:scale-[1.2] transition duration-500' 
                alt='badge'
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />
            <p className='text-level badge-name'>{props.BadgeName}</p>
        </div>
    );
};

export default RemotePlayer;
