// app/frontend/src/services/GameWebSocket.js
// class GameWebSocket {
//     constructor() {
//         this.socket = null;
//         this.callbacks = {};
//         this.isConnected = false;
//         this.gameId = null;
//         this.playerNumber = null;
//     }

//     connect(gameId) {
//         if (!gameId) {
//             console.error('No game ID provided');
//             return;
//         }
        
//         this.gameId = gameId;

//         try {
//             const wsUrl = `ws://localhost:8000/ws/game/${gameId}/`;
//             console.log('Attempting to connect to:', wsUrl);

//             if (this.socket) {
//                 this.socket.close();
//                 this.socket = null;
//             }

//             this.socket = new WebSocket(wsUrl);
//             this.setupEventHandlers();

//         } catch (error) {
//             console.error('Error creating WebSocket:', error);
//             this.handleError(error);
//         }
//     }

//     setupEventHandlers() {
//         this.socket.onopen = this.handleOpen.bind(this);
//         this.socket.onclose = this.handleClose.bind(this);
//         this.socket.onerror = this.handleError.bind(this);
//         this.socket.onmessage = this.handleMessage.bind(this);
//     }

//     handleOpen() {
//         console.log(`Connected to game ${this.gameId} through WebSocket successfully`);
//         this.isConnected = true;
//         this.connectionAttempts = 0;
//         this.callbacks.connect?.();
//     }

//     handleClose(event) {
//         this.isConnected = false;
//         console.log(`Disconnected from game ${this.gameId}`, event);
// 		// Don't attempt to reconnect if the socket was manually closed
// 		if (event?.wasClean || this.connectionAttempts >= this.maxRetries) {
// 			return;  // If closed cleanly or max retries reached, don't reconnect
// 		}

//         if (this.connectionAttempts < this.maxRetries) {
//             console.log(`Attempting reconnect ${this.connectionAttempts + 1}/${this.maxRetries}`);
//             this.connectionAttempts++;
//             this.reconnectTimeout = setTimeout(() => this.connect(this.gameId), 1000);
//         } else {
//             console.log('Max reconnection attempts reached');
//             this.callbacks.disconnect?.();
//         }
//     }

//     handleError(error) {
//         console.error(`WebSocket error for game ${this.gameId}:`, error);
//         this.callbacks.error?.(error);
//     }

//     handleMessage(event) {
//         try {
//             if (!event?.data) {
//                 console.warn('Received invalid message event');
//                 return;
//             }

//             const data = JSON.parse(event.data);
//             console.log('Received game message:', data);

//             // Store player number when received
//             if (data.type === 'game_info') {
//                 this.playerNumber = data.player_number;
//             }

//             // Handle different message types
//             const handlers = {
//                 game_info: this.handleGameInfo.bind(this),
//                 state_update: this.handleStateUpdate.bind(this),
//                 paddle_update: this.handlePaddleUpdate.bind(this),
//                 game_countdown: this.handleGameCountdown.bind(this),
//                 game_paused: this.handleGamePaused.bind(this),
//                 game_resumed: this.handleGameResumed.bind(this),
//                 game_ended: this.handleGameEnded.bind(this),
//                 game_restarted: this.handleGameRestarted.bind(this),
//                 player_disconnected: this.handlePlayerDisconnected.bind(this),
//                 waiting_for_player: this.handleWaitingForPlayer.bind(this),
//                 error: this.handleServerError.bind(this)
//             };

//             const handler = handlers[data.type];
//             if (handler) {
//                 handler(data);
//             } else {
//                 console.warn('Unknown message type:', data.type);
//             }

//         } catch (error) {
//             console.error('Error handling message:', error);
//             this.handleError(error);
//         }
//     }

//     // Message handlers
//     handleGameInfo(data) {
//         this.callbacks.game_info?.(data);
//     }

//     handleStateUpdate(data) {
//         this.callbacks.state_update?.(data.changes);
//     }

//     handlePaddleUpdate(data) {
//         this.callbacks.paddle_update?.(data);
//     }

//     handleGameCountdown(data) {
//         this.callbacks.game_countdown?.(data.seconds);
//     }

//     handleGamePaused(data) {
//         this.callbacks.game_paused?.(data);
//     }

//     handleGameResumed(data) {
//         this.callbacks.game_resumed?.(data);
//     }

//     handleGameEnded(data) {
//         this.callbacks.game_ended?.(data);
//     }

//     handleGameRestarted(data) {
//         this.callbacks.game_restarted?.(data);
//     }

//     handlePlayerDisconnected(data) {
//         this.callbacks.player_disconnected?.(data);
//     }

//     handleWaitingForPlayer(data) {
//         this.callbacks.waiting_for_player?.(data);
//     }

//     handleServerError(data) {
//         this.callbacks.error?.(new Error(data.message));
//     }

//     // Game control methods
//     sendPaddleMove(y) {
//         this.send({
//             type: 'paddle_move',
//             y: y
//         });
//     }

//     sendPlayerReady() {
//         this.send({
//             type: 'player_ready'
//         });
//     }

//     sendStartGame() {
//         this.send({ type: 'start_game' });
//     }

//     sendPauseGame() {
//         this.send({ type: 'pause_game' });
//     }

//     sendResumeGame() {
//         this.send({ type: 'resume_game' });
//     }

//     sendRestartGame() {
//         this.send({ type: 'restart_game' });
//     }

//     // Utility methods
//     send(data) {
//         if (!this.isSocketConnected()) {
//             console.error('Cannot send message: socket is not connected');
//             return;
//         }

//         try {
//             this.socket.send(JSON.stringify(data));
//         } catch (error) {
//             console.error('Error sending message:', error);
//             this.handleError(error);
//         }
//     }

//     on(event, callback) {
//         if (typeof callback !== 'function') {
//             console.error('Callback must be a function');
//             return;
//         }
//         this.callbacks[event] = callback;
//     }

//     disconnect() {
//         if (this.socket) {
//             this.isConnected = false;
//             this.socket.close();
//             this.socket = null;
//         }
//     }

//     isSocketConnected() {
//         return this.isConnected && this.socket?.readyState === WebSocket.OPEN;
//     }

//     getPlayerNumber() {
//         return this.playerNumber;
//     }
// }

// export default GameWebSocket;








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
            console.log('Received game message:', data);

            if (data.type === 'game_info') {
                this.playerNumber = data.player_number;
            }

            const handlers = {
                game_info: this.handleGameInfo.bind(this),
                state_update: this.handleStateUpdate.bind(this),
                paddle_update: this.handlePaddleUpdate.bind(this),
                game_ended: this.handleGameEnded.bind(this),
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

    handleStateUpdate(data) {
        console.log('Handling state update:', data);
        this.callbacks.state_update?.(data.state);
    }

    handlePaddleUpdate(data) {
        console.log('Handling paddle update:', data);
        this.callbacks.paddle_update?.(data);
    }

    handleGameEnded(data) {
        console.log('Handling game ended:', data);
        this.callbacks.game_ended?.(data);
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

    sendPaddleMove(y) {
        console.log('Sending paddle move:', y);
        this.send({
            type: 'paddle_move',
            y: y
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