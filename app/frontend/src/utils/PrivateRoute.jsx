import useAuth from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"


const PrivateRoute = ({ children}) => {
    const {authTokens, user} = useAuth()

    if (!authTokens || !user) {
        return (<Navigate to='/' />)
    }
    return (children)
}
// halouiaymene@gmail.com

export default PrivateRoute