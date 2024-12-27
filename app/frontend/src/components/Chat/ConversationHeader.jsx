import { useAlert } from "../AlertContext"
import { useSocket } from '../Layout/Layout'
import useAuth from '../../context/AuthContext.jsx'
import { useEffect } from 'react'
const Button = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className={`
			border border-border select-none rounded font-medium message-content block-button
			bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out hover:bg-[rgb(183,170,156,30%)]`}
		>
			{children}
		</button>
	)
}

const SEND_FRIEND_REQUEST = import.meta.env.VITE_SEND_FRIEND_REQUEST
const BASE_URL = import.meta.env.VITE_BASE_URL

const ConversationHeader = ({
	blockerId,
	setBlockerId,
	areFriends,
	recipientInfo,
	currentLoggedInUserId,
	recipientProfileImage,
	reciver_id,
}) => {
	// console.log(blockerId)


	// add by ahaloui -----------------
	const { triggerAlert } = useAlert()
	const { socket_notification } = useSocket()
	const { getAuthHeaders } = useAuth()



	const handleSubmit = (type, message) => {
		triggerAlert(type, message)
	}
	useEffect(() => {
		console.log('Receiver ID has changed:', reciver_id);
		if (reciver_id) {
			console.log('Receiver ID has changed:', reciver_id);
		}
	}, [reciver_id])

	const handle_add_friend = async (id) => {
		if (!id) {
			console.error('No user ID provided')
			return
		}
		try {
			const response = await fetch(SEND_FRIEND_REQUEST, {
				method: 'POST',
				body: JSON.stringify({ user_to: id }),
				headers: getAuthHeaders(),
			})
			const data = await response.json()
			console.log('Response =>', data)
			if (response.status === 201) {
				const from_user = data.from_user;
				const sender_id = data.sender_id;
				const friend_request_id = data.id;
				const receiver_id = data.receiver_id;

				if (socket_notification?.readyState === WebSocket.OPEN) {
					socket_notification.send(JSON.stringify({
						sender_id: sender_id,
						receiver_id: receiver_id,
						message: `User ${from_user} sent you a friend request`,
						id: friend_request_id,
						from_user: from_user,
						profile_picture: recipientProfileImage,
					}));
					handleSubmit('success', 'Friend request sent successfully');
				};
			} else {
				handleSubmit('error', data.message)
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}
// ------------------------------

return (
	<div className='chat-header flex justify-between items-center tb:h-[20%] h-[15%] w-full z-20'>
		<div className='flex justify-center items-center lp:gap-4 gap-3 max-tb:my-3'>
			<img
				src={`${recipientProfileImage}`}
				className='chat-history-image object-cover rounded-full ring-1 ring-primary select-none'
				alt='user image'
			/>
			<div>
				<p className='font-heavy friend-name text-primary'>
					{`${recipientInfo.first_name} ${recipientInfo.last_name}`}
				</p>
				<div className='flex items-center gap-0.5'>
					<div
						className={`w-1.5 h-1.5 rounded-full ${recipientInfo.status === 'online'
								? 'bg-online'
								: recipientInfo.status === 'offline'
									? 'bg-offline'
									: 'bg-defeat'
							}`}
					></div>
					<p
						className={`last-message font-heavy ${recipientInfo.status === 'online'
								? 'text-online'
								: recipientInfo.status === 'offline'
									? 'text-offline'
									: 'text-defeat'
							}`}
					>
						{recipientInfo.status === 'online'
							? 'Online'
							: recipientInfo.status === 'offline'
								? 'Offline'
								: 'In-Game'}
					</p>
				</div>
			</div>
		</div>
		<div className='flex lp:gap-2 gap-1'>
			{/* {blockerId === currentLoggedInUserId && (
					<Button onClick={() => setBlockerId(0)}>Unblock</Button>
				)}
				{blockerId === 0 &&
					(areFriends ? <Button>Invite to Play</Button> : <Button>Add Friend</Button>)}
				{blockerId === 0 && (
					<Button onClick={() => setBlockerId(currentLoggedInUserId)}>Block user</Button>
				)} */}
			<Button
				onClick={() => handle_add_friend(reciver_id)}
			>
				Add Friend
			</Button>

		</div>
	</div>
)
}

export default ConversationHeader
