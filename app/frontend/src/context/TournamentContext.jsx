import React, { createContext, useState, useContext, useEffect } from 'react';

const TournamentContext = createContext(null);

export const TournamentProvider = ({ children }) => {
	const [semiFinal1winner, setSemiFinal1winner] = useState(null);
	const [semiFinal2winner, setSemiFinal2winner] = useState(null);
	const [finalWinner, setFinalWinner] = useState(null);
	const [tournamentState, setTournamentState] = useState('not_started');
	const [tournamentData, setTournamentData] = useState(null);

	const resetTournament = () => {
		setSemiFinal1winner(null);
		setSemiFinal2winner(null);
		setFinalWinner(null);
		setTournamentState('not_started');
		setTournamentData(null);
	};

	const value = {
		semiFinal1winner,
		setSemiFinal1winner,
		semiFinal2winner,
		setSemiFinal2winner,
		finalWinner,
		setFinalWinner,
		tournamentState,
		setTournamentState,
		tournamentData,
		setTournamentData,
		resetTournament,
	};

	const cleanup = () => {
		resetTournament();
	};

	useEffect(() => {
		return () => cleanup;
	}, []);

	return (
		<TournamentContext.Provider value={value}>
			{children}
		</TournamentContext.Provider>
	);
};

export const useTournament = () => {
	const context = useContext(TournamentContext);
	if (!context) {
		throw new Error(
			'useTournament must be used within a TournamentProvider',
		);
	}
	return context;
};
