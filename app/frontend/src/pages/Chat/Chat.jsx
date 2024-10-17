import './Chat.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Messages from '../../components/Chat/Messages.jsx'
import UserInfos from '../../components/Chat/UserInfos.jsx'
import ChatHistory from '../../components/Chat/ChatHistory.jsx'
import StartConversation from '../../components/Chat/StartConversation.jsx'

const API_CHAT = import.meta.env.VITE_API_CHAT

const Chat = () => {
	const [user, setUser] = useState(null)
	const [messages, setMessages] = useState([])
	const [conversations, setConversations] = useState([])
	const [selectedUserId, setSelectedUserId] = useState(0)
	const [selectedUserImage, setSelectedUserImage] = useState(null)

	let cookies = document.cookie.split(';').filter((cookie) => cookie.includes('accessToken'))
	let accessToken = cookies[0].split('=')[1]

	const headers = {
		Authorization: `Bearer ${accessToken}`,
	}

	useEffect(() => {
		const getConversations = async () => {
			try {
				const response = await axios.get(API_CHAT, { headers })
				setConversations(response.data)
			} catch (error) {
				console.error('Error fetching conversations:', error)
			}
		}

		getConversations()
	}, [])

	useEffect(() => {
		const getUserInfos = async () => {
			try {
				if (selectedUserId > 0) {
					const conversationId = conversations.filter(
						(conversation) => conversation.other_user.id === selectedUserId
					)[0].id
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

	// const chatSocket = new WebSocket(`ws://${window.location.hostname}:8000/ws/chat/${conversation_key}`)

	return (
		<section className='section-margin'>
			<div className='flex lg:flex-row flex-col lg:justify-between gap-4'>
				<div
					className='flex tb:flex-row flex-col lg:border-2 tb:border-[1px] tb:items-center
						border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1'
				>
					<ChatHistory
						convId={selectedUserId}
						setId={setSelectedUserId}
						conversations={conversations}
						setMessages={setMessages}
					/>
					<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center max-tb:hidden'></div>

					<div
						className='flex-1 flex flex-col items-center max-tb:border border-primary
							lg:rounded-3xl rounded-2xl tb:h-chat h-[600px] bg-[rgba(27,22,17,0.5)]'
					>
						{user ? (
							<>
								<div className='chat-header flex max-ms:flex-col items-center tb:h-[20%] h-[15%] w-full lp:gap-5 gap-3 max-tb:my-3'>
									<img
										src={`${selectedUserImage}`}
										className='w-20 rounded-full border border-primary select-none'
										alt='user image'
									/>
									<div className='max-ms:hidden'>
										<p className='font-heavy friend-name text-primary'>
											{`${user.first_name} ${user.last_name}`}
										</p>
										<p
											className={`last-message ${user.is_active ? 'text-online' : 'text-offline'}`}
										>
											{user.is_active ? 'Online' : 'Offline'}
										</p>
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
											<img src='/assets/images/icons/paperclip.svg' alt='' />
										</button>
										<input
											type='text'
											name='chat-input'
											maxLength={1000}
											className='w-[85%] chat-input bg-transparent placeholder:text-light outline-none text-[15px]'
											placeholder='Type your message here...'
										/>
										<button>
											<img src='/assets/images/icons/emoji.svg' alt='' />
										</button>
										<button>
											<img src='/assets/images/icons/send-icon.svg' alt='' />
										</button>
									</div>
								</div>
							</>
						) : (
							<StartConversation />
						)}
					</div>
				</div>
				<UserInfos user={user} />
			</div>
		</section>
	)
}

export default Chat
