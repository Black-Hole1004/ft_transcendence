import React, { useRef } from 'react'

function Card({ dialogRef, isVisible, onClick }) {
	return (
		// <div className={`${isVisible ? 'block' : 'hidden'} absolute av:border-1.5 border rounded-xl bg-secondary
		// 	av:top-1/2 left-1/2 transform -translate-x-1/2 av:-translate-y-1/2 sm:bottom-0
		// 	av:w-card-custom av:h-card-custom w-full h-[600px]
		// 	`}>
		// 	<button onClick={onClick} ><img className="card-close-button" src="/assets/images/close.png"/></button>
		// </div>

		<dialog
			ref={dialogRef}
			className='p-2.5 av:border-1.5 border rounded-xl bg-secondary backdrop:bg-backdrop40 backdrop:backdrop-blur-sm
			av:h-card-custom h-[600px] max-av:mb-0 av:w-card-custom max-w-full'
		>
			<button onClick={onClick}>
				<img className='w-[20px] h-[20px]' src='/assets/images/close.png' />
			</button>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis error quod aut odit
				dolor rerum id delectus? Vel, nulla veniam dolor eaque rem obcaecati labore sapiente
				asperiores laudantium delectus. Ad. Saepe minima, vel explicabo vero doloremque
				ducimus voluptate animi neque itaque exercitationem, assumenda reiciendis possimus
				blanditiis voluptatibus necessitatibus unde deleniti dicta, cupiditate adipisci cum
				fuga numquam! Quas odio similique illum! At ratione totam ducimus. Eligendi officiis
				quis amet facere, soluta dignissimos ea cumque rerum sapiente fugiat? Consequuntur
				beatae nostrum voluptatum, earum atque corrupti voluptatibus totam reiciendis, saepe
				adipisci, assumenda id.
			</p>
		</dialog>
	)
}

export default Card
