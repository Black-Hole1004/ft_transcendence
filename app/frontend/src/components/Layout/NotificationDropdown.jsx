import Button from '../Home/Buttons/Button'
import { useEffect, useState } from 'react'
import  useAuth  from '../../context/AuthContext'
import { useWebSocket } from '../../context/WebSocketContext'
import { useAlert } from '../AlertContext'
function NotificationDropdown() {


	const { notifications, setNotifications } = useWebSocket();
	const { getAuthHeaders } = useAuth();
	const { triggerAlert } = useAlert();

    const handleSubmit = (type, message) => {
		triggerAlert(type, message)
	}


    const handleAcceptFriendRequest = async (friendRequestId) => {
        if (!friendRequestId) {
            console.error('No friend request ID provided');
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/friend_request/accept/${friendRequestId}/`, {
                method: 'POST',
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            console.log('Accepted Friend Request:', data);
			if (response.status === 201) {
            	// Remove notification after acceptance
				setNotifications((prevNotifications) =>
					prevNotifications.filter(notification => notification.id !== friendRequestId)
				);
				handleSubmit('success', data.message)
			}else{
				handleSubmit('error', data.message)
			}
        } catch (error) {
            console.error('Error accepting friend request:', error);
			triggerAlert('error', 'Error accepting friend request')
        }
    };
	
	const handleCancelFriendRequest = async (friendRequestId) => {
        if (!friendRequestId) {
            console.error('No friend request ID provided');
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/friend_request/cancel/${friendRequestId}/`, {
                method: 'POST',
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            if (response.status === 201) {
				// Remove notification after cancellation
				setNotifications((prevNotifications) =>
					prevNotifications.filter(notification => notification.id !== friendRequestId)
				);
				handleSubmit('success', data.message)
			}else{
				handleSubmit('error', data.message)
			}
        } catch (error) {
            console.error('Error canceling friend request:', error);
			triggerAlert('error', 'Error canceling friend request')
        }
    };
	
    console.log('Notifications:', notifications);

	return (
        <>
            <h1 className='font-heavy notification-header'>Notifications</h1>
            <div className='flex flex-col tb:gap-3 gap-2 overflow-auto lp:mx-3 mx-2 mb-2 font-medium'>
                {notifications.map((notification, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <img
                                src={notification.profile_picture}
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
};

export default NotificationDropdown
