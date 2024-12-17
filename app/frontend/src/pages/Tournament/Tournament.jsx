import React from 'react';
import Button from '../../components/Home/Buttons/Button';
import { useLocation, useNavigate } from 'react-router-dom' // Make sure this is included
import { useTournament } from '../../context/TournamentContext';
import { useEffect } from 'react';
import { useState } from 'react';


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

	// Add this right after your context destructuring
	useEffect(() => {
		if (location.state && !tournamentData) {
			setTournamentData(location.state);
		}
	}, [location.state, tournamentData, setTournamentData]);

	// And update your loading check to redirect to setup
	useEffect(() => {
		if (!tournamentData) {
			// 
		}
	}, [tournamentData, navigate]);

	// Then change your loading check to
	if (!tournamentData) {
		return null;
	}

	return (
		<div className="flex flex-row items-start justify-center min-h-screen overflow-hidden" >

			{/* start missing part */}

			{/* end missing part */}

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