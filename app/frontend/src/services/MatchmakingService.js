// src/services/MatchmakingService.js
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

class MatchmakingService {
	constructor() {
		this.socket = null;
		this.callbacks = {};
		this.handleMessage = this.handleMessage.bind(this);
		this.currentUserId = null;
	}

	connect(userId) {
		this.currentUserId = userId;

		this.socket = new WebSocket(
			`wss://localhost/ws/matchmaking/?user_id=${userId}`,
		);

		this.socket.onopen = () => {
			console.log('Connected to matchmaking service');
			this.callbacks.onConnect?.();
		};

		this.socket.onmessage = this.handleMessage;
		this.socket.onclose = () => {
			console.log('Disconnected from matchmaking service');
			this.callbacks.onDisconnect?.();
			// Clear the stored user ID on disconnect
			this.currentUserId = null;
		};
		this.socket.onerror = (error) =>
			console.error('Matchmaking error:', error);
	}

	handleMessage(event) {
		try {
			const data = JSON.parse(event.data);
			console.log('Received message:', data); // Debug log

			switch (data.type) {
				case 'status':
					this.callbacks.onStatus?.(data);
					break;
				case 'searching':
					this.callbacks.onSearching?.(data);
					break;
				case 'match_found':
					this.callbacks.onMatchFound?.(data);
					break;
				case 'cancelled':
					this.callbacks.onCancelled?.(data);
					break;
				case 'timeout':
					this.callbacks.onTimeout?.(data);
					break;
				case 'error':
					this.callbacks.onError?.(data);
					break;
			}
		} catch (error) {
			console.error('Error handling message:', error);
		}
	}

	findMatch() {
		this.send({
			type: 'find_match',
			user_id: this.currentUserId, // Send the user ID with the request
		});
	}

	cancelSearch() {
		this.send({
			type: 'cancel_match',
			user_id: this.currentUserId, // Send the user ID with the request
		});
	}

	send(data) {
		if (this.socket?.readyState === WebSocket.OPEN) {
			console.log('Sending message:', data);
			this.socket.send(JSON.stringify(data));
		} else {
			console.error('Socket is not open');
			this.callbacks.onError?.({
				type: 'error',
				message: 'Connection lost. Please refresh the page.',
			});
		}
	}

	on(event, callback) {
		switch (event) {
			case 'connect':
				this.callbacks.onConnect = callback;
				break;
			case 'disconnect':
				this.callbacks.onDisconnect = callback;
				break;
			case 'searching':
				this.callbacks.onSearching = callback;
				break;
			case 'match_found':
				this.callbacks.onMatchFound = callback;
				break;
			case 'cancelled':
				this.callbacks.onCancelled = callback;
				break;
			case 'error':
				this.callbacks.onError = callback;
				break;
			case 'timeout':
				this.callbacks.onTimeout = callback;
				break;
			case 'status':
				this.callbacks.onStatus = callback;
				break;
		}
	}

	disconnect() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	}
}

export default MatchmakingService;
