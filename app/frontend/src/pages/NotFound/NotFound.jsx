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
			<div className='text-[40vw] font-dreamscape text-transparent opacity-10 bg-gradient-to-b from-primary to-transparent'>
				404
			</div>
			<div className='absolute text-center flex flex-col items-center'>
				<h1 className='font-dreamscape mb-3'>Page Not Found!</h1>
				<h3 className='font-regular mb-10'>
					This page is lost in space. Return to the homepage and keep exploring!
				</h3>
				<button
					onClick={handleBackToHome}
					className='w-[40%] py-1 font-medium rounded-lg border border-primary text-primary
					transition-all hover:bg-primary hover:text-secondary duration-500'
				>
					Back To Home
				</button>
			</div>
		</div>
	)
}

export default NotFound
