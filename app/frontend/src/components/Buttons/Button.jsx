import React from 'react'

function Button({className, children}) {
	return (
		<button className={`border border-primary transition duration-300 select-none
			hover:bg-primary hover:text-secondary ${className || ''}`}>
			{children}
		</button>
	)
}

export default Button