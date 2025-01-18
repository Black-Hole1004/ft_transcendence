import User from './User'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import useAuth from '../../context/AuthContext'

const API_CHAT = import.meta.env.VITE_API_CHAT

function ChatHistory({
	setBlockerId,
	conversationKey,
	setConversationKey,
	conversationMessages,
	currentLoggedInUserId,
	setCurrentLoggedInUserId,
	badge_info,
}) {
	const searchRef = useRef(null)
	const [searchText, setSearchText] = useState('')
	const [searchResult, setSearchResult] = useState(null)
	const [conversations, setConversations] = useState([])
	const [small, setSmall] = useState(window.innerWidth < 768)

	window.addEventListener('resize', () => { // add cleanup
		setSmall(window.innerWidth < 768)
	})

	const handleChange = (e) => {
		setSearchText(e.target.value.toLowerCase())
		if (e.target.value === '') {
			setSearchResult(null)
		}
	}
	
	useEffect(() => {
		if (searchRef.current) {
			setSearchText('')
			setSearchResult(null)
			searchRef.current.value = ''
		}
	}, [conversationKey])

	const { getAuthHeaders } = useAuth()

	useEffect(() => {
		const getConversations = async () => {
			try {
				const response = await axios.get(API_CHAT, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: getAuthHeaders().Authorization,
					},
				})
				if (response.data) {
					if (response.data.conversations.length) {
						setConversations(response.data.conversations)
					}
					setCurrentLoggedInUserId(response.data.id)
				}
			} catch (error) {
				console.error('Error fetching conversations:', error)
			}
		}

		getConversations()
	}, [conversationMessages])

	useEffect(() => {
		const getUsers = async () => {
			try {
				if (searchText.length > 0) {
					const response = await axios.get(`${API_CHAT}search/${searchText}/`, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: getAuthHeaders().Authorization,
						},
					})
					if (response.data.search_result.length > 0) {
						setSearchResult(response.data.search_result)
					} else {
						setSearchResult(null)
					}
				} else {
					setSearchResult(null)
				}
			} catch (error) {
				console.error('Error fetching users:', error)
			}
		}
		if (searchText.length > 0) {
			getUsers()
		}
	}, [searchText])

	return (
		<div
			className='flex flex-col tb:w-[34%] max-tb:border border-primary rounded-2xl
			tb:h-chat h-leftside-chat-ms gap-y-3 bg-[rgba(27,22,17,0.5)]'
		>
			<div className='history-input flex justify-center items-center tb:h-[20%] tb:mt-0 mt-2 z-10'>
				<div className='flex items-center border border-border rounded-xl pl-2.5 tb:w-[85%]'>
					<img
						src='/assets/images/icons/search-icon.png'
						className='search-icon'
						alt='search-icon'
					/>
					<input
						type='text'
						ref={searchRef}
						autoComplete='off'
						value={searchText}
						onChange={handleChange}
						name='search for friends'
						placeholder='Search for friends...'
						className='font-medium bg-transparent text-primary outline-none search
									lg:w-input-lg ms:w-input-ms w-[80%] placeholder:text-border'
					/>
				</div>
			</div>
			<div
				className={`max-tb:flex max-tb:justify-center gap-1 users-container h-users-div scroll max-tb:ml-1 tb:mb-2
							${small ? 'overflow-x-scroll' : 'overflow-x-hidden'}`}
			>
				{(searchResult ? searchResult : conversations).map((conversation) => (
					<User
					key={conversation.id}
					setBlockerId={setBlockerId}
					search={!!searchResult}
					conversation={conversation}
					conversationKey={conversationKey}
					setConversationKey={setConversationKey}
					currentLoggedInUserId={currentLoggedInUserId}
					badge_info={badge_info}
					/>
				))}
			</div>
		</div>
	)
}

export default ChatHistory
