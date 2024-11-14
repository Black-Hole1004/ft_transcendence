import Button from '../Home/Buttons/Button'
import { useEffect, useState } from 'react'
import  useAuth  from '../../context/AuthContext'

function NotificationDropdown() {
	console.log('NotificationDropdown')

	const [notifications, setNotifications] = useState([]);
	const { getAuthHeaders } = useAuth();

	const handleAcceptFriendRequest = async (friendRequestId) => {
		if (!friendRequestId) {
			console.error('No friend request ID provided');
			return
		}
		try {
			const response = await fetch(`http://127.0.0.1:8000/api/friend_request/accept/${friendRequestId}/`, {
				method: 'POST',
				headers: getAuthHeaders(),
			});
			const data = await response.json();
			console.log('Accepted Friend Request:', data);
	
			// Remove notification after acceptance
			setNotifications((prevNotifications) =>
				prevNotifications.filter(notification => notification.id !== friendRequestId)
			);
		} catch (error) {
			console.error('Error accepting friend request:', error);
		}
	};
	
	const handleCancelFriendRequest = async (friendRequestId) => {
		if (!friendRequestId) {
			console.error('No friend request ID provided');
			return
		}
		try {
			const response = await fetch(`http://127.0.0.1:8000/api/friend_request/cancel/${friendRequestId}/`, {
				method: 'POST',
				headers: getAuthHeaders(),
			});
			const data = await response.json();
			console.log('Canceled Friend Request:', data);
	
			// Remove notification after cancellation
			setNotifications((prevNotifications) =>
				prevNotifications.filter(notification => notification.id !== friendRequestId)
			);
		} catch (error) {
			console.error('Error canceling friend request:', error);
		}
	};
	
	useEffect(() => {
		const socket = new WebSocket('ws://127.0.0.1:8000/ws/friend_request/');

		socket.onopen = () => console.log('WebSocket connection established');
	
		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log("Received WebSocket data:", data);

			if (data.id) {
				setNotifications((prevNotifications) => [
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
				console.error("Friend request ID is missing in WebSocket data:", data);
			}
		};
	
		socket.onclose = () => console.warn('WebSocket connection closed');
		socket.onerror = (error) => console.error('WebSocket error:', error);
	
		return () => socket.close();
	}, []);

	return (
		<>
			<h1 className='font-heavy notification-header'>Notifications</h1>
			<div className='flex flex-col tb:gap-3 gap-2 overflow-auto lp:mx-3 mx-2 mb-2 font-medium'>
				{notifications.map((notification, index) => (
    			<div key={index} className='flex items-center justify-between'>
        			<div className='flex items-center gap-2'>
        			    <img
        			        src='/assets/images/tabi3a.jpeg'
        			        className='mtb:border border-0.7 border-primary rounded-full'
        			        alt='User Avatar'
        			    />
        			    <p>{notification.fromUser} sent you a Friend Request!</p>
        			</div>
        			<div className='flex gap-1 mr-1'>
        			    <Button
        			        className={'notification-buttons rounded-md '}
        			        onClick={() => handleAcceptFriendRequest(notification.id)}
        			    >
        			        Accept
        			    </Button>
        			    <Button
        			        className={'notification-buttons rounded-md '}
        			        onClick={() => handleCancelFriendRequest(notification.id)}
        			    >
        			        Cancel
        			    </Button>
        			</div>
    			</div>
		))}
			</div>
		</>
	);

}

export default NotificationDropdown
