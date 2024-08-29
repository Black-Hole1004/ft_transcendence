import { Outlet } from 'react-router-dom'
import Header from './Header'

function Layout() {
	return (
		<div className='flex flex-col min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary overflow-hidden'>
			<Header />
			<Outlet />
		</div>
	)
}

export default Layout
