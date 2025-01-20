import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import OauthHandler from './utils/OauthHandler'
import ComponentPath from './utils/ComponentPath'
import { AlertProvider } from './components/AlertContext'
import { TournamentProvider } from './context/TournamentContext'
import Loader from './components/Loader/Loader'

function App() {


	return (
		<Router
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}
		>
			<AlertProvider>
				<AuthProvider>
					<TournamentProvider>
						<Suspense fallback={<Loader />}>
							<OauthHandler />
							<ComponentPath />
						</Suspense>
					</TournamentProvider>
				</AuthProvider>
			</AlertProvider>
		</Router>
	)
}

export default App
