import Button from '../../Home/Buttons/Button'
import useAuth from '../../../context/AuthContext'
import { useAlert } from '../../AlertContext'

const achievements = {
	'celestial master': {
		icon: '/assets/images/Achievements/celestial-master.png',
	},
	'galactic trailblazer': {
		icon: '/assets/images/Achievements/galactic-trailblazer.png',
	},
	'stellar voyager': {
		icon: '/assets/images/Achievements/stellar-voyager.png',
	},
	'cosmic explorer': {
		icon: '/assets/images/Achievements/cosmic-explorer.png',
	},
	'novice astronaut': {
		icon: '/assets/images/Achievements/novice-astronaut.png',
	},
}

function UserFriendsList({ user }) {

	const achievementData = achievements[user.achievement]
	const { getAuthHeaders } = useAuth()
	const { triggerAlert } = useAlert()

	const handleSubmit = (type, message) => {
		triggerAlert(type, message)
	}


	const handleAddFriend = async (id) => {
		try {
			const response = await fetch('http://127.0.0.1:8000/api/send_friend_request/', {
				method: 'POST',
				body: JSON.stringify({ user_to: id }),
				headers: getAuthHeaders(),
			});
			const data = await response.json();
			if (response.status === 201) {
				const friendRequestId = data.id; // This should be part of the response from your API
				const fromUser = data.fromUser; // Same here, the `fromUser` should be returned by your backend

				// Open WebSocket and send the notification with necessary data
				const socket = new WebSocket('ws://127.0.0.1:8000/ws/friend_request/');
				socket.onopen = () => {
					socket.send(JSON.stringify({
						message: `User ${fromUser} sent you a friend request!`,
						id: friendRequestId, // Send the friend request ID
						fromUser: fromUser,   // Send the fromUser information
					}));
					handleSubmit('success', 'Friend request sent successfully')
				};

			} else {
				handleSubmit('error', data.message)
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='user-container flex items-center justify-between font-dreamscape-sans
			rounded-md hover:bg-[rgba(183,170,156,0.2)]'>
			<div className='h-full flex items-center xl:gap-3 tb:gap-2 gap-1 w-[72%]'>
				<img
					src='/assets/images/Achievements/celestial-master.png'
					className='achievement-icon-fr select-none'
					alt='achievement-icon'
					loading='eager'
				/>
				<img
					src={user.profile_picture}
					className='h-[80%] rounded-full ring-1 ring-primary select-none'
					alt='user-image'
					loading='eager'
				/>
				<div className='flex flex-wrap items-center overflow-hidden'>
					<p className='text-primary nickname-size leading-[1] truncate mr-1'>{user.username}</p>
					<p className='text-achievement achievement-name '> test test</p>
				</div>
			</div>
			<div className='mx-1'>
				{user.isFriend ? (
					<p
						className={` ${user.status == 'online' ? 'text-online' : user.status == 'offline' ? 'text-offline' : 'text-defeat'} status`}
					>
						{user.status}
					</p>
				) : (
					<Button className={'font-heavy add-friend-button lg:rounded-lg rounded'}
						onClick={(e) => handleAddFriend(user.id)} >
						Add Friend
					</Button>
				)}
			</div>
		</div>
	)
}

export default UserFriendsList
