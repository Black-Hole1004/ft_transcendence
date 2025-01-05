import React from 'react'
import Button from '../../components/Home/Buttons/Button'
import { useLocation, useNavigate } from 'react-router-dom' // Make sure this is included
import { useTournament } from '../../context/TournamentContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import Confetti from 'react-confetti'
import ChampionCelebration from '../../components/Tournament/ChampionCelebration'
import MatchWarning from '../../components/Tournament/MatchWarning'

import Loader from '../../components/Loader/Loader'

const Tournament = () => {
	const navigate = useNavigate()
	const location = useLocation()

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
		resetTournament,
	} = useTournament()

	// Destructure data only if it exists
	const [showChampionCelebration, setShowChampionCelebration] = useState(false)

	const {
		mode,
		player1,
		player2,
		player3,
		player4,
		backgroundId,
		duration,
		ballSize,
		ballColor,
		paddleSize,
	} = tournamentData || {}

	const [showWarning, setShowWarning] = useState(false)

	const startSemiFinal1 = () => {
		setShowWarning(true)
		setTimeout(() => {
			setShowWarning(false)
			navigate('/local-game-tour', {
				state: {
					mode,
					player1,
					player2,
					backgroundId,
					duration,
					ballSize,
					ballColor,
					paddleSize,
					tournamentRound: 'semifinal1',
				},
			})
			setTournamentState('semifinal1')
		}, 3000) // 3 seconds delay
	}

	const startSemiFinal2 = () => {
		setShowWarning(true)
		setTimeout(() => {
			setShowWarning(false)
			navigate('/local-game-tour', {
				state: {
					mode,
					player1: player3,
					player2: player4,
					backgroundId,
					duration,
					ballSize,
					ballColor,
					paddleSize,
					tournamentRound: 'semifinal2',
				},
			})
			setTournamentState('semifinal2')
		}, 3000)
	}

	const startFinal = () => {
		if (!semiFinal1winner || !semiFinal2winner) return

		setShowWarning(true)
		setTimeout(() => {
			setShowWarning(false)
			navigate('/local-game-tour', {
				state: {
					mode,
					player1: semiFinal1winner,
					player2: semiFinal2winner,
					backgroundId,
					duration,
					ballSize,
					ballColor,
					paddleSize,
					tournamentRound: 'final',
				},
			})
		}, 3000)
	}

	useEffect(() => {
		if (finalWinner && tournamentState === 'completed') {
			setShowChampionCelebration(true)
			setTimeout(() => {
				setShowChampionCelebration(false)
			}, 5000)
		}
	}, [finalWinner, tournamentState])

	const handleTournamentAction = () => {
		switch (tournamentState) {
			case 'not_started':
				startSemiFinal1()
				break
			case 'semifinal1':
				// Wait for game to complete
				break
			case 'semifinal2':
				startSemiFinal2()
				break
			case 'final':
				startFinal()
				break
			case 'completed':
				resetTournament()
				navigate('/dashboard')
				break
			default:
				break
		}
	}

	const getButtonText = () => {
		switch (tournamentState) {
			case 'not_started':
				return 'Start Tournament'
			case 'semifinal1':
				return 'Playing Semifinal 1...'
			case 'semifinal2':
				return 'Start Semifinal 2'
			case 'final':
				return 'Start Final Match'
			case 'completed':
				return 'Tournament Complete'
			default:
				return 'Start Tournament'
		}
	}

	useEffect(() => {
		// Cleanup only when exiting tournament completely
		return () => {
			// Check if navigating to game or truly exiting
			if (!window.location.pathname.includes('local-game-tour')) {
				resetTournament()
				setTournamentData(null)
			}
		}
	}, [])

	useEffect(() => {
		// Check and store tournament data
		console.log(location.state)
		if (location.state && !tournamentData) {
			console.log('Setting tournament data from location state...')
			setTournamentData(location.state)
		}
		// Handle navigation if no data is available
		else if (!location.state && !tournamentData && tournamentState === 'not_started') {
			console.log('No tournament data found, navigating to setup...')
			navigate('/CustomTournament')
		}
	}, [location.state, tournamentData, setTournamentData, navigate, tournamentState])

	if (!tournamentData) {
		return <Loader />
	}

	return (
		<section className='flex justify-center'>
			<div className='flex flex-row items-start justify-center min-h-screen overflow-hidden'>
				{/* Champion celebration */}
				{showChampionCelebration && finalWinner && (
					<>
						<Confetti
							width={window.innerWidth}
							height={window.innerHeight}
							numberOfPieces={200}
							recycle={false}
							colors={['#FFD700', '#FFA500', '#FF8C00', '#FF7F50']}
						/>
						<ChampionCelebration winner={finalWinner} />
					</>
				)}

				{/* start missing part */}
				<div className='w-[35%] flex flex-col overflow-hidden  p-8'>
					<div className=''>
						<h1
							className='text-6xl font-dreamscape'
							style={{
								textShadow:
									'0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
							}}
						>
							CELESTIAL PONG CLASH
						</h1>
						<div className='flex flex-col justify-center'>
							<p className='text-gray-300 text-base font-medium text-justify pr-40'>
								The Celestial Pong Clash invites players from across the galaxy to
								compete in intense interstellar battles, where victory depends on
								mastering precision and strategy in the vast cosmic realm.
							</p>
						</div>
					</div>

				</div>
				{/* end missing part */}

				{/* Warning Message */}
				{showWarning && (
					<MatchWarning
						player1Name={
							tournamentState === 'not_started'
								? player1?.name
								: tournamentState === 'semifinal2'
									? player3?.name
									: semiFinal1winner?.name
						}
						player2Name={
							tournamentState === 'not_started'
								? player2?.name
								: tournamentState === 'semifinal2'
									? player4?.name
									: semiFinal2winner?.name
						}
					/>
				)}

				<div className='flex flex-col border rounded-3xl mt-20 pb-8 pl-16 w-[800px] h-[1100px]'>
					{/* first partie of tournament */}
					<div className=' flex-1 flex flex-row relative'>
						{/* first column */}
						<div className=' flex flex-col justify-around'>
							<div className=''>
								<img
									className={`w-24 h-24 rounded-full border-2 ${
										tournamentState === 'semifinal1'
											? 'border-yellow-400'
											: 'border-white'
									}`}
									src='../../../dist/assets/images/avatar.jpg'
									alt='avatar'
								/>
								<p className='text-white text-center'>{player1.name}</p>
							</div>

							<div className=''>
								<img
									className={`w-24 h-24 rounded-full border-2 ${
										tournamentState === 'semifinal1'
											? 'border-yellow-400'
											: 'border-white'
									}`}
									src='../../../dist/assets/images/avatar.jpg'
									alt='avatar'
								/>
								<p className='text-white text-center'>{player2.name}</p>
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
									className='w-24 h-24 rounded-full border-2 border-white'
									src={
										semiFinal1winner
											? '../../../dist/assets/images/avatar.jpg'
											: '../../../dist/assets/images/question_mark.jpeg'
									}
									alt='avatar'
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
								className='w-24 h-24 rounded-full border-2 border-white'
								src={
									finalWinner
										? '../../../dist/assets/images/avatar.jpg'
										: '../../../dist/assets/images/question_mark.jpeg'
								}
								alt='avatar'
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
									className={`w-24 h-24 rounded-full border-2 ${
										tournamentState === 'semifinal1'
											? 'border-yellow-400'
											: 'border-white'
									}`}
									src='../../../dist/assets/images/avatar.jpg'
									alt='avatar'
								/>
								<p className='text-white text-center'>{player3.name}</p>
							</div>

							<div className=''>
								<img
									className={`w-24 h-24 rounded-full border-2 ${
										tournamentState === 'semifinal1'
											? 'border-yellow-400'
											: 'border-white'
									}`}
									src='../../../dist/assets/images/avatar.jpg'
									alt='avatar'
								/>
								<p className='text-white text-center'>{player4.name}</p>
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
									className='w-24 h-24 rounded-full border-2 border-white'
									src={
										semiFinal2winner
											? '../../../dist/assets/images/avatar.jpg'
											: '../../../dist/assets/images/question_mark.jpeg'
									}
									alt='avatar'
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
						<div className='border-t border-white w-24 h-full flex flex-col'></div>
					</div>

					<div className='flex justify-center'>
						<Button
							className={'rounded-md  w-1/2 h-12 font-regular buttons-text remove-button'}
							onClick={handleTournamentAction}
							type='submit'
						>
							{getButtonText()}
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Tournament
