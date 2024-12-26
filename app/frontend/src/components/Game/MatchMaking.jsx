import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MatchmakingService from '../../services/MatchmakingService'
import './MatchMaking.css'
import MatchFoundDisplay from './MatchFoundDisplay'
import SearchingAnimation from './Remote/SearchingAnimation'

const Matchmaking = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [status, setStatus] = useState('connecting')
	const [matchData, setMatchData] = useState(null)
	const [matchmakingService] = useState(new MatchmakingService())
	const [count, setCountdown] = useState(5)

	useEffect(() => {
		const currentUserId = location.state?.currentUser?.id

		if (currentUserId === undefined) {
			console.error('No user ID provided in location state')
			navigate('/dashboard')
			return
		}

		matchmakingService.connect(currentUserId)

		matchmakingService.on('connect', () => {
			setStatus('connected')
			matchmakingService.findMatch()
		})

		matchmakingService.on('error', (error) => {
			console.error('Matchmaking error:', error)
			setStatus('error')
		})

		matchmakingService.on('timeout', (data) => {
			console.log('Search timeout:', data)
			setStatus('timeout')
		})

		matchmakingService.on('searching', (data) => {
			setStatus('searching')
		})

		matchmakingService.on('match_found', async (data) => {
			setStatus('match_found')
			setMatchData(data)

			if (!data.game_id) {
				console.error('Server did not provide game_id')
				setStatus('error')
				return
			}

			const backgroundId = location.state?.backgroundId || 1

			// Start countdown
			for (let i = 5; i > 0; i--) {
				setCountdown(i)
				await new Promise((r) => setTimeout(r, 1000))
			}

			navigate('/remote-game', {
				state: {
					playerNumber: data.player_number,
					gameId: data.game_id,
					opponent: data.opponent,
					currentUser: data.current_user,
					backgroundId: backgroundId,
				},
			})
		})

		return () => {
			matchmakingService.disconnect()
		}
	}, [])

	const handleCancel = () => {
		console.log('Cancelling search')
		matchmakingService.cancelSearch()
		navigate('/dashboard')
	}

	return (
		<div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary flex flex-col items-center justify-center'>
			{status === 'match_found' ? (
				<MatchFoundDisplay matchData={matchData} countdown={count} />
			) : status === 'timeout' ? (
				<div className='w-1/3 min-w-[400px]'>
					<div className='w-full flex flex-col items-center gap-8 bg-backdrop-80 p-12 rounded-lg shadow-xl'>
						<h2 className='text-3xl font-bold'>Time Out</h2>
						<p>No opponent found at the moment. Please try again later.</p>
						<button
							onClick={() => navigate('/custom')}
							className='px-8 py-3 bg-primary text-backdrop-80 rounded-lg hover:bg-opacity-90 transition-all font-bold'
						>
							Back to Menu
						</button>
					</div>
				</div>
			) : (
				<div className='w-1/3 min-w-[400px] flex flex-col items-center'>
					<div className='flex-grow flex items-center justify-center relative'>
						{status === 'searching' ? (
							<div className='absolute inset-0 flex items-center justify-center z-10'>
								<SearchingAnimation handleCancel={handleCancel}/> {/* Animation in the middle */}
							</div>
						) : null}
					</div>
				</div>
			)}
            {/* Cancel button */}
			{/* <button
				onClick={handleCancel}
				className='px-8 py-3 bg-primary text-backdrop-80 rounded-lg hover:bg-opacity-90 transition-all mb-4'
			>
				Cancel
			</button> */}
		</div>
	)
}

export default Matchmaking
