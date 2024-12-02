import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketFriendRContext';
import OauthHandler from './utils/OauthHandler';
import ComponentPath from './utils/ComponentPath';
import { AlertProvider } from './components/AlertContext';
import { WebSocketStatusProvider } from './context/WebSocketStatusContext';

function App() {
	return (
		<Router>
			<AlertProvider>
				<AuthProvider>
					<WebSocketStatusProvider>
						<WebSocketProvider>
							<React.Suspense fallback={<div>Loading...</div>}>
								<OauthHandler />
								<ComponentPath />
							</React.Suspense>
						</WebSocketProvider>
					</WebSocketStatusProvider>
				</AuthProvider>
			</AlertProvider>
		</Router>
	);
}

export default App;
