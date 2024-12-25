import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from "../context/AuthContext"
//app/frontend/src/pages/Game/GameTester.jsx
import PrivateRoute from './PrivateRoute';

const Loader = React.lazy(() => import('../components/Loader/Loader'))
const Home = React.lazy(() => import('../pages/Home/Home'))
const Chat = React.lazy(() => import('../pages/Chat/Chat'))
const Game = React.lazy(() => import('../pages/Game/Game'))
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
const AiGameSetup = React.lazy(() => import('../pages/Game/AiGameSetup'))
const SearchingAnimation = React.lazy(() => import('../components/Game/Remote/SearchingAnimation'))
const MatchMaking = React.lazy(() => import('../components/Game/MatchMaking'))
const CustomTournament = React.lazy(() => import('../pages/CustomTournament/CustomTournament'))
const TournamentSetup = React.lazy(() => import('../pages/TournametSetup/TournametSetup'))
const UserProfile = React.lazy(() => import('../pages/UserProfile/UserProfile'))

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
					<Route path="/Profile" element={<Profile />} />
					<Route path="/Settings" element={<Settings />} />
					<Route path="/Dashboard" element={<Dashboard />} />
					<Route path="/chat/:conversation_key" element={<Chat />} />

					<Route path="/users/:profile_name" element={<UserProfile />} />
					
					<Route path="/Tournament" element={<Tournament />} />
					<Route path="/CustomTournament" element={<CustomTournament />} />
					<Route path="/TournamentSetup" element={<TournamentSetup />} />


					<Route path='/chat/:conversation_id/:user_id' element={<Chat />} />

					<Route path="/Custom" element={<Custom />} />
					<Route path='/local-game' element={<LocalGame />} />
					<Route path='/ai-game' element={<AiGame />} />
					<Route path='/remote-game' element={<RemoteGame />} />
\					<Route path='/local-game-setup' element={<LocalGameSetup />} />
					<Route path='/ai-game-setup' element={<AiGameSetup />} />
					<Route path='/matchmaking' element={<MatchMaking />} />


					<Route path="/2fa" element={<TwoFactorAuth />} />
					<Route path="*" element={<NotFound />} />
				</Route>
				
			</Routes>

	);
};

export default ComponentPath