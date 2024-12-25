const Button = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className={`
			border border-border select-none rounded font-medium message-content block-button
			bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out hover:bg-[rgb(183,170,156,30%)]`}
		>
			{children}
		</button>
	)
}

const ConversationHeader = ({
	blockerId,
	setBlockerId,
	areFriends,
	recipientInfo,
	currentLoggedInUserId,
	recipientProfileImage,
}) => {

	console.log(blockerId)
	return (
		<div className='chat-header flex justify-between items-center tb:h-[20%] h-[15%] w-full z-20'>
			<div className='flex justify-center items-center lp:gap-4 gap-3 max-tb:my-3'>
				<img
					src={`${recipientProfileImage}`}
					className='chat-history-image object-cover rounded-full ring-1 ring-primary select-none'
					alt='user image'
				/>
				<div>
					<p className='font-heavy friend-name text-primary'>
						{`${recipientInfo.first_name} ${recipientInfo.last_name}`}
					</p>
					<div className='flex items-center gap-0.5'>
						<div
							className={`w-1.5 h-1.5 rounded-full ${
								recipientInfo.status === 'online'
									? 'bg-online'
									: recipientInfo.status === 'offline'
										? 'bg-offline'
										: 'bg-defeat'
							}`}
						></div>
						<p
							className={`last-message font-heavy ${
								recipientInfo.status === 'online'
									? 'text-online'
									: recipientInfo.status === 'offline'
										? 'text-offline'
										: 'text-defeat'
							}`}
						>
							{recipientInfo.status === 'online'
								? 'Online'
								: recipientInfo.status === 'offline'
									? 'Offline'
									: 'In-Game'}
						</p>
					</div>
				</div>
			</div>
			<div className='flex lp:gap-2 gap-1'>
				{blockerId === currentLoggedInUserId && (
					<Button onClick={() => setBlockerId(0)}>Unblock</Button>
				)}
				{blockerId === 0 &&
					(areFriends ? <Button>Invite to Play</Button> : <Button>Add Friend</Button>)}
				{blockerId === 0 && (
					<Button onClick={() => setBlockerId(currentLoggedInUserId)}>Block user</Button>
				)}
			</div>
		</div>
	)
}

export default ConversationHeader
