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
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const AuthProvider = ({ children }) => {

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
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


    // -----------------------------------------------------------------
	const [user_fetched, setUser_fetched] = useState({
		first_name: '',
		last_name: '',
		email: '',
		mobile_number: '',
		username: '',
		display_name: '',
		bio: '',
		password: '',
		new_password: '',
		confirm_password: '',
		profile_picture: '',
	})

	const [first_name, setFirst_name] = useState('')
	const [last_name, setLast_name] = useState('')
	const [email_, setEmail_] = useState('')
	const [mobile_number, setMobile_number] = useState('')
	const [username, setUsername] = useState('')
	const [display_name, setDisplay_name] = useState('')
	const [bio, setBio] = useState('')
	const [profile_picture, setProfile_picture] = useState('')

	
	const fetchUser = async () => {
		try {
			const response = await fetch(USER_API, {
				method: 'GET',
				headers: getAuthHeaders()
			})
			const data = await response.json();
			if (response.ok) {
				console.log('Successfully fetched user data');
				return (data)
			} else {
				console.log('Failed to fetch user data');
				return (null)
			}
		}
		catch (error) {
			console.log(error);
			return (null);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await fetchUser();
			if (fetchedData)
				setUser_fetched(fetchedData);
			else
				console.log('-- Failed to fetch user data --');
		};
		fetchData();
	}, [authTokens]);

	useEffect(() => {
		if (!user_fetched)
			return;
		setFirst_name(user_fetched.first_name);
		setLast_name(user_fetched.last_name);
		setEmail_(user_fetched.email);
		setMobile_number(user_fetched.mobile_number);
		setUsername(user_fetched.username);
		setDisplay_name(user_fetched.display_name);
		setBio(user_fetched.bio);
		setProfile_picture(user_fetched.profile_picture);
	} , [user_fetched]);

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
                console.log('Login successful', data)
                setAuthTokens(data)
                setUser(jwtDecode(data.access_token))
                Cookies.set('access_token', JSON.stringify(data.access_token))
                Cookies.set('refresh_token', JSON.stringify(data.refresh_token))
                navigate('/dashboard')
            }
            else {
                console.log('Login failed', data)
                handleSubmit('error', 'Login failed')
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
                handleSubmit('success', 'Registration successful')
            } else {
                console.log('registartion failed', data)
                handleSubmit('error', 'Registration failed')
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
        try {
            const response = await fetch(VITE_API_LOGOUT, {
                method: 'POST',
                headers: getAuthHeaders()
            })
            const data = await response.json()
            if (response.ok) {
                navigate('/')
                console.log('Logout successful', data)
                Cookies.remove('access_token')
                Cookies.remove('refresh_token')
                setAuthTokens(null)
                setUser(null)
            } else {
                console.log('Logout failed', data)
            }
        } catch (error) {
            console.error('error', error)
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
                if (accessTokenExpirationTime) {
                    const accesTokenTimeout = setTimeout(() => {
                        refres_token()
                    }, accessTokenExpirationTime - Date.now() - 1000);
                    return (() => {
                        clearTimeout(accesTokenTimeout);
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

        // -----------------------------------------------------------
        user_fetched: user_fetched,
        setUser_fetched: setUser_fetched,
        first_name: first_name,
        setFirst_name: setFirst_name,
        last_name: last_name,
        setLast_name: setLast_name,
        email_: email_,
        setEmail_: setEmail_,
        mobile_number: mobile_number,
        setMobile_number: setMobile_number,
        username: username,
        setUsername: setUsername,
        display_name: display_name,
        setDisplay_name: setDisplay_name,
        bio: bio,
        setBio: setBio,
        profile_picture: profile_picture,
        setProfile_picture: setProfile_picture
        // -----------------------------------------------------------
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