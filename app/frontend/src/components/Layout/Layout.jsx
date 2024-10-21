import Alert from '../Alert'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Layout() {
	const [showAlert, setShowAlert] = useState(true)
	const [alertType, setAlertType] = useState('error')
	const [alertMessage, setAlertMessage] = useState(
		'A problem has been occured while submitting your data.'
	)

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowAlert(false)
		}, 10000)
		return () => clearTimeout(timer)
	}, [showAlert])

	return (
		<div
			className='relative flex flex-col min-h-screen
			backdrop-blur-sm bg-backdrop-40 text-primary overflow-hidden'
		>
			{/* {showAlert && (
				<Alert
					type={alertType}
					message={alertMessage}
					onClose={() => setShowAlert(false)}
				/>
			)} */}
			<Header />
			<Outlet />
		</div>
	)
}

export default Layout
