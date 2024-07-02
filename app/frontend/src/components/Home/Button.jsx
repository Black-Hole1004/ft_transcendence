import React from 'react'

function Button({onClick, isVisible, className, children}) {
	return (
		<button onClick={onClick} className={`${isVisible ? 'hidden' : 'inline'}
			border border-primary transition duration-300 select-none
			hover:bg-primary hover:text-secondary ${className || ''}`}>
			{children}
		</button>
	)
}

export default Button