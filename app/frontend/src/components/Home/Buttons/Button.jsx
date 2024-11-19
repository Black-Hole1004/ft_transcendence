import React from 'react'

function Button({id, disabled, onClick, className, children }) {
	return (
		<button
			id={id}
			onClick={onClick}
			className={`
			border border-primary transition duration-300 select-none
			hover:bg-primary hover:text-secondary ${className || ''} ${disabled ? 'brightness-75' : ''}`}
		>
			{disabled ? 'Disable Two-factor Authentication' : children}
		</button>
	)
}

export default Button
