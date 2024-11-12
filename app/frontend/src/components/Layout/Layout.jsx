import Alert from '../Alert'
import Header from './Header'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAlert } from '../AlertContext'
import useAuth from '../../context/AuthContext'

function Layout() {
	const { first_name, preview, last_name, username, profile_picture } = useAuth()
	const user_data = { first_name, last_name, username, profile_picture }
	return (
		<div className='relative flex flex-col min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary overflow-hidden'>
			<AlertWrapper />
			<Header user_data={user_data} />
			<Outlet />
		</div>
	)
}

export function AlertWrapper() {
	const { showAlert, alertType, alertMessage, dismissAlert } = useAlert()

	useEffect(() => {
		if (showAlert) {
			const timer = setTimeout(() => {
				dismissAlert()
			}, 10000)
			return () => clearTimeout(timer)
		}
	}, [showAlert, dismissAlert])

	return showAlert && <Alert type={alertType} message={alertMessage} onClose={dismissAlert} />
}

export default Layout
