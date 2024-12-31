import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import OauthHandler from './utils/OauthHandler';
import ComponentPath from './utils/ComponentPath';
import { AlertProvider } from './components/AlertContext';
import { TournamentProvider } from './context/TournamentContext';
import Loader from './components/Loader/Loader';

function App() {
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
	);
}

export default App;
