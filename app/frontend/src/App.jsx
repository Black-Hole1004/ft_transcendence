import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import OauthHandler from './utils/OauthHandler'
import ComponentPath from './utils/ComponentPath'
import { AlertProvider } from './components/AlertContext'
import { TournamentProvider } from './context/TournamentContext'
import Loader from './components/Loader/Loader'
import { useNavigate, useLocation } from 'react-router-dom'

function App() {
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	if (game_accepted) {
	// 		navigate('/matchmaking.jsx', { state: { data } });
	// 	}
	// }, [navigate]);

	return (
		<Router>
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
