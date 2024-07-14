import React from 'react'
import './Chat.css'
import Header from '../../components/Header'

const Chat = () => {
	return (
		<div className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex-grow section-margin'>
				<div className='flex lg:flex-row ms:flex-col lg:justify-between ms:gap-4'>
					{/* whole card  background color */}
					<div
						className='flex tb:flex-row ms:flex-col lg:border-2 tb:border-[1px] tb:items-center
					border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1'
					>
						{/* left-part */}
						<div
							className='flex flex-col tb:w-[34%] max-tb:border border-primary lg:rounded-3xl rounded-2xl
							tb:h-chat ms:h-leftside-chat-ms' // height for large screens
						>
							{/* input-container */}
							<div className='flex justify-center items-center tb:h-[20%] h-[25%]'>
								{/* input-div */}
								<div className='flex items-center border border-border rounded-2xl pl-2.5 tb:w-[85%] w-input-ms'>
									<img
										src='/assets/images/icons/search-icon.png'
										className='search-icon'
										alt='search-icon'
									/>
									<input
										type='text'
										placeholder='Search for friends...'
										className='font-medium bg-transparent text-primary outline-none search placeholder:text-border
										lg:w-input-lg w-input-ms'
									/>
								</div>
							</div>
							{/* users-div */}
							<div className='flex-1 flex justify-center items-center'>Users</div>
						</div>

						<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center'></div>

						<div className='w-full max-tb:border border-primary flex items-center justify-center
							lg:rounded-3xl rounded-2xl h-chat'>
							chat
						</div>
					</div>

					{/* <div className='flex tb:flex-row ms:flex-col lg:border-2 tb:border-[1px] border-primary
						lg:rounded-3xl rounded-2xl lg:w-[75%] w-full'>  xxxxxxxxxxxxxxxx

						<div className='left-part tb:w-[40%] max-tb:border max-tb:border-primary'>

							<div className='tb:h-[18%] flex justify-center items-center'>

								<div className='flex items-center border border-border rounded-2xl pl-2.5'>
									<img
										src='/assets/images/icons/search-icon.png'
										className='search-icon'
										alt='search-icon'
									/>
									<input
										type='text'
										placeholder='Search for friends...'
										className='font-medium bg-transparent text-primary outline-none tb:w-input-lg w-input-ms search placeholder:text-border'
									/>
								</div>

							</div>

							<div className='h-[82%] flex justify-center items-center'>users</div>

						</div>

						<div className='lp:w-[2px] tb:w-[1px] h-[90%] self-center separator'></div>

						<div className='w-full max-tb:border max-tb:border-primary chat flex items-center justify-center'>chat</div>

					</div> */}

					<div
						className='lg:border-2 border-[1px] border-primary lg:rounded-3xl rounded-2xl lg:w-[24%] w-full
						flex lg:flex-col mtb:flex-row ms:flex-col items-center max-lg:justify-around lg:pt-user-info-t bg-[rgba(27,22,17,0.5)]
						lg:h-chat-user-info-lg lg:px-user-info-x-lg px-user-info-x-ms ms:py-user-info-y-ms'
					>
						<img
							src='./assets/images/tabi3a.jpeg'
							className='rounded-full lg:border-2 border border-primary user-info-image'
							alt=''
						/>
						<div className='flex flex-col justify-center font-heavy lg:gap-y-8 tb:gap-y-5 ms:gap-y-2'>
							<div>
								<p className='text-primary full-name leading-[1]'>
									Abdelouahed Rabiai
								</p>
								<p className='text-chat nickname'>@Arabiai</p>
							</div>
							<div className='max-w-[500px]'>
								<p className='font-medium text-primary bio'>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
									sunt quae corrupti ratione, esse quod amet quidem possimus
									necessitatibus optio cupiditate nisi placeat, nihil expedita sed
									quisquam. Commodi, cumque repellat. Lorem ipsum dolor sit amet,
									consectetur adipisicing elit.
								</p>
							</div>
						</div>
						<div className='flex lg:flex-col justify-center items-center'>
							<div>
								<div className='badge hover:scale-[1.2] transition duration-500 xl:mt-5 lg:mt-3 xl:mb-2 lg:mb-0 mr-[2px]'>
									<img
										src='./assets/images/Achievements/celestial-master.svg'
										alt='achievement badge'
									/>
								</div>
							</div>
							<div className='flex flex-col'>
								<p className='font-dreamscape-sans text-level achievement-title leading-[1]'>
									Galactic Trailblazer
								</p>
								<p className='text-primary self-end xp'>10231xp</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Chat
