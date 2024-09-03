import React from 'react'

function Input({ iconPath, placeholder, id }) {
	return (
		<div className='flex flex-row items-center bg-secondary-light responsive-input border border-border'>
			<img
				src={`${iconPath}`}
				loading='eager'
				className='responsive-icon select-none pointer-events-none padding-top-input'
				alt='email-icon'
			/>
			<input
				id={id}
				placeholder={`${placeholder}`}
				type={`${placeholder == 'Email' ? 'text' : 'password'}`}
				className='flex-1 placeholder:text-light bg-secondary-light placeholder:font-heavy text-primary font-medium
				select-none padding-top-input ml:px-2 ms:px-1 outline-none'
			></input>
		</div>
	)
}

export default Input
