import React, { useState } from 'react';

const Tournament = () => {
	const [players, setPlayers] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
	const [semifinals, setSemifinals] = useState(['', '', '', '']);
	const [final, setFinal] = useState(['', '']);
	const [winner, setWinner] = useState('');
	const [editing, setEditing] = useState(true);

	const handlePlayerNameChange = (index, value) => {
		const newPlayers = [...players];
		newPlayers[index] = value;
		setPlayers(newPlayers);
	};

	const startTournament = () => {
		setEditing(false);
	};

	const advanceToFinal = (matchIndex, playerIndex) => {
		const newFinal = [...final];
		newFinal[matchIndex] = semifinals[playerIndex];
		setFinal(newFinal);
	};

	const declareWinner = (playerIndex) => {
		setWinner(final[playerIndex]);
	};

	const resetTournament = () => {
		setSemifinals(['', '', '', '']);
		setFinal(['', '']);
		setWinner('');
		setEditing(true);
	};

	const advanceToSemifinals = (matchIndex, playerIndex) => {
		const newSemifinals = [...semifinals];
		newSemifinals[matchIndex] = players[playerIndex];
		setSemifinals(newSemifinals);
	};

	return (
		<div className="w-full max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl border border-purple-500">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-center text-purple-400">Ping Pong Tournament</h1>
			</div>
			<div className="flex flex-col items-center space-y-8">
				{/* Players Setup */}
				{editing && (
					<div className="w-full space-y-4">
						<h3 className="text-lg font-semibold text-purple-300">Enter Player Names</h3>
						<div className="grid grid-cols-2 gap-4">
							{players.map((player, index) => (
								<input
									key={index}
									value={player}
									onChange={(e) => handlePlayerNameChange(index, e.target.value)}
									placeholder={`Player ${index + 1}`}
									className="w-full p-2 bg-gray-800 text-white border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
								/>
							))}
						</div>
						<button
							onClick={startTournament}
							className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors duration-200"
						>
							Start Tournament
						</button>
					</div>
				)}

				{/* Tournament Bracket */}
				{!editing && (
					<div className="w-full">
						<div className="flex justify-between mb-16">
							{/* Round 1 - Semifinals */}
							<div className="space-y-8">
								<div className="border border-purple-500 p-4 rounded-lg w-48 bg-gray-800">
									<div className="space-y-2">
										<div
											className={`p-2 rounded cursor-pointer ${semifinals[0] === players[0]
													? 'bg-purple-700 text-white'
													: 'hover:bg-gray-700 text-gray-100'
												}`}
											onClick={() => advanceToSemifinals(0, 0)}
										>
											{players[0]}
										</div>
										<div
											className={`p-2 rounded cursor-pointer ${semifinals[1] === players[1]
													? 'bg-purple-700 text-white'
													: 'hover:bg-gray-700 text-gray-100'
												}`}
											onClick={() => advanceToSemifinals(1, 1)}
										>
											{players[1]}
										</div>
									</div>
								</div>
								<div className="border border-purple-500 p-4 rounded-lg w-48 bg-gray-800">
									<div className="space-y-2">
										<div
											className={`p-2 rounded cursor-pointer ${semifinals[2] === players[2]
													? 'bg-purple-700 text-white'
													: 'hover:bg-gray-700 text-gray-100'
												}`}
											onClick={() => advanceToSemifinals(2, 2)}
										>
											{players[2]}
										</div>
										<div
											className={`p-2 rounded cursor-pointer ${semifinals[3] === players[3]
													? 'bg-purple-700 text-white'
													: 'hover:bg-gray-700 text-gray-100'
												}`}
											onClick={() => advanceToSemifinals(3, 3)}
										>
											{players[3]}
										</div>
									</div>
								</div>
							</div>

							{/* Round 2 - Final */}
							<div className="border border-purple-500 p-4 rounded-lg w-48 self-center bg-gray-800">
								<div className="space-y-2">
									<div
										className={`p-2 rounded cursor-pointer ${final[0] === semifinals[0] || final[0] === semifinals[1]
												? 'bg-purple-700 text-white'
												: 'hover:bg-gray-700 text-gray-100'
											}`}
										onClick={() => advanceToFinal(0, 0)}
									>
										{semifinals[0] || semifinals[1] || 'Semifinal 1 Winner'}
									</div>
									<div
										className={`p-2 rounded cursor-pointer ${final[1] === semifinals[2] || final[1] === semifinals[3]
												? 'bg-purple-700 text-white'
												: 'hover:bg-gray-700 text-gray-100'
											}`}
										onClick={() => advanceToFinal(1, 2)}
									>
										{semifinals[2] || semifinals[3] || 'Semifinal 2 Winner'}
									</div>
								</div>
							</div>

							{/* Winner */}
							<div className="border border-purple-500 p-4 rounded-lg w-48 self-center bg-gray-800">
								<div
									className={`p-2 rounded text-center ${winner ? 'bg-purple-700 text-white' : 'text-gray-100'
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
										className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors duration-200"
									>
										{final[0]} Wins
									</button>
									<button
										onClick={() => declareWinner(1)}
										className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors duration-200"
									>
										{final[1]} Wins
									</button>
								</>
							)}
							<button
								onClick={resetTournament}
								className="border border-purple-500 text-purple-400 hover:bg-purple-900 py-2 px-4 rounded transition-colors duration-200"
							>
								Reset Tournament
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Tournament;