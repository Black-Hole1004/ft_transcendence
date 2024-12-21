import './NotFound.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()

	const handleBackToHome = () => {
		navigate('/')
	}

	return (
		<div
			className='not-found h-screen flex flex-col justify-center items-center
			relative text-primary select-none backdrop-brightness-50'
		>
			<div className='background text-[40vw] font-dreamscape text-transparent
				bg-gradient-to-b from-[rgba(251,251,238,0.15)] from-30% via-transparent lp:via-55% via-50% to-transparent'>
				404
			</div>
			<div className='absolute text-center flex flex-col items-center opacity-90'>
				<h1 className='font-dreamscape mb-3'>Page Not Found!</h1>
				<h3 className='font-regular lp:mb-20 mtb:mb-12 mb-5'>
					This page is lost in space. Return to the homepage and keep exploring!
				</h3>
				<button
					onClick={handleBackToHome}
					className='w-[36%] lp:py-3 py-2 font-medium rounded-lg border border-primary text-primary
						back-to-home transition-all hover:bg-primary hover:text-secondary duration-500'
				>
					Back To Home
				</button>
			</div>
		</div>
	)
}

export default NotFound
