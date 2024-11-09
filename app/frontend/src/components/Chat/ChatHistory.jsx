import User from './User'
import axios from 'axios'
import { useState, useEffect } from 'react'

const API_CHAT = import.meta.env.VITE_API_CHAT

function ChatHistory({
	setMyId,
	headers,
	messages,
	setMessages,
	selectedUserId,
	setConversationId,
	setSelectedUserId,
}) {
	const [searchText, setSearchText] = useState('')
	const [searchResult, setSearchResult] = useState(null)
	const [conversations, setConversations] = useState([])
	const [small, setSmall] = useState(window.innerWidth < 768)

	window.addEventListener('resize', () => {
		setSmall(window.innerWidth < 768)
	})

	useEffect(() => {
		if (!headers) return

		const getConversations = async () => {
			try {
				const response = await axios.get(API_CHAT, { headers })
				setMyId(response.data[0].my_id)
				setConversations(response.data)
			} catch (error) {
				console.error('Error fetching conversations:', error)
			}
		}

		getConversations()
	}, [messages, headers])

	useEffect(() => {
		const getUsers = async () => {
			try {
				if (searchText.length > 0) {
					const response = await axios.get(`${API_CHAT}${searchText}/`, { headers })

					if (response.data.search_result.length > 0) {
						setSearchResult(response.data.search_result)
					}
					else {
						setSearchResult(null)
					}
				}
				else {
					setSearchResult(null)
				}
			} catch {
				console.error('Error fetching users:', error)
			}
		}

		getUsers()
	}, [searchText])

	return (
		<div
			className='flex flex-col tb:w-[34%] max-tb:border border-primary lg:rounded-3xl rounded-2xl
			tb:h-chat h-leftside-chat-ms gap-y-3 bg-[rgba(27,22,17,0.5)]'
		>
			<div className='history-input flex justify-center items-center tb:h-[20%] tb:mt-0 mt-2 z-10'>
				<div className='flex items-center border border-border rounded-2xl pl-2.5 tb:w-[85%]'>
					<img
						src='/assets/images/icons/search-icon.png'
						className='search-icon select-none'
						alt='search-icon'
					/>
					<input
						type='text'
						autoComplete='off'
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						name='search for friends'
						placeholder='Search for friends...'
						className='font-medium bg-transparent text-primary outline-none search
									lg:w-input-lg ms:w-input-ms w-[80%] placeholder:text-border'
					/>
				</div>
			</div>
			<div
				className={`flex tb:flex-col max-tb:justify-center flex-row gap-1 users-container h-users-div scroll max-tb:ml-1 tb:mb-2
							tb:overflow-y-auto ${small ? 'overflow-x-scroll' : 'overflow-x-hidden'}`}
			>
				{searchResult ? (
					searchResult.map((conversation, index) => (
						<User
							key={index}
							search={true}
							setMessages={setMessages}
							conversation={conversation}
							selectedUserId={selectedUserId}
							setSelectedUserId={setSelectedUserId}
							setConversationId={setConversationId}
							/>
						))
					) : (
						conversations.map((conversation) => (
							<User
							search={false}
							key={conversation.id}
							setMessages={setMessages}
							conversation={conversation}
							selectedUserId={selectedUserId}
							setSelectedUserId={setSelectedUserId}
							setConversationId={setConversationId}
						/>
					))
				)}
			</div>
		</div>
	)
}

export default ChatHistory
