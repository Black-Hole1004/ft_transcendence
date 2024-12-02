import { useEffect, useState } from 'react'
import UserFriendsList from './UserFriendsList'
import useAuth from '../../../context/AuthContext'
import Cookies from 'js-cookie'
import { useWebSocket } from '../../../context/WebSocketStatusContext'


function FriendsList() {
	const [users, setUsers] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const { getAuthHeaders, profile_picture } = useAuth()
	
	const get_all_users = async () => {
		try {
			const response = await fetch('http://127.0.0.1:8000/api/users/', {
				method: 'GET',
				headers: getAuthHeaders(),
			})
			const data = await response.json()
			setUsers(data)
		}
		catch (error) {
			console.error('Error:', error)
		}
	}
	useEffect(() => {
		get_all_users()
	}, [])

	const filterUsers = users.filter((user) => {
		return user.username.toLowerCase().startsWith(searchQuery.toLowerCase())
	}
	)

	// this useEffect listens for friend request acceptances
	useEffect(() => {
		const access_token = Cookies.get('access_token');
		const socket = new WebSocket(`ws://127.0.0.1:8000/ws/update_user_status/?access_token=${access_token}`);

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.type === 'friend_request_accepted' ) { 
				get_all_users();
			}
		};

		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};
		return () => socket.close(); 
	}, []);

	const socket = useWebSocket();
	if (socket) {
		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('data =====>', data)
			if (data.message === 'online' || data.message === 'offline') {
				get_all_users();
			}
		}
	}

	console.log('users =====>', users)

	return (
		<div
			className='flex flex-col items-center lg:w-fl-ldr-custom tb:w-[380px] w-full mtb:h-card h-[350px] rounded-xl border-1.5
			transition duration-300 border-[rgba(255,206,157,.2)] hover:border-[rgba(255,206,157,.4)] bg-[rgba(27,22,17,0.5)]
			hover:drop-shadow-[0_0_20px_rgba(255,206,157,0.2)]'
		>
			<h1 className='font-dreamscape-sans card-title text-primary'>FRIENDS LIST</h1>

			<div className='flex items-center border border-border rounded-2xl pl-2.5 w-[90%]'>
				<img src='/assets/images/icons/search-icon.png' className='search-icon select-none' alt='' />
				<input
					type='text'
					name='search for friends'
					placeholder='Search for friends...'
					className='flex-1 font-medium bg-transparent text-primary outline-none search-input p-2.5 placeholder:text-border overflow-hidden'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<div className='w-[96%] overflow-y-auto users'>
				{
					filterUsers.map((user) => {
						return <UserFriendsList key={user.id} user={user} profile_picture={profile_picture} />
					})
				}
			</div>
		</div>
	)
}

export default FriendsList