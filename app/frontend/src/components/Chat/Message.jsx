const Message = ({ content, id }) => {
	return (
		<div className={`w-full flex items-start lg:gap-2 gap-1 px-2 ${id === 1 ? ' justify-end' : ''}`}>
			{
				id !== 1 ? (
					<img
						src='/assets/images/tabi3a.jpeg'
						className='rounded-full border-0.7 border-primary message-image select-none'
						alt='friend-image'
					/>
				) : <></>
			}
			<div className={`flex flex-col ml:max-w-[60%] max-w-[80%]`}>
				<p
					className={`text-secondary py-2 px-3 rounded-2xl message-content font-medium
					${id !== 1 ? 'bg-light rounded-tl-sm' : 'bg-primary rounded-tr-sm'}`}
				>
					{content}
				</p>
				<p className={`text-light font-regular message-time
					${id !== 1 ? 'self-end' : ''}`}>12:21 PM</p>
			</div>
		</div>
	)
}

export default Message