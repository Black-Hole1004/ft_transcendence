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
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'))
const Layout = React.lazy(() => import('../components/Layout/Layout'))


const ComponentPath = () => {
	const { authTokens } = useAuth();

	return (
			<Routes>
				{/* Redirect to /Dashboard if authenticated on the home path */}
				<Route path="/" element={authTokens && authTokens.access_token ? <Navigate to="/dashboard" replace /> : <Home />} />

				{/* Layout wrapping all private routes */}
				<Route element={<Layout />}>
					<Route path="/Settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
					<Route path="/Game" element={<PrivateRoute><Game /></PrivateRoute>} />
					<Route path="/Chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
					<Route path="/Custom" element={<PrivateRoute><Custom /></PrivateRoute>} />
					<Route path="/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
					<Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
					<Route path="/Tournament" element={<PrivateRoute><Tournament /></PrivateRoute>} />
					<Route path='/chat/:conversation_id/:user_id' element={<Chat />} />
				</Route>

				{/* Catch-all route */}
				<Route path="*" element={<NotFound />} />
			</Routes>

	);
};

export default ComponentPath