import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import OauthHandler from './utils/OauthHandler';
import ComponentPath from './utils/ComponentPath';
import { AlertProvider } from './components/AlertContext';
import './context/WebSocketContext';


function App() {
	return (
		<Router>
			<WebSocketProvider>
				<AlertProvider>
					<AuthProvider>
						<React.Suspense fallback={<div>Loading...</div>}>
							<OauthHandler />
							<ComponentPath />
						</React.Suspense>
					</AuthProvider>
				</AlertProvider>
			</WebSocketProvider>
		</Router>
	);
}

export default App;