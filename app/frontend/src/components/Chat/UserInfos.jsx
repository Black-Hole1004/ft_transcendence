function UserInfos({ user }) {
	return (
		<div
			className='lg:border-2 border-[1px] border-primary lg:rounded-3xl rounded-2xl lg:w-[24%] w-full
		flex lg:flex-col mtb:flex-row flex-col items-center max-lg:justify-around lg:pt-user-info-t bg-[rgba(27,22,17,0.5)]
		lg:h-chat-user-info-lg lg:px-user-info-x-lg px-user-info-x-ms ms:py-user-info-y-ms gap-y-4'
		>
			{user ? (
				<>
					<div className="flex lg:flex-col gap-2 max-ml:flex-col">
						<img
							src={`${user.profile_picture}`}
							className='rounded-full lg:border-2 border border-primary user-info-image select-none self-center'
							alt='User image'
						/>
						<div className='flex flex-col justify-center font-heavy lg:gap-y-8 tb:gap-y-5 gap-y-2'>
							<div>
								<p className='text-primary full-name leading-[1]'>
									{`${user.first_name} ${user.last_name}`}
								</p>
								<p className='text-light nickname'>@{`${user.username}`}</p>
							</div>
							<div className='max-w-[500px]'>
								<p className='font-medium text-primary bio'>{`${user.bio}`}</p>
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-center items-center'>
						<img
							className='badge hover:scale-[1.2] transition duration-500 xl:mt-5 lg:mt-3 xl:mb-2 lg:mb-0 select-none'
							src='/assets/images/Achievements/celestial-master.png'
							alt='achievement badge'
						/>
						<div className='flex flex-col'>
							<p className='font-dreamscape-sans text-level achievement-title leading-[1] text-center'>
								Celestial Master
							</p>
							<p className='text-primary self-end xp'>10231xp</p>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default UserInfos
