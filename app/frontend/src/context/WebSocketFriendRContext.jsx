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
    const { user, getAuthHeaders } = useAuth();
    
    useEffect(() => {

        const access_token = Cookies.get('access_token');
		const socket = new WebSocket('ws://127.0.0.1:8000/ws/friend_request/?access_token=' + access_token);

        socket.onopen = () => console.log('WebSocket connection established');
        
        socket.onmessage = (event) => {
            console.log('WebSocket message received:', event.data);
            const data = JSON.parse(event.data);
            // if (data.receiver_id === user.user_id) {
                console.log('Notification for current user:', data);
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
            // }
        };

        socket.onclose = () => console.warn('WebSocket connection closed');
        socket.onerror = (error) => console.error('WebSocket error:', error);

        return () => socket.close();
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/friend_ship_request/`, {
                    headers: getAuthHeaders(),
                });
                if (response.ok) {
                    const data = await response.json();
                    const new_notifications = data.map((notification) => ({...notification, flag: 'true'}));
                    setNotifications(new_notifications);
                } else {
                    console.error('Failed to fetch notifications');
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();

        const access_token = Cookies.get('access_token');
		const socket = new WebSocket('ws://127.0.0.1:8000/ws/friend_request/?access_token=' + access_token);

        socket.onopen = () => {
            console.log('WebSocket connection established');
        }

        socket.onclose = () => console.warn('WebSocket connection closed');
        socket.onerror = (error) => console.error('WebSocket error:', error);
    }, [user]);


    return (
        <WebSocketContext.Provider value={{ notifications, setNotifications}}>
            {children}
        </WebSocketContext.Provider>
    );
};
