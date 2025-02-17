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

import useAuth from '../../context/AuthContext.jsx'

const API_CHAT = import.meta.env.VITE_API_CHAT

const Chat = () => {
	const currentLocation = useLocation()
	const navigate = useNavigate()
	const { getAuthHeaders } = useAuth()

	const webSocketRef = useRef(null)
	const messageInputRef = useRef(null)

	const [blockerId, setBlockerId] = useState(null)
	const [areFriends, setAreFriends] = useState(false)
	const [recipientInfo, setRecipientInfo] = useState(null)
	const [conversationKey, setConversationKey] = useState(null)
	const [conversationMessages, setConversationMessages] = useState([])
	const [currentLoggedInUserId, setCurrentLoggedInUserId] = useState(0)
	const [isConversationLoaded, setIsConversationLoaded] = useState(false)
	const [recipientProfileImage, setrecipientProfileImage] = useState(null)

	const [Badge_info, setBadge_info] = useState(null)
	const [recipientXp, setRecipientXp] = useState(null)

	useEffect(() => {
		// Extract conversation key from URL
		const uri = window.location.pathname.split('/').slice(2, 4)
		if (uri.length === 1) {
			const ids = uri[0].split('_')
			if (ids.length === 2 && ids[0] > ids[1])
				navigate('/404')
			setConversationMessages([])
			setConversationKey(uri[0])
			// setBlockerId(0)
			setIsConversationLoaded(true)
		} else if (uri.length > 1) {
			navigate('/404')
		} else {
			setIsConversationLoaded(false)
		}
		
	}, [currentLocation.pathname])
	
	useEffect(() => {
		const sendBlockMessage = () => {
			webSocketRef.current?.send(
				JSON.stringify({
					message_type: 'block',
					blocker_id: blockerId,
					blocker: currentLoggedInUserId,
					conversation_key: conversationKey,
				})
			)
		}

		if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
			sendBlockMessage()
		}
	}, [conversationKey, blockerId])

	useEffect(() => {
		
		const friendshipStatus = async () => {
			try {
				const response = await axios.get(`${API_CHAT}status/${conversationKey}/`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: getAuthHeaders().Authorization,
					},
				})
				const blocker = response.data.blocked_by == null ? 0 : response.data.blocked_by
				setAreFriends(response.data.status)
				setBlockerId(blocker)
			} catch (error) {
				navigate('/404')
			}
		}
		
		if (conversationKey) {
			friendshipStatus()
		}
	}, [conversationKey])


	useEffect(() => {
		const onWebSocketOpen = () => {
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
			webSocketRef.current = null
			setTimeout(initializeWebSocket, 1000)
		}
		
		const onWebSocketMessage = (e) => {
			const data = JSON.parse(e.data)
			const participants = conversationKey?.split('_')
			if (data.event === 'message') {
				if (participants && (data.sender === parseInt(participants[0]) || data.sender === parseInt(participants[1]))) {
					setConversationMessages((prevMessages) => [
						...prevMessages,
						{
							sender_id: data.sender,
							content: data.message,
							sent_datetime: data.timestamp,
						},
					])
				} else {
					setConversationMessages((prevMessages) => [...prevMessages])
				}
			} else if (data.event === 'block') {
				if (data.blocker_id === parseInt(participants[0]) || data.blocker_id === parseInt(participants[1]) || data.blocker_id === 0)
					setBlockerId(data.blocker_id)
				if (data.blocker_id)
					setAreFriends(false)
			}
		}

		const initializeWebSocket = () => {
			if (!webSocketRef.current) {
				const ws = new WebSocket(`wss://${window.location.hostname}/ws/chat/`)
				webSocketRef.current = ws

				webSocketRef.current.addEventListener('open', onWebSocketOpen)
				webSocketRef.current.addEventListener('close', onWebSocketClose)
				webSocketRef.current.addEventListener('message', onWebSocketMessage)
			}
		}

		initializeWebSocket()

		return () => {
			if (webSocketRef.current) {
				const ws = webSocketRef.current

				ws.removeEventListener('open', onWebSocketOpen)
				ws.removeEventListener('close', onWebSocketClose)
				ws.removeEventListener('message', onWebSocketMessage)

				if (webSocketRef.current.readyState === WebSocket.OPEN)
					ws.close()
				webSocketRef.current = null
			}
		}
	}, [isConversationLoaded, conversationKey])

	useEffect(() => {
		
		const fetchConversationDetails = async () => {
			try {
				const response = await axios.get(`${API_CHAT}${conversationKey}/`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: getAuthHeaders().Authorization,
					},
				})
				setRecipientInfo(response.data.user_infos[0])
				setRecipientXp(response.data.user_infos[0]?.xp)
				setBadge_info(response.data.user_infos[0]?.badge)
				const messages = response.data.messages ? response.data.messages : []
				setConversationMessages(messages)
				setrecipientProfileImage(response.data.user_infos[0]?.profile_picture)
			} catch (error) {
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
			}
		}
	}

	return (
		<section
			className={`section-margin flex lg:flex-row flex-col gap-4
			${conversationKey ? 'lg:justify-between' : 'lg:justify-center'}`}
		>
			<div
				className='flex tb:flex-row flex-col tb:border tb:items-center border-primary
						lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1 overflow-hidden'
			>
				{/* Chat History Component */}
				<ChatHistory
					setBlockerId={setBlockerId}
					conversationKey={conversationKey}
					setConversationKey={setConversationKey}
					conversationMessages={conversationMessages}
					currentLoggedInUserId={currentLoggedInUserId}
					setCurrentLoggedInUserId={setCurrentLoggedInUserId}
					badge_info={Badge_info}
				/>

				{/* Separator */}
				<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center max-tb:hidden'></div>

				{/* Chat Area */}
				<div
					className='tb:w-[65.8%] flex flex-col items-center max-tb:border border-primary overflow-hidden
						rounded-2xl tb:h-chat h-chat-ms bg-[rgba(27,22,17,0.5)]'
				>
					{recipientInfo ? (
						<>
							{/* Chat Header */}
							<ConversationHeader
								blockerId={blockerId}
								areFriends={areFriends}
								setAreFriends={setAreFriends}
								setBlockerId={setBlockerId}
								recipientInfo={recipientInfo}
								currentLoggedInUserId={currentLoggedInUserId}
								recipientProfileImage={recipientProfileImage}
							/>

							{/* Chat Messages */}
							<Messages
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
			{conversationKey && <UserInfos recipientInfo={recipientInfo} badge_info={Badge_info} recipientXp={recipientXp} />}
		</section>
	)
}

export default Chat
