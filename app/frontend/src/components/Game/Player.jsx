// function Player(props) {
//     return (
//         <div className={`flex flex-col items-center ${props.isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`} >
//             <img src={props.playerImage} className='rounded-full border-2 border-primary user-photo' alt='user photo' />
//             <p className='players-usernames truncate'>{props.PlayerName}</p>
//             <img src={props.badgeImage} className='achievements-icons hover:scale-[1.2] transition duration-500' alt='badge' />
//             <p className='text-level badge-name'>{props.BadgeName}</p>
//         </div>
//     );
// }

// export default Player;


import React from 'react';

function Player(props) {
    const { isPaused, PlayerName, playerImage, badgeImage, BadgeName, GameMode } = props;

    return (
        <div className={`flex flex-col items-center ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}>
            {GameMode === 'remote' && (
                <img src={playerImage} className='rounded-full border-2 border-primary user-photo' alt='user photo' />
            )}
            <p className='players-usernames truncate'>{PlayerName}</p>
            {GameMode === 'remote' && (
                <>
                    <img src={badgeImage} className='achievements-icons hover:scale-[1.2] transition duration-500' alt='badge' />
                    <p className='text-level badge-name'>{BadgeName}</p>
                </>
            )}
        </div>
    );
}

export default Player;