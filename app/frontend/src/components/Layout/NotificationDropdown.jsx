import Button from '../Home/Buttons/Button'

function NotificationDropdown() {
	return (
		<>
			<h1 className='font-heavy notification-header'>Notifications</h1>
			<div className='flex flex-col tb:gap-3 gap-2 overflow-auto lp:mx-3 mx-2 mb-2 font-medium'>
				<div className='flex items-center gap-2'>
					<img
						src='/assets/images/lmoudir.jpg'
						className='mtb:border border-0.7 border-primary rounded-full'
						alt=''
					/>
					<p>
						Your friend <span className='font-heavy'>Ahmaymou</span> has invited you to
						play a game together! Are you ready for some fun?{' '}
						<span className='text-light'>1h</span>
					</p>
				</div>
				<div className='h-px w-[80%] bg-border self-center'></div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<img
							src='/assets/images/tabi3a.jpeg'
							className='mtb:border border-0.7 border-primary rounded-full'
							alt=''
						/>
						<p>Arabiai sent you a Friend Request!</p>
					</div>
					<div className='flex gap-1 mr-1'>
						<Button className={'notification-buttons rounded-md '}>Accept</Button>
						<Button className={'notification-buttons rounded-md '}>Cancel</Button>
					</div>
				</div>
				<div className='h-px w-[80%] bg-border self-center'></div>
				<div className='flex items-center gap-2'>
					<img
						src='/assets/images/lmoudir.jpg'
						className='mtb:border border-0.7 border-primary rounded-full'
						alt=''
					/>
					<p>
						Your friend <span className='font-heavy'>Ahmaymou</span> has invited you to
						play a game together! Are you ready for some fun?{' '}
						<span className='text-light'>1h</span>
					</p>
				</div>
				<div className='h-px w-[80%] bg-border self-center'></div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<img
							src='/assets/images/tabi3a.jpeg'
							className='mtb:border border-0.7 border-primary rounded-full'
							alt=''
						/>
						<p>Arabiai sent you a Friend Request!</p>
					</div>
					<div className='flex gap-1 mr-1'>
						<Button className={'notification-buttons rounded-md '}>Accept</Button>
						<Button className={'notification-buttons rounded-md '}>Cancel</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default NotificationDropdown
