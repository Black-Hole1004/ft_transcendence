import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import OauthHandler from './utils/OauthHandler';
import ComponentPath from './utils/ComponentPath';
import { AlertProvider } from './components/AlertContext';
import './context/WebSocketContext';

import Loader from './components/Loader/Loader'



function App() {
	return (
		<Router>
			<AlertProvider>
				<AuthProvider>
					<WebSocketProvider>
							<React.Suspense fallback={<Loader />}>
								<OauthHandler />
								<ComponentPath />
							</React.Suspense>
					</WebSocketProvider>
				</AuthProvider>
			</AlertProvider>
		</Router>
	);
}

export default App;
