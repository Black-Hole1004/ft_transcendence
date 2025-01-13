function UserInfos({ recipientInfo, badge_info, recipientXp }) {
	return (
		<div className='border border-primary lg:rounded-3xl rounded-2xl lg:w-[24%] w-full
			flex lg:flex-col mtb:flex-row flex-col items-center max-lg:justify-around lg:pt-user-info-t bg-[rgba(27,22,17,0.5)]
			lg:h-chat-user-info-lg lg:px-user-info-x-lg px-user-info-x-ms ms:py-user-info-y-ms gap-y-4'>
			{recipientInfo ? (
				<>
					<div className="lg:w-full flex lg:flex-col gap-2 ml:flex-row flex-col text-start">
						<img
							src={`${recipientInfo.profile_picture}`}
							className='rounded-full aspect-square object-cover ring-1 ring-primary user-info-image select-none self-center'
							alt='User image'
							onError={(e) => {
								e.target.src = '/assets/images/default-avatar.png'
							}}
						/>
						<div className='w-full flex-1 flex flex-col font-heavy lg:gap-y-8 tb:gap-y-5 gap-y-2'>
							<div>
								<p className='text-primary full-name leading-[1]'>
									{`${recipientInfo.first_name} ${recipientInfo.last_name}`}
								</p>
								<p className='text-light nickname'>@{`${recipientInfo.username}`}</p>
							</div>
							<div className='max-w-[400px] break-words'>
								<p className='font-medium text-primary bio'>{`${recipientInfo.bio}`}</p>
							</div>
						</div>
					</div>
					{badge_info && (
						<div className='flex flex-col justify-center items-center'>
							<img
								className='badge hover:scale-[1.2] transition duration-500 xl:mt-5 lg:mt-3 xl:mb-2 lg:mb-0 select-none'
								src={badge_info.image}
								alt={badge_info.name}
								onError={(e) => {
									e.target.src = '/assets/images/Achievements/novice-astronaut.png'
								}}
							/>
							<div className='flex flex-col'>
								<p className='font-dreamscape-sans text-level achievement-title leading-[1] text-center'>
									{badge_info.name}
								</p>
								<p className='text-primary self-end xp'>{recipientXp} xp</p>
							</div>
						</div>
					)}
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default UserInfos