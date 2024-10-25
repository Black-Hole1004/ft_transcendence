import { Link } from 'react-router-dom'

function UserAvatarDropdown({ setIsDropdownOpen }) {

	const closeDropdown = () => {
		setIsDropdownOpen(false)
	}

	return (
		<>
			<Link to={'/profile'}>
				<div onClick={closeDropdown} className='flex items-center gap-1'>
					<img
						src='/assets/images/moudrib.jpeg'
						className='rounded-full border border-primary dropdown-user-photo'
						alt='user photo'
					/>
					<div className='font-medium'>
						<p className='text-primary fullname'>Mouad Oudrib</p>
						<p className='text-light username'>@mouad55</p>
					</div>
				</div>
			</Link>
			<div className='h-px w-[80%] bg-border self-center'></div>
			<ul className='font-medium text-primary flex flex-col tb:gap-2.5 gap-1.5'>
				<Link to={'/profile'}>
					<li onClick={closeDropdown} className='flex items-center gap-4 hover:brightness-150'>
						<img src='/assets/images/icons/profile.svg' alt='profile icon' />
						Profile
					</li>
				</Link>
				<Link to={'/dashboard'}>
					<li onClick={closeDropdown} className='flex items-center gap-4 hover:brightness-150'>
						<img src='/assets/images/icons/dashboard.svg' alt='dashboard icon' />
						Dashboard
					</li>
				</Link>
				<Link to={'/settings'}>
					<li onClick={closeDropdown} className='flex items-center gap-4 hover:brightness-150'>
						<img src='/assets/images/icons/settings.svg' alt='settings icon' />
						Settings
					</li>
				</Link>
			</ul>
			<div className='h-[1px] w-[80%] bg-border self-center'></div>
			<ul>
				<Link to={'/'}>
					<li className='flex items-center gap-4 hover:brightness-150'>
						<img src='/assets/images/icons/log-out.svg' alt='logout icon' />
						Log Out
					</li>
				</Link>
			</ul>
		</>
	)
}

export default UserAvatarDropdown
