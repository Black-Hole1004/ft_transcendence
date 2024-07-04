import React, { useRef } from 'react'

function Card({ signInRef, onClick, children }) {
	return (
		// <div className={`${isVisible ? 'block' : 'hidden'} absolute av:border-1.5 border rounded-xl bg-secondary
		// 	av:top-1/2 left-1/2 transform -translate-x-1/2 av:-translate-y-1/2 sm:bottom-0
		// 	av:w-card-custom av:h-card-custom w-full h-[600px]
		// 	`}>
		// 	<button onClick={onClick} ><img className="card-close-button" src="/assets/images/close.png"/></button>
		// </div>

		<dialog
			data-modal
			ref={signInRef}
			className='
			av:border-1.5 border rounded-xl bg-secondary backdrop:bg-backdrop-40 backdrop:backdrop-blur-sm
			av:h-card-custom h-[600px] max-av:mb-0 av:w-card-custom max-w-full w-screen'
		>
			<div className='p-2 h-full'>
				<div className='relative w-full flex flex-row items-center'>
					<button onClick={onClick} className='absolute right-2 top-1'>
						<img
							className='select-none close-button'
							src='/assets/images/close.png'
						/>
					</button>
					<div className='separator h-0.5 flex-1'></div>
					<img
						className='select-none pointer-events-none logo'
						src='/assets/images/logo-transparent.png'
						/>
					<div className='separator h-0.5 flex-1'></div>
				</div>
				<div className='flex flex-col justify-center form-padding'>
					{children}
				</div>
			</div>
		</dialog>
	)
}

export default Card