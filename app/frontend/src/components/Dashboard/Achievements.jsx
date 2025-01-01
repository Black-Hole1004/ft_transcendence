import React, { useEffect, useState } from 'react';
import Badge from './Badge';



function Achievements({ achievements, currentXp }) {
    const [filled, setFilled] = useState(0);
    
    useEffect(() => {
        const percentage = Math.min((currentXp / 10000) * 100, 100);
        if (filled < percentage) {
            setTimeout(() => setFilled(prev => prev + 1), 20);
        }
    }, [filled, currentXp]);

    // Define the badges with their XP requirements
    const badgesList = [
        { title: 'Novice Astronaut', image: 'novice-astronaut', requiredXp: 0 },
        { title: 'Cosmic Explorer', image: 'cosmic-explorer', requiredXp: 2000 },
        { title: 'Stellar Voyager', image: 'stellar-voyager', requiredXp: 4000 },
        { title: 'Galactic Trailblazer', image: 'galactic-trailblazer', requiredXp: 6000 },
        { title: 'Celestial Master', image: 'celestial-master', requiredXp: 8000 }
    ];

    return (
        <div className='border rounded-xl achivements-card font-dreamscape-sans
		transition duration-300 border-[rgba(255,206,157,.2)] hover:border-[rgba(255,206,157,.4)]
		bg-[rgba(27,22,17,0.5)] hover:drop-shadow-[0_0_20px_rgba(255,206,157,0.2)]'>
            <h1 className='text-primary text-center leading-[1.02] achievements'>
                Achievements
            </h1>
            <div className='flex max-ms:flex-col justify-between items-center text-level'>
                {badgesList.map((badge) => (
                    <Badge
                        key={badge.title}
                        image={badge.image}
                        title={badge.title}
                        requiredXp={badge.requiredXp}
                        currentXp={currentXp}
                    />
                ))}
            </div>
            <div className='text-primary levels-font xl:mt-4 lp:mt-3 mtb:mt-2 mt-1'>
                <div className='flex justify-between max-ms:flex-col'>
                    <p>0xp</p>
                    <p>2000xp</p>
                    <p>4000xp</p>
                    <p>6000xp</p>
                    <p>8000xp</p>
                    <p>10000xp</p>
                </div>
                <div className='w-full lg:h-2 tb:h-1.5 h-1 rounded-md bg-[rgb(121,118,110,0.7)] mt-[2px] flex items-center'>
                    <div
                        className='rounded-lg h-[100%] bg-level transition-all duration-1000 ease-out'
                        style={{ width: `${filled}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Achievements;