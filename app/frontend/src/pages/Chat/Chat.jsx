import React from 'react'
import './Chat.css'
import Header from '../../components/Header'

const Chat = () => {
	return (
		<div className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex-grow section-margin'>
				<div className='flex lg:flex-row flex-col lg:justify-between gap-4'>
					{/* whole card  background color */}
					<div
						className='flex tb:flex-row flex-col lg:border-2 tb:border-[1px] tb:items-center
					border-primary lg:rounded-3xl rounded-2xl lg:w-[75%] w-full max-tb:gap-y-1'
					>
						{/* left-part */}
						<div
							className='flex flex-col tb:w-[34%] max-tb:border border-primary lg:rounded-3xl rounded-2xl
							tb:h-chat ms:h-leftside-chat-ms gap-y-3 '
						>
							{/* input-container */}
							<div className='flex justify-center items-center tb:h-[20%] tb:mt-0 mt-2'>
								{/* input-div */}
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

							{/* users-container */}
							<div
								className='flex tb:flex-col flex-row gap-y-1 users-container h-users-div
								tb:overflow-y-scroll max-tb:overflow-x-scroll'
							>
								{/* user-div */}
								<div>
									<div
										className='flex tb:flex-row flex-col max-tb:justify-around items-center gap-x-2
										tb:h-user-tb h-[100px] max-tb:w-user-div w-full rounded-xl user tb:p-user-div-px-tb '
									>
										<img
											src='./assets/images/tabi3a.jpeg'
											className='rounded-full border border-primary'
											alt=''
										/>
										<div className='font-medium'>
											<div className='user-nickname text-primary'>
												<p className=''>Arabiai</p>
											</div>
											<div className='last-message text-chat max-tb:hidden'>
												<p className='whitespace-nowrap overflow-hidden text-ellipsis'>
													Lorem ipsum dolor sit amet, consectetur
													adipisicing elit. Optio, omnis possimus officia
													fuga enim ullam
												</p>
											</div>
										</div>
									</div>
								</div>

								<div>
									<div
										className='flex tb:flex-row flex-col max-tb:justify-around items-center gap-x-2
										tb:h-user-tb h-[100px] max-tb:w-user-div w-full rounded-xl user tb:p-user-div-px-tb '
									>
										<img
											src='./assets/images/tabi3a.jpeg'
											className='rounded-full border border-primary'
											alt=''
										/>
										<div className='font-medium'>
											<div className='user-nickname text-primary'>
												<p className=''>Arabiai</p>
											</div>
											<div className='last-message text-chat max-tb:hidden'>
												<p className='whitespace-nowrap overflow-hidden text-ellipsis'>
													Lorem ipsum dolor sit amet, consectetur
													adipisicing elit. Optio, omnis possimus officia
													fuga enim ullam
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div
										className='flex tb:flex-row flex-col max-tb:justify-around items-center gap-x-2
										tb:h-user-tb h-[100px] max-tb:w-user-div w-full rounded-xl user tb:p-user-div-px-tb '
									>
										<img
											src='./assets/images/tabi3a.jpeg'
											className='rounded-full border border-primary'
											alt=''
										/>
										<div className='font-medium'>
											<div className='user-nickname text-primary'>
												<p className=''>Arabiai</p>
											</div>
											<div className='last-message text-chat max-tb:hidden'>
												<p className='whitespace-nowrap overflow-hidden text-ellipsis'>
													Lorem ipsum dolor sit amet, consectetur
													adipisicing elit. Optio, omnis possimus officia
													fuga enim ullam
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div
										className='flex tb:flex-row flex-col max-tb:justify-around items-center gap-x-2
										tb:h-user-tb h-[100px] max-tb:w-user-div w-full rounded-xl user tb:p-user-div-px-tb '
									>
										<img
											src='./assets/images/tabi3a.jpeg'
											className='rounded-full border border-primary'
											alt=''
										/>
										<div className='font-medium'>
											<div className='user-nickname text-primary'>
												<p className=''>Arabiai</p>
											</div>
											<div className='last-message text-chat max-tb:hidden'>
												<p className='whitespace-nowrap overflow-hidden text-ellipsis'>
													Lorem ipsum dolor sit amet, consectetur
													adipisicing elit. Optio, omnis possimus officia
													fuga enim ullam
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div
										className='flex tb:flex-row flex-col max-tb:justify-around items-center gap-x-2
										tb:h-user-tb h-[100px] max-tb:w-user-div w-full rounded-xl user tb:p-user-div-px-tb '
									>
										<img
											src='./assets/images/tabi3a.jpeg'
											className='rounded-full border border-primary'
											alt=''
										/>
										<div className='font-medium'>
											<div className='user-nickname text-primary'>
												<p className=''>Arabiai</p>
											</div>
											<div className='last-message text-chat max-tb:hidden'>
												<p className='whitespace-nowrap overflow-hidden text-ellipsis'>
													Lorem ipsum dolor sit amet, consectetur
													adipisicing elit. Optio, omnis possimus officia
													fuga enim ullam
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div
										className='flex tb:flex-row flex-col max-tb:justify-around items-center gap-x-2
										tb:h-user-tb h-[100px] max-tb:w-user-div w-full rounded-xl user tb:p-user-div-px-tb '
									>
										<img
											src='./assets/images/tabi3a.jpeg'
											className='rounded-full border border-primary'
											alt=''
										/>
										<div className='font-medium'>
											<div className='user-nickname text-primary'>
												<p className=''>Arabiai</p>
											</div>
											<div className='last-message text-chat max-tb:hidden'>
												<p className='whitespace-nowrap overflow-hidden text-ellipsis'>
													Lorem ipsum dolor sit amet, consectetur
													adipisicing elit. Optio, omnis possimus officia
													fuga enim ullam
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div
										className='flex tb:flex-row flex-col max-tb:justify-around items-center gap-x-2
										tb:h-user-tb h-[100px] max-tb:w-user-div w-full rounded-xl user tb:p-user-div-px-tb '
									>
										<img
											src='./assets/images/tabi3a.jpeg'
											className='rounded-full border border-primary'
											alt=''
										/>
										<div className='font-medium'>
											<div className='user-nickname text-primary'>
												<p className=''>Arabiai</p>
											</div>
											<div className='last-message text-chat max-tb:hidden'>
												<p className='whitespace-nowrap overflow-hidden text-ellipsis'>
													Lorem ipsum dolor sit amet, consectetur
													adipisicing elit. Optio, omnis possimus officia
													fuga enim ullam
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div
										className='flex tb:flex-row flex-col max-tb:justify-around items-center gap-x-2
										tb:h-user-tb h-[100px] max-tb:w-user-div w-full rounded-xl user tb:p-user-div-px-tb '
									>
										<img
											src='./assets/images/tabi3a.jpeg'
											className='rounded-full border border-primary'
											alt=''
										/>
										<div className='font-medium'>
											<div className='user-nickname text-primary'>
												<p className=''>Arabiai</p>
											</div>
											<div className='last-message text-chat max-tb:hidden'>
												<p className='whitespace-nowrap overflow-hidden text-ellipsis'>
													Lorem ipsum dolor sit amet, consectetur
													adipisicing elit. Optio, omnis possimus officia
													fuga enim ullam
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div
										className='flex tb:flex-row flex-col max-tb:justify-around items-center gap-x-2
										tb:h-user-tb h-[100px] max-tb:w-user-div w-full rounded-xl user tb:p-user-div-px-tb '
									>
										<img
											src='./assets/images/tabi3a.jpeg'
											className='rounded-full border border-primary'
											alt=''
										/>
										<div className='font-medium'>
											<div className='user-nickname text-primary'>
												<p className=''>Arabiai</p>
											</div>
											<div className='last-message text-chat max-tb:hidden'>
												<p className='whitespace-nowrap overflow-hidden text-ellipsis'>
													Lorem ipsum dolor sit amet, consectetur
													adipisicing elit. Optio, omnis possimus officia
													fuga enim ullam
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='separator max-tb:h-0 lp:w-[2px] tb:w-[1px] w-0 justify-self-center'></div>

						<div
							className='flex-1 max-tb:border border-primary
							lg:rounded-3xl rounded-2xl h-chat'
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
							<div className='flex justify-center items-center'>chat</div>
						</div>
					</div>

					<div
						className='lg:border-2 border-[1px] border-primary lg:rounded-3xl rounded-2xl lg:w-[24%] w-full
						flex lg:flex-col mtb:flex-row flex-col items-center max-lg:justify-around lg:pt-user-info-t bg-[rgba(27,22,17,0.5)]
						lg:h-chat-user-info-lg lg:px-user-info-x-lg px-user-info-x-ms ms:py-user-info-y-ms'
					>
						<img
							src='./assets/images/tabi3a.jpeg'
							className='rounded-full lg:border-2 border border-primary user-info-image'
							alt=''
						/>
						<div className='flex flex-col justify-center font-heavy lg:gap-y-8 tb:gap-y-5 gap-y-2'>
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
								<div className='badge hover:scale-[1.2] transition duration-500 xl:mt-5 lg:mt-3 xl:mb-2 lg:mb-0'>
									<img
										src='./assets/images/Achievements/celestial-master.svg'
										alt='achievement badge'
									/>
								</div>
							</div>
							<div className='flex flex-col'>
								<p className='font-dreamscape-sans text-level achievement-title leading-[1]'>
									Celestial Master
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

{
	/* <div className='lb:w-[80%] w-[40%]'>
										<p className='nickname text-primary'>Arabiai</p>
										<p className='last-message whitespace-nowrap overflow-hidden text-ellipsis text-chat max-tb:text-transparent'>
											Lorem ipsum dolor sit amet, consectetur adipisicing
											elit. Optio, omnis possimus officia fuga enim ullam
										</p>
									</div> */
}
