function UserInfos() {
	return (
		<div
			className='lg:border-2 border-[1px] border-primary lg:rounded-3xl rounded-2xl lg:w-[24%] w-full
		flex lg:flex-col mtb:flex-row flex-col items-center max-lg:justify-around lg:pt-user-info-t bg-[rgba(27,22,17,0.5)]
		lg:h-chat-user-info-lg lg:px-user-info-x-lg px-user-info-x-ms ms:py-user-info-y-ms'
		>
			<img
				src='./assets/images/tabi3a.jpeg'
				className='rounded-full lg:border-2 border border-primary user-info-image mr-1'
				alt='User image'
			/>
			<div className='flex flex-col justify-center font-heavy lg:gap-y-8 tb:gap-y-5 gap-y-2'>
				<div>
					<p className='text-primary full-name leading-[1]'>Abdelouahed Rabiai</p>
					<p className='text-light nickname'>@Arabiai</p>
				</div>
				<div className='max-w-[500px]'>
					<p className='font-medium text-primary bio'>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa sunt quae
						corrupti ratione, esse quod amet quidem possimus necessitatibus optio
						cupiditate nisi placeat, nihil expedita sed quisquam. Commodi, cumque
						repellat. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<div className='flex flex-col justify-center items-center'>
				<img
					className='badge hover:scale-[1.2] transition duration-500 xl:mt-5 lg:mt-3 xl:mb-2 lg:mb-0'
					src='./assets/images/Achievements/celestial-master.png'
					alt='achievement badge'
				/>
				<div className='flex flex-col'>
					<p className='font-dreamscape-sans text-level achievement-title leading-[1] text-center'>
						Celestial Master
					</p>
					<p className='text-primary self-end xp'>10231xp</p>
				</div>
			</div>
		</div>
	)
}

export default UserInfos
