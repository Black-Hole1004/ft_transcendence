import React, { useState } from 'react';

const Tournament = () => {
	const users = [
		{ name: 'MOUAD55', rank: 'CELESTIAL MASTER', xp: '12456XP', icon: '🔥' },
		{ name: 'ARABIA1', rank: 'CELESTIAL MASTER', xp: '11648XP', icon: '🔥' },
		{ name: 'AHMAYMOU', rank: 'CELESTIAL MASTER', xp: '10231XP', icon: '🔥' },
		{ name: 'PLAYER1', rank: 'GALACTIC TRAILBLAZER', xp: '9153XP', icon: '🌐' },
		{ name: 'PLAYER2', rank: 'GALACTIC TRAILBLAZER', xp: '8132XP', icon: '🌐' },
		{ name: 'PLAYER3', rank: 'STELLAR VOYAGER', xp: '6413XP', icon: '🚀' },
		{ name: 'PLAYER4', rank: 'COSMIC EXPLORER', xp: '2564XP', icon: '☀️' },
		{ name: 'PLAYER5', rank: 'NOVICE ASTRONAUT', xp: '231XP', icon: '🔴' },
	]
			
	return (
		<div
			className="min-h h-screen text-white  border border-white"
		>
			<div className="p-4 border-b border-white mb-12">
				<h2>CELESTIAL PONG CLASH</h2>
				<p className='text-gray-300 max-w-2x'>
					The Celestial Pong Clash invites players from across the galaxy to compete in
					intense interstellar battles, where victory depends on mastering precision and
					strategy in the vast cosmic realm.
				</p>
			</div>

			<div>

			</div>
			<div>

			</div>
		</div>)
};

export default Tournament;