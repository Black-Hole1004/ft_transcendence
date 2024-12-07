import React, { useState, useEffect } from 'react';

const Tournament = () => {

	const users = [
		{ username: 'user1', avatar: '/path/to/avatar1.png' },
		{ username: 'user2', avatar: '/path/to/avatar2.png' },
		{ username: 'user3', avatar: '/path/to/avatar3.png' },
		{ username: 'user4', avatar: '/path/to/avatar4.png' }
	];
	const [players, setPlayers] = useState([]);
	const [semifinals, setSemifinals] = useState(['', '', '', '']);
	const [final, setFinal] = useState(['', '']);
	const [winner, setWinner] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (users && users.length === 4) {
			setPlayers(users.map(user => user.username || user.name));
			setIsLoading(false);
		}
	}, [users]);

	const advanceToFinal = (matchIndex, playerIndex) => {
		const newFinal = [...final];
		newFinal[matchIndex] = semifinals[playerIndex];
		setFinal(newFinal);
	};

	const declareWinner = (playerIndex) => {
		setWinner(final[playerIndex]);
		// Here you can add API call to update tournament results in the backend
		// onTournamentComplete(final[playerIndex]);
	};

	const resetTournament = () => {
		setSemifinals(['', '', '', '']);
		setFinal(['', '']);
		setWinner('');
	};

	const advanceToSemifinals = (matchIndex, playerIndex) => {
		const newSemifinals = [...semifinals];
		newSemifinals[matchIndex] = players[playerIndex];
		setSemifinals(newSemifinals);
	};

	if (isLoading) {
		return (
			<div className="w-full max-w-4xl mx-auto p-6 text-center">
				Loading tournament...
			</div>
		);
	}

	if (!users || users.length !== 4) {
		return (
			<div className="w-full max-w-4xl mx-auto p-6 text-center text-red-500">
				Error: Tournament requires exactly 4 players
			</div>
		);
	}

	return (
		<div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-center">Ping Pong Tournament</h1>
			</div>
			<div className="flex flex-col items-center space-y-8">
				{/* Tournament Bracket */}
				<div className="w-full">
					<div className="flex justify-between mb-16">
						{/* Round 1 - Semifinals */}
						<div className="space-y-8">
							<div className="border p-4 rounded-lg w-48">
								<div className="space-y-2">
									<div
										className={`p-2 rounded cursor-pointer ${semifinals[0] === players[0]
												? 'bg-green-100'
												: 'hover:bg-gray-100'
											}`}
										onClick={() => advanceToSemifinals(0, 0)}
									>
										<div className="flex items-center space-x-2">
											<img
												src={users[0].avatar || '/default-avatar.png'}
												alt={players[0]}
												className="w-6 h-6 rounded-full"
											/>
											<span>{players[0]}</span>
										</div>
									</div>
									<div
										className={`p-2 rounded cursor-pointer ${semifinals[1] === players[1]
												? 'bg-green-100'
												: 'hover:bg-gray-100'
											}`}
										onClick={() => advanceToSemifinals(1, 1)}
									>
										<div className="flex items-center space-x-2">
											<img
												src={users[1].avatar || '/default-avatar.png'}
												alt={players[1]}
												className="w-6 h-6 rounded-full"
											/>
											<span>{players[1]}</span>
										</div>
									</div>
								</div>
							</div>
							<div className="border p-4 rounded-lg w-48">
								<div className="space-y-2">
									<div
										className={`p-2 rounded cursor-pointer ${semifinals[2] === players[2]
												? 'bg-green-100'
												: 'hover:bg-gray-100'
											}`}
										onClick={() => advanceToSemifinals(2, 2)}
									>
										<div className="flex items-center space-x-2">
											<img
												src={users[2].avatar || '/default-avatar.png'}
												alt={players[2]}
												className="w-6 h-6 rounded-full"
											/>
											<span>{players[2]}</span>
										</div>
									</div>
									<div
										className={`p-2 rounded cursor-pointer ${semifinals[3] === players[3]
												? 'bg-green-100'
												: 'hover:bg-gray-100'
											}`}
										onClick={() => advanceToSemifinals(3, 3)}
									>
										<div className="flex items-center space-x-2">
											<img
												src={users[3].avatar || '/default-avatar.png'}
												alt={players[3]}
												className="w-6 h-6 rounded-full"
											/>
											<span>{players[3]}</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Round 2 - Final */}
						<div className="border p-4 rounded-lg w-48 self-center">
							<div className="space-y-2">
								<div
									className={`p-2 rounded cursor-pointer ${final[0] === semifinals[0] || final[0] === semifinals[1]
											? 'bg-green-100'
											: 'hover:bg-gray-100'
										}`}
									onClick={() => advanceToFinal(0, 0)}
								>
									{semifinals[0] || semifinals[1] || 'Semifinal 1 Winner'}
								</div>
								<div
									className={`p-2 rounded cursor-pointer ${final[1] === semifinals[2] || final[1] === semifinals[3]
											? 'bg-green-100'
											: 'hover:bg-gray-100'
										}`}
									onClick={() => advanceToFinal(1, 2)}
								>
									{semifinals[2] || semifinals[3] || 'Semifinal 2 Winner'}
								</div>
							</div>
						</div>

						{/* Winner */}
						<div className="border p-4 rounded-lg w-48 self-center">
							<div
								className={`p-2 rounded text-center ${winner ? 'bg-green-100' : ''
									}`}
							>
								{winner || 'Tournament Winner'}
							</div>
						</div>
					</div>

					{/* Final Actions */}
					<div className="flex justify-center space-x-4">
						{final[0] && final[1] && !winner && (
							<>
								<button
									onClick={() => declareWinner(0)}
									className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
								>
									{final[0]} Wins
								</button>
								<button
									onClick={() => declareWinner(1)}
									className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
								>
									{final[1]} Wins
								</button>
							</>
						)}
						<button
							onClick={resetTournament}
							className="border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 transition-colors"
						>
							Reset Tournament
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tournament;