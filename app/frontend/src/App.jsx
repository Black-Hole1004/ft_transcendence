import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import OauthHandler from './utils/OauthHandler';
import ComponentPath from './utils/ComponentPath';
import { AlertProvider } from './components/AlertContext';
import { TournamentProvider } from './context/TournamentContext';

function App() {
	return (
		<Router>
			<AlertProvider>
				<AuthProvider>
					<TournamentProvider>
						<React.Suspense fallback={<div>Loading...</div>}>
							<OauthHandler />
							<ComponentPath />
						</React.Suspense>
					</TournamentProvider>
				</AuthProvider>
			</AlertProvider>
		</Router>
	);
}

export default App;
