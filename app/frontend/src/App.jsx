import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import OauthHandler from './utils/OauthHandler';
import ComponentPath from './utils/ComponentPath';
import { AlertProvider } from './components/AlertContext';


function App() {
	return (
		<Router>
			<AlertProvider>
				<AuthProvider>
					<React.Suspense fallback={<div>Loading...</div>}>
						<OauthHandler />
						<ComponentPath />
					</React.Suspense>
				</AuthProvider>
			</AlertProvider>
		</Router>
	);
}

export default App;
