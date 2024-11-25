import './Chat.css'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Footer from '../../components/Chat/Footer.jsx'
import Messages from '../../components/Chat/Messages.jsx'
import UserInfos from '../../components/Chat/UserInfos.jsx'
import ChatHistory from '../../components/Chat/ChatHistory.jsx'
import StartConversation from '../../components/Chat/StartConversation.jsx'

// import { useAlert } from '../../components/AlertContext'
import useAuth from '../../context/AuthContext.jsx'

const API_CHAT = import.meta.env.VITE_API_CHAT

const Chat = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { getAuthHeaders } = useAuth()

	const webSocketRef = useRef(null)
	const currentMessage = useRef(null)

	const [currentUserId, setCurrentUserId] = useState(0)
	const [recipientInfo, setRecipientInfo] = useState(null)
	const [chatMessages, setChatMessages] = useState([])
	const [isConversationLoaded, setIsConversationLoaded] = useState(false)
	const [conversationKey, setConversationKey] = useState(null)
	const [recipientProfileImage, setrecipientProfileImage] = useState(null)

	// const { triggerAlert } = useAlert()

	// const handleSubmit = () => {
	// 	triggerAlert('success', 'Message sent successfuly!')
	// }

	useEffect(() => {
		// Extract conversation key from URL
		const uri = window.location.pathname.split('/').slice(2, 3)
		if (uri.length === 1) {
			setChatMessages([])
			setConversationKey(uri[0])
			setIsConversationLoaded(true)
		} else {
			setIsConversationLoaded(false)
		}
	}, [location.pathname])

	useEffect(() => {
		const onWebSocketOpen = () => {
			console.log('WebSocket connected')
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
			console.log('WebSocket disconnected')
			webSocketRef.current = null
			setTimeout(initializeWebSocket, 3000)
		}

		const onWebSocketMessage = (e) => {
			console.log('WebSocket message received')
			const data = JSON.parse(e.data)
			setChatMessages((prevMessages) => [
				...prevMessages,
				{
					sender_id: data.sender,
					content: data.message,
					sent_datetime: data.timestamp,
				},
			])
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
				console.log('cleanup running')
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
					setChatMessages(messages)
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

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			sendChatMessage()
		}
	}

	const sendChatMessage = () => {
		let ws = webSocketRef.current

		if (ws && ws.readyState === WebSocket.OPEN) {
			const value = currentMessage.current.value.trim()

			if (value !== '') {
				ws.send(
					JSON.stringify({
						sender: currentUserId,
						message: value,
						message_type: 'message',
						conversation_key: conversationKey,
					})
				)
				currentMessage.current.value = ''
				// handleSubmit()
			}
		}
	}
	console.log(conversationKey)
	return (
		<section className={`section-margin flex lg:flex-row flex-col gap-4
			${conversationKey ? 'lg:justify-between' : 'lg:justify-center'}`}>
			<div
				className='flex tb:flex-row flex-col lg:border-2 tb:border tb:items-center
						border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1'
			>
				{/* Chat History Component */}
				<ChatHistory
					currentUserId={currentUserId}
					setCurrentUserId={setCurrentUserId}
					chatMessages={chatMessages}
					conversationKey={conversationKey}
					setConversationKey={setConversationKey}
				/>

				{/* Separator */}
				<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center max-tb:hidden'></div>

				{/* Chat Area */}
				<div
					className='tb:flex-1 flex flex-col items-center max-tb:border border-primary
									lg:rounded-3xl rounded-2xl tb:h-chat h-chat-ms bg-[rgba(27,22,17,0.5)]'
				>
					{recipientInfo ? (
						<>
							{/* Chat Header */}
							<div className='chat-header flex items-center tb:h-[20%] h-[15%] w-full lp:gap-4 gap-3 max-tb:my-3 z-20'>
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
											className={`w-1.5 h-1.5 rounded-full ${
												recipientInfo.status === 'online'
													? 'bg-online'
													: recipientInfo.status === 'offline'
														? 'bg-offline'
														: 'bg-defeat'
											}`}
										></div>
										<p
											className={`last-message font-heavy ${
												recipientInfo.status === 'online'
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

							{/* Chat Messages */}
							<Messages
								currentUserId={currentUserId}
								chatMessages={chatMessages}
								recipientProfileImage={recipientProfileImage}
							/>

							{/* Chat Footer */}
							<Footer
								sendChatMessage={sendChatMessage}
								currentMessage={currentMessage}
								handleKeyPress={handleKeyPress}
								conversationKey={conversationKey}
							/>
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
