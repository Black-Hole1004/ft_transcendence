import { useEffect, useRef } from 'react'
import Message from './Message.jsx'

const Messages = ({ messages, selectedUserId, selectedUserImage }) => {
	const messagesEndRef = useRef(null)

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
	}, [messages])

	return (
		<div
			id='container'
			className='flex-1 w-[98%] ml-2 mr-4 overflow-y-auto flex flex-col gap-1.5'
		>
			{messages.map((message, index) => {
				return (
					<div key={index}>
						<Message
							message={message}
							selectedUserId={selectedUserId}
							selectedUserImage={selectedUserImage}
						/>
					</div>
				)
			})}
			<div ref={messagesEndRef} />
		</div>
	)
}

export default Messages
