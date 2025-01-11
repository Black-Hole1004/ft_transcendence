import { useState, useEffect } from 'react'

const MatchWarning = ({ player1Name, player2Name }) => {
	const [countdown, setCountdown] = useState(3);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (countdown > 0)
				setCountdown((prev) => prev - 1);
		}, 1000)

		return () => {
			clearTimeout(timeoutId)
		};
	}, [countdown]);
	return (
		<>
			<div className='fixed inset-0 bg-black bg-opacity-70 z-10'></div>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary z-20">
				<div className="flex flex-col items-center gap-3 text-center animate-bounce">
					<h3 className="font-heavy text-2xl mb-5 text-light">Match Starting in {countdown}...</h3>
					<div className="flex items-center gap-2 justify-center text-lg">
						<span className="font-medium">{player1Name}</span>
						<span className='font-dreamscape text-light'>vs</span>
						<span className="font-medium">{player2Name}</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default MatchWarning;