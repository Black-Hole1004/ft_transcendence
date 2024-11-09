import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MatchmakingService from '../../services/MatchmakingService'
import './MatchMaking.css'
import Player from './Player'

const Matchmaking = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [status, setStatus] = useState('connecting')
	const [matchmakingService] = useState(new MatchmakingService())

	// Log the incoming state
	console.log('Matchmaking received state:', location.state)

	useEffect(() => {
		const settings = location.state?.settings
		console.log('Initializing matchmaking with settings:', settings)

		// Initialize matchmaking service
		matchmakingService.connect()

		matchmakingService.on('connect', () => {
			console.log('Connected to matchmaking service')
			setStatus('connected')
			matchmakingService.findMatch(settings)
		})

		matchmakingService.on('searching', (data) => {
			console.log('Searching for opponent:', data)
			setStatus('searching')
		})

		matchmakingService.on('match_found', (data) => {
			console.log('Match found with data:', data)

			// Add validation for game_id
			if (!data.game_id) {
				console.error('Server did not provide game_id')
				setStatus('error')
				return
			}
			// Get settings location state
			const settings = location.state?.settings || {
				// Default settings if none provided
				backgroundId: 1,
				paddleHeight: 110,
				ballRadius: 15,
				powerUps: 1,
				attacks: 1,
				Player1Color: '#ffffff',
				Player2Color: '#ffffff',
				BallColor: '#ffffff',
				duration: 30,
			}

			// Navigate to remote game with validated data
			navigate('/remote-game', {
				state: {
					gameId: data.game_id,
					playerId: data.player_id, // Assuming server sends which player we are
					settings: {
						...settings,
						// Add any additional settings from server if needed
						playerInfo: {
							player1: data.player1, // Server might send player information
							player2: data.player2,
						},
						// You can add more game-specific settings here
					},
					matchData: {
						// Include any additional match data from server
						matchId: data.match_id,
						startTime: data.start_time,
						gameMode: data.mode,
						// Add any other relevant match data
					},
				},
			})
		})

		return () => {
			console.log('Cleaning up matchmaking')
			matchmakingService.disconnect()
		}
	}, [])

	const handleCancel = () => {
		console.log('Cancelling search')
		matchmakingService.cancelSearch()
		navigate('/remote-game-setup')
	}

	return (
		<div className='matchmaking-container'>
			<div className='matchmaking-content'>
				<h2>Finding Opponent</h2>
				<div className='status-message'>
					{status === 'connecting' && 'Connecting to server...'}
					{status === 'connected' && 'Connected, starting search...'}
					{status === 'searching' && 'Searching for opponent...'}
					{status === 'error' && 'Error finding match'}
				</div>

				{/* Loading animation */}
				<div className='loading-indicator'>
					<div className='paddle left'></div>
					<div className='ball'></div>
					<div className='paddle right'></div>
				</div>

				<button onClick={handleCancel} className='cancel-button'>
					Cancel
				</button>

				{/* Debug info */}
				<div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
					<p>Current Status: {status}</p>
					<p>WebSocket State: {matchmakingService.socket?.readyState}</p>
				</div>
			</div>
		</div>
	)
}

export default Matchmaking
