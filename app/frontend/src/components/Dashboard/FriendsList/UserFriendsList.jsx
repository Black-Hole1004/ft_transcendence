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

function UserFriendsList({ nickname, achievement, status, isFriend }) {
	const achievementData = achievements[achievement]
	const { getAuthHeaders } = useAuth()

	const handleAddFriend = async () => {
		console.log('Friend added')
		try {
			await axios.post(`http://localhost:8000/send_friend_request/${user_id}/`, 
				{}, 
				{ headers: getAuthHeaders() }
			)
		} catch (error) {
			console.error('Error adding friend')
		}
	}

	return (
		<div className='user-container flex items-center justify-between font-dreamscape-sans
			rounded-md hover:bg-[rgba(183,170,156,0.2)]'>
			<div className='h-full flex items-center xl:gap-3 tb:gap-2 gap-1 w-[72%]'>
				<img
					src={achievementData.icon}
					className='achievement-icon-fr select-none'
					alt='achievement-icon'
					loading='eager'
				/>
				<img
					src='/assets/images/lmoudir.jpg'
					className='h-[80%] rounded-full ring-1 ring-primary select-none'
					alt='user-image'
					loading='eager'
				/>
				<div className='flex flex-wrap items-center overflow-hidden'>
					<p className='text-primary nickname-size leading-[1] truncate mr-1'>{nickname}</p>
					<p className='text-achievement achievement-name '> {achievement}</p>
				</div>
			</div>
			<div className='mx-1'>
				{isFriend ? (
					<p
						className={` ${status == 'online' ? 'text-online' : status == 'offline' ? 'text-offline' : 'text-defeat'} status`}
					>
						{status}
					</p>
				) : (
					<Button className={'font-heavy add-friend-button lg:rounded-lg rounded'}
						onClick={handleAddFriend}>
						Add Friend
					</Button>
				)}
			</div>
		</div>
	)
}

export default UserFriendsList
