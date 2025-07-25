function AboutSection({ first_name, last_name, email, mobile_number, username, date_joined_formatted }) {

	return (
		<div className='flex flex-col items-center gap-2'>
			<p className='titles self-start max-mtb:ml-3'>About</p>
			<div className='about rounded-xl flex flex-col justify-around font-medium text-primary max-ms:w-full'>
				<div className='line1 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<img src='/assets/images/icons/Name.svg' className='select-none' alt='' />
						<p>Full Name</p>
					</div>
					<div>
						<p>{first_name} {last_name}</p>
					</div>
				</div>
				<div className='line2 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<img
							src='/assets/images/icons/username.svg'
							className='select-none'
							alt=''
						/>
						<p>Username</p>
					</div>
					<div>
						<p>{username}</p>
					</div>
				</div>
				<div className='line3 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<img src='/assets/images/icons/Email.svg' className='select-none' alt='' />
						<p>Email</p>
					</div>
					<div>
						<p>{email}</p>
					</div>
				</div>
				<div className='line4 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<img
							src='/assets/images/icons/Calendar.svg'
							className='select-none'
							alt=''
						/>
						<p>Joined</p>
					</div>
					<div>
						<p>{date_joined_formatted}</p>
					</div>
				</div>
				<div className='line5 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<img src='/assets/images/icons/Phone.svg' className='select-none' alt='' />
						<p>Phone</p>
					</div>
					<div>
						<p>{mobile_number}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutSection
