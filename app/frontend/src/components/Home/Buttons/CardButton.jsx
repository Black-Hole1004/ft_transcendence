import React from 'react'

function CardButton({className, children}) {
	return (
		<button
			// onClick={onClick}
			className={`
		border border-border transition duration-300 select-none
		responsive-card-button ${className || ''}`}
		>
			{children}
		</button>
	)
}

export default CardButton
