import React from 'react'
import './Header.css'
import Button from '../Buttons/Button'

function Header({ openDialog }) {
	return (
		<header className='relative flex items-center text-primary font-medium header-height'>
			<nav
				className='absolute flex justify-between nav'
			>
				<button
					id='sign-in'
					onClick={openDialog}
					className='header-buttons'
				>
					Sign in
				</button>
				<Button
					id='sign-up'
					onClick={openDialog}
					className='rounded-lg header-buttons'
				>
					Sign up
				</Button>
			</nav>
		</header>
	)
}

export default Header
