import  { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import OauthHandler from './utils/OauthHandler';
import ComponentPath from './utils/ComponentPath';
import { AlertProvider } from './components/AlertContext';
import { TournamentProvider } from './context/TournamentContext';
<<<<<<< HEAD
=======
import Loader from './components/Loader/Loader'
>>>>>>> master

function App() {
	return (
		<Router>
			<AlertProvider>
				<AuthProvider>
					<TournamentProvider>
<<<<<<< HEAD
						<React.Suspense fallback={<div>Loading...</div>}>
							<OauthHandler />
							<ComponentPath />
						</React.Suspense>
=======
						<Suspense fallback={<Loader />}>
							<OauthHandler />
							<ComponentPath />
						</Suspense>
>>>>>>> master
					</TournamentProvider>
				</AuthProvider>
			</AlertProvider>
		</Router>
	);
}

export default App;
