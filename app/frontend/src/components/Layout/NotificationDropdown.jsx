import Button from '../Home/Buttons/Button'
import React, {useEffect} from 'react'
import useAuth from '../../context/AuthContext'
import { useAlert } from '../AlertContext'


const BASE_URL = import.meta.env.VITE_BASE_URL
const ACCEPT_FRIEND_REQUEST = import.meta.env.VITE_ACCEPT_FRIEND_REQUEST
const CANCEL_FRIEND_REQUEST = import.meta.env.VITE_CANCEL_FRIEND_REQUEST
function NotificationDropdown({ notifications, setNotifications }) {


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
            const response = await fetch(`${ACCEPT_FRIEND_REQUEST}${friendRequestId}/`, {
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
            } else {
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
            const response = await fetch(`${CANCEL_FRIEND_REQUEST}${friendRequestId}/`, {
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
            } else {
                handleSubmit('error', data.message)
            }
        } catch (error) {
            console.error('Error canceling friend request:', error);
            triggerAlert('error', 'Error canceling friend request')
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/friend_ship_request/`, {
                    headers: getAuthHeaders(),
                });
                if (response.ok) {
                    const data = await response.json();
                    const new_notifications = data.map((notification) => ({ ...notification, flag: 'true' }));
                    setNotifications(new_notifications);
                } else {
                    console.error('Failed to fetch notifications');
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);


    return (
        <>
            <h1 className='font-heavy notification-header'>Notifications</h1>
            <div className='flex flex-col tb:gap-3 gap-2 overflow-auto lp:mx-3 mx-2 mb-2 font-medium'>
                {notifications?.length > 0 ? (
                    notifications.map((notification, index) => (
                        <React.Fragment key={index}>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <img
                                        src={notification.profile_picture}
                                        className='mtb:border border-0.7 border-primary rounded-full notification-img'
                                        alt='User Avatar'
                                    />
                                    {
                                        notification.flag ? (<p>{notification.username} sent you a Friend Request!</p>) : (<p>{notification.from_user} sent you a Friend Request!</p>)
                                    }
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
                            {/* Add divider except after the last notification */}
                            {index < notifications.length - 1 && (
                                <div className='h-px w-[80%] bg-border self-center'></div>
                            )}
                        </React.Fragment>
                    ))
                ) : (
                    <div className='flex-1 flex flex-col justify-center items-center'>
						<img
							src='/assets/images/emptyStates/notifications.svg'
							className='w-[50%]'
							alt='notification empty state'
						/>
						<h2 className=''>No notifications</h2>
						<p className='font-regular bio'>Notification Inbox Empty</p>
					</div>
                )}
            </div>
        </>
    );
}

export default NotificationDropdown
