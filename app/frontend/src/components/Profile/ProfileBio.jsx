function ProfileBio() {
	return (
		<div className='flex items-center'>
			<div>
				<img
					src='./assets/images/moudrib.jpeg'
					className='profile-image rounded-full lg:border-2 border border-primary select-none'
					alt='profile image'
				/>
			</div>
			<div className='flex flex-col text-primary max-w-[50%] lg:gap-y-3 gap-y-1 font-medium'>
				<p className='titles'>BIO</p>
				<p className='bio-content'>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic magnam
					sequi odit ad, nobis molestiae, quaerat adipisci accusamus quibusdam ipsum,
					possimus eveniet similique deserunt eius porro nam ab dignissimos.
				</p>
			</div>
		</div>
	)
}

export default ProfileBio
