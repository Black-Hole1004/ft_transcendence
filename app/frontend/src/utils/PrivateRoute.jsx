import useAuth from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import React, { } from "react"


const PrivateRoute = ({ children }) => {
	const { authTokens } = useAuth();
	return authTokens && authTokens.access_token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute