import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
	return (
		<header
			className='relative flex items-center justify-between text-primary header-padding font-medium
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
			<nav className='flex justify-between ml:gap-x-2.5 ms:gap-x-1.5'>
				<Link to={'/chat'}>
					<img
						src='/assets/images/icons/chat.svg'
						alt='profile-image'
						className='nav-icons'
					/>
				</Link>
				<button>
					<img
						src='/assets/images/icons/notification.svg'
						alt='profile-image'
						className='nav-icons'
					/>
				</button>
				<button>
					<img
						src='/assets/images/moudrib.jpeg'
						alt='profile-image'
						className='nav-icons border-[1px] rounded-full border-primary'
					/>
				</button>
			</nav>
		</header>
	)
}

export default Header
