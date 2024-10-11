import { useState } from "react"
import User from "./User"

function ChatHistory({ convId, setId }) {

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
						name='search for friends'
						placeholder='Search for friends...'
						className='font-medium bg-transparent text-primary outline-none search placeholder:text-border
									lg:w-input-lg ms:w-input-ms w-0'
					/>
				</div>
			</div>
			<div
				className={`flex tb:flex-col flex-row gap-1 users-container h-users-div scroll max-tb:ml-1 tb:mb-2
							tb:overflow-y-auto ${small ? 'overflow-x-scroll' : 'overflow-x-hidden'}`}
			>
				<User id={1} convId={convId} setId={setId} />
				<User id={2} convId={convId} setId={setId} />
				<User id={3} convId={convId} setId={setId} />
				{/* <User id={4} convId={convId} setId={setId} /> */}
				{/* <User id={5} convId={convId} setId={setId} /> */}
				{/* <User id={6} convId={convId} setId={setId} /> */}
				{/* <User id={7} convId={convId} setId={setId} /> */}
				{/* <User id={8} convId={convId} setId={setId} /> */}
				{/* <User id={9} convId={convId} setId={setId} /> */}
				{/* <User id={10} convId={convId} setId={setId} /> */}
				{/* <User id={11} convId={convId} setId={setId} /> */}
			</div>
		</div>
	)
}

export default ChatHistory
