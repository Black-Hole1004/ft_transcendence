import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const WebSocketStatusContext = createContext(null);

export const WebSocketStatusProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const access_token = Cookies.get('access_token');
        if (!access_token) return;

        const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/notification/?access_token=${access_token}`);

        newSocket.onopen = () => {
            console.log('---- WebSocket Connected ----');
        };
        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('WebSocket data:', data);
        };

        newSocket.onclose = (event) => {
            console.log('WebSocket Closed:', event);
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

    setSocket(newSocket);
    
    return () => {
        newSocket.close();
    };
    }, []);
    return (
    <WebSocketStatusContext.Provider value={socket}>
        {children}
    </WebSocketStatusContext.Provider>
    );
};
// Custom hook to use the WebSocket
export const useWebSocket = () => {
    return useContext(WebSocketStatusContext);
};