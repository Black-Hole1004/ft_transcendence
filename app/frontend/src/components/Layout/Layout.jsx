import Alert from '../Alert'
import Header from './Header'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function Layout() {
	const [showAlert, setShowAlert] = useState(true)
	const [alertType, setAlertType] = useState('error')
	const [alertMessage, setAlertMessage] = useState(
		'A problem has been occured while submitting your data.'
	)

	if (showAlert === true) {
		setTimeout(() => {
			setShowAlert(false)
		}, 10000)
	}

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
			
			{/* <Header /> */}
			<Outlet />
			
		</div>
	)
}

export default Layout
