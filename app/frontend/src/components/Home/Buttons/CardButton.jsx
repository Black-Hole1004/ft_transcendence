import React from 'react'
import '../Card/Card.css'

function CardButton({ className, children }) {
	return (
		<button
			// onClick={onClick}
			className={`
		border border-border transition duration-300 select-none
		responsive-card-button padding-top-button ${className || ''}`}
		>
			{children}
		</button>
	)
}

export default CardButton
