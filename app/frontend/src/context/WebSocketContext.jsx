import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import  useAuth  from './AuthContext';
import Cookies from 'js-cookie';

// Create a context for WebSocket notifications
const WebSocketContext = createContext();
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();
    
    useEffect(() => {
        const access_token = Cookies.get('access_token');
        console.log('Access token:', access_token);
		const socket = new WebSocket('ws://127.0.0.1:8000/ws/friend_request/?access_token=' + access_token);
        console.log('WebSocket connection from WebSocketContext:', socket);

        socket.onopen = () => console.log('WebSocket connection established');
        
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.receiver_id === user.user_id) {
                setNotifications((prevNotifications) => [
                    ...prevNotifications,
                    {
                        id: data.id,
                        message: data.message,
                        type: 'friend_request',
                        from_user: data.from_user,
                        profile_picture: `${BASE_URL}${data.profile_picture.profile_picture}`,
                    },
                ]);
            }
        };

        socket.onclose = () => console.warn('WebSocket connection closed');
        socket.onerror = (error) => console.error('WebSocket error:', error);

        return () => socket.close();
    }, []);


    return (
        <WebSocketContext.Provider value={{ notifications, setNotifications}}>
            {children}
        </WebSocketContext.Provider>
    );
};
