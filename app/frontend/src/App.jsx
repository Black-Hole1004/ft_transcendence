import React from 'react'
// import Box from '@mui/material/Box'
// import CircularProgress from '@mui/material/CircularProgress'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
function App() {
	return (
		<Router>
			<React.Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Game' element={<Game />} />
					<Route path='/Chat' element={<Chat />} />
					<Route path='/Custom' element={<Custom />} />
					<Route path='/Profile' element={<Profile />} />
					<Route path='/Settings' element={<Settings />} />
					<Route path='/Dashboard' element={<Dashboard />} />
					<Route path='/Tournament' element={<Tournament />} />
				</Routes>
			</React.Suspense>
		</Router>
	)
}

export default App
