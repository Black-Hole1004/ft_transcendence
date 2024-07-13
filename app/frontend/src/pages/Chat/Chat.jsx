import React from 'react'
import './Chat.css'
import Header from '../../components/Header'

const Chat = () => {
	return (
		<div className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex-grow section-margin'>
				<div className='flex lg:flex-row ms:flex-col lg:justify-between ms:gap-5'>
					<div className='flex chat lg:border-2 border-[1px] border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full bg-[rgba(27,22,17,0.6)]'>
						<div className='w-[34%]'>
							<div>
								<input
									type='text'
									className='bg-transparent border border-[#48433E]'
								/>
							</div>
						</div>
						<div className='lp:w-[2px] ms:w-[1px] h-[90%] self-center separator'></div>
						<div className='w-full'></div>
					</div>

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
								<div className='badge hover:scale-[1.2] transition duration-500 lg:mt-10 lg:mb-3'>
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
