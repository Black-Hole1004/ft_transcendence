import Alert from '../Alert'
import Header from './Header'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAlert } from '../AlertContext'
import useAuth from '../../context/AuthContext'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { createContext, useContext } from 'react'


const BASE_URL = import.meta.env.VITE_BASE_URL
const SocketContext = createContext()
export const useSocket = () => useContext(SocketContext)

function Layout() {
	const { first_name, last_name, username, profile_picture } = useAuth()
	const user_data = { first_name, last_name, username, profile_picture }


	const [socket_notify, setSocketNotify] = useState(null);
	const [socket_friends, setSocketFriends] = useState(null);
	const [socket_notification, setSocketNotification] = useState(null);
	const [notifications, setNotifications] = useState([]);

	
	const access_token = Cookies.get('access_token');
        if (!access_token) 
			return;

    useEffect(() => {
        const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/notify/?access_token=${access_token}`);

        newSocket.onopen = () => {
            console.log('---- WebSocket Connected from Notify Consumer ----');
        };
        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('WebSocket data:', data);
        };

        newSocket.onclose = (event) => {
            console.log('WebSocket Closed form Notify Consumer:', event);
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

		setSocketNotify(newSocket);
    
    return () => {
        newSocket.close();
    };
    }, []);

	useEffect(() => {
		const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/friends/?access_token=${access_token}`);

		newSocket.onopen = () => {
            console.log('---- WebSocket Connected from AcceptFriendsRequest Consumer ----');
        };
        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('WebSocket data:', data);
        };

        newSocket.onclose = (event) => {
            console.log('WebSocket Closed form AcceptFriendsRequest Consumer:', event);
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

		setSocketFriends(newSocket);
    
    return () => {
        newSocket.close();
    };
	}, []);

	useEffect(() => {
		const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/notifications/?access_token=${access_token}`);

		newSocket.onopen = () => {
			console.log('---- WebSocket Connected from Notifications Consumer ----');
		};

		newSocket.onmessage = (event) => {
            console.log('WebSocket message received:', event.data);
            const data = JSON.parse(event.data);
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
        };


		newSocket.onclose = (event) => {
			console.log('WebSocket Closed form Notifications Consumer:', event);
		}

		newSocket.onerror = (error) => {
			console.error('WebSocket Error:', error);
		}

		setSocketNotification(newSocket);

		return () => {
			newSocket.close();
		}
	}
	, []);

	const sockets = {
		socket_notify: socket_notify,
		socket_friends: socket_friends,
		socket_notification: socket_notification,
	}

	return (
		<SocketContext.Provider value={sockets}>
			<div className='relative flex flex-col min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary overflow-hidden'>
				<AlertWrapper />
				<Header 
					user_data={user_data}
					notifications={notifications}
					setNotifications={setNotifications}
					/>
				<Outlet />
			</div>
		</SocketContext.Provider>
	)
}

export function AlertWrapper() {
	const { showAlert, alertType, alertMessage, dismissAlert } = useAlert()

	useEffect(() => {
		if (showAlert) {
			const timer = setTimeout(() => {
				dismissAlert()
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [showAlert, dismissAlert])

	return showAlert && <Alert type={alertType} message={alertMessage} onClose={dismissAlert} />
}

export default Layout
