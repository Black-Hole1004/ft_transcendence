import Alert from '../Alert'
import Header from './Header'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
	const [showAlert, setShowAlert] = useState(true)
	const [alertType, setAlertType] = useState('error');
	const [alertMessage, setAlertMessage] = useState('Hello');

	return (
		<div className='relative flex flex-col min-h-screen
			backdrop-blur-sm bg-backdrop-40 text-primary overflow-hidden'>
			{/* {showAlert && (
				<Alert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />
			)} */}
			<Header />
			<Outlet />
		</div>
	)
}

export default Layout
