import { useState } from "react"
import User from "./User"

function ChatHistory() {
	const [small, setSmall] = useState(window.innerWidth < 768)
	window.addEventListener("resize", () => {
		setSmall(window.innerWidth < 768)
	})

	return (
		<div
			className='flex flex-col tb:w-[34%] max-tb:border border-primary lg:rounded-3xl rounded-2xl
			tb:h-chat h-leftside-chat-ms gap-y-3 bg-[rgba(27,22,17,0.5)]'
		>
			<div className='flex justify-center items-center tb:h-[20%] tb:mt-0 mt-2'>
				<div className='flex items-center border border-border rounded-2xl pl-2.5 tb:w-[85%]'>
					<img
						src='/assets/images/icons/search-icon.png'
						className='search-icon'
						alt='search-icon'
					/>
					<input
						type='text'
						placeholder='Search for friends...'
						className='font-medium bg-transparent text-primary outline-none search placeholder:text-border
									lg:w-input-lg ms:w-input-ms w-0'
					/>
				</div>
			</div>
			<div
				className={`flex tb:flex-col flex-row gap-1 users-container h-users-div scroll max-tb:ml-1
							tb:overflow-y-scroll ${small ? 'overflow-x-scroll' : 'overflow-x-hidden'}`}
			>
				<User />
				<User />
				<User />
				<User />
				<User />
				<User />
				<User />
				<User />
				<User />
				<User />
				<User />
			</div>
		</div>
	)
}

export default ChatHistory
