
const Button = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className={`
			border border-primary transition duration-300 select-none
			hover:bg-primary hover:text-secondary rounded-md font-medium message-content block-button`}
		>
			{children}
		</button>
	)
}

const ConversationHeader = ({ isBlocked, setIsBlocked, recipientInfo, recipientProfileImage }) => {
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
				<Button onClick={() => setIsBlocked(!isBlocked)}>
					{isBlocked ? 'Unblock' : 'Block user'}
				</Button>
				<Button>Invite to Play</Button>
			</div>
		</div>
	)
}

export default ConversationHeader
