import { useEffect, useRef } from 'react'
import Message from './Message.jsx'

const Messages = ({ messages, selectedUserId, selectedUserImage }) => {
	const messagesEndRef = useRef(null)

	// const formatDate = (timestamp) => {
	// 	const formattedDate = new Intl.DateTimeFormat('en-US', {
	// 		year: 'numeric',
	// 		month: 'long',
	// 		day: '2-digit',
	// 	}).format(timestamp)
	// 	return formattedDate
	// }

	// function groupMessagesByDate(messages) {
	// 	return messages.reduce((grouped, message) => {
	// 		const date = formatDate(message.timestamp)
	// 		if (!grouped[date]) {
	// 			grouped[date] = []
	// 		}
	// 		grouped[date].push(message)
	// 		return grouped
	// 	}, {})
	// }

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
	}, [messages])

	// const groupedMessages = groupMessagesByDate(messages)
	// console.log(groupedMessages)
	// const length = Object.keys(groupedMessages).length
	// console.log(length)

	return (
		<div
			id='container'
			className='flex-1 w-[98%] ml-2 mr-4 py-0.5 overflow-y-auto flex flex-col gap-1.5'
		>
			{/* {Object.keys(groupedMessages).length ? 
			(groupedMessages.map((key, value) => {
				console.log('key: ', key)
				console.log('value: ', value)
			}))
			: <></>} */}
			{messages?.map((message, index) => {
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
