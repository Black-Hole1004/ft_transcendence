import './Chat.css'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Footer from '../../components/Chat/Footer.jsx'
import Messages from '../../components/Chat/Messages.jsx'
import UserInfos from '../../components/Chat/UserInfos.jsx'
import ChatHistory from '../../components/Chat/ChatHistory.jsx'
import StartConversation from '../../components/Chat/StartConversation.jsx'
import ConversationHeader from '../../components/Chat/ConversationHeader.jsx'

// import { useAlert } from '../../components/AlertContext'
import useAuth from '../../context/AuthContext.jsx'

const API_CHAT = import.meta.env.VITE_API_CHAT

const Chat = () => {
	const currentLocation = useLocation()
	const navigate = useNavigate()
	const { getAuthHeaders } = useAuth()

	const webSocketRef = useRef(null)
	const messageInputRef = useRef(null)

	const [blockerId, setBlockerId] = useState(0)
	const [areFriends, setAreFriends] = useState(false)
	const [recipientInfo, setRecipientInfo] = useState(null)
	const [isUserBlocked, setIsUserBlocked] = useState(false) // replace
	const [conversationKey, setConversationKey] = useState(null)
	const [conversationMessages, setConversationMessages] = useState([])
	const [currentLoggedInUserId, setCurrentLoggedInUserId] = useState(0)
	const [isConversationLoaded, setIsConversationLoaded] = useState(false)
	const [recipientProfileImage, setrecipientProfileImage] = useState(null)

	// const { triggerAlert } = useAlert()

	// const handleSubmit = () => {
	// 	triggerAlert('success', 'Message sent successfuly!')
	// }

	useEffect(() => {
		console.log('here')
		console.log('blocker id: ', blockerId)
		const sendBlockMessage = () => {
			webSocketRef.current?.send(
				JSON.stringify({
					message_type: 'block',
					blocker_id: blockerId,
					conversation_key: conversationKey,
				})
			)
		}

		sendBlockMessage()
	}, [blockerId])

	useEffect(() => {
		const friendshipStatus = async () => {
			try {
				if (conversationKey) {
					const response = await axios.get(`${API_CHAT}status/${conversationKey}/`, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: getAuthHeaders().Authorization,
						},
					})
					setAreFriends(response.data.status)
					setBlockerId(response.data.blocked_by)
				}
			} catch (error) {
				console.error('Error fetching friendship status:', error)
			}
		}

		if (conversationKey) {
			friendshipStatus()
		}
	}, [conversationKey])

	useEffect(() => {
		// Extract conversation key from URL
		const uri = window.location.pathname.split('/').slice(2, 3)
		if (uri.length === 1) {
			setConversationMessages([])
			setConversationKey(uri[0])
			setBlockerId(0)
			setIsConversationLoaded(true)
		} else {
			setIsConversationLoaded(false)
		}
	}, [currentLocation.pathname])

	useEffect(() => {
		const onWebSocketOpen = () => {
			// console.log('WebSocket connected')
			if (isConversationLoaded) {
				webSocketRef.current?.send(
					JSON.stringify({
						message_type: 'join',
						conversation_key: conversationKey,
					})
				)
			}
		}

		const onWebSocketClose = () => {
			// console.log('WebSocket disconnected')
			webSocketRef.current = null
			setTimeout(initializeWebSocket, 3000)
		}

		const onWebSocketMessage = (e) => {
			console.log('WebSocket message received')
			const data = JSON.parse(e.data)
			// console.log(data.event)
			if (data.event === 'message') {
				setConversationMessages((prevMessages) => [
					...prevMessages,
					{
						sender_id: data.sender,
						content: data.message,
						sent_datetime: data.timestamp,
					},
				])
			} else if (data.event === 'block') {
				console.log('socket: ', data.blocker_id)
				setBlockerId(data.blocker_id)
			}
		}

		const initializeWebSocket = () => {
			if (!webSocketRef.current) {
				// console.log(window.location.protocol)
				const ws = new WebSocket(`ws://${window.location.hostname}:8000/ws/chat/`)
				webSocketRef.current = ws

				webSocketRef.current.addEventListener('open', onWebSocketOpen)
				webSocketRef.current.addEventListener('close', onWebSocketClose)
				webSocketRef.current.addEventListener('message', onWebSocketMessage)
			}
		}

		initializeWebSocket()

		return () => {
			if (webSocketRef.current) {
				// console.log('cleanup running')
				const ws = webSocketRef.current

				ws.removeEventListener('open', onWebSocketOpen)
				ws.removeEventListener('close', onWebSocketClose)
				ws.removeEventListener('message', onWebSocketMessage)

				ws.close()
				webSocketRef.current = null
			}
		}
	}, [isConversationLoaded, conversationKey])

	useEffect(() => {
		const fetchConversationDetails = async () => {
			try {
				if (conversationKey) {
					const response = await axios.get(`${API_CHAT}${conversationKey}/`, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: getAuthHeaders().Authorization,
						},
					})
					setRecipientInfo(response.data.user_infos[0])
					const messages = response.data.messages ? response.data.messages : []
					setConversationMessages(messages)
					setrecipientProfileImage(response.data.user_infos[0].profile_picture)
				}
			} catch (error) {
				console.error('Error fetching user infos:', error)
				navigate('/404')
			}
		}

		if (conversationKey) {
			fetchConversationDetails()
		}
	}, [conversationKey, getAuthHeaders])

	const handleMessageKeyPress = (e) => {
		if (e.key === 'Enter') {
			sendConversationMessage()
		}
	}

	const sendConversationMessage = () => {
		let ws = webSocketRef.current

		if (ws && ws.readyState === WebSocket.OPEN) {
			const value = messageInputRef.current.value.trim()

			if (value !== '') {
				ws.send(
					JSON.stringify({
						sender: currentLoggedInUserId,
						message: value,
						message_type: 'message',
						conversation_key: conversationKey,
					})
				)
				messageInputRef.current.value = ''
				// handleSubmit()
			}
		}
	}

	return (
		<section
			className={`section-margin flex lg:flex-row flex-col gap-4
			${conversationKey ? 'lg:justify-between' : 'lg:justify-center'}`}
		>
			<div
				className='flex tb:flex-row flex-col lg:border-2 tb:border tb:items-center overflow-hidden
						border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1'
			>
				{/* Chat History Component */}
				<ChatHistory
					setBlockerId={setBlockerId}
					conversationKey={conversationKey}
					setConversationKey={setConversationKey}
					conversationMessages={conversationMessages}
					currentLoggedInUserId={currentLoggedInUserId}
					setCurrentLoggedInUserId={setCurrentLoggedInUserId}
				/>

				{/* Separator */}
				<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center max-tb:hidden'></div>

				{/* Chat Area */}
				<div
					className='tb:w-[65.8%] flex flex-col items-center max-tb:border border-primary overflow-hidden
						lg:rounded-3xl rounded-2xl tb:h-chat h-chat-ms bg-[rgba(27,22,17,0.5)]'
				>
					{recipientInfo ? (
						<>
							{/* Chat Header */}
							<ConversationHeader
								blockerId={blockerId}
								areFriends={areFriends}
								setBlockerId={setBlockerId}
								recipientInfo={recipientInfo}
								currentLoggedInUserId={currentLoggedInUserId}
								recipientProfileImage={recipientProfileImage}
							/>

							{/* Chat Messages */}
							<Messages
								isUserBlocked={isUserBlocked}
								conversationMessages={conversationMessages}
								recipientProfileImage={recipientProfileImage}
								currentLoggedInUserId={currentLoggedInUserId}
							/>

							{/* Chat Footer */}
							{blockerId ? (
								blockerId === currentLoggedInUserId ? (
									<p className='message-content my-3 font-heavy text-center text-border brightness-200'>
										You have blocked this user. Unblock them to resume the
										conversation.
									</p>
								) : (
									<p className='message-content my-3 font-heavy text-center text-border brightness-200'>
										You have been blocked by this user. You cannot send messages
										until you are unblocked.
									</p>
								)
							) : (
								<Footer
									messageInputRef={messageInputRef}
									conversationKey={conversationKey}
									handleMessageKeyPress={handleMessageKeyPress}
									sendConversationMessage={sendConversationMessage}
								/>
							)}
						</>
					) : (
						<StartConversation />
					)}
				</div>
			</div>

			{/* User Information Sidebar */}
			{conversationKey && <UserInfos recipientInfo={recipientInfo} />}
		</section>
	)
}

export default Chat
