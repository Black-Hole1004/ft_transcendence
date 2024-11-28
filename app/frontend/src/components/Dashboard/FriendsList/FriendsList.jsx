import { useEffect, useState } from 'react'
import UserFriendsList from './UserFriendsList'
import useAuth from '../../../context/AuthContext'
import Cookies from 'js-cookie'

function FriendsList() {
	const [users, setUsers] = useState([])
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
			console.log('-----------')
		}
	}

	useEffect(() => {
		const access_token = Cookies.get('access_token');
		console.log('Access token:', access_token);
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/user_status/?access_token=' + access_token);

        // When the WebSocket connection is established, set the user as online
        socket.onopen = function(e) {
            console.log('Connection established');
            socket.send(JSON.stringify({ 'message': 'online' }));
        };

        // When a message is received from the WebSocket
        socket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log('Message received =>', data.message);
			get_all_users()

            if (data.message === 'ingame') {
                console.log('User is in-game');
            }
        };

        // When the WebSocket is closed, set the user as offline
        socket.onclose = function(e) {
            console.log('Connection closed');
            socket.send(JSON.stringify({ 'message': 'offline' }));
        };

        // Cleanup when the component unmounts
        return () => {
            socket.close();
        };
    }, []);

	useEffect(() => {
		get_all_users()
	}, [])

	// console.log('users ===>', users[0].status)
	return (
		<div
			className='flex flex-col items-center lg:w-fl-ldr-custom tb:w-[380px] w-[300px] card-height
			rounded-xl border-1.5 border-[rgba(255,206,157,.4)] bg-[rgba(27,22,17,0.5)]'
		>
			<h1 className='font-dreamscape-sans card-title text-primary'>FRIENDS LIST</h1>

			<div className='flex items-center border border-border rounded-2xl pl-2.5'>
				<img src='/assets/images/icons/search-icon.png' className='search-icon select-none' alt='' />
				<input
					type='text'
					name='search for friends'
					placeholder='Search for friends...'
					className='font-medium bg-transparent text-primary outline-none search-input p-2.5 placeholder:text-border'
				/>
			</div>
			<div className='w-[96%] overflow-y-auto users'>
				{users.map((user) => {
					return <UserFriendsList key={user.id} user={user} profile_picture={profile_picture} />
				}
				)}
			</div>
		</div>
	)
}

export default FriendsList