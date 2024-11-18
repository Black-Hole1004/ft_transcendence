import { useNavigate } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_BASE_URL

function User({
	myId,
	search,
	setMessages,
	conversation,
	selectedUserId,
	setSelectedUserId,
	setConversationKey,
}) {
	const navigate = useNavigate()

	let user_id = search ? conversation.id : conversation.other_user.id
	let username = search ? conversation.username : conversation.other_user.username
	let profile_picture = search
		? conversation.profile_picture
		: conversation.other_user.profile_picture

	const getTimePassed = () => {
		let currentTime = new Date()
		let messageTime = new Date(conversation?.last_message?.sent_datetime)
		let timePassed = (Date.parse(currentTime) - Date.parse(messageTime)) / 1000

		timePassed =
			timePassed < 60
				? `${timePassed}s`
				: timePassed < 3600
					? `${Math.floor(timePassed / 60)}m`
					: timePassed < 86400
						? `${Math.floor(timePassed / 3600)}h`
						: timePassed < 604800
							? `${Math.floor(timePassed / 86400)}d`
							: timePassed < 31449600
								? `${Math.floor(timePassed / 604800)}w`
								: `${Math.floor(timePassed / 31449600)}y`

		return timePassed
	}

	const handleConversationSelect = () => {
		setSelectedUserId((prev) => {
			if (prev === user_id) {
				return prev
			}
			setMessages([])
			return user_id
		})

		let conversation_key = `${Math.min(myId, user_id)}_${Math.max(myId, user_id)}`
		// console.log(conversation_key)

		setConversationKey((prev) => {
			if (prev === conversation_key) return prev
			return conversation_key
		})
		navigate(`/chat/${conversation_key}/${user_id}`)
	}

	return (
		<div
			id={user_id}
			onClick={handleConversationSelect}
			className={`user-skeleton flex tb:flex-row flex-col max-tb:justify-around items-center gap-2
				tb:h-user-tb h-[100px] max-tb:w-[100px] rounded-lg tb:px-user-div-px-tb
				${search ? '' : selectedUserId === user_id ? 'bg-[rgba(183,170,156,0.3)]' : ''} hover:bg-[rgba(183,170,156,0.3)]`}
		>
			<img
				src={
					profile_picture?.startsWith('http')
						? profile_picture
						: BASE_URL + profile_picture
				}
				className='chat-history-image rounded-full object-cover ring-1 ring-primary select-none'
				alt='user image'
			/>
			<div className='font-medium tb:w-[80%]'>
				<p className='user-nickname text-primary max-tb:w-[100px] truncate max-tb:text-center'>
					{username}
				</p>
				{search ? (
					<p className='text-level last-message max-tb:hidden'>celestial master</p>
				) : (
					<div className='flex text-light max-tb:hidden last-message'>
						{user_id !== conversation?.last_message?.sender_id && (
							<pre className='font-medium'>You: </pre>
						)}
						<p className='truncate'>{conversation?.last_message?.content}</p>
						<pre className='font-medium'> &middot; {getTimePassed()}</pre>
					</div>
				)}
			</div>
			{search && (
				<img
					src='/assets/images/Achievements/celestial-master.png'
					className='select-none search-badge max-tb:hidden'
				/>
			)}
		</div>
	)
}

export default User
