import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	return (
		<header
			className='relative flex items-center justify-between text-primary header-margin font-medium
			lp:border-b-2 border-b-[1px] border-white header-border header-height max-ms:justify-end'
		>
			<Link to={'/dashboard'}>
				<img
					className='select-none pointer-events-none header-logo max-ms:hidden'
					src='/assets/images/logo-transparent.png'
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
				<button>
					<img
						src='/assets/images/icons/notification.svg'
						alt='notification icon'
						className='nav-icons'
					/>
				</button>
				<button onClick={toggleDropdown} type='button'>
					<img
						src='/assets/images/moudrib.jpeg'
						alt='user photo'
						className='nav-icons border-[1px] rounded-full border-primary'
					/>
				</button>
				{ isOpen && (
					<div className='dropdown absolute z-10 right-0 top-full flex flex-col border border-primary rounded-xl bg-secondary'>
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
