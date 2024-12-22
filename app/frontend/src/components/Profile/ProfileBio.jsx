function ProfileBio({src, bio}) {

	console.log(src);
	return (
		<div className='flex items-center'>
			<div>
				<img
					src= {src}
					className='profile-image rounded-full lg:border-2 border border-primary select-none object-cover'
					alt='profile image'
				/>
			</div>
			<div className='flex flex-col text-primary max-w-[50%] lg:gap-y-3 gap-y-1 font-medium'>
				<p className='titles'>BIO</p>
				<p className='bio-content'>
					{bio}
				</p>
			</div>
		</div>
	)
}

export default ProfileBio
