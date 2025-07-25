import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../components/AlertContext';

const AuthContext = createContext(null)
const API_LOGIN = import.meta.env.VITE_API_LOGIN
const API_REGISTER = import.meta.env.VITE_API_REGISTER
const VITE_API_REFRESH = import.meta.env.VITE_API_REFRESH
const VITE_API_LOGOUT = import.meta.env.VITE_API_LOGOUT
const USER_API = import.meta.env.VITE_USER_API;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
export const AuthProvider = ({ children }) => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
        
     


    const [authTokens, setAuthTokens] = useState(() => {
        try {
            
            if (accessToken && refreshToken) {
                // trim double quotes from the token with trim
                let TrimmedAccess = accessToken.replace(/^"|"$|"/g, ''); 
                let TrimmedRefresh = refreshToken.replace(/^"|"$|"/g, '');
                return {
                    access_token: TrimmedAccess,
                    refresh_token: TrimmedRefresh,
                };
            }
            return null;
        } catch (error) {
            console.error("Failed to parse access_token:", error);
            return null;
        }
    });


    const initialUser = authTokens?.access_token && jwtDecode(authTokens.access_token)
    const [user, setUser] = useState(initialUser)


    
    const { triggerAlert } = useAlert()

    const handleSubmit = (type, message) => {
        triggerAlert(type, message)
    }

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
                if (data.Twofa_enabled === true) {
                    navigate('/2fa', { state: { email: email, password: password } })
                    return ;
                }
                setAuthTokens(data)
                setUser(jwtDecode(data.access_token))
                
                const access_token = JSON.stringify(data.access_token)
                const refresh_token = JSON.stringify(data.refresh_token)
                Cookies.set('refresh_token', refresh_token, {  sameSite: 'Lax', secure: true });
                Cookies.set('access_token', access_token, { sameSite: 'Lax', secure: true });
                navigate('/dashboard')
            }
            else {
                handleSubmit('error', data.detail || data.email || data.password || data.error)
            }
        } catch (error) {
            console.error('error', error)
        }
    }


    const register = async () => {
        try {
            console.log('api register:', API_REGISTER)
            const response = await fetch(API_REGISTER, {
                method: 'POST',
                credentials: 'include',
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
                handleSubmit('success', 'Registration successful')
            } else {
                handleSubmit('error', data.password2 || data.email)
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
        if (!authTokens?.access_token) {
            Cookies.remove('access_token')
            Cookies.remove('refresh_token')
            setAuthTokens(null)
            setUser(null)
            return;
        }

        try {
            const response = await fetch(VITE_API_LOGOUT, {
                method: 'POST',
                headers: getAuthHeaders()
            })
            const data = await response.json()
            if (response.ok) {
                navigate('/')
                Cookies.remove('access_token')
                Cookies.remove('refresh_token')
                setAuthTokens(null)
                setUser(null)
            } else {
                console.log('--> Logout failed', data)
            }
        } catch (error) {
            console.error('error', 'error')
        }
    };

    const get_expiration_time = (token) => {
        if (!token) {
            return null
        }
        const decodedToken = jwtDecode(token)
        return (decodedToken.exp ? decodedToken.exp * 1000 : null)
    }

    const refres_token = async () => {
        console.log('--- refreshing token ---')
        try {
            const response = await fetch(VITE_API_REFRESH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "refresh": authTokens.refresh_token
                })
            })
            const data = await response.json()
            if (response.ok) {
                const updatedTokens = {
                    access_token: data.access,
                    refresh_token: authTokens.refresh_token,
                };
                setAuthTokens(updatedTokens);
                setUser(jwtDecode(data.access));
                Cookies.set('access_token', JSON.stringify(updatedTokens.access_token))
                Cookies.set('refresh_token', JSON.stringify(updatedTokens.refresh_token))
            }
            else {
                console.log('--- Login failed ---', data)
                logout()
            }
        } catch (error) {
            console.error('--- error ----', error)
            logout()
        }
    }


    useEffect(() => {
        if (authTokens) {
            try {
                const accessTokenExpirationTime = get_expiration_time(authTokens.access_token)
                const refreshTokenExpirationTime = get_expiration_time(authTokens.refresh_token)
                if (accessTokenExpirationTime) {
                    const accesTokenTimeout = setTimeout(() => {
                        refres_token()
                    }, accessTokenExpirationTime - Date.now() - 1000);
                    const refreshTokenTimeout = setTimeout(() => {
                        logout()
                    }, refreshTokenExpirationTime - Date.now() - 1000);
                    return (() => {
                        clearTimeout(accesTokenTimeout);
                        clearTimeout(refreshTokenTimeout);
                    })
                } else {
                    logout()
                }
            } catch (error) {
                console.error('error', error)
                logout()
            }
        }
    }, [authTokens])



    const contextData = {
        login: login,
        register: register,
        logout: logout,
        refres_token: refres_token,


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