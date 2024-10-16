function User({ conversation, convId, setId }) {

	const HighlightConversation = () => {
		setId(conversation.other_user.id)
	}
	return (
		<div
			id={conversation.other_user.id}
			onClick={HighlightConversation}
			className={`flex tb:flex-row flex-col max-tb:justify-around items-center gap-2
				tb:h-user-tb h-[100px] max-tb:w-[100px] rounded-lg user tb:p-user-div-px-tb
				${convId === conversation.other_user_id ? 'bg-[rgba(183,170,156,0.3)]' : ''} hover:bg-[rgba(183,170,156,0.3)]`}
		>
			<img
				src={`http://localhost:8000${conversation.other_user.profile_picture}`}
				className='rounded-full border border-primary select-none'
				alt='user image'
			/>
			<div className='font-medium flex-1 w-[80%]'>
				<p className='user-nickname text-primary max-tb:w-[100px] truncate max-tb:text-center'>
					{conversation.other_user.username}
				</p>
				<div className='flex text-light max-tb:hidden last-message'>
					{conversation.other_user.id !== conversation.last_message_id.sender_id &&
						<pre className='font-medium'>You: </pre>
					}
					<p className='whitespace-nowrap overflow-hidden text-ellipsis'>
						{conversation.last_message_id.content}
					</p>
					<pre className='font-medium'> &middot; 1h</pre>
				</div>
			</div>
		</div>
	)
}

export default User
