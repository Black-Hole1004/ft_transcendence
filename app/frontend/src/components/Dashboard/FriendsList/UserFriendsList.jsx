import Button from '../../Home/Buttons/Button'
import  useAuth  from '../../../context/AuthContext'
import axios from 'axios'

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

	console.log('user id =>>>>>> ', user.id)
	const achievementData = achievements[user.achievement]
	const { getAuthHeaders } = useAuth()

	const handleAddFriend = async (id) => {
		try {
			const response = await fetch('http://127.0.0.1:8000/api/send_friend_request/', {
				method: 'POST',
				body: JSON.stringify({ user_to: id }),
				headers: {
					...getAuthHeaders(), // Include authentication headers (e.g., Authorization)
					'Content-Type': 'application/json', // Set the correct content type for JSON
				},
			});
			const data = await response.json();
			console.log('data =>>>>>> ', data);
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
