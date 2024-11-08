import React from 'react'
// import Box from '@mui/material/Box'
// import CircularProgress from '@mui/material/CircularProgress'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Navigate } from "react-router-dom"
const Home = React.lazy(() => import('./pages/Home/Home'))
const Chat = React.lazy(() => import('./pages/Chat/Chat'))
const Game = React.lazy(() => import('./pages/Game/Game'))
const Custom = React.lazy(() => import('./pages/Custom/Custom'))
const Profile = React.lazy(() => import('./pages/Profile/Profile'))
const Settings = React.lazy(() => import('./pages/Settings/Settings'))
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'))
const Tournament = React.lazy(() => import('./pages/Tournament/Tournament'))
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'))
import { useEffect } from 'react'

import useAuth from '../src/context/AuthContext'
import { Suspense } from 'react'

import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

// <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
// 	<CircularProgress />
// </Box>


// Component to protect routes based on authentication
const PrivateRoute = ({ children }) => {
	const { authTokens } = useAuth();
	return authTokens && authTokens.access_token ? children : <Navigate to="/" replace />;
};
const ComponentPath = () => {
	const { authTokens } = useAuth();

	return (
		<Routes>
			{/* Redirect to /Settings if authenticated on the home path */}
			<Route path="/" element={authTokens  && authTokens.access_token  ? <Navigate to="/dashboard" replace /> : <Home />} />
			
			{/* Protected Routes */}
			<Route path="/Settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
			<Route path="/Game" element={<PrivateRoute><Game /></PrivateRoute>} />
			<Route path="/Chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
			<Route path="/Custom" element={<PrivateRoute><Custom /></PrivateRoute>} />
			<Route path="/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
			<Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
			<Route path="/Tournament" element={<PrivateRoute><Tournament /></PrivateRoute>} />

			{/* Catch-all route */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const OAuthHandler = () => {
	const { setAuthTokens, setUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const accessToken = params.get('access_token');
		const refreshToken = params.get('refresh_token');

		if (accessToken && refreshToken) {
			// Set the tokens in cookies and in `authTokens`
			// document.cookie = `access_token=${accessToken}; path=/; secure; SameSite=Lax;`;
			// document.cookie = `refresh_token=${refreshToken}; path=/; secure; SameSite=Lax;`;
			Cookies.set('access_token', JSON.stringify(accessToken));
			Cookies.set('refresh_token', JSON.stringify(refreshToken));
			const data = {
				access_token: accessToken,
				refresh_token: refreshToken
			}
			setAuthTokens(data)
			setUser(jwtDecode(accessToken));
			navigate("/dashboard", { replace: true });
		}
	}, [setAuthTokens, navigate]);

	return null;
};

function App() {
	return (
		<Router>
			<AuthProvider>
				<React.Suspense fallback={<div>Loading...</div>}>
					<OAuthHandler />
					<ComponentPath />
				</React.Suspense>
			</AuthProvider>
		</Router>
	);
}

export default App;