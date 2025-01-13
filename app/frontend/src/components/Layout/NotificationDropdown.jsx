import Button from '../Home/Buttons/Button'
import React, { useEffect } from 'react'
import useAuth from '../../context/AuthContext'
import { useAlert } from '../AlertContext'
import { useSocket } from '../../components/Layout/Layout' // i use this context to send game invites and handle responses
import { useState } from 'react'

const BASE_URL = import.meta.env.VITE_BASE_URL
const ACCEPT_FRIEND_REQUEST = import.meta.env.VITE_ACCEPT_FRIEND_REQUEST
const CANCEL_FRIEND_REQUEST = import.meta.env.VITE_CANCEL_FRIEND_REQUEST
function NotificationDropdown({ notifications, setNotifications, setIsNotificationOpen }) {
	const { getAuthHeaders } = useAuth()
	const { triggerAlert } = useAlert()

	const { sendGameInvite } = useSocket()
	const { handleGameInviteResponse } = useSocket()

	const handleSubmit = (type, message) => {
		triggerAlert(type, message)
	}

	const handleAcceptFriendRequest = async (friendRequestId) => {
		if (!friendRequestId) {
			console.error('No friend request ID provided')
			return
		}
		try {
			const response = await fetch(`${ACCEPT_FRIEND_REQUEST}${friendRequestId}/`, {
				method: 'POST',
				headers: getAuthHeaders(),
			})
			const data = await response.json()
			console.log('Accepted Friend Request:', data)
			if (response.status === 201) {
				// Remove notification after acceptance
				setNotifications((prevNotifications) =>
					prevNotifications.filter((notification) => notification.id !== friendRequestId)
				)
				// close the notification dropdown after accepting a friend request
				setIsNotificationOpen(false)
				handleSubmit('success', data.message)
			} else {
				handleSubmit('error', data.message)
			}
		} catch (error) {
			console.error('Error accepting friend request:', error)
			triggerAlert('error', 'Error accepting friend request')
		}
	}

	const handleCancelFriendRequest = async (friendRequestId) => {
		if (!friendRequestId) {
			console.error('No friend request ID provided')
			return
		}
		try {
			const response = await fetch(`${CANCEL_FRIEND_REQUEST}${friendRequestId}/`, {
				method: 'POST',
				headers: getAuthHeaders(),
			})
			const data = await response.json()
			if (response.status === 201) {
				// Remove notification after cancellation
				setNotifications((prevNotifications) =>
					prevNotifications.filter((notification) => notification.id !== friendRequestId)
				)
				setIsNotificationOpen(false)
				handleSubmit('success', data.message)
			} else {
				handleSubmit('error', data.message)
			}
		} catch (error) {
			console.error('Error canceling friend request:', error)
			triggerAlert('error', 'Error canceling friend request')
		}
	}

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await fetch(`${BASE_URL}/api/friend_ship_request/`, {
					headers: getAuthHeaders(),
				})
				if (response.ok) {
					const data = await response.json()
					const new_notifications = data.map((notification) => ({
						...notification,
						flag: 'true',
					}))
					setNotifications(new_notifications)
				} else {
					console.error('Failed to fetch notifications')
				}
			} catch (error) {
				console.error('Error fetching notifications:', error)
			}
		}

		fetchNotifications()
	}, [])

    useEffect(() => {
        const fetchPendingInvites = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/game/pending-game-invites/`, 
                    { headers: getAuthHeaders() }
                );
                
                if (response.ok) {
                    const pendingInvites = await response.json();
                    
                    // Add pending invites to notifications
                    setNotifications(prev => {
                        // Filter out existing game invites to avoid duplicates
                        const nonGameInvites = prev.filter(n => n.type !== 'game_invite');
                        return [...nonGameInvites, ...pendingInvites];
                    });
                }
            } catch (error) {
                console.error('Error fetching pending invites:', error);
            }
        };

        fetchPendingInvites();
    }, []); // Run once on mount

	// Function to handle game invite response with timeout
	const handleGameInviteResponseWithTimeout = (invitationId, response) => {
		handleGameInviteResponse(invitationId, response)

		// Remove the notification immediately after a response (accept/decline)
		setNotifications((prevNotifications) =>
			prevNotifications.filter((notification) => notification.invitation_id !== invitationId)
		)
	}


	const GameInviteNotification = ({ notification, onExpire, onResponse }) => {
        const [timeLeft, setTimeLeft] = useState(() => {
            const now = Math.floor(Date.now() / 1000);  // Current time in seconds
            const elapsedTime = now - notification.created_at; // i got this created_at variable from the backend
            const remainingTime = Math.max(60 - elapsedTime, 0);
            return remainingTime;
        });

		const [isExpired, setIsExpired] = useState(timeLeft === 0);

        useEffect(() => {
            if (timeLeft === 0) {
                setIsExpired(true);
                onExpire();
                return;
            }
    
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    const newTime = prev - 1;
                    if (newTime <= 0) {
                        clearInterval(timer);
                        setIsExpired(true);
                        onExpire();
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
    
            return () => clearInterval(timer);
        }, [timeLeft, onExpire]);

		const handleResponse = (response) => {
			if (isExpired) {
				triggerAlert('error', 'Cannot respond to expired invitation')
				return
			}
			onResponse(notification.invitation_id, response)
		}

		return (
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<img
						src={notification.profile_picture}
						className='mtb:border aspect-square object-cover border-0.7 border-primary rounded-full notification-img'
						alt='User Avatar'
					/>
					<div>
						<p>{notification.from_user} invited you to play!</p>
						<p
							className={`text-sm ${timeLeft <= 10 ? 'text-red-400' : 'text-gray-400'}`}
						>
							Expires in {Math.floor(timeLeft)}s
						</p>
					</div>
				</div>
				<div className='flex gap-1 mr-1'>
					<Button
						className={`notification-buttons rounded-md ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => handleResponse('accept')}
						disabled={isExpired}
					>
						Accept
					</Button>
					<Button
						className={`notification-buttons rounded-md ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => handleResponse('decline')}
						disabled={isExpired}
					>
						Decline
					</Button>
				</div>
			</div>
		)
	}

	const renderNotification = (notification, index) => {
		// Based on notification type, render different content
		if (notification.type === 'game_invite') {
			return (
				<React.Fragment key={index}>
					<GameInviteNotification
						notification={notification}
						onExpire={() => {
							setNotifications((prev) =>
								prev.filter((n) => n.invitation_id !== notification.invitation_id)
							)
						}}
						onResponse={handleGameInviteResponseWithTimeout}
					/>
					{index < notifications.length - 1 && (
						<div className='h-px w-[80%] bg-border self-center'></div>
					)}
				</React.Fragment>
			)
		}

		// Original friend request notification (AHALOUI)
		return (
			<React.Fragment key={index}>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<img
							src={notification.profile_picture}
							className='mtb:border border-0.7 border-primary rounded-full notification-img'
							alt='User Avatar'
						/>
						{notification.flag ? (
							<p>{notification.username} sent you a Friend Request!</p>
						) : (
							<p>{notification.from_user} sent you a Friend Request!</p>
						)}
					</div>
					<div className='flex gap-1 mr-1'>
						<Button
							className={'notification-buttons rounded-md'}
							onClick={() => handleAcceptFriendRequest(notification.id)}
						>
							Accept
						</Button>
						<Button
							className={'notification-buttons rounded-md'}
							onClick={() => handleCancelFriendRequest(notification.id)}
						>
							Cancel
						</Button>
					</div>
				</div>
				{index < notifications.length - 1 && (
					<div className='h-px w-[80%] bg-border self-center'></div>
				)}
			</React.Fragment>
		)
	}

	const renderEmptyNotifications = () => (
		<div className='flex-1 flex flex-col justify-center items-center'>
			<img
				src='/assets/images/emptyStates/notifications.svg'
				className='w-[50%]'
				alt='notification empty state'
			/>
			<h2 className=''>No notifications</h2>
			<p className='font-regular bio'>Notification Inbox Empty</p>
		</div>
	)

	return (
		<>
			<h1 className='font-heavy notification-header'>Notifications</h1>
			<div className='flex flex-col tb:gap-3 gap-2 overflow-auto lp:mx-3 mx-2 mb-2 font-medium'>
				{notifications?.length > 0
					? notifications.map((notification, index) =>
							renderNotification(notification, index)
						)
					: renderEmptyNotifications()}
			</div>
		</>
	)
}

export default NotificationDropdown
