import React from 'react'

function Input({ iconPath, placeholder }) {
	return (
		<div className='flex flex-row items-center bg-secondary-light responsive-input border border-border'>
			<img
				src={`${iconPath}`}
				className='responsive-icon select-none pointer-events-none padding-top-input'
				alt='email-icon'
			/>
			<input
				className='flex-1 placeholder:text-light bg-secondary-light placeholder:font-heavy text-primary font-medium
				select-none padding-top-input ml:px-2 ms:px-1 outline-none'
				placeholder={`${placeholder}`}
				type='password'
			></input>
		</div>
	)
}

export default Input
