import React from 'react'
import '../Card/Card.css'

function CardButton({ className, children, onClick }) {
	return (
		<button
			onClick={onClick}
			type='submit'
			className={`
		border border-border select-none responsive-card-button padding-top-button ${className || ''}
		bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out`}
		>
			{children}
		</button>
	)
}

export default CardButton
