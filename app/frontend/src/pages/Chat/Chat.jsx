import React from 'react'
import './Chat.css'
import Header from '../../components/Header'
import UserInfos from '../../components/Chat/UserInfos.jsx'
import ChatHistory from '../../components/Chat/ChatHistory.jsx'

const Chat = () => {
	return (
		<div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='section-margin'>
				<div className='flex lg:flex-row flex-col lg:justify-between gap-4'>
					<div
						className='flex tb:flex-row flex-col lg:border-2 tb:border-[1px] tb:items-center
						border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1'
					>
						<ChatHistory />
						<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center max-tb:hidden'></div>

						<div
							className='flex-1 flex flex-col items-center max-tb:border border-primary
							lg:rounded-3xl rounded-2xl h-chat bg-[rgba(27,22,17,0.5)]'
						>
							<div className='chat-header flex max-ms:flex-col items-center h-[20%] w-full lp:gap-5 gap-3 max-tb:my-3'>
								<img
									src='./assets/images/tabi3a.jpeg'
									className='w-20 rounded-full border border-primary'
									alt='user image'
								/>
								<div className='max-ms:hidden'>
									<p className='font-heavy friend-name text-primary'>
										Abdelouahed Rabiai
									</p>
									<p className='last-message text-light'>Online</p>
								</div>
							</div>
							<div className='flex-1 flex flex-col justify-between items-center text-transparent'>
								{/* chat */}
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
								<p>&#183; Hello</p>
							</div>
							<div className='footer flex justify-center items-center w-full h-[10%] py-2'>
								<div className='flex justify-between w-[90%] max-lp:gap-1 chat-input-container border border-chat rounded-[50px]'>
									<button>
										<img src='./assets/images/icons/paperclip.svg' alt='' />
									</button>
									<input
										type='text'
										className='w-[85%] chat-input bg-transparent placeholder:text-light outline-none'
										placeholder='Type your message here...'
									/>
									<button>
										<img src='./assets/images/icons/emoji.svg' alt='' />
									</button>
									<button>
										<img src='./assets/images/icons/send-icon.svg' alt='' />
									</button>
								</div>
							</div>
						</div>
					</div>

					<UserInfos />
				</div>
			</section>
		</div>
	)
}

export default Chat
