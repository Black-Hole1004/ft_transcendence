import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import UserAvatarDropdown from './UserAvatarDropdown'
import NotificationDropdown from './NotificationDropdown'

function Header({src, preview}) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isNotificationOpen, setIsNotificationOpen] = useState(false)

	const toggleDropdown = (e) => {
		e.stopPropagation()
		setIsDropdownOpen(!isDropdownOpen)
		if (isDropdownOpen) setIsNotificationOpen(false)
	}

	const toggleNotification = (e) => {
		e.stopPropagation()
		setIsNotificationOpen(!isNotificationOpen)
		if (isNotificationOpen) setIsDropdownOpen(false)
	}

	return (
		<header
			className='relative flex items-center justify-between text-primary header-margin font-medium
			lp:border-b-2 border-b-[1px] border-white header-border header-height max-ms:justify-end'
		>
			<Link to={'/dashboard'}>
				<img
					className='select-none pointer-events-none header-logo max-ms:hidden'
					src='/assets/images/logo.webp'
				/>
			</Link>
			<Link to={'/dashboard'}>
				<h1 className='leading-[1.1] text-primary font-dreamscape select-none header-title-font max-ml:hidden'>
					starserve
				</h1>
			</Link>
			<nav className='relative flex justify-between ml:gap-x-2.5 ms:gap-x-1.5'>
				<Link to={'/chat'}>
					<img
						src='/assets/images/icons/chat.svg'
						alt='chat icon'
						className='nav-icons select-none'
					/>
				</Link>
				<button onClick={toggleNotification}>
					<img
						src='/assets/images/icons/notification.svg'
						alt='notification icon'
						className='nav-icons select-none'
					/>
				</button>
				{isNotificationOpen && (
					<NotificationDropdown setIsNotificationOpen={setIsNotificationOpen} />
				)}
				<button onClick={toggleDropdown} type='button'>
					<img
						src={preview || src }
						alt='user photo'
						className='nav-icons border-[1px] rounded-full border-primary select-none'
					/>
				</button>
				{isDropdownOpen && <UserAvatarDropdown setIsDropdownOpen={setIsDropdownOpen} />}
			</nav>
		</header>
	)
}

export default Header
