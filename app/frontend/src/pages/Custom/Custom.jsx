import './Custom.css'
import React, { useState } from 'react'
import Button from '../../components/Home/Buttons/Button'
import { useNavigate, useLocation } from 'react-router-dom'


const ModeCard = ({ mode, handleGameModeSelect }) => {
	return (
		<div
			className='relative mode-card text-primary border border-primary rounded flex-1
			overflow-hidden hover:text-transparent aspect-video bg-primary bg-opacity-90 transition ease-in duration-300'
		>
			<img
				src='assets/images/remote.webp'
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 brightness-[60%] select-none pointer-events-none'
				alt=''
			/>
			<p
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
			pt-1 mode-title  font-dreamscape'
			>
				{mode === 'remote' ? 'Online Battle' : 'Local Battle'}
			</p>
			<div
				className='overlay absolute left-0 bottom-0 w-full h-0 bg-gradient-to-b from-transparent to-[#0b0b0b]
			text-primary flex flex-col items-center justify-center text-center opacity-0 transition-all duration-500 ease-in-out'
			>
				<p className='mode-title font-dreamscape-sans'>
					{mode === 'remote' ? 'Online Battle' : 'Local Battle'}
				</p>
				<p className='mode-description mb-8'>
					{mode === 'remote' ? 'Play online with others.' : 'Play on the same device.'}
				</p>
				<Button
					onClick={() => handleGameModeSelect(mode)}
					className='rounded border-border font-medium buttons-text start-battle mode-description'
				>
					Start Battle
				</Button>
			</div>
		</div>
	)
}

const Custom = () => {
	const [backgroundId, setBackgroundId] = useState(1)
	const location = useLocation()
	const mode = location.state?.mode; // Get the mode from the location state

	const [step, setStep] = useState(1)
	const xp = 6231
	const navigate = useNavigate()

    const handleStart = () => {
        if (mode === 'training') {
			console.log('Training mode selected');
            // For AI mode, go directly to AI setup
            navigate('/ai-game-setup', { state: { backgroundId } });
        } else {
            // For 1vs1 mode, show the local/remote choice
            setStep(2);
        }
    };
    
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
            // Get access token from cookies
            const cookies = document.cookie.split(';');
            const accessToken = cookies.find(cookie => cookie.trim().startsWith('access_token='))?.split('=')[1];

            if (!accessToken) {
                console.error('No access token found in cookies');
                return;
            }

            // Decode JWT token to get user ID
            try {
                const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
                const userId = decodedToken.user_id;
                navigate('/matchmaking', { 
                    state: { 
                        backgroundId : backgroundId,
                        currentUser : { id: userId }
                    }
                });

            } catch (error) {
                console.error('Error decoding JWT token:', error);
            }
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
								<div className='absolute left-3 paddles bg-primary rounded-full left-paddle'></div>
								<div className='absolute right-3 paddles bg-primary rounded-full right-paddle'></div>
								<button onClick={handleStart} className='font-dreamscape start-button'>Start</button>
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
					<div className='flex max-mtb:flex-col justify-between gap-8 mb-12'>
						<ModeCard mode={'remote'} handleGameModeSelect={handleGameModeSelect}/>
						<ModeCard mode={'local'} handleGameModeSelect={handleGameModeSelect}/>
					</div>
				</div>
			)}
		</section>
	)
}

export default Custom
