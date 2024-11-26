import Button from '../../Home/Buttons/Button'
import useAuth from '../../../context/AuthContext'
import { useAlert } from '../../AlertContext'


const SEND_FRIEND_REQUEST = 'http://127.0.0.1:8000/api/send_friend_request/'
function UserFriendsList({ user }) {
	const { getAuthHeaders } = useAuth()
	const { triggerAlert } = useAlert()

	const handleSubmit = (type, message) => {
		triggerAlert(type, message)
	}

	const handle_add_friend = async (id) => {
		try {
			const response = await fetch(SEND_FRIEND_REQUEST, {
				method: 'POST',
				body: JSON.stringify({ user_to: id }),
				headers: getAuthHeaders(),
			});
			const data = await response.json();
			if (response.status === 201) {
				console.log('Friend request sent:', data);
				const friend_request_id = data.id;
				const from_user = data.from_user;
				const sender_id = data.sender_id;
	
				// Create the WebSocket connection
				const socket = new WebSocket('ws://127.0.0.1:8000/ws/friend_request/');
				socket.onopen = () => {
					// Send the friend request notification via WebSocket
					socket.send(JSON.stringify({
						sender_id: sender_id,
						message: `User ${from_user} sent you a friend request`,
						id: friend_request_id,
						from_user: from_user,
						profile_picture: user.profile_picture,
					}));
					handleSubmit('success', 'Friend request sent successfully');
				};
			} else {
				handleSubmit('error', data.message);
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
					<p className='text-achievement achievement-name '> achievement test</p>
				</div>
			</div>
			<div className='mx-1'>
				{/* {user.is_friend? (
					<p
						className={` ${status == 'online' ? 'text-online' : status == 'offline' ? 'text-offline' : 'text-defeat'} status`}
					>
						{status}
					</p>
				) : (
					<Button 
						className={'font-heavy add-friend-button lg:rounded-lg rounded'}
						onClick={() => handle_add_friend(user.id)}
					>
						Add Friend
					</Button>
				)} */}

				{user.is_friend && (
                <p className={`
                    ${user.status === 'online' ? 'text-online' : 
                    user.status === 'offline' ? 'text-offline' : 
                    'text-defeat'} status`}
                >
                    {user.status}
                </p>
            )}
            
            {/* Add friend button for non-friends */}
            {!user.is_friend && (
                <Button 
					className={'font-heavy add-friend-button lg:rounded-lg rounded'}
                    onClick={() => handle_add_friend(user.id)}
                >
                    Add Friend
                </Button>
            )}
			</div>
		</div>
	)
}

export default UserFriendsList
