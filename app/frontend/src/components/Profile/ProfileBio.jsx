function ProfileBio({src, bio}) {

	return (
		<div className='flex items-center max-mtb:flex-col'>
			<img
			src= {src}
			className='profile-image aspect-square rounded-full ring-1 ring-primary select-none object-cover'
			alt='profile image'
			/>
			<div className='flex flex-col self-start text-primary lg:gap-y-3 gap-y-1 font-medium'>
				<p className='titles mtb:ml-0 ml-3'>BIO</p>
				<p className='bio-content mtb:mx-0 mx-3 max-mtb:text-center break-words'>
					{bio}
				</p>
			</div>
		</div>
	)
}

export default ProfileBio
