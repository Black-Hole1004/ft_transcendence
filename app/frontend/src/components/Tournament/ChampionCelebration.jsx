const ChampionCelebration = ({ winner }) => (
	<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20">
		<div className="bg-gradient-to-b from-yellow-500 to-orange-600 p-8 rounded-xl text-center max-w-2xl mx-4 border-2 border-yellow-300 animate-bounce">
			<div className="mb-6">
				<h1 className="text-4xl font-dreamscape text-white mb-4">TOURNAMENT CHAMPION</h1>
				<div className="flex items-center justify-center gap-6">
					<div className='relative w-32 h-32 rounded-full border-4 border-yellow-300 shadow-lg'
						style={{
							background: 'url(/assets/images/avatar.jpg)',
							backgroundSize: 'cover'
						}}
					>
							<img src="/assets/images/tournament-winner-badge.png"
								className='absolute -bottom-2 -right-2 w-1/2'
								alt="winner badge"
							/>
					</div>
					<div className="text-left">
						<h2 className="text-3xl font-dreamscape-sans text-white mb-2">{winner?.name}</h2>
						<p className="text-level text-lg">CELESTIAL MASTER</p>
					</div>
				</div>
			</div>
			<div className="space-y-2 animate-pulse">
				<p className="text-white text-xl font-dreamscape-sans">CELESTIAL MASTER OF THE TOURNAMENT</p>
				<p className="text-yellow-200">Victory achieved in glorious combat!</p>
			</div>
		</div>
	</div>
);

export default ChampionCelebration;