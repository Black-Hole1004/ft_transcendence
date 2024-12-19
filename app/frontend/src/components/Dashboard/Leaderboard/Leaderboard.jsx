import React from 'react';
import UserLeaderboard from './UserLeaderboard';

function Leaderboard({ users }) {
    if (!users) return <div>Loading...</div>;

    return (
        <div className='flex flex-col items-center lg:w-fl-ldr-custom tb:w-[380px] w-[300px] card-height
            rounded-xl border-1.5 border-[rgba(255,206,157,.4)] bg-[rgba(27,22,17,0.5)]'>
            <h1 className='font-dreamscape-sans card-title'>LEADERBOARD</h1>
            <div className='w-[96%] overflow-y-auto users'>
                {users.map((user, index) => (
                    <UserLeaderboard 
                        key={user.id}
                        rank={index + 1}
                        nickname={user.username}
                        achievement={user.achievement.name.toLowerCase()}
                        xp={user.xp}
                        profilePicture={user.profile_picture}
                    />
                ))}
            </div>
        </div>
    );
}

export default Leaderboard;