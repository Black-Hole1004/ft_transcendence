import useAuth from "../context/AuthContext"
import { Navigate } from "react-router-dom"


const PrivateRoute = ({ children }) => {

	const { authTokens } = useAuth()
	if (authTokens && authTokens.access_token) {
		return children
	}
	return <Navigate to="/" />
};

export default PrivateRoute