const MatchWarning = ({ player1Name, player2Name }) => (
	<div className="fixed top-4 right-4 bg-yellow-500/90 backdrop-blur-sm text-black p-6 rounded-lg shadow-2xl z-50 animate-bounce">
		<div className="flex flex-col items-center gap-3">
			<div className="text-2xl">🏓</div>
			<div className="text-center">
				<h3 className="font-bold text-xl mb-2">
					Match Starting in 3...
				</h3>
				<div className="flex items-center gap-2 justify-center">
					<span className="font-semibold">{player1Name}</span>
					<span>vs</span>
					<span className="font-semibold">{player2Name}</span>
				</div>
			</div>
		</div>
	</div>
);

export default MatchWarning;
