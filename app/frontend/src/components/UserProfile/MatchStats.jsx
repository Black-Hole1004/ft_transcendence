function MatchStats({ currentPlayer, opponent, result, startTime }) {
	const getFullImageUrl = (path) => {
		if (!path) return '/assets/images/default-avatar.png';
		if (path.startsWith('http')) return path;
		return `${import.meta.env.VITE_BASE_URL}${path}`;
	};

	// Helper to determine text color class based on result
	const getResultColorClass = () => {
		switch (result) {
			case 'VICTORY': return 'text-online';
			case 'DEFEAT': return 'text-defeat';
			case 'DRAW': return 'text-yellow-400';  // Yellow for draw
			default: return 'text-primary';
		}
	};

	// Helper to determine border color class
	const getBorderColorClass = (isCurrentPlayer) => {
		if (result === 'DRAW') return 'border-yellow-400';  // Yellow border for draw
		if (isCurrentPlayer) {
			return result === 'VICTORY' ? 'border-online' : 'border-defeat';
		}
		return result === 'VICTORY' ? 'border-defeat' : 'border-online';
	};

	// Helper to determine XP text color
	const getXPColorClass = (isCurrentPlayer) => {
		if (result === 'DRAW') return 'text-yellow-400';  // Yellow for draw
		if (isCurrentPlayer) {
			return result === 'VICTORY' ? 'text-online' : 'text-defeat';
		}
		return result === 'VICTORY' ? 'text-defeat' : 'text-online';
	};

	return (
		<div className='flex justify-between bg-[rgba(121,118,110,0.2)] backdrop-blur-ms rounded-lg match-infos'>
			{/* Current Player Side */}
			<div className='flex items-center gap-2'>
				<img
					src={getFullImageUrl(currentPlayer.profile_picture)}
					className={`border aspect-square object-cover match-winner ${getBorderColorClass(true)}`}
					alt='player'
				/>
				<div className='points flex'>
					<img
						src={getFullImageUrl(currentPlayer.badge_image)}
						alt='badge'
					/>
					<p className={`${getXPColorClass(true)} self-end`}>
						{currentPlayer.xp_gain > 0 ? `+${currentPlayer.xp_gain}` : currentPlayer.xp_gain}
					</p>
				</div>
			</div>

			{/* Match Result */}
			<div className='flex flex-col items-center justify-center result'>
				<p className='font-dreamscape-sans text-border date'>
					{startTime}
				</p>
				<p className={`font-dreamscape-sans ${getResultColorClass()}`}>
					{result}
				</p>
				<p className='font-dreamscape text-primary'>
					{currentPlayer.score} - {opponent.score}
				</p>
			</div>

			{/* Opponent Side */}
			<div className='flex items-center gap-2'>
				<div className='points flex'>
					<p className={`${getXPColorClass(false)} self-end`}>
						{opponent.xp_gain > 0 ? `+${opponent.xp_gain}` : opponent.xp_gain}
					</p>
					<img
						src={getFullImageUrl(opponent.badge_image)}
						alt='badge'
					/>
				</div>
				<img
					src={getFullImageUrl(opponent.profile_picture)}
					className={`border aspect-square object-cover match-loser ${getBorderColorClass(false)}`}
					alt='opponent'
				/>
			</div>
		</div>
	);
}

export default MatchStats;