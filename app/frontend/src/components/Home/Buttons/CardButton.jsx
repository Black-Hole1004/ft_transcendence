import React from 'react'

function CardButton({className, children}) {
	return (
		<button
			// onClick={onClick}
			className={`
		border border-border transition duration-300 select-none text-primary font-heavy
		responsive-card-button hover:bg-primary hover:text-secondary ${className || ''}`}
		>
			{children}
		</button>
	)
}

export default CardButton
