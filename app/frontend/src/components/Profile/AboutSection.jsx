function AboutSection() {
	return (
		<div className='flex flex-col items-center gap-2'>
			<p className='titles self-start max-mtb:ml-3'>About</p>
			<div className='about rounded-xl flex flex-col justify-around font-medium text-primary max-ms:w-full'>
				<div className='line1 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<img src='./assets/images/icons/Name.svg' className='select-none' alt='' />
						<p>Full Name</p>
					</div>
					<div>
						<p>Mouad Oudrib</p>
					</div>
				</div>
				<div className='line2 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<img
							src='./assets/images/icons/username.svg'
							className='select-none'
							alt=''
						/>
						<p>Username</p>
					</div>
					<div>
						<p>moudrib</p>
					</div>
				</div>
				<div className='line3 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<img src='./assets/images/icons/Email.svg' className='select-none' alt='' />
						<p>Email</p>
					</div>
					<div>
						<p>transcendence@gmail.com</p>
					</div>
				</div>
				<div className='line4 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<img
							src='./assets/images/icons/Calendar.svg'
							className='select-none'
							alt=''
						/>
						<p>Joined</p>
					</div>
					<div>
						<p>April 2024</p>
					</div>
				</div>
				<div className='line5 flex justify-between items-center'>
					<div className='flex items-center gap-3'>
						<img src='./assets/images/icons/Phone.svg' className='select-none' alt='' />
						<p>Phone</p>
					</div>
					<div>
						<p>+212611223344</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutSection
