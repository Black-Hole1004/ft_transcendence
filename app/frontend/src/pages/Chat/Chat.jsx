import React from 'react'
import './Chat.css'
import Header from '../../components/Header'
import UserInfos from '../../components/Chat/UserInfos.jsx'
import ChatHistory from '../../components/Chat/ChatHistory.jsx'

const Chat = () => {
	return (
		<div className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex-grow section-margin'>
				<div className='flex lg:flex-row flex-col lg:justify-between gap-4'>
					<div
						className='flex tb:flex-row flex-col lg:border-2 tb:border-[1px] tb:items-center
					border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1'
					>
						<ChatHistory />
						<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center'></div>

						<div
							className='flex-1 max-tb:border border-primary
							lg:rounded-3xl rounded-2xl h-chat bg-[rgba(27,22,17,0.5)]'
						>
							<div className='flex items-center h-[20%] w-full gap-5'>
								<img
									src='./assets/images/tabi3a.jpeg'
									className='w-20 rounded-full border border-primary'
									alt=''
								/>
								<div>
									<p className='font-heavy'>Abdelouahed Rabiai</p>
									<p>Online</p>
								</div>
							</div>
							<div className='flex justify-center items-center'>
								chat
								<p>&#183; Hello</p>
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
