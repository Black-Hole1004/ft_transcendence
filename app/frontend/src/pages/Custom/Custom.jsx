import React, { useState } from 'react'
import './Custom.css'
import { useNavigate } from 'react-router-dom'

const Custom = () => {
	const [backgroundId, setBackgroundId] = useState(1)
	const [step, setStep] = useState(1)
	const xp = 6231
	const navigate = useNavigate()

	// Handle click for background selection
	const handleClick = (id) => {
		// Only allow click if background is unlocked
		if (xp / 1000 >= id || id === 1) {
			setBackgroundId(id)
		}
	}

	const handleGameModeSelect = (mode) => {
		if (mode === 'local') {
			navigate('/local-game-setup', { state: { backgroundId } })
		} else {
			navigate('/remote-game-setup', { state: { backgroundId } })
		}
	}

	return (
		<section className='flex flex-col'>
			{step === 1 && (
				<div className='page-margin'>
					{/* The chosen background */}
					<div className='flex justify-center'>
						<div
							key={backgroundId}
							className='lp:border-2 border border-primary overflow-hidden selected-table mtb:w-select-table w-full rounded-2xl relative'
							style={{
								background: `url('/assets/images/tables/table${backgroundId}.png')`,
								backgroundSize: 'cover',
							}}
						>
							<div className='w-full h-full flex justify-center items-center bg-backdrop-40'>
								<div className='absolute top-8 left-3 paddles bg-primary rounded-full'></div>
								<button
									onClick={() => setStep(2)}
									className='font-dreamscape start-button'
								>
									Start
								</button>
								<div className='absolute bottom-4 right-3 paddles bg-primary rounded-full '></div>
							</div>
						</div>
					</div>

					<div className='select-message flex justify-center items-center'>
						<h1 className='font-dreamscape-sans'>Select Table</h1>
					</div>

					{/* Background selection grid */}
					<div className='grid xl:gap-8 gap-4 lg:grid-cols-4 lg:grid-rows-2 lp:grid-cols-3 lp:grid-rows-3 grid-cols-2 grid-rows-4'>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
							<button
								key={id}
								onClick={() => handleClick(id)}
								className={`border border-primary rounded-xl overflow-hidden outline-none hover:scale-[1.05] transition duration-500 aspect-video`}
								style={{
									background: `url('/assets/images/tables/table${id}.png')`,
									backgroundSize: 'cover',
								}}
								disabled={xp / 1000 < id && id > 1 ? true : false}
							>
								{/* Overlay to show locked backgrounds */}
								<div
									className={`h-full w-full flex justify-center items-center ${xp / 1000 < id && id > 1 ? 'bg-backdrop-80' : ''}`}
								>
									{xp / 1000 < id && id > 1 && (
										<img src='/assets/images/icons/Lock.svg' alt='Locked' />
									)}
								</div>
							</button>
						))}
					</div>
				</div>
			)}

			{step === 2 && (
				<div className='rounded-lg self-center mt-36 tb:w-custom ml:w-[92%] w-[96%]'>
					<h2 className='text-2xl font-dreamscape-sans mt-6 mb-10 custom-title'>
						Choose Game Mode
					</h2>
					<div className='flex max-mtb:flex-col justify-between gap-4 mb-12'>
						<div
							onClick={() => handleGameModeSelect('remote')}
							className='relative mode-button text-primary border border-primary rounded flex-1
								overflow-hidden hover:text-transparent aspect-video bg-primary bg-opacity-90 transition ease-in duration-700'
						>
							<img
								src='assets/images/new.png'
								className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 brightness-[20%] select-none'
								alt=''
							/>
							<p
								className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
								pt-1 mode-title font-dreamscape'
							>
								Online Battle
							</p>
							<div className='overlay'>
								<p className='mode-title  font-dreamscape-sans'>Online Battle</p>
								<p className='mb-2'>Play online with others.</p>
								<button
									className='
										border border-primary transition duration-300 select-none text-primary px-2 py-1
										rounded-md hover:bg-primary hover:text-secondary'
								>
									Ready, Go!
								</button>
							</div>
						</div>
						<div
							onClick={() => handleGameModeSelect('remote')}
							className='relative mode-button text-primary border border-primary rounded flex-1
								overflow-hidden hover:text-transparent aspect-video bg-primary bg-opacity-90 transition ease-in duration-700'
						>
							<img
								src='assets/images/new.png'
								className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 brightness-[20%] select-none'
								alt=''
							/>
							<p
								className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
								pt-1 mode-title  font-dreamscape'
							>
								Local Battle
							</p>
							<div className='overlay'>
								<p className='mode-title  font-dreamscape-sans'>Local Battle</p>
								<p className='mb-2'>Play on the same device.</p>
								<button
									className='
										border border-primary transition duration-300 select-none text-primary px-2 py-1
										rounded-md hover:bg-primary hover:text-secondary'
								>
									Start Battle
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default Custom

// <div className='flex max-mtb:flex-col font-dreamscape justify-between gap-4 mb-12'>
// 	<button
// 		onClick={() => handleGameModeSelect('remote')}
// 		className='relative text-primary border border-primary rounded flex-1
// 			overflow-hidden hover:text-transparent ease-out duration-500 aspect-video'
// 	>
// 		<img
// 			src='assets/images/remote.png'
// 			className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 brightness-[20%]
// 				hover:brightness-90 ease-out duration-500'
// 			alt=''
// 		/>
// 		<p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-out duration-500 mode-title'>
// 			Remote Game
// 		</p>
// 	</button>
// 	<button
// 		onClick={() => handleGameModeSelect('local')}
// 		className='relative text-primary border border-primary rounded flex-1
// 			overflow-hidden hover:text-transparent ease-out duration-500 aspect-video'
// 	>
// 		<img
// 			src='assets/images/local.png'
// 			className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 brightness-[20%]
// 				hover:brightness-90 ease-out duration-500'
// 			alt=''
// 		/>
// 		<p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-out duration-500 mode-title'>
// 			Local Game
// 		</p>
// 	</button>
// </div>
