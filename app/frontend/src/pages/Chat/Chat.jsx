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
	
	const [user, setUser] = useState(null)
	const [messages, setMessages] = useState([])
	const [selectedUserId, setSelectedUserId] = useState(0)
	const [conversationId, setConversationId] = useState(0)
	const [selectedUserImage, setSelectedUserImage] = useState(null)
	console.log('chat')

	useEffect(() => {
		const uri = window.location.pathname.split('/').slice(2,4).map((id) => parseInt(id))

		if (uri.length > 0) {
			setMessages([])
			setConversationId(uri[0])
			setSelectedUserId(uri[1])
		}
	}, [])

	if (selectedUserId) {
		const chatSocket = new WebSocket(`ws://${window.location.hostname}:8000/ws/chat/${conversationId}`)
	}

	if (MessageInputRef.current) {
		MessageInputRef.current.focus()
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

	return (
		<section className='section-margin'>
			<div className='flex lg:flex-row flex-col lg:justify-between gap-4'>
				<div
					className='flex tb:flex-row flex-col lg:border-2 tb:border tb:items-center
						border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1'
				>
					<ChatHistory
						setConversationId={setConversationId}
						selectedUserId={selectedUserId}
						setSelectedUserId={setSelectedUserId}
						setMessages={setMessages}
					/>
					<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center max-tb:hidden'></div>

					<div
						className='flex-1 flex flex-col items-center max-tb:border border-primary
									lg:rounded-3xl rounded-2xl tb:h-chat bg-[rgba(27,22,17,0.5)]'
					>
						{user ? (
							<>
								<div className='chat-header flex items-center tb:h-[20%] h-[15%] w-full lp:gap-4 gap-3 max-tb:my-3'>
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
											<img src='/assets/images/icons/paperclip.svg' alt='paperclip-icon' />
										</button>
										<input
											type='text'
											maxLength={1000}
											name='chat-input'
											ref={MessageInputRef}
											placeholder='Type your message here...'
											className='w-[85%] chat-input bg-transparent placeholder:text-light outline-none text-[15px]'
										/>
										<button>
											<img src='/assets/images/icons/emoji.svg' alt='emojies-icon' />
										</button>
										<button type='submit'>
											<img src='/assets/images/icons/send-icon.svg' alt='send-icon' />
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
