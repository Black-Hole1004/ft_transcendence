import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from "../context/AuthContext"
import PrivateRoute from './PrivateRoute';

const Home = React.lazy(() => import('../pages/Home/Home'))
const Chat = React.lazy(() => import('../pages/Chat/Chat'))
const Custom = React.lazy(() => import('../pages/Custom/Custom'))
const Profile = React.lazy(() => import('../pages/Profile/Profile'))
const Settings = React.lazy(() => import('../pages/Settings/Settings'))
const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard'))
const Tournament = React.lazy(() => import('../pages/Tournament/Tournament'))
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'))
const Layout = React.lazy(() => import('../components/Layout/Layout'))
const TwoFactorAuth = React.lazy(() => import('../pages/TwoFactorAuth/TwoFactorAuth'))
const LocalGameSetup = React.lazy(() => import('../pages/Game/LocalGameSetup'))
const LocalGame = React.lazy(() => import('../pages/Game/LocalGame'))
const AiGame = React.lazy(() => import('../pages/Game/AiGame'))
const RemoteGame = React.lazy(() => import('../pages/Game/RemoteGame'))
const MatchMaking = React.lazy(() => import('../components/Game/MatchMaking'))
const CustomTournament = React.lazy(() => import('../pages/CustomTournament/CustomTournament'))
const TournamentSetup = React.lazy(() => import('../pages/TournametSetup/TournametSetup'))
const LocalGameTour = React.lazy(() => import('../pages/Game/LocalGameTour'))

const ComponentPath = () => {
	const { authTokens } = useAuth();

	return (
			<Routes>
				{/* Redirect to /Dashboard if authenticated on the home path */}
				<Route path="/" element={authTokens && authTokens.access_token ? <Navigate to="/dashboard" replace /> : <Home />} />
				{/* Layout wrapping all private routes */}
				<Route element={<PrivateRoute><Layout /></PrivateRoute>}>
					<Route path="/Chat" element={<Chat />} />
					<Route path="/Settings" element={<Settings />} />
					<Route path="/Dashboard" element={<Dashboard />} />
					<Route path="/chat/:conversation_key" element={<Chat />} />
					<Route path="/profile/:profile_name" element={<Profile />} />
					<Route path="/Tournament" element={<Tournament />} />
					<Route path="/CustomTournament" element={<CustomTournament />} />
					<Route path="/TournamentSetup" element={<TournamentSetup />} />
					<Route path='/local-game-tour' element={<LocalGameTour />} />
					<Route path='/chat/:conversation_id/:user_id' element={<Chat />} />
					<Route path="/Custom" element={<Custom />} />
					<Route path='/local-game' element={<LocalGame />} /> 
					<Route path='/ai-game' element={<AiGame />} />
					<Route path='/remote-game' element={<RemoteGame />} />
\					<Route path='/local-game-setup' element={<LocalGameSetup />} />
					<Route path='/matchmaking' element={<MatchMaking />} />
				</Route>
				<Route path="/2fa" element={<TwoFactorAuth />} />
				<Route path="*" element={<NotFound />} />
			</Routes>

	);
};

export default ComponentPath