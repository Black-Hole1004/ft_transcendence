import './Tournament.css'

import Confetti from 'react-confetti'
import Button from '../../components/Home/Buttons/Button'
import { useTournament } from '../../context/TournamentContext'
import MatchWarning from '../../components/Tournament/MatchWarning'
import ChampionCelebration from '../../components/Tournament/ChampionCelebration'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom' // Make sure this is included
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
		tournamentScores
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

	// Update navigation to include score handling
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
		}, 3000)
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
		if (location.state && !tournamentData) {
			setTournamentData(location.state)
		}
		// Handle navigation if no data is available
		else if (!location.state && !tournamentData && tournamentState === 'not_started') {
			navigate('/CustomTournament')
		}
	}, [location.state, tournamentData, setTournamentData, navigate, tournamentState])






	if (!tournamentData) {
		return <Loader />
	}

	return (
		<section className='flex-1 parent tournament self-center w-[96%] max-lp:flex max-lp:flex-col max-lp:gap-10'>
			{showChampionCelebration && finalWinner && (
				<>
					<Confetti
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100vw',
							height: '100vh',
							zIndex: 30,
						}}
						recycle={false}
						numberOfPieces={500}
					/>
					<ChampionCelebration winner={finalWinner} />
				</>
			)}


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


			{/* Description */}
			<div className='tournament-description'>
				<h1
					className='font-dreamscape drop-shadow-[0_2px_10px_rgba(251,251,238,0.8)]'
				>
					CELESTIAL PONG CLASH
				</h1>
				<p className='description text-primary font-regular'>
					The Celestial Pong Clash invites players from across the galaxy to
					compete in intense interstellar battles, where victory depends on
					mastering precision and strategy in the vast cosmic realm.
				</p>
			</div>


			{/* Tournament History */}
			<div className='tournament-history flex flex-col items-center gap-5 max-lp:order-last'>
				<h3 className='font-dreamscape-sans text-light round'>SEMIFINAL</h3>
				{/* {Match 1 } */}
				<Match
					player1={player1?.name}
					player2={player2?.name}
					score1={tournamentScores.semifinal1.player1Score}
					score2={tournamentScores.semifinal1.player2Score}
				/>
				<Match
					player1={player3?.name}
					player2={player4?.name}
					score1={tournamentScores.semifinal2.player1Score}
					score2={tournamentScores.semifinal2.player2Score}
				/>
				<h3 className='font-dreamscape-sans text-light round'>FINAL</h3>
				<Match
					player1={semiFinal1winner?.name}
					player2={semiFinal2winner?.name}
					score1={tournamentScores.final.player1Score}
					score2={tournamentScores.final.player2Score}
				/>
				<Button
					className={`rounded font-medium round w-full max-w-[500px] py-3 mb-10 bg-[rgb(183,170,156,8%)] transition duration-200 ease-in hover:bg-[rgb(183,170,156,30%)]`}
					onClick={handleTournamentAction}
					type='submit'
				>
					{getButtonText()}
				</Button>
			</div>




			{/* Tournament Scheme */}
			<div className='tournament-scheme scheme-parent'>
				<div className='player1 flex items-center justify-center text-primary
					bg-border bg-opacity-20 rounded-md min-h-20 font-dreamscape-sans overflow-hidden'
					style={{
						border: `2px solid ${player1.color}`
					}}
				>{player1.name}</div>
				<div className='player2 flex items-center justify-center text-primary
					bg-border bg-opacity-20 rounded-md min-h-20 font-dreamscape-sans overflow-hidden'
					style={{
						border: `2px solid ${player2.color}`
					}}
				>{player2.name}</div>
				<div className='player3 flex items-center justify-center text-primary
					bg-border bg-opacity-20 rounded-md min-h-20 font-dreamscape-sans overflow-hidden'
					style={{
						border: `2px solid ${player3.color}`
					}}
				>{player3.name}</div>
				<div className='player4 flex items-center justify-center text-primary
					bg-border bg-opacity-20 rounded-md min-h-20 font-dreamscape-sans overflow-hidden'
					style={{
						border: `2px solid ${player4.color}`
					}}
				>{player4.name}</div>


				{/* path to final */}
				{/* Match 1 */}
				<div className='match1-part1 flex justify-center'>
					<div className='w-1/3'
						style={{
							borderLeft: `2px solid ${semiFinal1winner?.name === player1.name ? player1.color : '#646464'}`,
							borderTop: `2px solid ${semiFinal1winner?.name === player1.name ? player1.color : '#646464'}`
						}}
					></div>
					<div className='w-1/3'
						style={{
							borderRight: `2px solid ${semiFinal1winner?.name === player2.name ? player2.color : '#646464'}`,
							borderTop: `2px solid ${semiFinal1winner?.name === player2.name ? player2.color : '#646464'}`
						}}
					></div>
				</div>
				<div className='match1-part2 flex'>
					<div className='flex-1'
						style={{
							borderRight: `2px solid ${!semiFinal1winner ? '#646464' : semiFinal1winner?.name === player1.name ? player1.color : 'none'}`,
						}}
					></div>
					<div className='flex-1'
						style={{
							borderLeft: `2px solid ${semiFinal1winner?.name === player2.name ? player2.color : 'none'}`,
						}}
					></div>
				</div>


				{/* Match 2 */}
				<div className='match2-part1 flex justify-center'>
					<div className='w-1/3'
						style={{
							borderLeft: `2px solid ${semiFinal2winner?.name === player3.name ? player3.color : '#646464'}`,
							borderTop: `2px solid ${semiFinal2winner?.name === player3.name ? player3.color : '#646464'}`
						}}
					></div>
					<div className='w-1/3'
						style={{
							borderRight: `2px solid ${semiFinal2winner?.name === player4.name ? player4.color : '#646464'}`,
							borderTop: `2px solid ${semiFinal2winner?.name === player4.name ? player4.color : '#646464'}`
						}}
					></div>
				</div>
				<div className='match2-part2 flex'>
					<div className='flex-1'
						style={{
							borderRight: `2px solid ${!semiFinal2winner ? '#646464' : semiFinal2winner?.name === player3.name ? player3.color : 'none'}`,
						}}
					></div>
					<div className='flex-1'
						style={{
							borderLeft: `2px solid ${semiFinal2winner?.name === player4.name ? player4.color : 'none'}`,
						}}
					></div>
				</div>
				{/* Match 3 */}
				<div className='winner-match1 flex items-center justify-center text-center text-primary
					bg-border bg-opacity-20 rounded-md min-h-20 font-dreamscape-sans overflow-hidden'
					style={{
						border: `2px solid ${!semiFinal1winner ? '#646464' : semiFinal1winner.color}`,
						background: `url(${semiFinal1winner ? '' : '/assets/images/unknown.webp'})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						filter: `${!semiFinal1winner ? 'brightness(.6)' : ''}`,
					}}
				>{semiFinal1winner ? semiFinal1winner.name : 'unknown'}</div>
				<div className='winner-match2 flex items-center justify-center text-center text-primary
					bg-border bg-opacity-20 rounded-md min-h-20 font-dreamscape-sans overflow-hidden'
					style={{
						border: `2px solid ${!semiFinal2winner ? '#646464' : semiFinal2winner.color}`,
						background: `url(${semiFinal2winner ? '' : '/assets/images/unknown.webp'})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						filter: `${!semiFinal2winner ? 'brightness(.6)' : ''}`,
					}}
				>{semiFinal2winner ? semiFinal2winner.name : 'unknown'}</div>

				<div className='match3-part1 flex justify-center'>
					<div className='w-2/5'
						style={{
							borderLeft: `2px solid ${finalWinner && finalWinner?.name === semiFinal1winner?.name ? semiFinal1winner?.color : '#646464'}`,
							borderTop: `2px solid ${finalWinner && finalWinner?.name === semiFinal1winner?.name ? semiFinal1winner?.color : '#646464'}`
						}}
					></div>
					<div className='w-2/5'
						style={{
							borderRight: `2px solid ${finalWinner && finalWinner?.name === semiFinal2winner?.name ? semiFinal2winner?.color : '#646464'}`,
							borderTop: `2px solid ${finalWinner && finalWinner?.name === semiFinal2winner?.name ? semiFinal2winner?.color : '#646464'}`
						}}
					></div>
				</div>
				<div className='match3-part2 flex'>
					<div className='flex-1'
						style={{
							borderRight: `2px solid ${!finalWinner ? '#646464' : finalWinner?.name === semiFinal1winner?.name ? semiFinal1winner?.color : 'none'}`,
						}}
					></div>
					<div className='flex-1'
						style={{
							borderLeft: `2px solid ${finalWinner?.name === semiFinal2winner?.name ? semiFinal2winner?.color : 'none'}`,
						}}
					></div>
				</div>

				<div className='relative winner flex items-center justify-center text-primary
					bg-border bg-opacity-20 rounded-md min-h-20 font-dreamscape-sans'
					style={{
						border: `2px solid ${!finalWinner ? '#646464' : finalWinner.color}`,
						background: `url(${semiFinal2winner ? '' : '/assets/images/unknown.webp'})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						filter: `${!finalWinner ? 'brightness(.6)' : ''}`,
					}}
				>
					{finalWinner ? finalWinner.name : 'unknown'}
					{finalWinner && (
						<div className='flex items-center absolute mtb:-bottom-6 -bottom-2 mtb:-right-8 -right-2 w-1/2'>
							<img src="/assets/images/tournament-winner-badge.png"
								alt="winner badge"
							/>
							<p className='font-dreamscape text-light'>winner</p>
						</div>
					)}
				</div>

			</div>
		</section>
	)
}
export default Tournament

const Match = ({ player1, player2, score1, score2 }) => {
	return (
		<div className='round relative w-full lp:h-20 h-14 bg-border bg-opacity-20 rounded-md flex justify-between items-center leading-none max-w-[500px]'>
			<div className='flex-1 flex justify-around'>
				<p className='font-dreamscape-sans'>{player1}</p>
				<p className='font-dreamscape'>{score1 ?? '-'}</p>
			</div>
			<div className='flex-1 flex justify-around'>
				<p className='font-dreamscape'>{score2 ?? '-'}</p>
				<p className='font-dreamscape-sans'>{player2}</p>
			</div>

			<div className='absolute flex items-center w-px rotate-12 h-full bg-border left-1/2 transform -translate-x-1/2'>
				<p className='vs text-light absolute left-1/2 transform -translate-x-1/2 font-dreamscape -rotate-12 z-10'>VS</p>
			</div>
		</div>
	)
}