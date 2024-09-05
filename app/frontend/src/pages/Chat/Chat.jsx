import './Chat.css'
import UserInfos from '../../components/Chat/UserInfos.jsx'
import ChatHistory from '../../components/Chat/ChatHistory.jsx'

const Message = ({ content, id }) => {
	return (
		<div className={`w-full flex items-start lg:gap-2 gap-1 px-2 ${id === 1 ? ' justify-end' : ''}`}>
			{
				id !== 1 ? (
					<img
						src='./assets/images/tabi3a.jpeg'
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

const Chat = () => {
	return (
		<section className='section-margin'>
			<div className='flex lg:flex-row flex-col lg:justify-between gap-4'>
				<div
					className='flex tb:flex-row flex-col lg:border-2 tb:border-[1px] tb:items-center
						border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1'
				>
					<ChatHistory />
					<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center max-tb:hidden'></div>

					<div
						className='flex flex-col items-center max-tb:border border-primary
							lg:rounded-3xl rounded-2xl tb:h-chat h-[600px] bg-[rgba(27,22,17,0.5)]'
					>
						<div className='chat-header flex max-ms:flex-col items-center tb:h-[20%] h-[15%] w-full lp:gap-5 gap-3 max-tb:my-3'>
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
						<div className='flex-1 w-[98%] ml-2 mr-4 overflow-auto flex flex-col gap-1.5'>
							{/* chat */}
							<Message content={'Ready for another round?'} id={2} />
							<Message content={`You bet! I'm gonna win this time.`} id={1} />
							<Message content={`Haha, we'll see about that! I've been practicing.`} id={2} />
							<Message content={`Oh, bringing out the big guns, huh? Let’s do this!`} id={1} />
							<Message content={`Alright, let's start! First to 10 points?`} id={2} />
							<Message content={`Deal. Good luck, but not too much luck 😜`} id={1} />
							<Message content={'Haha, same to you! Here we go...'} id={2} />
							<Message content={'Yes! 10-9! Victory is mine!'} id={1} />
							<Message content={'Nooo! That was so close! Good game, though.'} id={2} />
							<Message content={'GG! You had me sweating there for a bit. Rematch?'} id={1} />
							<Message content={`Definitely. But this time, I'm taking the win!`} id={2} />
							<Message content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, culpa? Eaque laudantium est sunt ad corporis, vel nihil beatae velit, praesentium aliquid fugiat amet tempore voluptatum repellendus exercitationem voluptas doloremque.`} id={1} />
							<Message content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, culpa? Eaque laudantium est sunt ad corporis, vel nihil beatae velit, praesentium aliquid fugiat amet tempore voluptatum repellendus exercitationem voluptas doloremque.`} id={2} />
							<Message content={`.`} id={2} />
						</div>
						<div className='footer flex justify-center items-center w-full h-[10%] py-2'>
							<div className='flex justify-between w-[90%] max-lp:gap-1 chat-input-container border border-chat rounded-[50px]'>
								<button>
									<img src='./assets/images/icons/paperclip.svg' alt='' />
								</button>
								<input
									type='text'
									name='chat-input'
									maxLength={1000}
									className='w-[85%] chat-input bg-transparent placeholder:text-light outline-none text-[15px]'
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
	)
}

export default Chat
