import React from 'react'

function Button({id, onClick, className, children }) {
	return (
		<button
			id={id}
			onClick={onClick}
			className={`
			border border-primary transition duration-300 select-none
			hover:bg-primary hover:text-secondary ${className || ''}`}
		>
			{children}
		</button>
	)
}

export default Button
