// src/services/MatchmakingService.js
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

class MatchmakingService {
	constructor() {
		this.socket = null
		this.callbacks = {}
		this.handleMessage = this.handleMessage.bind(this)
		this.currentUserId = null
		this.tabId = this.generateTabId()

        this.setupTabCoordination();
	}

	generateTabId() {
        if (!sessionStorage.getItem('tabId')) {
            sessionStorage.setItem('tabId', Math.random().toString(36).substr(2, 9));
        }
        return sessionStorage.getItem('tabId');
    }

	setupTabCoordination() {
        // Listen for messages from other tabs
        window.addEventListener('storage', (event) => {
            if (event.key === 'activeMatchmakingTab') {
                const activeTab = JSON.parse(event.newValue);
                if (activeTab && activeTab.timestamp > Date.now() - 1000) {
                    if (activeTab.tabId !== this.tabId) {
                        // Another tab is handling matchmaking
                        this.close();
                        this.callbacks.onOtherTabMatchmaking?.();
                    }
                }
            }
        });
    }

	isConnected() {
        return this.socket?.readyState === WebSocket.OPEN;
    }

	close() {
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.close(1000, 'Normal closure')
			localStorage.removeItem('activeMatchmakingTab');
		}
	}

	// connect(userId) {
	// 	this.currentUserId = userId

	// 	// Close the existing connection if it exists
	// 	if (this.socket) {
	// 		this.socket.close()
	// 	}

	// 	this.socket = new WebSocket(`wss://localhost/ws/matchmaking/?user_id=${userId}`)

	// 	this.socket.onopen = () => {
	// 		console.log('Connected to matchmaking service')
	// 		this.callbacks.onConnect?.()
	// 	}

	// 	this.socket.onmessage = this.handleMessage
	// 	this.socket.onclose = () => {
	// 		console.log('Disconnected from matchmaking service')
	// 		this.callbacks.onDisconnect?.()
	// 		// Clear the stored user ID on disconnect
	// 		this.currentUserId = null
	// 	}
	// 	this.socket.onerror = (error) => console.error('Matchmaking error:', error)
	// }
	connect(userId) {
        // Check if another tab is already handling matchmaking
        const activeTab = JSON.parse(localStorage.getItem('activeMatchmakingTab'));
        if (activeTab && activeTab.timestamp > Date.now() - 1000 && activeTab.tabId !== this.tabId) {
            this.callbacks.onOtherTabMatchmaking?.();
            return;
        }

        this.currentUserId = userId;

        // Close existing connection if any
        if (this.socket) {
            this.socket.close();
        }

        // Mark this tab as active for matchmaking
        localStorage.setItem('activeMatchmakingTab', JSON.stringify({
            tabId: this.tabId,
            timestamp: Date.now()
        }));

        this.socket = new WebSocket(`wss://localhost/ws/matchmaking/?user_id=${userId}&tab_id=${this.tabId}`);

        this.socket.onopen = () => {
            console.log('Connected to matchmaking service');
            this.callbacks.onConnect?.();
        };

        this.socket.onmessage = this.handleMessage;
        this.socket.onclose = () => {
            console.log('Disconnected from matchmaking service');
            this.callbacks.onDisconnect?.();
            this.currentUserId = null;
            
            // Clean up active tab marker if this was the active tab
            const activeTab = JSON.parse(localStorage.getItem('activeMatchmakingTab'));
            if (activeTab && activeTab.tabId === this.tabId) {
                localStorage.removeItem('activeMatchmakingTab');
            }
        };
    }

	handleMessage(event) {
		try {
			const data = JSON.parse(event.data)
			console.log('Received message:', data)
			
            if (data.type === 'match_found' && data.tabId !== this.tabId) {
                // Another tab handled the match
                this.close();
                return;
            }


			switch (data.type) {
				case 'otherTabMatchmaking':  // Add this case
					this.callbacks.onOtherTabMatchmaking = callback;
					break
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
