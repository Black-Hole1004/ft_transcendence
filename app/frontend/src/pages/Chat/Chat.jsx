import './Chat.css'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Messages from '../../components/Chat/Messages.jsx'
import UserInfos from '../../components/Chat/UserInfos.jsx'
import ChatHistory from '../../components/Chat/ChatHistory.jsx'
import { useHeaders } from '../../components/HeadersContext.jsx'
import StartConversation from '../../components/Chat/StartConversation.jsx'

const API_CHAT = import.meta.env.VITE_API_CHAT

const Chat = () => {
	const headers = useHeaders()

	const MessageInputRef = useRef(null)

	const [myId, setMyId] = useState(0)
	const [user, setUser] = useState(null)
	const chatSocket = useRef(null)
	const [messages, setMessages] = useState([])
	const [selectedUserId, setSelectedUserId] = useState(0)
	const [conversationId, setConversationId] = useState(0)
	const [selectedUserImage, setSelectedUserImage] = useState(null)


	const joinRoom = (ws, roomId) => {
		ws.send(
			JSON.stringify({
				message_type: 'join',
				conversation_id: roomId,
			})
		)
	}

	useEffect(() => {
		let ws = chatSocket.current

		if (ws && ws.readyState === WebSocket.OPEN) {
			joinRoom(ws ,conversationId)
		}
	}, [conversationId])


	useEffect(() => {
		const uri = window.location.pathname
			.split('/')
			.slice(2, 4)
			.map((id) => parseInt(id))

		if (uri.length > 0) {
			setMessages([])
			setConversationId(uri[0])
			setSelectedUserId(uri[1])
		}
	}, [])

	useEffect(() => {
		let ws

		const connect = () => {
			ws = new WebSocket(`ws://${window.location.hostname}:8000/ws/chat/`)
			chatSocket.current = ws

			ws.addEventListener('open', () => {
				console.log('WebSocket connected')
				if (conversationId) {
					joinRoom(ws, conversationId)
				}
			})

			ws.addEventListener('close', () => {
				console.log('WebSocket disconnected')
				setTimeout(connect, 3000)
			})

			ws.addEventListener('message', (e) => {

				const data = JSON.parse(e.data)
				console.log(data)
				setMessages((prevMessages) => [...prevMessages, {
					sender_id: data.sender,
					content: data.message,
					sent_datetime: data.timestamp
				}])
			})

		}

		connect()

		return () => {
			if (ws) {
				ws.close()
				console.log('WebSocket diconnected')
			}
		}
	}, [])


	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			sendMessage()
		}
	}

	useEffect(() => {
		const getUserInfos = async () => {
			try {
				if (selectedUserId > 0) {
					const response = await axios.get(
						`${API_CHAT}${conversationId}/${selectedUserId}/`,
						{ headers }
					)

					setUser(response.data.user_infos[0])
					setMessages(response.data.messages)
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

	const sendMessage = () => {
		let ws = chatSocket.current
		
		if (ws && ws.readyState === WebSocket.OPEN) {
			const value = MessageInputRef.current.value.trim()

			if (value !== '') {
				ws.send(JSON.stringify({
					sender: myId,
					message: value,
					message_type: 'message',
					conversation_id: conversationId,
				}))
				MessageInputRef.current.value = ''
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
						setMyId={setMyId}
						setMessages={setMessages}
						selectedUserId={selectedUserId}
						setSelectedUserId={setSelectedUserId}
						setConversationId={setConversationId}
					/>
					<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center max-tb:hidden'></div>

					<div
						className='flex-1 flex flex-col items-center max-tb:border border-primary
									lg:rounded-3xl rounded-2xl tb:h-chat bg-[rgba(27,22,17,0.5)]'
					>
						{user ? (
							<>
								<div className='chat-header flex items-center tb:h-[20%] h-[15%] w-full lp:gap-4 gap-3 max-tb:my-3 z-20'>
									<img
										src={`${selectedUserImage}`}
										className='w-20 rounded-full border border-primary select-none'
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
								<div className='footer flex justify-center items-center w-full h-[10%] py-2'>
									<div className='flex justify-between w-[90%] max-lp:gap-1 chat-input-container border border-chat rounded-[50px]'>
										<button>
											<img
												src='/assets/images/icons/paperclip.svg'
												className='select-none'
												alt='paperclip-icon'
											/>
										</button>
										<input
											type='text'
											maxLength={1000}
											name='chat-input'
											ref={MessageInputRef}
											onKeyDown={handleKeyPress}
											placeholder='Type your message here...'
											className='w-[85%] chat-input bg-transparent placeholder:text-light outline-none text-[15px]'
										/>
										<button>
											<img
												src='/assets/images/icons/emoji.svg'
												className='select-none'
												alt='emojies-icon'
											/>
										</button>
										<button type='submit' onClick={sendMessage}>
											<img
												src='/assets/images/icons/send-icon.svg'
												className='select-none'
												alt='send-icon'
											/>
										</button>
									</div>
								</div>
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
