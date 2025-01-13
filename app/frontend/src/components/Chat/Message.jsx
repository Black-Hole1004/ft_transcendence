const Message = ({ index, currentLoggedInUserId, message, recipientProfileImage }) => {
	let content = message.content
	let senderId = message.sender_id
	let time = new Date(message.sent_datetime)

	const messageTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	return (
		<div
			key={index}
			id='message'
			className={`flex items-start lg:gap-2 gap-1 px-2 w-full
			${senderId === currentLoggedInUserId ? 'justify-end' : ''}`}
		>
			{currentLoggedInUserId !== senderId && (
				<img
					src={`${recipientProfileImage}`}
					className='rounded-full aspect-square object-cover ring-1 ring-primary message-image select-none'
					alt='friend-image'
				/>
			)}
			<div className={`flex flex-col ml:max-w-[60%] max-w-[80%]`}>
				<p
					className={`text-secondary py-2 px-3 rounded-2xl message-content font-medium break-words
					${currentLoggedInUserId !== senderId ? 'bg-light rounded-tl-sm' : 'bg-primary rounded-tr-sm'}`}
				>
					{content}
				</p>
				<p className='text-light font-regular message-time self-end select-none'>
					{messageTime}
				</p>
			</div>
		</div>
	)
}

export default Message
