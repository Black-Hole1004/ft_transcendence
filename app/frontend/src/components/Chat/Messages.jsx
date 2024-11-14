import { useEffect, useRef } from 'react'
import Message from './Message.jsx'

const Messages = ({ messages, selectedUserId, selectedUserImage }) => {
	const messagesEndRef = useRef(null)

	const getDate = (timestamp) => {
		const date = timestamp.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
		return date
	}

	const formatDate = (timestamp) => {
		let currentDay = new Date()
		const date = new Date(timestamp)

		const formattedDate = getDate(date)
		const isToday = getDate(currentDay) === formattedDate
		
		let yesterday = new Date(currentDay);
		yesterday.setDate(currentDay.getDate() - 1);
		yesterday = getDate(yesterday)
		
		const isYesterday = yesterday === formattedDate

		return isToday ? 'Today' : isYesterday ? 'Yesterday' : formattedDate
	}

	function groupMessagesByDate(messages) {
		return messages.reduce((grouped, message) => {
			const date = formatDate(message.sent_datetime)
			if (!grouped[date]) {
				grouped[date] = []
			}
			grouped[date].push(message)
			return grouped
		}, {})
	}

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
	}, [messages])

	const groupedMessages = groupMessagesByDate(messages)

	return (
		<div
			id='container'
			className='flex-1 w-[98%] ml-2 mr-4 py-0.5 overflow-y-auto flex flex-col gap-1.5'
		>
			{Object.entries(groupedMessages).map(([date, messages]) => (
				<div key={date} className='flex flex-col gap-3'>
					<div className='flex items-center gap-1 mr-2'>
						<div className='h-px flex-1 bg-border brightness-50'></div>
						<p className='font-heavy text-border message-time'>{date}</p>
						<div className='h-px flex-1 bg-border brightness-50'></div>
					</div>
					<div>
						{messages.map((message, index) => (
							<div key={index}>
								<Message
									message={message}
									selectedUserId={selectedUserId}
									selectedUserImage={selectedUserImage}
								/>
							</div>
						))}
					</div>
				</div>
			))}

			<div ref={messagesEndRef} />
		</div>
	)
}

export default Messages
