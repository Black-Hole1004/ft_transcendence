// src/services/MatchmakingService.js
class MatchmakingService {
    constructor() {
        this.socket = null;
        this.callbacks = {};
        this.handleMessage = this.handleMessage.bind(this);
    }

    connect() {
        const token = localStorage.getItem('access_token');
        this.socket = new WebSocket(
            `ws://localhost:8000/ws/matchmaking/`
        );
        
        this.socket.onopen = () => {
            console.log('Connected to matchmaking service');
            this.callbacks.onConnect?.();
        };
        
        this.socket.onmessage = this.handleMessage;
        this.socket.onclose = () => this.callbacks.onDisconnect?.();
        this.socket.onerror = (error) => console.error('Matchmaking error:', error);
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
            type: 'find_match'
        });
    }

    cancelSearch() {
        this.send({
            type: 'cancel_match'
        });
    }

    send(data) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            console.log('Sending message:', data); // Debug log
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('Socket is not open');
        }
    }

    on(event, callback) {
        switch(event) {
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