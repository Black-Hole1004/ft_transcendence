// src/services/MatchmakingService.js
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
// const HOSTNAME = import.meta.env.HOSTNAME

class MatchmakingService {
	constructor() {
		this.socket = null
		this.callbacks = {}
		this.handleMessage = this.handleMessage.bind(this)
		this.currentUserId = null
	}

	isConnected() {
        return this.socket?.readyState === WebSocket.OPEN;
    }

	close() {
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.close(1000, 'Normal closure')
		}
	}

	connect(userId) {
		this.currentUserId = userId

		// Close the existing connection if it exists
		if (this.socket) {
			this.socket.close()
		}
		const HOSTNAME = VITE_BASE_URL.replace('https://', '')

		this.socket = new WebSocket(`wss://${HOSTNAME}/ws/matchmaking/?user_id=${userId}`)

		this.socket.onopen = () => {
			console.log('Connected to matchmaking service')
			this.callbacks.onConnect?.()
		}

		this.socket.onmessage = this.handleMessage
		this.socket.onclose = () => {
			console.log('Disconnected from matchmaking service')
			this.callbacks.onDisconnect?.()
			// Clear the stored user ID on disconnect
			this.currentUserId = null
		}
		this.socket.onerror = (error) => console.error('Matchmaking error:', error)
	}

	handleMessage(event) {
		try {
			const data = JSON.parse(event.data)
			console.log('Received message:', data)

			switch (data.type) {
				case 'status':
					this.callbacks.onStatus?.(data)
					break
				case 'searching':
					this.callbacks.onSearching?.(data)
					break
				case 'match_found':
					this.callbacks.onMatchFound?.(data)
					break
				case 'direct_match':
					this.callbacks.onDirectMatch?.(data)
					break
				case 'cancelled':
					this.callbacks.onCancelled?.(data)
					break
				case 'timeout':
					this.callbacks.onTimeout?.(data)
					break
				case 'error':
					// Handle specific error messages
					if (data.message.includes('already in a game')) {
						this.callbacks.onInGame?.(data)
					} else if (data.message.includes('Already searching')) {
						this.callbacks.onAlreadySearching?.(data)
					} else {
						this.callbacks.onError?.(data)
					}
					break
			}
		} catch (error) {
			console.error('Error handling message:', error)
		}
	}

	findMatch() {
		this.send({
			type: 'find_match', // Current random match
			user_id: this.currentUserId, // Send the user ID with the request
		})
	}

    initiateDirectMatch(invitationId, currentUserId) {
        this.send({
            type: 'direct_match',
            invitation_id: invitationId,
            current_user_id: currentUserId,
        });
    }

	cancelSearch() {
		this.send({
			type: 'cancel_match',
			user_id: this.currentUserId, // Send the user ID with the request
		})
	}

	send(data) {
		if (this.socket?.readyState === WebSocket.OPEN) {
			console.log('Sending message:', data)
			this.socket.send(JSON.stringify(data))
		} else {
			console.error('Socket is not open')
			this.callbacks.onError?.({
				type: 'error',
				message: 'Connection lost. Please refresh the page.',
			})
		}
	}

	on(event, callback) {
		switch (event) {
			case 'connect':
				this.callbacks.onConnect = callback
				break
			case 'disconnect':
				this.callbacks.onDisconnect = callback
				break
			case 'searching':
				this.callbacks.onSearching = callback
				break
			case 'match_found':
				this.callbacks.onMatchFound = callback
				break
			case 'direct_match':
				this.callbacks.onDirectMatch = callback
				break
			case 'cancelled':
				this.callbacks.onCancelled = callback
				break
			case 'error':
				this.callbacks.onError = callback
				break
			case 'timeout':
				this.callbacks.onTimeout = callback
				break
			case 'status':
				this.callbacks.onStatus = callback
				break
			case 'inGame':
				this.callbacks.onInGame = callback
				break
			case 'alreadySearching':
				this.callbacks.onAlreadySearching = callback
				break
		}
	}

	disconnect() {
		if (this.socket) {
			this.socket.close()
			this.socket = null
		}
	}
}

export default MatchmakingService
