import { createContext, useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null)
const API_LOGIN = import.meta.env.VITE_API_LOGIN
const API_REGISTER = import.meta.env.VITE_API_REGISTER
const API_42 = import.meta.env.VITE_API_42
const API_GOOGLE = import.meta.env.VITE_API_GOOGLE
const VITE_API_REFRESH = import.meta.env.VITE_API_REFRESH
const VITE_API_VERIFY = import.meta.env.VITE_API_VERIFY
const VITE_API_LOGOUT = import.meta.env.VITE_API_LOGOUT

export const AuthProvider = ({ children }) => {

    const [email, setEmail] = useState('')
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);


    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');



    const [authTokens, setAuthTokens] = useState(() => {
        try {
            return {
                access_token: accessToken ? JSON.parse(accessToken) : null,
                refresh_token: refreshToken ? JSON.parse(refreshToken) : null,
            };
        } catch (error) {
           console.error('error', error)
           logout()
        }
    });


    const initialUser = authTokens?.access_token && jwtDecode(authTokens.access_token)
    const [user, setUser] = useState(initialUser)



    const login = async () => {
        try {
            const response = await fetch(API_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })
            const data = await response.json()
            if (response.ok) {
                console.log('Login successful', data)
                setAuthTokens(data)
                setUser(jwtDecode(data.access_token))
                Cookies.set('access_token', JSON.stringify(data.access_token))
                Cookies.set('refresh_token', JSON.stringify(data.refresh_token))
                navigate('/dashboard')
            }
            else {
                console.log('Login failed', data)
                setShowSuccessAlert(true)
            }
        } catch (error) {
            console.error('error', error)
        }
    }


    const register = async () => {
        try {
            const response = await fetch(API_REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email,
                    'password1': password,
                    'password2': confirmPassword
                })
            })
            const data = await response.json();
            if (response.ok) {
                console.log('registration successful', data)
                setShowAlert(true)
            } else {
                console.log('registartion failed', data)
                setShowSuccessAlert(true)
            }
        } catch (error) {
            console.error('error', error)
        }
    }


    const getAuthHeaders = () => {
        const access_token = Cookies.get('access_token');
        if (access_token) {
            try {
                const token = JSON.parse(access_token);
                console.log(' --- access token found --- ');
                return {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                };
            } catch (error) {
                console.error("Failed to parse access_token:", error);
                return { 'Content-Type': 'application/json' };
            }
        }
        return { 'Content-Type': 'application/json' };
    };

    const logout = async () => {
        try {
            const response = await fetch(VITE_API_LOGOUT, {
                method: 'POST',
                headers: getAuthHeaders()
            })
            const data = await response.json()
            if (response.ok) {
                console.log('Logout successful', data)
                Cookies.remove('access_token')
                Cookies.remove('refresh_token')
                setAuthTokens(null)
                setUser(null)
                navigate('/')
            } else {
                console.log('Logout failed', data)
            }
        } catch (error) {
            console.error('error', error)
        } 
    };



    const contextData = {
        login: login,
        register: register,
        logout: logout,
        // refres_token: refres_token,
        // verify_token: verify_token,


        setEmail: setEmail,
        setPassword: setPassword,
        setConfirmPassword: setConfirmPassword,

        email: email,
        password: password,
        confirmPassword: confirmPassword,

        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        user: user,
        setUser: setUser,

        showAlert: showAlert,
        setShowAlert: setShowAlert,
        showSuccessAlert: showSuccessAlert,
        setShowSuccessAlert: setShowSuccessAlert,

        getAuthHeaders: getAuthHeaders,

    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return (context)
}

export default useAuth;