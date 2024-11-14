import './Chat.css'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../../components/Chat/Footer.jsx'
import Messages from '../../components/Chat/Messages.jsx'
import UserInfos from '../../components/Chat/UserInfos.jsx'
import ChatHistory from '../../components/Chat/ChatHistory.jsx'
import StartConversation from '../../components/Chat/StartConversation.jsx'

import { useAlert } from '../../components/AlertContext'
import useAuth from '../../context/AuthContext.jsx'

const API_CHAT = import.meta.env.VITE_API_CHAT

const Chat = () => {
	const location = useLocation()
	const { getAuthHeaders } = useAuth()

	const chatSocket = useRef(null)
	const MessageInputRef = useRef(null)

	const [myId, setMyId] = useState(0)
	const [user, setUser] = useState(null)
	const [messages, setMessages] = useState([])
	const [selectedUserId, setSelectedUserId] = useState(0)
	const [isUrlProcessed, setIsUrlProcessed] = useState(false)
	const [conversationKey, setConversationKey] = useState(null)
	const [selectedUserImage, setSelectedUserImage] = useState(null)

	const { triggerAlert } = useAlert()

	const handleSubmit = () => {
		triggerAlert('success', 'Message sent successfuly!')
	}

	useEffect(() => {
		const uri = window.location.pathname.split('/').slice(2, 4)

		if (uri.length > 0) {
			setMessages([])
			setConversationKey(uri[0])
			setSelectedUserId(parseInt(uri[1]))
			setIsUrlProcessed(true)
		} else {
			setIsUrlProcessed(false)
		}
	}, [location.pathname])

	useEffect(() => {
		const handleOpen = () => {
			console.log('WebSocket connected')
			if (isUrlProcessed) {
				chatSocket.current?.send(
					JSON.stringify({
						message_type: 'join',
						conversation_key: conversationKey,
						selected_user_id: selectedUserId,
					})
				)
			}
		}

		const handleClose = () => {
			console.log('WebSocket disconnected')
			chatSocket.current = null
			setTimeout(setupConnection, 3000)
		}

		const handleMessage = (e) => {
			console.log('handle message')
			const data = JSON.parse(e.data)
			setMessages((prevMessages) => [
				...prevMessages,
				{
					sender_id: data.sender,
					content: data.message,
					sent_datetime: data.timestamp,
				},
			])
		}

		const setupConnection = () => {
			if (!chatSocket.current) {
				const ws = new WebSocket(`ws://${window.location.hostname}:8000/ws/chat/`)
				chatSocket.current = ws
			}

			chatSocket.current.addEventListener('open', handleOpen)
			chatSocket.current.addEventListener('close', handleClose)
			chatSocket.current.addEventListener('message', handleMessage)
		}

		setupConnection()

		return () => {
			if (chatSocket.current) {
				console.log('cleanup running')
				const ws = chatSocket.current

				ws.removeEventListener('open', handleOpen)
				ws.removeEventListener('close', handleClose)
				ws.removeEventListener('message', handleMessage)

				chatSocket.current = null
			}
		}
	}, [isUrlProcessed, conversationKey])

	useEffect(() => {
		const getUserInfos = async () => {
			try {
				if (selectedUserId > 0) {
					const response = await axios.get(
						`${API_CHAT}${conversationKey}/${selectedUserId}/`,
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: getAuthHeaders().Authorization,
							},
						}
					)
					// console.log(response.data)
					setUser(response.data.user_infos[0])
					const messages = response.data.messages ? response.data.messages : []
					setMessages(messages)
					setSelectedUserImage(response.data.user_infos[0].profile_picture)
				}
			} catch (error) {
				console.error('Error fetching user infos:', error)
			}
		}

		if (selectedUserId > 0) {
			getUserInfos()
		}
	}, [selectedUserId])

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			sendMessage()
		}
	}

	const sendMessage = () => {
		let ws = chatSocket.current

		if (ws && ws.readyState === WebSocket.OPEN) {
			const value = MessageInputRef.current.value.trim()

			if (value !== '') {
				ws.send(
					JSON.stringify({
						sender: myId,
						message: value,
						message_type: 'message',
						conversation_key: conversationKey,
					})
				)
				MessageInputRef.current.value = ''
				// handleSubmit()
			}
		}
	}

	return (
		<section className='section-margin'>
			<div className='flex lg:flex-row flex-col lg:justify-between gap-4'>
				<div
					className='flex tb:flex-row flex-col lg:border-2 tb:border tb:items-center
						border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1'
				>
					<ChatHistory
						myId={myId}
						setMyId={setMyId}
						messages={messages}
						setMessages={setMessages}
						selectedUserId={selectedUserId}
						setSelectedUserId={setSelectedUserId}
						setConversationKey={setConversationKey}
					/>
					<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center max-tb:hidden'></div>

					<div
						className='tb:flex-1 flex flex-col items-center max-tb:border border-primary
									lg:rounded-3xl rounded-2xl tb:h-chat h-chat-ms bg-[rgba(27,22,17,0.5)]'
					>
						{user ? (
							<>
								<div className='chat-header flex items-center tb:h-[20%] h-[15%] w-full lp:gap-4 gap-3 max-tb:my-3 z-20'>
									<img
										src={`${selectedUserImage}`}
										className='conversation-header-image object-cover rounded-full ring-1 ring-primary select-none'
										alt='user image'
									/>
									<div>
										<p className='font-heavy friend-name text-primary'>
											{`${user.first_name} ${user.last_name}`}
										</p>
										<div className='flex items-center gap-0.5'>
											<div
												className={`w-1.5 h-1.5 rounded-full
												${user.status === 'online' ? 'bg-online' : user.status === 'offline' ? 'bg-offline' : 'bg-defeat'}`}
											></div>
											<p
												className={`last-message font-heavy
												${user.status === 'online' ? 'text-online' : user.status === 'offline' ? 'text-offline' : 'text-defeat'}`}
											>
												{user.status === 'online'
													? 'Online'
													: user.status === 'offline'
														? 'Offline'
														: 'In-Game'}
											</p>
										</div>
									</div>
								</div>
								<Messages
									messages={messages}
									selectedUserId={selectedUserId}
									selectedUserImage={selectedUserImage}
								/>
								<Footer
									sendMessage={sendMessage}
									handleKeyPress={handleKeyPress}
									selectedUserId={selectedUserId}
									MessageInputRef={MessageInputRef}
								/>
							</>
						) : (
							<StartConversation />
						)}
					</div>
				</div>
				{selectedUserId > 0 && <UserInfos user={user} />}
			</div>
		</section>
	)
}

export default Chat
