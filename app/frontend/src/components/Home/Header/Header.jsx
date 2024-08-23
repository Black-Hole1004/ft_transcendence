import React from 'react'
import './Header.css'
import Button from '../Buttons/Button'

function Header({ handleClick }) {
	return (
		<header className='relative flex items-center text-primary font-medium header-height'>
			<nav
				className='absolute flex justify-between nav'
			>
				<button
					id='sign-in'
					onClick={handleClick}
					className='header-buttons'
				>
					Sign in
				</button>
				<Button
					id='sign-up'
					onClick={handleClick}
					className='rounded-lg header-buttons'
				>
					Sign up
				</Button>
			</nav>
		</header>
	)
}

export default Header
