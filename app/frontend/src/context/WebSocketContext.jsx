import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import  useAuth  from './AuthContext';

// Create a context for WebSocket notifications
const WebSocketContext = createContext();

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();

    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket('ws://127.0.0.1:8000/ws/friend_request/');
        console.log('WebSocket connection:', socketRef.current);

        socketRef.current.onopen = () => console.log('WebSocket connection established');

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Notification received:', data);
            if (data.sender_id !== user.id) {
                setNotifications((prevNotifications) => [
                    ...prevNotifications,
                    {
                        id: data.id,
                        message: data.message,
                        type: 'friend_request',
                        from_user: data.from_user,
                        timestamp: new Date().toLocaleTimeString(),
                        profile_picture: data.profile_picture,
                    },
                ]);
            } else {
                console.log("Notification ignored from current user");
            }
        };

        socketRef.current.onclose = () => console.warn('WebSocket connection closed');
        socketRef.current.onerror = (error) => console.error('WebSocket error:', error);

        return () => socketRef.current.close();
    }, []);

    const sendMessage = (data) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(data));
        }
    };

    return (
        <WebSocketContext.Provider value={{ notifications, setNotifications, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};
