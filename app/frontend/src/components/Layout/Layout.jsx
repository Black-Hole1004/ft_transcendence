import Alert from '../Alert'
import Header from './Header'
import { useEffect , useState} from 'react'
import { Outlet } from 'react-router-dom'
import { useAlert } from '../AlertContext'
import useAuth from '../../context/AuthContext'
import Cookies from 'js-cookie'
import { createContext, useContext } from 'react'


const USER_API = import.meta.env.VITE_USER_API;
const WP_NOTIFY = import.meta.env.VITE_WP_NOTIFY;
const WP_FRINEDS = import.meta.env.VITE_WP_FRINEDS;
const WP_NOTIFICATIONS = import.meta.env.VITE_WP_NOTIFICATIONS;
const SocketContext = createContext()
export const useSocket = () => useContext(SocketContext)


function Layout() {

	const { authTokens, getAuthHeaders } = useAuth()
	const [refreshData, setRefreshData] = useState(0);
	const [socket_notify, setSocketNotify] = useState(null);
	const [socket_friends, setSocketFriends] = useState(null);
	const [socket_notification, setSocketNotification] = useState(null);
	const [notifications, setNotifications] = useState([]);


	const refreshUserData = () => {
		console.log('------- Refreshing user data -------');
		setRefreshData((prev) => prev + 1);
	};

	const [user_data, setuser_data] = useState({
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

		if (!authTokens?.access_token) {
			logout();  // Redirect to login
			return;
		}
		const fetchData = async () => {
			const fetchedData = await fetchUser();
			if (fetchedData)
				setuser_data(fetchedData);
			else
				console.log('-- Failed to fetch user data --');
		};
		fetchData();
	}, [authTokens, refreshData]);

	useEffect(() => {
		if (!user_data)
			return;
		setFirst_name(user_data.first_name);
		setLast_name(user_data.last_name);
		setEmail_(user_data.email);
		setMobile_number(user_data.mobile_number);
		setUsername(user_data.username);
		setDisplay_name(user_data.display_name);
		setBio(user_data.bio);
		setProfile_picture(user_data.profile_picture);
	}, [user_data]);

	const access_token = Cookies.get('access_token');
	if (!access_token)
		return;

	useEffect(() => {
		const newSocket = new WebSocket(WP_NOTIFY+'?access_token='+access_token);

		newSocket.onopen = () => {
			console.log('---- WebSocket Connected from Notify Consumer ----');
		};
		newSocket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('WebSocket data:', data);
		};

		newSocket.onclose = (event) => {
			console.log('WebSocket Closed form Notify Consumer:', event);
		};

		newSocket.onerror = (error) => {
			console.error('WebSocket Error:', error);
		};

		setSocketNotify(newSocket);

		return () => {
			newSocket.close();
		};
	}, [authTokens?.access_token]);

	useEffect(() => {
		const newSocket = new WebSocket(WP_FRINEDS+'?access_token='+access_token);

		newSocket.onopen = () => {
			console.log('---- WebSocket Connected from AcceptFriendsRequest Consumer ----');
		};
		newSocket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('WebSocket data:', data);
		};

		newSocket.onclose = (event) => {
			console.log('WebSocket Closed form AcceptFriendsRequest Consumer:', event);
		};

		newSocket.onerror = (error) => {
			console.error('WebSocket Error:', error);
		};

		setSocketFriends(newSocket);

		return () => {
			newSocket.close();
		};
	}, [authTokens?.access_token]);

	useEffect(() => {
		const newSocket = new WebSocket(WP_NOTIFICATIONS+'?access_token='+access_token);

		newSocket.onopen = () => {
			console.log('---- WebSocket Connected from Notifications Consumer ----');
		};

		newSocket.onmessage = (event) => {
			console.log('WebSocket message received:', event.data);
			const data = JSON.parse(event.data);
			console.log('Notification for current user:', data);
			setNotifications((prevNotifications) => [
				...prevNotifications,
				{
					id: data.id,
					message: data.message,
					type: 'friend_request',
					from_user: data.from_user,
					profile_picture: data.profile_picture,
				},
			]);
		};


		newSocket.onclose = (event) => {
			console.log('WebSocket Closed form Notifications Consumer:', event);
		}

		newSocket.onerror = (error) => {
			console.error('WebSocket Error:', error);
		}

		setSocketNotification(newSocket);

		return () => {
			newSocket.close();
		}
	}
		, [authTokens?.access_token]);

	const sockets = {
		socket_notify: socket_notify,
		socket_friends: socket_friends,
		socket_notification: socket_notification,
		refreshUserData: refreshUserData,
		fetchUser: fetchUser,
		profile_picture: profile_picture,
	}

	return (
		<SocketContext.Provider value={sockets}>
			<div className='relative flex flex-col min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary overflow-hidden'>
				
				<Header
					user_data={user_data}
					notifications={notifications}
					setNotifications={setNotifications}
				/>
				<Outlet />
			</div>
		</SocketContext.Provider>
	)
}

export const AlertWrapper = () => {
	const { showAlert, alertType, alertMessage, dismissAlert } = useAlert()

	useEffect(() => {
		if (showAlert) {
			const timer = setTimeout(() => {
				dismissAlert()
			}, 5400)
			return () => clearTimeout(timer)
		}
	}, [showAlert, dismissAlert])

	return showAlert && <Alert type={alertType} message={alertMessage} onClose={dismissAlert} />
}

export default Layout
