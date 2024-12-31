import useAuth from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { use } from 'react';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
	const { authTokens } = useAuth();
	if (authTokens && authTokens.access_token) {
		return children;
	} else {
		return <Navigate to="/" />;
	}
};

export default PrivateRoute;
