import './Tournament.css'

import Confetti from 'react-confetti'
import Button from '../../components/Home/Buttons/Button'
import { useTournament } from '../../context/TournamentContext'
import MatchWarning from '../../components/Tournament/MatchWarning'
import ChampionCelebration from '../../components/Tournament/ChampionCelebration'

import { useEffect, useCallback, useState } from 'react'
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
		<section className='flex-1 parent tournament self-center w-[96%]'>
			{/* Description */}
			<div className='tournament-description lg:pt-24 pt-12 max-lp:mb-10'>
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
			<div className='tournament-history flex flex-col items-center gap-5'>
				<h3 className='font-dreamscape-sans text-light shadow'>SEMIFINAL</h3>
				{/* {Match 1 } */}
				<Match />
				{/* {Match 2 } */}
				<Match />
				<h3 className='font-dreamscape-sans text-light shadow'>FINAL</h3>
				{/* {Match 3 } */}
				<Match />
			</div>




			{/* Tournament Scheme */}
			<div className='tournament-scheme scheme-parent'>
				<div className='player1 flex items-center justify-center text-primary bg-border bg-opacity-20 rounded-md'>Player 1</div>
				<div className='player2 flex items-center justify-center text-primary bg-border bg-opacity-20 rounded-md'>Player 2</div>
				<div className='player3 flex items-center justify-center text-primary bg-border bg-opacity-20 rounded-md'>Player 3</div>
				<div className='player4 flex items-center justify-center text-primary bg-border bg-opacity-20 rounded-md'>Player 4</div>

				{/* path to final */}
				{/* Match 1 */}
				<div className='match1-part1 flex justify-center'>
					<div className='w-1/3 border-l-2 border-t-2 border-border'></div>
					<div className='w-1/3 border-r-2 border-t-2 border-border'></div>
				</div>
				<div className='match1-part2 flex'>
					<div className='flex-1 border-r-2 border-border'></div>
					<div className='flex-1 border-border'></div>
				</div>
				{/* Match 2 */}
				<div className='match2-part1 flex justify-center'>
					<div className='w-1/3 border-l-2 border-t-2 border-border'></div>
					<div className='w-1/3 border-r-2 border-t-2 border-border'></div>
				</div>
				<div className='match2-part2 flex'>
					<div className='flex-1 border-border'></div>
					<div className='flex-1 border-l-2 border-border'></div>
				</div>
				{/* Match 3 */}
				<div className='winner-match1 flex items-center justify-center text-center text-primary bg-border bg-opacity-20 rounded-md'>Winner from match 1</div>
				<div className='winner-match2 flex items-center justify-center text-center text-primary bg-border bg-opacity-20 rounded-md'>Winner from match 2</div>

				<div className='match3-part1 flex justify-center'>
					<div className='w-2/5 border-l-2 border-t-2 border-border'></div>
					<div className='w-2/5 border-r-2 border-t-2 border-border'></div>
				</div>
				<div className='match3-part2 flex'>
					<div className='flex-1 border-border'></div>
					<div className='flex-1 border-l-2 border-border'></div>
				</div>

				<div className='winner flex items-center justify-center text-primary bg-border bg-opacity-20 rounded-md'>Winner</div>

			</div>
		</section>
	)
}
export default Tournament

const Match = () => {
	return (
		<div className='round relative w-full h-20 bg-border bg-opacity-20 rounded-md flex justify-between items-center leading-none max-w-[500px]'>
			<div className='flex-1 flex justify-around'>
				<p className='font-dreamscape-sans'>Player 101</p>
				<p className='font-dreamscape'>7</p>
			</div>
			<div className='flex-1 flex justify-around'>
				<p className='font-dreamscape'>2</p>
				<p className='font-dreamscape-sans'>Player 202</p>
			</div>

			<div className='absolute flex items-center w-px rotate-12 h-full bg-border left-1/2 transform -translate-x-1/2'>
				<p className='vs text-light absolute left-1/2 transform -translate-x-1/2 font-dreamscape -rotate-12 z-10 shadow'>VS</p>
			</div>
		</div>
	)
}