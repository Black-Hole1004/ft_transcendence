import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from "../context/AuthContext"
import PrivateRoute from './PrivateRoute';

const Home = React.lazy(() => import('../pages/Home/Home'))
const Chat = React.lazy(() => import('../pages/Chat/Chat'))
const Game = React.lazy(() => import('../pages/Game/Game'))
const Custom = React.lazy(() => import('../pages/Custom/Custom'))
const Profile = React.lazy(() => import('../pages/Profile/Profile'))
const Settings = React.lazy(() => import('../pages/Settings/Settings'))
const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard'))
const Tournament = React.lazy(() => import('../pages/Tournament/Tournament'))
const TournamentTest = React.lazy(() => import('../pages/Tournament/TournamentTest'))
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'))
const Layout = React.lazy(() => import('../components/Layout/Layout'))
const TwoFactorAuth = React.lazy(() => import('../pages/TwoFactorAuth/TwoFactorAuth'))
const LocalGame = React.lazy(() => import('../pages/Game/LocalGame'))
// const RemoteGame = React.lazy(() => import('../pages/Game/RemoteGame'))
const LocalGameSetup = React.lazy(() => import('../pages/Game/LocalGameSetup'))
// const RemoteGameSetup = React.lazy(() => import('../pages/Game/RemoteGameSetup'))
const SearchingAnimation = React.lazy(() => import('../components/Game/Remote/SearchingAnimation'))




const ComponentPath = () => {
	const { authTokens } = useAuth();

	return (
			<Routes>
				{/* Redirect to /Dashboard if authenticated on the home path */}
				<Route path="/" element={authTokens && authTokens.access_token ? <Navigate to="/dashboard" replace /> : <Home />} />
				
				{/* Layout wrapping all private routes */}
				<Route element={<PrivateRoute><Layout /></PrivateRoute>}>
					<Route path="/Game" element={<Game />} />
					<Route path="/Chat" element={<Chat />} />
					<Route path="/Custom" element={<Custom />} />
					<Route path="/Profile" element={<Profile />} />
					<Route path="/Settings" element={<Settings />} />
					<Route path="/Dashboard" element={<Dashboard />} />
					<Route path='/local-game' element={<LocalGame />} />
					<Route path="/Tournament" element={<Tournament />} />

					<Route path="/TournamentTest" element={<TournamentTest />} />

					<Route path="/chat/:conversation_key" element={<Chat />} />
					<Route path="/local-game-setup" element={<LocalGameSetup />} />
					<Route path="/searching" element={<SearchingAnimation />} />
					{/* <Route path='/remote-game' element={<RemoteGame />} /> */}
					{/* <Route path='/remote-game-setup' element={<RemoteGameSetup />} /> */}
					<Route path="/2fa" element={<TwoFactorAuth />} />
					<Route path="*" element={<NotFound />} />
				</Route>
				
			</Routes>

	);
};

export default ComponentPath