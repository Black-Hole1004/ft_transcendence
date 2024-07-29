import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Chat from './pages/Chat/Chat'
import Game from './pages/Game/Game'
import Custom from './pages/Custom/Custom'
import Profile from './pages/Profile/Profile'
import Settings from './pages/Settings/Settings'
import Dashboard from './pages/Dashboard/Dashboard'
import Tournament from './pages/Tournament/Tournament'

function App() {
	return (
		<Router>
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
		</Router>
	)
}

export default App
