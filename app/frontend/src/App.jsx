import { Suspense, lazy } from 'react'
import Layout from './components/Layout/Layout'
const Home = lazy(() => import('./pages/Home/Home'))
const Chat = lazy(() => import('./pages/Chat/Chat'))
const Game = lazy(() => import('./pages/Game/Game'))
const Custom = lazy(() => import('./pages/Custom/Custom'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const Settings = lazy(() => import('./pages/Settings/Settings'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Tournament = lazy(() => import('./pages/Tournament/Tournament'))
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route element={<Layout />}>
						<Route path='/Game' element={<Game />} />
						<Route path='/chat' element={<Chat />} />
						<Route path='/chat/:conversation_id/:user_id' element={<Chat />} />
						<Route path='/Custom' element={<Custom />} />
						<Route path='/Profile' element={<Profile />} />
						<Route path='/Settings' element={<Settings />} />
						<Route path='/Dashboard' element={<Dashboard />} />
						<Route path='/Tournament' element={<Tournament />} />
					</Route>
				</Routes>
			</Suspense>
		</Router>
	)
}

export default App
