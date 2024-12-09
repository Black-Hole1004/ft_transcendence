class GameWebSocket {
    constructor() {
        this.socket = null;
        this.callbacks = {};
        this.isConnected = false;
        this.connectionAttempts = 0;
        this.maxRetries = 1;
        this.reconnectTimeout = null;
        this.gameId = null;
        this.playerNumber = null;
    }

    connect(gameId) {
        if (!gameId) {
            console.error('No game ID provided');
            return;
        }
        
        this.gameId = gameId;

        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }

        try {
            const wsUrl = `ws://localhost:8000/ws/game/${gameId}/`;
            console.log('Attempting to connect to:', wsUrl);

            if (this.socket) {
                this.socket.close();
                this.socket = null;
            }

            this.socket = new WebSocket(wsUrl);
            this.setupEventHandlers();

        } catch (error) {
            console.error('Error creating WebSocket:', error);
            this.handleError(error);
        }
    }

    setupEventHandlers() {
        this.socket.onopen = this.handleOpen.bind(this);
        this.socket.onclose = this.handleClose.bind(this);
        this.socket.onerror = this.handleError.bind(this);
        this.socket.onmessage = this.handleMessage.bind(this);
    }

    handleOpen() {
        console.log(`Connected to game ${this.gameId} through WebSocket successfully`);
        this.isConnected = true;
        this.connectionAttempts = 0;
        this.callbacks.connect?.();
    }

    handleClose(event) {
        this.isConnected = false;
        console.log(`Disconnected from game ${this.gameId}`, {
            wasClean: event.wasClean,
            code: event.code,
            reason: event.reason,
            connectionAttempts: this.connectionAttempts
        });

        if (!event.wasClean && this.connectionAttempts < this.maxRetries) {
            console.log(`Attempting reconnect ${this.connectionAttempts + 1}/${this.maxRetries}`);
            this.connectionAttempts++;
            this.reconnectTimeout = setTimeout(() => this.connect(this.gameId), 1000);
        } else {
            console.log('Not attempting reconnect:', {
                wasClean: event.wasClean,
                maxRetriesReached: this.connectionAttempts >= this.maxRetries
            });
            this.callbacks.disconnect?.();
        }
    }

    handleError(error) {
        console.error(`WebSocket error for game ${this.gameId}:`, error);
        this.callbacks.error?.(error);
    }

    handleMessage(event) {
        try {
            const data = JSON.parse(event.data);

            if (data.type === 'game_info') {
                this.playerNumber = data.player_number;
            }

            const handlers = {
                game_info: this.handleGameInfo.bind(this),
                game_state_update: this.handleGameStateUpdate.bind(this),
                paddles_update: this.handlePaddlesUpdate.bind(this),
                ball_update: this.handleBallUpdate.bind(this),
                score_update: this.handleScoreUpdate.bind(this),
                game_ended: this.handleGameEnded.bind(this),
                game_started: this.handleGameStarted.bind(this),
                game_paused: this.handleGamePaused.bind(this),
                game_resumed: this.handleGameResumed.bind(this),
                game_restarted: this.handleGameRestarted.bind(this),
                player_disconnected: this.handlePlayerDisconnected.bind(this),
                waiting_for_player: this.handleWaitingForPlayer.bind(this),
                error: this.handleServerError.bind(this)
            };

            const handler = handlers[data.type];
            if (handler) {
                handler(data);
            } else {
                console.warn('Unknown message type:', data.type);
            }

        } catch (error) {
            console.error('Error handling message:', error);
            this.handleError(error);
        }
    }

    // Message type handlers
    handleGameInfo(data) {
        console.log('Handling game info:', data);
        this.callbacks.game_info?.(data);
    }


    handleGameStateUpdate(data) {
        console.log('Handling game state update:', data);
        this.callbacks.game_state_update?.(data);
    }

    handlePaddlesUpdate(data) {
        console.log('Handling paddle update:', data);
        this.callbacks.paddles_update?.(data);
    }
    
    handleBallUpdate(data) {
        console.log('Handling ball update:', data);
        this.callbacks.ball_update?.(data);
    }

    handleScoreUpdate(data) {
        console.log('Handling score update:', data);
        this.callbacks.score_update?.(data);
    }

    handleGameEnded(data) {
        console.log('Handling game ended:', data);
        this.callbacks.game_ended?.(data);
    }

    handleGameStarted(data) {
        console.log('Handling game started:', data);
        this.callbacks.game_started?.(data);
    }

    handleGamePaused(data) {
        console.log('Handling game paused:', data);
        this.callbacks.game_paused?.(data);
    }

    handleGameResumed(data) {
        console.log('Handling game resumed:', data);
        this.callbacks.game_resumed?.(data);
    }

    handleGameRestarted(data) {
        console.log('Handling game restarted:', data);
        this.callbacks.game_restarted?.(data);
    }

    handlePlayerDisconnected(data) {
        console.log('Handling player disconnected:', data);
        this.callbacks.player_disconnected?.(data);
    }

    handleWaitingForPlayer(data) {
        console.log('Handling waiting for player:', data);
        this.callbacks.waiting_for_player?.(data);
    }

    handleServerError(data) {
        console.log('Handling server error:', data);
        this.callbacks.error?.(new Error(data.message));
    }

    // Send methods
    send(data) {
        if (!this.isSocketConnected()) {
            console.error('Cannot send message: socket is not connected');
            return;
        }

        try {
            console.log('Sending message:', data);
            this.socket.send(JSON.stringify(data));
        } catch (error) {
            console.error('Error sending message:', error);
            this.handleError(error);
        }
    }


    sendPaddleMove(action) {  // action will be 'startUp', 'startDown', 'stopUp', or 'stopDown'
        this.send({
            type: 'paddle_direction',
            action: action
        });
    }

    sendPlayerReady() {
        console.log('Sending player ready');
        this.send({
            type: 'player_ready'
        });
    }

    sendStartGame() {
        console.log('Sending start game');
        this.send({ 
            type: 'start_game' 
        });
    }

    sendRestartGame() {
        console.log('Sending restart game');
        this.send({ 
            type: 'restart_game' 
        });
    }

    // Utility methods
    on(event, callback) {
        if (typeof callback !== 'function') {
            console.error('Callback must be a function');
            return;
        }
        console.log('Registering callback for event:', event);
        this.callbacks[event] = callback;
    }

    disconnect() {
        console.log('Disconnecting WebSocket');
        this.maxRetries = 0; // Prevent reconnection attempts
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
        if (this.socket) {
            this.isConnected = false;
            this.socket.close();
            this.socket = null;
        }
    }

    isSocketConnected() {
        return this.isConnected && this.socket?.readyState === WebSocket.OPEN;
    }

    getPlayerNumber() {
        return this.playerNumber;
    }
}

export default GameWebSocket;