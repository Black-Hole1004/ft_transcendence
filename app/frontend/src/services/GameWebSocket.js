const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
// const HOSTNAME = import.meta.env.HOSTNAME

class GameWebSocket {
    constructor() {
        this.socket = null;
        this.callbacks = {};
        this.isConnected = false;
        this.connectionAttempts = 0;
        this.maxRetries = 1;
        this.reconnectTimeout = null;
        this.gameId = null;
        this.userId = null;
        this.playerNumber = null;
    }

    connect(gameId, playerNumber, userId) {
        if (!gameId || !userId) {
            return;
        }
        
        this.gameId = gameId;
        this.playerNumber = playerNumber;
        this.userId = userId;

        const HOSTNAME = VITE_BASE_URL.replace('https://', '');
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }

        try {
            const wsUrl = `wss://${HOSTNAME}/ws/game/${gameId}/`;

            if (this.socket) {
                this.socket.close();
                this.socket = null;
            }

            this.socket = new WebSocket(wsUrl); // Create WebSocket connection
            this.setupEventHandlers();

        } catch (error) {
            this.handleError(error);
        }
    }

    sendPlayerNumber() {    
        this.send({
            type: 'player_number_init',
            player_number: this.playerNumber,
            player_id: this.userId
        });
    }

    // Add handler for confirmation
    handlePlayerNumberConfirmed(data) {
        this.callbacks.player_number_confirmed?.(data);
    }

    setupEventHandlers() {
        this.socket.onopen = this.handleOpen.bind(this);
        this.socket.onclose = this.handleClose.bind(this);
        this.socket.onerror = this.handleError.bind(this);
        this.socket.onmessage = this.handleMessage.bind(this);
    }

    handleOpen() {
        this.isConnected = true;
        this.connectionAttempts = 0;
        this.callbacks.connect?.();

        // Send player number
        this.sendPlayerNumber();
    }

    handleClose(event) {
        this.isConnected = false;

        if (!event.wasClean && this.connectionAttempts < this.maxRetries) {
            this.connectionAttempts++;
            this.reconnectTimeout = setTimeout(() => this.connect(this.gameId), 1000);
        } else {
            this.callbacks.disconnect?.();
        }
    }

    handleError(error) {
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
                player_number_confirmed: this.handlePlayerNumberConfirmed.bind(this),
                game_state_update: this.handleGameStateUpdate.bind(this),
                paddles_update: this.handlePaddlesUpdate.bind(this),
                ball_update: this.handleBallUpdate.bind(this),
                score_update: this.handleScoreUpdate.bind(this),
                game_ended: this.handleGameEnded.bind(this),
                game_started: this.handleGameStarted.bind(this),
                game_paused: this.handleGamePaused.bind(this),
                game_resumed: this.handleGameResumed.bind(this),
                ready_players_count: this.handleReadyPlayersCount.bind(this),
                
                pause_timeout_warning: this.handlePauseTimeoutWarning.bind(this),
                player_temporary_disconnect: this.handleTemporaryDisconnect.bind(this),
                player_reconnected: this.handlePlayerReconnected.bind(this),

                game_restarted: this.handleGameRestarted.bind(this),

                player_disconnected: this.handlePlayerDisconnected.bind(this),
                waiting_for_player: this.handleWaitingForPlayer.bind(this),
                error: this.handleServerError.bind(this)
            };

            const handler = handlers[data.type];
            if (handler) {
                handler(data);
            }

        } catch (error) {
            this.handleError(error);
        }
    }

    // Message type handlers
    handleGameInfo(data) {
        this.callbacks.game_info?.(data);
    }


    handleGameStateUpdate(data) {
        this.callbacks.game_state_update?.(data);
    }

    handlePaddlesUpdate(data) {
        this.callbacks.paddles_update?.(data);
    }
    
    handleBallUpdate(data) {
        this.callbacks.ball_update?.(data);
    }

    handleScoreUpdate(data) {
        this.callbacks.score_update?.(data);
    }

    handleGameEnded(data) {
        this.callbacks.game_ended?.(data);
    }

    handleGameStarted(data) {
        this.callbacks.game_started?.(data);
    }

    handleGamePaused(data) {
        this.callbacks.game_paused?.(data);
    }

    handleGameResumed(data) {
        this.callbacks.game_resumed?.(data);
    }

    handleGameRestarted(data) {
        this.callbacks.game_restarted?.(data);
    }

    handlePlayerDisconnected(data) {
        this.callbacks.player_disconnected?.(data);
    }

    handleReadyPlayersCount(data) {
        this.callbacks.ready_players_count?.(data);
    }

    handleWaitingForPlayer(data) {
        this.callbacks.waiting_for_player?.(data);
    }

    handleServerError(data) {
        this.callbacks.error?.(new Error(data.message));
    }

    handlePauseTimeoutWarning(data) {
        this.callbacks.pause_timeout_warning?.(data);
    }
    
    handleTemporaryDisconnect(data) {
        this.callbacks.player_temporary_disconnect?.(data);
    }
    
    handlePlayerReconnected(data) {
        this.callbacks.player_reconnected?.(data);
    }

    // Send methods
    send(data) {
        if (!this.isSocketConnected()) {
            return;
        }

        try {
            this.socket.send(JSON.stringify(data));
        } catch (error) {
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
        this.send({
            type: 'player_ready'
        });
    }

    sendStartGame() {
        this.send({ 
            type: 'start_game' 
        });
    }

    sendRestartGame() {
        this.send({ 
            type: 'restart_game' 
        });
    }

    // Utility methods
    on(event, callback) {
        if (typeof callback !== 'function') {
            return;
        }
        this.callbacks[event] = callback;
    }

    off(event) {
        if (this.callbacks[event]) {
            delete this.callbacks[event];
        }
    }

    disconnect() {
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