import React from 'react';
import Button from '../../components/Home/Buttons/Button';
import { useLocation, useNavigate } from 'react-router-dom' // Make sure this is included
import { useTournament } from '../../context/TournamentContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { Confetti } from 'react-confetti';


const players = [
	{
		id: "1",
		nickname: "MOUAD55",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 12456,
		avatar: '../../../dist/assets/images/moudrib.jpeg',
		icon: '../../../dist/assets/images/Achievements/celestial-master.png'
	},
	{
		id: "2",
		nickname: "ARABIAI",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 11648,
		avatar: '../../../dist/assets/images/tabi3a.jpeg',
		icon: '../../../dist/assets/images/Achievements/galactic-trailblazer.png'
	},
	{
		id: "3",
		nickname: "AHMAYMOU",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 10231,
		avatar: '../../../dist/assets/images/lmoudir.jpg',
		icon: '../../../dist/assets/images/Achievements/stellar-voyager.png'
	},
	{
		id: "4",
		nickname: "PLAYER1",
		achievement: "GALACTIC TRAILBLAZER",
		rankClass: "text-cyan-400",
		xp: 9153,
		avatar: '../../../dist/assets/images/ahaloui.jpeg',
		icon: '../../../dist/assets/images/Achievements/cosmic-explorer.png'
	},
	{
		id: "1",
		nickname: "MOUAD55",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 12456,
		avatar: '../../../dist/assets/images/moudrib.jpeg',
		icon: '../../../dist/assets/images/Achievements/celestial-master.png'
	},
	{
		id: "2",
		nickname: "ARABIAI",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 11648,
		avatar: '../../../dist/assets/images/tabi3a.jpeg',
		icon: '../../../dist/assets/images/Achievements/galactic-trailblazer.png'
	},
	{
		id: "3",
		nickname: "AHMAYMOU",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 10231,
		avatar: '../../../dist/assets/images/lmoudir.jpg',
		icon: '../../../dist/assets/images/Achievements/stellar-voyager.png'
	},
	{
		id: "4",
		nickname: "PLAYER1",
		achievement: "GALACTIC TRAILBLAZER",
		rankClass: "text-cyan-400",
		xp: 9153,
		avatar: '../../../dist/assets/images/ahaloui.jpeg',
		icon: '../../../dist/assets/images/Achievements/cosmic-explorer.png'
	},

]

