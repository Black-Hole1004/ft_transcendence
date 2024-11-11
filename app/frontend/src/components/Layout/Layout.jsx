import Alert from '../Alert'
import Header from './Header'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAlert } from '../AlertContext'
import { AlertProvider } from '../AlertContext'
import { HeadersProvider } from '../HeadersContext'

function Layout() {
	return (
		<AlertProvider>
			<div className='relative flex flex-col min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary overflow-hidden'>
				<AlertWrapper />
				<Header />
				<HeadersProvider>
					<Outlet />
				</HeadersProvider>
			</div>
		</AlertProvider>
	)
}

function AlertWrapper() {
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
