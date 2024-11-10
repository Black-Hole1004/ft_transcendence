import './Header.css'
import { Link } from 'react-router-dom'
import UserAvatarDropdown from './UserAvatarDropdown'
import NotificationDropdown from './NotificationDropdown'
import React, { useState, useRef, useEffect } from 'react'

function Header() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isNotificationOpen, setIsNotificationOpen] = useState(false)

	const dropdownRef = useRef(null)
	const avatarButtonRef = useRef(null)
	const notificationRef = useRef(null)
	const notificationButtonRef = useRef(null)

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (
				isDropdownOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target) &&
				!avatarButtonRef.current.contains(e.target)
			)
				setIsDropdownOpen(false)

			if (
				isNotificationOpen &&
				notificationRef.current &&
				!notificationRef.current.contains(e.target) &&
				!notificationButtonRef.current.contains(e.target)
			)
				setIsNotificationOpen(false)
		}

		document.addEventListener('click', handleOutsideClick)

		return () => {
			document.removeEventListener('click', handleOutsideClick)
		}
	}, [isDropdownOpen, isNotificationOpen])

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
		setIsNotificationOpen(false)
	}

	const toggleNotification = () => {
		setIsNotificationOpen(!isNotificationOpen)
		setIsDropdownOpen(false)
	}

	return (
		<header
			className='relative flex items-center justify-between text-primary header-margin font-medium
			lp:border-b-2 border-b-[1px] border-white header-border header-height max-ms:justify-end'
		>
			<Link to={'/dashboard'} aria-label='Go to Dashboard'>
				<img
					alt='logo'
					src='/assets/images/logo.webp'
					className='select-none pointer-events-none header-logo max-ms:hidden'
				/>
			</Link>
			<Link to={'/dashboard'}>
				<h1 className='leading-[1.1] text-primary font-dreamscape select-none header-title-font max-ml:hidden'>
					starserve
				</h1>
			</Link>
			<nav className='relative flex justify-between ml:gap-x-2.5 ms:gap-x-1.5'>
				<Link to={'/chat'}>
					<div className='relative'>
						<img
							src='/assets/images/icons/chat.svg'
							alt='chat icon'
							className='nav-icons select-none hover:brightness-150'
						/>
						<div
							className='flex justify-center items-center bg-red-600 border border-[#0B0B0B]
						h-[30%] absolute z-10 rounded-full right-0 top-0'
						>
							<p className='font-heavy text-[10px] p-0.5'>+99</p>
						</div>
					</div>
				</Link>
				<button
					ref={notificationButtonRef}
					onClick={toggleNotification}
					className='relative'
				>
					<img
						src='/assets/images/icons/notification.svg'
						alt='notification icon'
						className='nav-icons select-none hover:brightness-150'
					/>
					{!isNotificationOpen && (
						<div
							className='flex justify-center items-center bg-red-600 border border-[#0B0B0B]
						h-[30%] absolute z-10 rounded-full right-0 top-0'
						>
							<p className='font-heavy text-[10px] p-0.5'>+99</p>
						</div>
					)}
				</button>
				{isNotificationOpen && (
					<div
						ref={notificationRef}
						className='notification max-ms:w-full absolute z-10 ml:right-1/3 right-0
							top-full flex flex-col border border-primary rounded-xl bg-secondary'
					>
						<NotificationDropdown />
					</div>
				)}
				<button
					ref={avatarButtonRef}
					onClick={toggleDropdown}
					type='button'
					className='relative'
				>
					<img
						src='/assets/images/moudrib.jpeg'
						alt='user photo'
						className='nav-icons border-[1px] rounded-full border-primary select-none'
					/>
					<div
						className='flex justify-center items-center bg-secondary border border-[#0B0B0B]
						w-[34%] h-[34%] absolute z-10 rounded-full right-0 bottom-0'
					>
						<img
							src='assets/images/icons/Arrow-dropdown.svg'
							className={`w-[60%] duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
							alt='arrow icon'
						/>
					</div>
				</button>
				{isDropdownOpen && (
					<div
						ref={dropdownRef}
						className='dropdown absolute z-10 right-0 top-full flex flex-col border border-primary rounded-xl bg-secondary'
					>
						<UserAvatarDropdown setIsDropdownOpen={setIsDropdownOpen} />
					</div>
				)}
			</nav>
		</header>
	)
}

export default Header
