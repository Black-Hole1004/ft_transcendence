import { useEffect, useState } from 'react'
import UserFriendsList from './UserFriendsList'
import useAuth from '../../../context/AuthContext'

function FriendsList() {
	const [users, setUsers] = useState([])
	const { getAuthHeaders } = useAuth()
	
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
		get_all_users()
	}, [])

	console.log('users ===>', users);
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
					return <UserFriendsList key={user.id} user={user} />
				}
				)}
			</div>
		</div>
	)
}

export default FriendsList