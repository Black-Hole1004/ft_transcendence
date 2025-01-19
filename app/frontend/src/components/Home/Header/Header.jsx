import React from 'react'
import './Header.css'
import Button from '../Buttons/Button'
import { AlertWrapper } from '../../Layout/Layout'

function Header({ handleClick }) {
	return (
		<header className='relative flex items-center text-primary font-medium header-height'>
			<AlertWrapper layout={true} />
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
					className='rounded header-buttons'
				>
					Sign up
				</Button>
			</nav>
		</header>
	)
}

export default Header
