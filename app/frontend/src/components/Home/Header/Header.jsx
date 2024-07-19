import React from 'react'
import './Header.css'
import Button from '../Buttons/Button'

function Header({ openDialog }) {
	return (
		<header className='relative flex items-center text-primary font-medium header-height'>
			<nav
				className='absolute flex justify-between
				4k:w-[190px] xl:w-[180px] lg:w-[160px] lp:w-[150px] ms:w-[130px]
				4k:right-[50px] xl:right-[40px] lp:right-[30px] ms:right-[20px]'
			>
				<button
					// data-open-modal
					id='sign-in'
					onClick={openDialog}
					className='responsive-font-header-buttons'
				>
					Sign in
				</button>
				<Button
					id='sign-up'
					onClick={openDialog}
					className='rounded-lg responsive-font-header-buttons
					4k:py-[12px] xl:py-[11px] lg:py-[10px] lp:py-[9px] ms:py-[8px]
					4k:px-[23px] xl:px-[20px] lg:px-[16px] lp:px-[14px] ms:px-[10px]'
				>
					Sign up
				</Button>
			</nav>
		</header>
	)
}

export default Header
