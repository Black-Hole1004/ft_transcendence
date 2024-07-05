import React, { useRef } from 'react'

function Card({ dialogRef, onClick, children }) {
	return (
		<dialog
			data-modal
			ref={dialogRef}
			className='
			av:border-1.5 border rounded-xl bg-secondary backdrop:bg-backdrop-40 backdrop:backdrop-blur-sm
			av:h-card-custom h-[570px] max-av:mb-0 av:w-card-custom max-w-full w-screen'
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