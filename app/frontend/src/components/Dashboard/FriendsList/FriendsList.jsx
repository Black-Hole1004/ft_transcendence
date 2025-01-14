import { useEffect, useState } from 'react'
import UserFriendsList from './UserFriendsList'
import useAuth from '../../../context/AuthContext'
import { useSocket } from '../../Layout/Layout'
import { use } from 'react'
// import HOSTNAME FROM .env from frontend/.env
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL


const BLOCKED_USERS = 'https://localhost/api/chat/blocked/blocked-users/'
function FriendsList() {
	const [users, setUsers] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const { getAuthHeaders } = useAuth()
	const { profile_picture } = useSocket()

	const [blockedUsers, setBlockedUsers] = useState([]);

	const { socket_notify, socket_friends } = useSocket();

	const get_all_users = async () => {
		try {
			const response = await fetch(`${VITE_BASE_URL}/api/users/`, {
				method: 'GET',
				headers: getAuthHeaders(),
			})
			const data = await response.json()
			console.log('data =====> []', data)
			setUsers(data)
		}
		catch (error) {
			console.log('data =====>error []')
			console.error('Error:', error)
		}
	}

	useEffect(() => {
		get_all_users()
	}, [])

	useEffect(() => {
        const fetchBlockedStatus = async () => {
            try {
                const response = await fetch(BLOCKED_USERS, {
                    method: 'GET',
                    headers: getAuthHeaders(),
                });
                const data = await response.json();
				console.log('blocked users --------------->', data.blocked_users);
                setBlockedUsers(data.blocked_users);
            } catch (error) {
                console.error('Error fetching blocked status:', error);
            }
        };
        fetchBlockedStatus();
    }, []);

	const filterUsers = users?.filter((user) => 
		user.username.toLowerCase().startsWith(searchQuery.toLowerCase())
	) || [];

	// this useEffect listens for friend request acceptances
	useEffect(() => {
		if (!socket_friends)
			return;
		const original_onmessage = socket_friends.onmessage;
		socket_friends.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.type === 'friend_request_accepted' ) {
				get_all_users();
			}
			if (original_onmessage) {
				original_onmessage(event);
			}
		}
		return () => {
			socket_friends.onmessage = original_onmessage;
		}
	}, [socket_friends]);

	useEffect(() => {
		if (!socket_notify)
			return;
		const original_onmessage = socket_notify.onmessage;
		socket_notify.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.message === 'online' || data.message === 'offline') {
				get_all_users();
			}
			if (original_onmessage) {
				original_onmessage(event);
			}
		}
		return () => {
			socket_notify.onmessage = original_onmessage;
		}
	}, [socket_notify])


	return (
		<div
			className='flex flex-col items-center lg:w-fl-ldr-custom tb:w-[380px] w-full mtb:h-card h-[350px] rounded-xl border
			transition duration-300 border-[rgba(255,206,157,.2)] hover:border-[rgba(255,206,157,.4)] bg-[rgba(27,22,17,0.5)]
			hover:drop-shadow-[0_0_20px_rgba(255,206,157,0.2)]'
		>
			<h1 className='font-dreamscape-sans card-title text-primary'>FRIENDS LIST</h1>

			<div className='flex items-center border border-border rounded-lg pl-2.5 w-[90%]'>
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
						return <UserFriendsList key={user.id} user_friend={user} user_profile_picture = {profile_picture} blockedUsers={blockedUsers} />
					})
				}
			</div>
		</div>
	)
}

export default FriendsList