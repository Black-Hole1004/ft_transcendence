import Button from '../../Home/Buttons/Button'
import useAuth from '../../../context/AuthContext'
import { useAlert } from '../../AlertContext'
import { useSocket } from '../../Layout/Layout'

const SEND_FRIEND_REQUEST = import.meta.env.VITE_SEND_FRIEND_REQUEST
const BASE_URL = import.meta.env.VITE_BASE_URL

function UserFriendsList({ user_friend, user_profile_picture }) {
    const { getAuthHeaders } = useAuth()
    const { triggerAlert } = useAlert()
    const { socket_notification, sendGameInvite } = useSocket()

    const handleSubmit = (type, message) => {
        triggerAlert(type, message)
    }

    const handle_add_friend = async (id) => {
        if (!id) {
            console.error('No user ID provided')
            return
        }
        try {
            const response = await fetch(SEND_FRIEND_REQUEST, {
                method: 'POST',
                body: JSON.stringify({ user_to: id }),
                headers: getAuthHeaders(),
            })
            const data = await response.json()
            console.log('Response =>', data)
            if (response.status === 201) {
                console.log('response ->', data);
                const from_user = data.from_user;
                const sender_id = data.sender_id;
                const friend_request_id = data.id;
                const receiver_id = data.receiver_id;

                if (socket_notification?.readyState === WebSocket.OPEN) {
                    socket_notification.send(JSON.stringify({
                        sender_id: sender_id,
                        receiver_id: receiver_id,
                        message: `User ${from_user} sent you a friend request`,
                        id: friend_request_id,
                        from_user: from_user,
                        profile_picture: BASE_URL + user_profile_picture,
                    }));
                    handleSubmit('success', 'Friend request sent successfully');
                };
            } else {
                handleSubmit('error', data.message)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleInviteToGame = (userId) => {
        if (socket_notification?.readyState === WebSocket.OPEN) {
            sendGameInvite(userId);
            // handleSubmit('success', 'Game invitation sent');
        } else {
            handleSubmit('error', 'Cannot send invite - connection error');
        }
    };

    return (
        <div className='user-container flex items-center justify-between font-dreamscape-sans
            rounded-md hover:bg-[rgba(183,170,156,0.2)]'>
            <div className='h-full flex items-center xl:gap-3 tb:gap-2 gap-1 w-[72%]'>
                <img
                    src={user_friend.badge_image}
                    className='achievement-icon-fr select-none'
                    alt='achievement-icon'
                    loading='eager'
                />
                <img
                    src={user_friend.profile_picture}
                    className='h-[76%] aspect-square object-cover rounded-full ring-1 ring-primary select-none'
                    alt='user-image'
                    loading='eager'
                />
                <div className='flex flex-wrap items-center overflow-hidden'>
                    <p className='text-primary nickname-size leading-none truncate mr-1'>
                        {user_friend.username}
                    </p>
                    <p className='text-achievement achievement-name '> 
                        {user_friend.badge_name}
                    </p>
                </div>
            </div>
            <div className='mx-1 flex items-center gap-2'> {/* Added flex and gap for button spacing */}
                {/* Status indicator for friends */}
                {user_friend.is_friend && (
                    <>
                        <p className={`
                            ${user_friend.status === 'online' ? 'text-online' : 
                            user_friend.status === 'offline' ? 'text-offline' : 
                            'text-defeat'} achievement-name`}
                        >
                            {user_friend.status}
                        </p>
                        
                        {/* Invite button only shown for online friends */}
                        {user_friend.status === 'online' && (
                            <Button
                                className={'font-medium invite-button px-3 py-1 rounded border border-border'}
                                onClick={() => handleInviteToGame(user_friend.id)}
                            >
                                Invite
                            </Button>
                        )}
                        
                    </>
                )}

                {/* Add friend button for non-friends */}
                {!user_friend.is_friend && (
                    <Button 
                        className={'font-medium add-friend-button rounded border border-border'}
                        onClick={() => handle_add_friend(user_friend.id)}
                    >
                        Add Friend
                    </Button>
                )}
            </div>
        </div>
    )
}

export default UserFriendsList