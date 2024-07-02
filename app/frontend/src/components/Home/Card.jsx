import React from "react";

function Card({isVisible, onClick}) {
	return (
		<div className={`${isVisible ? 'block' : 'hidden'} absolute border-1.5 rounded-xl bg-secondary
			av:top-1/2 left-1/2 transform -translate-x-1/2 av:-translate-y-1/2 sm:bottom-0
			av:w-card-custom av:h-card-custom sm:w-full sm:h-[600px]
			`}>
			<button onClick={onClick} ><img className="card-close-button" src="/assets/images/close.png"/></button>
		</div>
	)
}

export default Card