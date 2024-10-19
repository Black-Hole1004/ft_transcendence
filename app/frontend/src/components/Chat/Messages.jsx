import Message from './Message.jsx'

const Messages = ({ messages, selectedUserId, selectedUserImage }) => {

	return (
		<div id="container" className='flex-1 w-[98%] ml-2 mr-4 overflow-y-auto flex flex-col gap-1.5'>
			{messages.map((message) => (
				<Message
					key={message.id}
					message={message}
					selectedUserId={selectedUserId}
					selectedUserImage={selectedUserImage}
				/>
			))}
		</div>
	)
}

export default Messages