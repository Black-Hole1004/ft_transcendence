import React, { useEffect, useRef, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Button from './Home/Buttons/Button'

function Header() {
	const dropdownRef = useRef(null)
	// const notificationRef = useRef(null)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	// const [isNotificationOpen, setIsNotificationOpen] = useState(false)

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	// const toggleNotification = () => {
	// 	setIsNotificationOpen(!isNotificationOpen)
	// }

	useEffect(() => {
		const closeDropdown = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setIsDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', closeDropdown)
	
		return () => {
			document.removeEventListener('mousedown', closeDropdown)
		}
	}, [])


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
						className='nav-icons'
					/>
				</Link>
				{/* <button onClick={toggleNotification}>
					<img
						src='/assets/images/icons/notification.svg'
						alt='notification icon'
						className='nav-icons'
					/>
				</button>
				{
					isNotificationOpen && (
						<div ref={notificationRef} className='notification max-ms:w-full absolute z-10 ml:right-1/3 right-0 top-full flex flex-col border border-primary rounded-xl bg-secondary'>
							<h1 className='font-heavy notification-header'>Notifications</h1>
							<div className='flex flex-col tb:gap-3 gap-2 overflow-auto lp:mx-3 mx-2 mb-2 font-medium'>
								<div className='flex items-center gap-1'>
									<img src="/assets/images/lmoudir.jpg" className='mtb:border border-0.7 border-primary rounded-full' alt="" />
									<p>Your friend <span className='font-heavy'>Ahmaymou</span> has invited you to play a game together! Are you ready for some fun? <span className='text-light'>1h</span></p>
								</div>
								<div className='h-px w-[80%] bg-border self-center'></div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-1'>
										<img src="/assets/images/tabi3a.jpeg" className='mtb:border border-0.7 border-primary rounded-full' alt="" />
										<p>Arabiai sent you a Friend Request!</p>
									</div>
									<div className='flex gap-1 mr-1'>
										<Button className={'notification-buttons rounded-md '}>Accept</Button>
										<Button className={'notification-buttons rounded-md '}>Cancel</Button>
									</div>
								</div>
								<div className='h-px w-[80%] bg-border self-center'></div>
								<div className='flex items-center gap-1'>
									<img src="/assets/images/lmoudir.jpg" className='mtb:border border-0.7 border-primary rounded-full' alt="" />
									<p>Your friend <span className='font-heavy'>Ahmaymou</span> has invited you to play a game together! Are you ready for some fun? <span className='text-light'>1h</span></p>
								</div>
								<div className='h-px w-[80%] bg-border self-center'></div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-1'>
										<img src="/assets/images/tabi3a.jpeg" className='mtb:border border-0.7 border-primary rounded-full' alt="" />
										<p>Arabiai sent you a Friend Request!</p>
									</div>
									<div className='flex gap-1 mr-1'>
										<Button className={'notification-buttons rounded-md '}>Accept</Button>
										<Button className={'notification-buttons rounded-md '}>Cancel</Button>
									</div>
								</div>
							</div>
						</div>
					)
				} */}
				<button onClick={toggleDropdown} type='button'>
					<img
						src='/assets/images/moudrib.jpeg'
						alt='user photo'
						className='nav-icons border-[1px] rounded-full border-primary'
					/>
				</button>
				{/* user avatar dropdown */}
				{ isDropdownOpen && (
					<div ref={dropdownRef} className='dropdown absolute z-10 right-0 top-full flex flex-col border border-primary rounded-xl bg-secondary'>
						<Link to={'/profile'}>
							<div className='flex items-center gap-1'>
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
						<div className='h-[1px] w-[80%] bg-border self-center'></div>
						<ul className='font-medium text-primary flex flex-col tb:gap-2.5 gap-1.5'>
							<Link to={'/profile'}>
								<li className='flex items-center gap-4 '>
									<img src='/assets/images/icons/profile.svg' alt='' />
									Profile
								</li>
							</Link>
							<Link to={'/dashboard'}>
								<li className='flex items-center gap-4 '>
									<img src='/assets/images/icons/dashboard.svg' alt='' />
									Dashboard
								</li>
							</Link>
							<Link to={'/settings'}>
								<li className='flex items-center gap-4 '>
									<img src='/assets/images/icons/settings.svg' alt='' />
									Settings
								</li>
							</Link>
						</ul>
						<div className='h-[1px] w-[80%] bg-border self-center'></div>
						<ul>
							<Link to={'/'}>
								<li className='flex items-center gap-4 '>
									<img src='/assets/images/icons/log-out.svg' alt='' />
									Log Out
								</li>
							</Link>
						</ul>
					</div>)
				}
			</nav>
		</header>
	)
}

export default Header
