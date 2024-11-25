import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for WebSocket notifications
const WebSocketContext = createContext();

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/friend_request/');

        socket.onopen = () => console.log('WebSocket connection established');
        
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received WebSocket data:', data);
            
            if (data.id) {
                setNotifications(prevNotifications => [
                    ...prevNotifications,
                    {
                        id: data.id,
                        message: data.message,
                        type: 'friend_request',
                        fromUser: data.fromUser,
                        timestamp: new Date().toLocaleTimeString(),
                    },
                ]);
            } else {
                console.error('Friend request ID is missing in WebSocket data:', data);
            }
        };

        socket.onclose = () => console.warn('WebSocket connection closed');
        socket.onerror = (error) => console.error('WebSocket error:', error);

        return () => socket.close();
    }, []);

    return (
        <WebSocketContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </WebSocketContext.Provider>
    );
};