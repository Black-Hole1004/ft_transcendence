import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import RegistrationNotification from '../components/ShowNotification'

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
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);


    const initialAuthTokens = localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens'))
        : null;


    const initialUser = initialAuthTokens && initialAuthTokens.access_token
        ? jwtDecode(initialAuthTokens.access_token)
        : null

    const [authTokens, setAuthTokens] = useState(initialAuthTokens)
    const [user, setUser] = useState(initialUser)
    const navigate = useNavigate()

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
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/settings')
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

    // const get_expiration_time = (token) => {
    //     if (!token) {
    //         return null
    //     }
    //     const decodedToken = jwtDecode(token)
    //     return (decodedToken.exp ? decodedToken.exp * 1000 : null)
    // }

    // const refres_token = async () => {
    //     console.log('refresh_token');
    //     try {
    //         const response = await fetch(VITE_API_REFRESH, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 "refresh": authTokens.refresh_token
    //             })
    //         })
    //         const data = await response.json()
    //         if (response.ok) {
    //             const updatedTokens = {
    //                 access_token: data.access,
    //                 refresh_token: authTokens.refresh_token,
    //             };
    //             setAuthTokens(updatedTokens);
    //             setUser(jwtDecode(data.access));
    //             localStorage.setItem('authTokens', JSON.stringify(updatedTokens)); 
    //         }
    //         else {
    //             console.log('Login failed', data)
    //             logout()
    //         }
    //     } catch (error) {
    //         console.error('error', error)
    //         logout()
    //     }
    // }

    // const verify_token = async () => {
    //     try {
    //         const response = await fetch (VITE_API_VERIFY, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({"token": authTokens.access_token}),
    //         })
    //         if (response.ok)
    //             return (true)
    //         else {
    //             logout()
    //         }
    //     } catch(error) {
    //         logout()
    //     }
    // }

    // useEffect(() => {
    //     if (authTokens) {
    //         const accessTokenExpirationTime = get_expiration_time(authTokens.access_token)
    //         const refreshTokenExpirationTime = get_expiration_time(authTokens.refresh_token)

    //         const accesTokenTimeout = setTimeout(() => {
    //             refres_token()
    //         }, accessTokenExpirationTime - Date.now() - 1000);

    //         // const refreshTokenTimeout = setTimeout(() => {
    //         //     console.log('refresh_expired');
    //         //     logout()
    //         // }, refreshTokenExpirationTime - Date.now() - 1000);

    //         return (() => {
    //             clearTimeout(accesTokenTimeout);
    //             // clearTimeout(refreshTokenTimeout);
    //         })
    //     }
    // }, [authTokens])

    const logout = async () => {
        // try {
        //     const response = await fetch(VITE_API_LOGOUT,{
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + String(authTokens.access_token)
        //         },
        //         body: JSON.stringify({"refresh": authTokens.refresh_token})
        //     });
        //     if (response.ok) {
        //         console.log('logout successful');
        //         setAuthTokens(null)
        //         setUser(null)
        //         localStorage.removeItem('authTokens')
        //         navigate('/')
        //     } else {
        //         console.log('logout failed');
        //     }
        // } catch (error) {
        //     console.log('logout failed');
        // }
        console.log('logout');
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        console.log('logout successful');
    }

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
        user: user,

        showAlert: showAlert,
        setShowAlert: setShowAlert,
        showSuccessAlert: showSuccessAlert,
        setShowSuccessAlert: setShowSuccessAlert
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