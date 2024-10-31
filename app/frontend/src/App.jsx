import React from 'react'
// import Box from '@mui/material/Box'
// import CircularProgress from '@mui/material/CircularProgress'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Navigate} from "react-router-dom"
const Home = React.lazy(() => import('./pages/Home/Home'))
const Chat = React.lazy(() => import('./pages/Chat/Chat'))
const Game = React.lazy(() => import('./pages/Game/Game'))
const Custom = React.lazy(() => import('./pages/Custom/Custom'))
const Profile = React.lazy(() => import('./pages/Profile/Profile'))
const Settings = React.lazy(() => import('./pages/Settings/Settings'))
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'))
const Tournament = React.lazy(() => import('./pages/Tournament/Tournament'))

// <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
// 	<CircularProgress />
// </Box>

import useAuth from './context/AuthContext'

function PrivateRoute({ children }) {
    const { user } = useAuth();
	if (user) {
		return (children)
	}
	return ( <Navigate to="/" />)
}
function App() {
	return (
		<Router>
			<AuthProvider>
				<React.Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path='/' element={<Home />} />

						{/* Protect these routes using PrivateRoute */}
            			<Route path='/Game' element={<PrivateRoute><Game /></PrivateRoute>} />
            			<Route path='/Chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
            			<Route path='/Custom' element={<PrivateRoute><Custom /></PrivateRoute>} />
            			<Route path='/Profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            			<Route path='/Settings' element={<PrivateRoute><Settings /></PrivateRoute>} />
            			<Route path='/Dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            			<Route path='/Tournament' element={<PrivateRoute><Tournament /></PrivateRoute>} />
					</Routes>
				</React.Suspense>
			</AuthProvider>
		</Router>
	)
}
export default App