const Tournament = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const {
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
		resetTournament
	} = useTournament();

	const [showChampionCelebration, setShowChampionCelebration] = useState(false);


	const { mode, player1, player2, player3, player4, backgroundId, duration, ballSize, ballColor, paddleSize }
		= tournamentData || {};


	const [showWarning, setShowWarning] = useState(false);

	// Add this warning component
	const MatchWarning = ({ player1Name, player2Name }) => (
		<div className="fixed top-4 right-4 bg-yellow-500/90 backdrop-blur-sm text-black p-6 rounded-lg shadow-2xl z-50 animate-bounce">
			<div className="flex flex-col items-center gap-3">
				<div className="text-2xl">🏓</div>
				<div className="text-center">
					<h3 className="font-bold text-xl mb-2">Match Starting in 3...</h3>
					<div className="flex items-center gap-2 justify-center">
						<span className="font-semibold">{player1Name}</span>
						<span>vs</span>
						<span className="font-semibold">{player2Name}</span>
					</div>
				</div>
			</div>
		</div>
	);

	const ChampionCelebration = ({ winner }) => (
		<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-gradient-to-b from-yellow-500 to-orange-600 p-8 rounded-2xl shadow-2xl text-center max-w-2xl mx-4 border-4 border-yellow-300 animate-bounce">
				<div className="mb-6">
					<h1 className="text-4xl font-dreamscape text-white mb-4">🏆 TOURNAMENT CHAMPION 🏆</h1>
					<div className="flex items-center justify-center gap-6">
						<img
							src={winner?.avatar || '../../../dist/assets/images/avatar.jpg'}
							alt="Champion"
							className="w-32 h-32 rounded-full border-4 border-yellow-300 shadow-lg"
						/>
						<div className="text-left">
							<h2 className="text-3xl font-dreamscape text-white mb-2">{winner?.name}</h2>
							<p className="text-yellow-100 text-lg">{winner?.achievement}</p>
							<p className="text-yellow-100">XP: {winner?.xp}</p>
						</div>
					</div>
				</div>
				<div className="space-y-2 animate-pulse">
					<p className="text-white text-xl font-dreamscape">CELESTIAL MASTER OF THE TOURNAMENT</p>
					<p className="text-yellow-200">Victory achieved in glorious combat!</p>
				</div>
			</div>
		</div>
	);

	const startSemiFinal1 = () => {
		setShowWarning(true);
		setTimeout(() => {
			setShowWarning(false);
			navigate('/local-game', {
				state: {
					mode,
					player1,
					player2,
					backgroundId,
					duration,
					ballSize,
					ballColor,
					paddleSize,
					tournamentRound: 'semifinal1'
				}
			});
			setTournamentState('semifinal1');
		}, 3000); // 3 seconds delay
	};

	const startSemiFinal2 = () => {
		setShowWarning(true);
		setTimeout(() => {
			setShowWarning(false);
			navigate('/local-game', {
				state: {
					mode,
					player1: player3,
					player2: player4,
					backgroundId,
					duration,
					ballSize,
					ballColor,
					paddleSize,
					tournamentRound: 'semifinal2'
				}
			});
			setTournamentState('semifinal2');
		}, 3000);
	};


	const startFinal = () => {
		if (!semiFinal1winner || !semiFinal2winner) return;

		setShowWarning(true);
		setTimeout(() => {
			setShowWarning(false);
			navigate('/local-game', {
				state: {
					mode,
					player1: semiFinal1winner,
					player2: semiFinal2winner,
					backgroundId,
					duration,
					ballSize,
					ballColor,
					paddleSize,
					tournamentRound: 'final'
				}
			});
		}, 3000);
	};

	useEffect(() => {
		if (finalWinner && tournamentState === 'completed') {
			setShowChampionCelebration(true);
			setTimeout(() => {
				setShowChampionCelebration(false);
			}, 5000);
		}
	}, [finalWinner, tournamentState]);

	const handleTournamentAction = () => {
		switch (tournamentState) {
			case 'not_started':
				startSemiFinal1();
				break;
			case 'semifinal1':
				// Wait for game to complete
				break;
			case 'semifinal2':
				startSemiFinal2();
				break;
			case 'final':
				startFinal();
				break;
			case 'completed':
				resetTournament();
				navigate('/dashboard'); // Or wherever you want to go after tournament
				break;
			default:
				break;
		}
	};

	const getButtonText = () => {
		switch (tournamentState) {
			case 'not_started':
				return 'Start Tournament';
			case 'semifinal1':
				return 'Playing Semifinal 1...';
			case 'semifinal2':
				return 'Start Semifinal 2';
			case 'final':
				return 'Start Final Match';
			case 'completed':
				return 'Tournament Complete';
			default:
				return 'Start Tournament';
		}
	};

	const handlePopState = useCallback(() => {
		if (tournamentState !== 'not_started' && tournamentState !== 'completed') {
			const confirmed = window.confirm('Tournament is in progress. Are you sure you want to leave?');
			if (confirmed) {
				resetTournament();
				navigate('/tournament-setup');
			} else {
				window.history.pushState(null, '', window.location.pathname);
			}
		}
	}, [tournamentState, resetTournament, navigate]);

	useEffect(() => {
		window.addEventListener('popstate', handlePopState);
		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [handlePopState]);



	useEffect(() => {
		// Check and store tournament data
		if (location.state && !tournamentData) {
			console.log('Setting tournament data from location state...');
			setTournamentData(location.state);
		}
		// Handle navigation if no data is available
		else if (!location.state && !tournamentData && tournamentState === 'not_started') {
			console.log('No tournament data found, navigating to setup...');
			navigate('/CustomTournament');
		}
	}, [location.state, tournamentData, setTournamentData, navigate, tournamentState]);

	if (!tournamentData) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-row items-start justify-center min-h-screen overflow-hidden" >

			{/* start missing part */}
			<div className="w-[35%] flex flex-col overflow-hidden  p-8">
				<div className=''>
					<h1 className='text-6xl font-dreamscape'
						style={{
							textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
						}}
					>
						CELESTIAL PONG CLASH
					</h1>
					<div className='flex flex-col justify-center'>
						<p className='text-gray-300 text-base font-medium text-justify pr-40'>
							The Celestial Pong Clash invites players from across the galaxy to compete in
							intense interstellar battles, where victory depends on mastering precision and
							strategy in the vast cosmic realm.
						</p>
					</div>
				</div>

				<div className='justify-center rounded-3xl mt-20 w-[60%] border border-white border-b-opacity-20'>
					<h2 className='text-2xl font-semibold flex items-center justify-center'>PLAYERS</h2>
					<div className="space-y-4 p-4 ">
						{
							players.map((player, index) => {
								return (
									<div
										key={index}
										className='user-container flex items-center justify-between font-dreamscape-sans
									rounded-md hover:bg-[rgba(183,170,156,0.2)]'>
										<div className='h-full flex items-center xl:gap-3 tb:gap-2 gap-1 w-[68%]'>
											<img
												src={player.avatar}
												className='h-16 rounded-full ring-1 ring-primary select-none'
												alt='user-image'
												loading='eager'
											/>
											<div className='flex flex-wrap items-center overflow-hidden'>
												<p className='text-primary nickname-size leading-[1] truncate mr-1'>
													{player.nickname}
												</p>
												<p className='text-achievement text-xs '> {player.achievement}</p>
											</div>
										</div>
										<div>

										</div>
										<div className='h-full mx-1 flex items-center'>
											<img
												src={player.icon}
												className='h-16 select-none'
												alt='achievement-icon'
												loading='eager'
											/>
											<p className={`xp text-primary leading-[1]`}>{`${player.xp}` + 'xp'}</p>
										</div>
									</div>
								)
							}
							)
						}
					</div>
				</div>
			</div>
			{/* end missing part */}

			{/* Champion celebration */}
			{showChampionCelebration && finalWinner && (
				<>
					<Confetti
						numberOfPieces={200}
						recycle={false}
						colors={['#FFD700', '#FFA500', '#FF8C00', '#FF7F50']}
					/>
					<ChampionCelebration winner={finalWinner} />
				</>
			)}

			{/* Warning Message */}
			{showWarning && (
				<MatchWarning
					player1Name={
						tournamentState === 'not_started' ? player1?.name :
							tournamentState === 'semifinal2' ? player3?.name :
								semiFinal1winner?.name
					}
					player2Name={
						tournamentState === 'not_started' ? player2?.name :
							tournamentState === 'semifinal2' ? player4?.name :
								semiFinal2winner?.name
					}
				/>
			)}

			<div className="flex flex-col border rounded-3xl mt-20 pb-8 pl-16 w-[800px] h-[1100px]">
				{/* first partie of tournament */}
				<div className=' flex-1 flex flex-row relative'>
					{/* first column */}
					<div className=' flex flex-col justify-around'>
						<div className=''>
							<img
								className={`w-24 h-24 rounded-full border-2 ${tournamentState === 'semifinal1' ? 'border-yellow-400' : 'border-white'
									}`}
								src='../../../dist/assets/images/avatar.jpg'
								alt="avatar"
							/>
							<p className='text-white text-center'>
								{player1.name}
							</p>
						</div>

						<div className=''>
							<img
								className={`w-24 h-24 rounded-full border-2 ${tournamentState === 'semifinal1' ? 'border-yellow-400' : 'border-white'
									}`}
								src='../../../dist/assets/images/avatar.jpg'
								alt="avatar"
							/>
							<p className='text-white text-center'>
								{player2.name}
							</p>
						</div>
					</div>
					{/* second column */}
					<div className='w-24 h-full flex flex-col'>
						<div className=' flex-1'></div>
						<div className='border-t-2 border-r-2 border-white flex-1'></div>
						<div className='border-b-2 border-r-2 border-white flex-1'></div>
						<div className='flex-1'></div>
					</div>

					{/* third column */}
					<div className='w-24 flex flex-col'>
						<div className='flex-1'></div>
						<div className='flex-1'></div>
						<div className='border-t-2 border-white flex-1'></div>
						<div className='flex-1'> </div>
					</div>

					{/* fourth column */}
					<div className=' w-24 flex flex-col'>
						<div className=' flex-1'></div>
						<div className='flex-1 flex flex-col justify-center items-center'>
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={semiFinal1winner ? '../../../dist/assets/images/avatar.jpg' : '../../../dist/assets/images/question_mark.jpeg'}
								alt="avatar"
							/>
							<p className='text-white text-center'>
								{semiFinal1winner ? semiFinal1winner.name : 'unknown'}
							</p>
						</div>
						<div className=' flex-1'> </div>
					</div>

					{/* fifth column */}
					<div className='w-24 h-full flex flex-col'>
						<div className=' flex-1'></div>
						<div className='flex-1'></div>
						<div className='border-t-2 border-r-2 border-white flex-1'></div>
						<div className='border-r-2 flex-1'></div>
					</div>

					{/* sixth column */}
					<div className='border-b border-white w-24 h-full flex flex-col'></div>

					{/* seventh column */}
					<div className='w-24 h-full flex flex-col absolute top-1/2 right-24 justify-center '>
						<img
							className="w-24 h-24 rounded-full border-2 border-white"
							src={finalWinner ? '../../../dist/assets/images/avatar.jpg' : '../../../dist/assets/images/question_mark.jpeg'}
							alt="avatar"
						/>
						<p className='text-white text-center'>
							{finalWinner ? finalWinner.name : 'unknown'}
						</p>
					</div>
				</div>


				{/* second partie of tournament */}
				<div className=' flex-1 flex flex-row'>
					{/* first column */}
					<div className=' flex flex-col justify-around'>
						<div className=''>
							<img
								className={`w-24 h-24 rounded-full border-2 ${tournamentState === 'semifinal1' ? 'border-yellow-400' : 'border-white'
									}`}
								src='../../../dist/assets/images/avatar.jpg'
								alt="avatar"
							/>
							<p className='text-white text-center'>
								{player3.name}
							</p>
						</div>

						<div className=''>
							<img
								className={`w-24 h-24 rounded-full border-2 ${tournamentState === 'semifinal1' ? 'border-yellow-400' : 'border-white'
									}`}
								src='../../../dist/assets/images/avatar.jpg'
								alt="avatar"
							/>
							<p className='text-white text-center'>
								{player4.name}
							</p>
						</div>
					</div>
					{/* second column */}
					<div className='w-24 h-full flex flex-col'>
						<div className=' flex-1'></div>
						<div className='border-t-2 border-r-2 border-white flex-1'></div>
						<div className='border-b-2 border-r-2 border-white flex-1'></div>
						<div className='flex-1'></div>
					</div>

					{/* third column */}
					<div className='w-24 flex flex-col'>
						<div className='flex-1'></div>
						<div className='flex-1'></div>
						<div className='border-t-2 border-white flex-1'></div>
						<div className='flex-1'> </div>
					</div>

					{/* fourth column */}
					<div className=' w-24 flex flex-col'>
						<div className=' flex-1'></div>
						<div className='mt-10 flex-1 flex-col justify-center items-center'>
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={semiFinal2winner ? '../../../dist/assets/images/avatar.jpg' : '../../../dist/assets/images/question_mark.jpeg'}
								alt="avatar"
							/>
							<p className='text-white text-center'>
								{semiFinal2winner ? semiFinal2winner.name : 'unknown'}
							</p>
						</div>
						<div className=' flex-1'> </div>
					</div>

					{/* fifth column */}
					<div className=' w-24 h-full flex flex-col'>
						<div className='border-r-2 flex-1'></div>
						<div className='border-b-2 border-r-2 flex-1'></div>
						<div className=' border-white flex-1'></div>
						<div className='flex-1'></div>
					</div>

					{/* sixth column */}
					<div className='border-t border-white w-24 h-full flex flex-col'>
					</div>
				</div>

				<div className='flex justify-center'>
					<Button className={
						'rounded-md  w-1/2 h-12 font-regular buttons-text remove-button'
					}
						onClick={handleTournamentAction}
						type='submit' >
						{getButtonText()}
					</Button>
				</div>
			</div>

		</div >
	)
}
export default Tournament;