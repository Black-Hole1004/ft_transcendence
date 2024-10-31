import useAuth from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"


const PrivateRoute = ({ children}) => {
    // try {
        const {authTokens, user} = useAuth()
    // } catch(error) {
    //     console.log(error);
    // }

    if (!authTokens || !user) {
        console.log('1221')
        return (<Navigate to='/' />)
    }
    // else {
    //     console.log('0000');
    // }
    return (children)
}
// halouiaymene@gmail.com

export default PrivateRoute