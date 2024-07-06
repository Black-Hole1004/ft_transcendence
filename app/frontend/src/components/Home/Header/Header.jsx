import React from 'react'
import Button from '../Buttons/Button'

function Header({ openDialog }) {
	return (
		<header className='relative flex items-center text-primary font-medium header-height'>
			<nav
				className='absolute flex justify-between
	2xl:w-[190px] xl:w-[180px] lg:w-[160px] md:w-[150px] sm:w-[130px]
	2xl:right-[50px] xl:right-[40px] md:right-[30px] sm:right-[20px]'
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
					2xl:py-[12px] xl:py-[11px] lg:py-[10px] md:py-[9px] sm:py-[8px]
				2xl:px-[23px] xl:px-[20px] lg:px-[16px] md:px-[14px] sm:px-[10px]'
				>
					Sign up
				</Button>
			</nav>
		</header>
	)
}

export default Header
