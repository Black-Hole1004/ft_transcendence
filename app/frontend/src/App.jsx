import React from 'react'
// import Box from '@mui/material/Box'
// import CircularProgress from '@mui/material/CircularProgress'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
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
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'))
import PrivateRoute from './utils/PrivateRoute'
import useAuth from '../src/context/AuthContext'
// <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
// 	<CircularProgress />
// </Box>

const ComponentPath = () => {
	const {authTokens, user} = useAuth()
	return (
        <Routes>
            {(authTokens && user) ? (
                <>
					<Route path="/" element={<Navigate to="/Settings" replace /> && <Settings/>} />
                    <Route path="/Game" element={<Navigate to="/Game" replace /> && <Game/>} />
                    <Route path="/Chat" element={<Navigate to="/Chat" replace /> && <Chat/>} />
                    <Route path="/Custom" element={<Navigate to="/Custom" replace /> && <Custom/>} />
                    <Route path="/Profile" element={<Navigate to="/Profile" replace /> && <Profile/>} />
                    <Route path="/Settings" element={<Settings/>} />
                    <Route path="/Dashboard" element={<Navigate to="/Dashboard" replace /> && <Dashboard/>} />
                    <Route path="/Tournament" element={<Navigate to="/Tournament" replace /> && <Tournament/>} />
					<Route path="*" element={<NotFound/>} />
                </>
            ) : (
				<>
					<Route path="/" element={<Home/>} />
                    <Route path="/Game" element={<Navigate to="/" replace />} />
                    <Route path="/Chat" element={<Navigate to="/" replace />} />
                    <Route path="/Custom" element={<Navigate to="/" replace />} />
                    <Route path="/Profile" element={<Navigate to="/" replace />} />
                    <Route path="/Settings" element={<Navigate to="/" replace />} />
                    <Route path="/Dashboard" element={<Navigate to="/" replace />} />
                    <Route path="/Tournament" element={<Navigate to="/" replace />} />
					<Route path="*" element={<NotFound/>} />
				</>
            )}
        </Routes>
    );
}


function App() {
	return (
		<Router>
			<AuthProvider>
				<React.Suspense fallback={<div>Loading...</div>}>
					<ComponentPath />
				</React.Suspense>
			</AuthProvider>
		</Router>
	)
}
export default App
