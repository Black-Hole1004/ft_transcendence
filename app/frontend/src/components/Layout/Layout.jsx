import Alert from '../Alert'
import Header from './Header'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAlert } from '../AlertContext'
import useAuth from '../../context/AuthContext'
import Cookies from 'js-cookie'
import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const USER_API = import.meta.env.VITE_USER_API
const WP_NOTIFY = import.meta.env.VITE_WP_NOTIFY
const WP_FRINEDS = import.meta.env.VITE_WP_FRINEDS
const WP_NOTIFICATIONS = import.meta.env.VITE_WP_NOTIFICATIONS

const SocketContext = createContext()
export const useSocket = () => useContext(SocketContext)

function Layout() {
	const { authTokens, getAuthHeaders } = useAuth()
	const [refreshData, setRefreshData] = useState(0)
	const [socket_notify, setSocketNotify] = useState(null)
	const [socket_friends, setSocketFriends] = useState(null)
	const [socket_notification, setSocketNotification] = useState(null)
	const [notifications, setNotifications] = useState([])

	const { triggerAlert } = useAlert()
	const navigate = useNavigate()

	const refreshUserData = () => {
		// console.log('------- Refreshing user data -------')
		setRefreshData((prev) => prev + 1)
	}

	const [user_data, setuser_data] = useState({
		first_name: '',
		last_name: '',
		email: '',
		mobile_number: '',
		username: '',
		bio: '',
		password: '',
		new_password: '',
		confirm_password: '',
		profile_picture: '',
		is_logged_with_oauth_for_2fa: false,
	})

	const [first_name, setFirst_name] = useState('')
	const [last_name, setLast_name] = useState('')
	const [email_, setEmail_] = useState('')
	const [mobile_number, setMobile_number] = useState('')
	const [username, setUsername] = useState('')
	const [is_logged_with_oauth_for_2fa, setIs_logged_with_oauth_for_2fa] = useState(false)

	const [bio, setBio] = useState('')
	const [profile_picture, setProfile_picture] = useState('')
	const [badge_name, setBadge_name] = useState('')
	const [badge_image, setBadge_image] = useState('')

	const fetchUser = async () => {
		try {
			const response = await fetch(USER_API, {
				method: 'GET',
				headers: getAuthHeaders(),
			})
			const data = await response.json()
			if (response.ok) {
				console.log('Successfully fetched user data')
				return data
			} else {
				console.log('Failed to fetch user data')
				return null
			}
		} catch (error) {
			console.log(error)
			return null
		}
	}

	// Add near the top with your other state declarations
	const [activeGameTabId] = useState(
		sessionStorage.getItem('tabId') || Math.random().toString(36).substr(2, 9)
	)

	// Add this useEffect after your other useEffects
	useEffect(() => {
		// Store tab ID in sessionStorage when tab opens
		sessionStorage.setItem('tabId', activeGameTabId)
	}, [])

	useEffect(() => {
		if (!authTokens?.access_token) {
			logout() // Redirect to login
			return
		}
		const fetchData = async () => {
			const fetchedData = await fetchUser()
			if (fetchedData) setuser_data(fetchedData)
			else console.log('-- Failed to fetch user data --')
		}
		fetchData()
	}, [authTokens, refreshData])

	useEffect(() => {
		if (!user_data) return
		setFirst_name(user_data.first_name)
		setLast_name(user_data.last_name)
		setEmail_(user_data.email)
		setMobile_number(user_data.mobile_number)
		setUsername(user_data.username)
		setBio(user_data.bio)
		setProfile_picture(user_data.profile_picture)
		setIs_logged_with_oauth_for_2fa(user_data.is_logged_with_oauth_for_2fa)
	}, [user_data])

	const access_token = Cookies.get('access_token')
	if (!access_token) return

	useEffect(() => {
		const newSocket = new WebSocket(WP_NOTIFY + '?access_token=' + access_token)

		newSocket.onopen = () => {
			// console.log('---- WebSocket Connected from Notify Consumer ----')
		}
		newSocket.onmessage = (event) => {
			const data = JSON.parse(event.data)
			// console.log('WebSocket data:', data)
		}

		newSocket.onclose = (event) => {
			// console.log('WebSocket Closed form Notify Consumer:', event)
		}

		newSocket.onerror = (error) => {
			console.error('WebSocket Error:', error)
		}

		setSocketNotify(newSocket)

		return () => {
			newSocket.close()
		}
	}, [authTokens?.access_token])

	useEffect(() => {
		const newSocket = new WebSocket(WP_FRINEDS + '?access_token=' + access_token)

		newSocket.onopen = () => {
			console.log('---- WebSocket Connected from AcceptFriendsRequest Consumer ----')
		}
		newSocket.onmessage = (event) => {
			const data = JSON.parse(event.data)
			console.log('WebSocket data:', data)
		}

		newSocket.onclose = (event) => {
			console.log('WebSocket Closed form AcceptFriendsRequest Consumer:', event)
		}

		newSocket.onerror = (error) => {
			console.error('WebSocket Error:', error)
		}

		setSocketFriends(newSocket)

		return () => {
			newSocket.close()
		}
	}, [authTokens?.access_token])

	useEffect(() => {
		// here we are connecting to the notifications websocket
		// here will handle invite notifications
		const newSocket = new WebSocket(WP_NOTIFICATIONS + '?access_token=' + access_token)

		newSocket.onopen = () => {
			console.log('---- WebSocket Connected from Notifications Consumer ----')
		}

		newSocket.onmessage = (event) => {
			console.log('WebSocket message received:x', event.data)
			const data = JSON.parse(event.data)

			// Add new handling for game invites
			switch (data.type) {
				case 'game_invite':
					// invite to notifications
					setNotifications((prevNotifications) => [
						...prevNotifications,
						{
							type: 'game_invite',
							from_user: data.sender.username,
							profile_picture: data.sender.profile_picture,
							sender_id: data.sender.id,
							invitation_id: data.invitation_id,
							created_at: data.created_at, // i will use this to show the time of the notification
						},
					])

					break
				case 'invite_failed':
					// Handle notification when receiver is offline/in game
					triggerAlert('error', data.message)
					break

					case 'game_invite_accepted':
						// Determine user roles and tab status
						const is_sender = data.sender.id === data.user.id;
						const isAcceptingTab = data.acceptingTabId === activeGameTabId;
						
						// Get the stored sender tab ID if this is the sender
						const storedSenderTabId = localStorage.getItem('gameSenderTab');
						const isSenderTab = is_sender && (storedSenderTabId === activeGameTabId);
					
						console.log('Navigation check:', {
							is_sender,
							isAcceptingTab,
							isSenderTab,
							activeGameTabId,
							storedSenderTabId,
							acceptingTabId: data.acceptingTabId
						});
					
						// Status checks
						if (data.sender.status === 'offline') {
							triggerAlert('info', `${data.sender.username} is offline`);
							return;
						}
						if (data.sender.status === 'ingame') {
							triggerAlert('info', `${data.sender.username} is in a game`);
							return;
						}
					
						// Show appropriate message
						if (is_sender) {
							triggerAlert('success', `${data.receiver.username} accepted your invitation`);
						} else {
							triggerAlert('success', 'Starting game...');
						}
					
						// Navigation logic - Only navigate in the correct tab
						if ((is_sender && isSenderTab) || (!is_sender && isAcceptingTab)) {
							console.log('Navigating to matchmaking in tab:', activeGameTabId);
							
							localStorage.setItem('activeGame', JSON.stringify({
								gameId: data.invitation_id,
								activeTabId: activeGameTabId,
								timestamp: Date.now()
							}));
					
							navigate('/matchmaking', {
								state: {
									backgroundId: 1,
									currentUser: data.user,
									isDirectMatch: true,
									invitationId: data.invitation_id,
								},
							});
						} else {
							console.log('Not navigating in this tab');
						}
						break;

				case 'game_invite_declined':
					const is_sender_ = data.sender.id === data.user.id
					// Show decline notification
					if (is_sender_) {
						triggerAlert(
							'info',
							`${data.receiver.username} declined your game invitation`
						)
					}
					break

				case 'game_invite_expired':
					// Remove the expired invitation from notifications
					setNotifications((prevNotifications) =>
						prevNotifications.filter(
							(notification) => notification.invitation_id !== data.invitation_id
						)
					)
					// Show expiration message
					triggerAlert('info', 'Game invitation expired')
					break

				case 'error':
					if (data.message.includes('expired')) {
						// Remove the expired invitation from notifications
						setNotifications((prevNotifications) =>
							prevNotifications.filter(
								(notification) => notification.invitation_id !== data.invitation_id
							)
						)
					}
					break

				default:
					// Your existing notification handling
					console.log('Other notification:', data)
					setNotifications((prevNotifications) => [
						...prevNotifications,
						{
							id: data.id,
							message: data.message,
							type: 'friend_request',
							from_user: data.from_user,
							profile_picture: data.profile_picture,
						},
					])
			}
		}

		newSocket.onclose = (event) => {
			console.log('WebSocket Closed form Notifications Consumer:', event)
		}

		newSocket.onerror = (error) => {
			console.error('WebSocket Error:', error)
		}

		setSocketNotification(newSocket)

		return () => {
			newSocket.close()
		}
	}, [authTokens?.access_token])

	// Add function to handle invitation responses
	const handleGameInviteResponse = (invitationId, response) => {
		if (socket_notification?.readyState === WebSocket.OPEN) {
			socket_notification.send(
				JSON.stringify({
					type: 'game_invite_response',
					invitation_id: invitationId,
					response: response,
					acceptingTabId: activeGameTabId, // Add this line to send the tab ID with the response
				})
			)
		}
	}

	// Add function to send game invites from anywhere in the app (e.g. chat)
	const sendGameInvite = (receiverId) => {
		if (socket_notification?.readyState === WebSocket.OPEN) {
			
			// Store the sender's tab ID when sending the invite
			const senderTabId = sessionStorage.getItem('tabId');
			localStorage.setItem('gameSenderTab', senderTabId);

			socket_notification.send(
				JSON.stringify({
					type: 'game_invite',
					receiver_id: receiverId,
					senderTabId: senderTabId, //  send the tab ID with the invite
				})
			)
			triggerAlert('success', 'Game invitation sent successfullyy')
		} else {
			triggerAlert('error', 'Cannot send invite - connection error')
		}
	}

	const sockets = {
		socket_notify: socket_notify,
		socket_friends: socket_friends,
		socket_notification: socket_notification,
		refreshUserData: refreshUserData,
		fetchUser: fetchUser,
		profile_picture: profile_picture,
		// here i'm gonna a send function to send the notification invite to the user
		handleGameInviteResponse: handleGameInviteResponse,
		sendGameInvite: sendGameInvite,
	}

	return (
		<SocketContext.Provider value={sockets}>
			<div className='relative flex flex-col min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary overflow-hidden'>
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

export const AlertWrapper = () => {
	const { showAlert, alertType, alertMessage, dismissAlert } = useAlert()

	useEffect(() => {
		if (showAlert) {
			const timer = setTimeout(() => {
				dismissAlert()
			}, 3200)
			return () => clearTimeout(timer)
		}
	}, [showAlert, dismissAlert])

	return showAlert && <Alert type={alertType} message={alertMessage} onClose={dismissAlert} />
}

export default Layout
