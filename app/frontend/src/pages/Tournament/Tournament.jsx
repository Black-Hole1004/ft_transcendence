import './Tournament.css'

import Confetti from 'react-confetti'
import Button from '../../components/Home/Buttons/Button'
import { useTournament } from '../../context/TournamentContext'
import MatchWarning from '../../components/Tournament/MatchWarning'
import ChampionCelebration from '../../components/Tournament/ChampionCelebration'

import { useEffect, useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom' // Make sure this is included
import Loader from '../../components/Loader/Loader'

const players = [
	{
		id: '1',
		nickname: 'MOUAD55',
		achievement: 'CELESTIAL MASTER',
		rankClass: 'text-orange-400',
		xp: 12456,
		avatar: '../../../dist/assets/images/moudrib.jpeg',
		icon: '../../../dist/assets/images/Achievements/celestial-master.png',
	},
	{
		id: '2',
		nickname: 'ARABIAI',
		achievement: 'CELESTIAL MASTER',
		rankClass: 'text-orange-400',
		xp: 11648,
		avatar: '../../../dist/assets/images/tabi3a.jpeg',
		icon: '../../../dist/assets/images/Achievements/galactic-trailblazer.png',
	},
	{
		id: '3',
		nickname: 'AHMAYMOU',
		achievement: 'CELESTIAL MASTER',
		rankClass: 'text-orange-400',
		xp: 10231,
		avatar: '../../../dist/assets/images/lmoudir.jpg',
		icon: '../../../dist/assets/images/Achievements/stellar-voyager.png',
	},
	{
		id: '4',
		nickname: 'PLAYER1',
		achievement: 'GALACTIC TRAILBLAZER',
		rankClass: 'text-cyan-400',
		xp: 9153,
		avatar: '../../../dist/assets/images/ahaloui.jpeg',
		icon: '../../../dist/assets/images/Achievements/cosmic-explorer.png',
	},
	{
		id: '1',
		nickname: 'MOUAD55',
		achievement: 'CELESTIAL MASTER',
		rankClass: 'text-orange-400',
		xp: 12456,
		avatar: '../../../dist/assets/images/moudrib.jpeg',
		icon: '../../../dist/assets/images/Achievements/celestial-master.png',
	},
	{
		id: '2',
		nickname: 'ARABIAI',
		achievement: 'CELESTIAL MASTER',
		rankClass: 'text-orange-400',
		xp: 11648,
		avatar: '../../../dist/assets/images/tabi3a.jpeg',
		icon: '../../../dist/assets/images/Achievements/galactic-trailblazer.png',
	},
	{
		id: '3',
		nickname: 'AHMAYMOU',
		achievement: 'CELESTIAL MASTER',
		rankClass: 'text-orange-400',
		xp: 10231,
		avatar: '../../../dist/assets/images/lmoudir.jpg',
		icon: '../../../dist/assets/images/Achievements/stellar-voyager.png',
	},
	{
		id: '4',
		nickname: 'PLAYER1',
		achievement: 'GALACTIC TRAILBLAZER',
		rankClass: 'text-cyan-400',
		xp: 9153,
		avatar: '../../../dist/assets/images/ahaloui.jpeg',
		icon: '../../../dist/assets/images/Achievements/cosmic-explorer.png',
	},
]

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
		<section className='tournament w-[96%] flex justify-center'>
			<div className='lp:w-[33%] w-full overflow-hidden py-8'>
				<h1
					className='font-dreamscape drop-shadow-[0_2px_10px_rgba(251,251,238,0.8)]'
				>
					CELESTIAL PONG CLASH
				</h1>
				<p className='description text-primary font-regular text-justify'>
					The Celestial Pong Clash invites players from across the galaxy to
					compete in intense interstellar battles, where victory depends on
					mastering precision and strategy in the vast cosmic realm.
				</p>
				<div className='flex flex-col items-center gap-5'>
					<h3 className='font-dreamscape-sans'>SEMIFINAL</h3>
					{/* {Match 1 } */}
					<Match />
					{/* {Match 2 } */}
					<Match />
					<h3 className='font-dreamscape-sans'>FINAL</h3>
					{/* {Match 3 } */}
					<Match />
				</div>
			</div>
			<div className='flex-1'>
			</div>
		</section>
	)
}
export default Tournament

const Match = () => {
	return (
		<div className='w-full h-20 bg-border bg-opacity-20 rounded flex justify-center'>
			<div className='relative flex items-center w-px rotate-12 h-full bg-border'>
				<p className='absolute left-1/2 transform -translate-x-1/2 font-dreamscape -rotate-12 z-10'>VS</p>
			</div>
		</div>
	)
}