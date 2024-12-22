import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import OauthHandler from './utils/OauthHandler';
import ComponentPath from './utils/ComponentPath';
import { AlertProvider } from './components/AlertContext';


function App() {
	return (
		<Router>
			<AlertProvider>
				<AuthProvider>
					<WebSocketProvider>
							<React.Suspense fallback={<div>Loading...</div>}>
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
