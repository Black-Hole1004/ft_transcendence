function MatchStats() {
	return (
		<div
			className='flex justify-between
		bg-[rgba(121,118,110,0.2)] backdrop-blur-ms rounded-lg match-infos'
		>
			<div className='flex items-center gap-2'>
				<img
					src='./assets/images/moudrib.jpeg'
					className='border border-online match-winner'
					alt='player image'
				/>
				<div className='points flex'>
					<img
						src='./assets/images/Achievements/celestial-master.png'
						alt='achievement badge'
					/>
					<p className='text-online self-end'>+45</p>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center result'>
				<p className='font-dreamscape-sans text-online'>victory</p>
				<p className='font-dreamscape text-primary'>7 - 0</p>
			</div>
			<div className='flex items-center gap-2'>
				<div className='points flex'>
					<p className='text-defeat self-end'>-33</p>
					<img
						src='./assets/images/Achievements/celestial-master.png'
						alt='achievement badge'
					/>
				</div>
				<img
					src='./assets/images/moudrib.jpeg'
					className='border border-defeat match-loser'
					alt='player image'
				/>
			</div>
		</div>
	)
}

export default MatchStats
