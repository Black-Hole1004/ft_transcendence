import React from 'react'
import '../../../pages/Custom/Custom.css'

function Button({id, disabled, onClick, className, children }) {
	return (
		<button
			id={id}
			onClick={onClick}
			className={`
			border border-border select-none ${className || ''} ${disabled ? 'brightness-75' : ''}
			bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out hover:bg-[rgb(183,170,156,30%)]`}
		>
			{disabled ? 'Disable Two-factor Authentication' : children}
		</button>
	)
}

export default Button
