import { Link } from 'react-router-dom'
import  useAuth  from '../../context/AuthContext'
const BASE_URL = import.meta.env.VITE_BASE_URL
function UserAvatarDropdown({ setIsDropdownOpen, user_data }) {

	const { logout } = useAuth()

	const closeDropdown = () => {
		setIsDropdownOpen(false)
	}
	console.log(user_data)

	return (
		<>
			<Link to={'/profile'}>
				<div onClick={closeDropdown} className='flex items-center gap-1'>
					<img
						src={`${BASE_URL}${user_data.profile_picture}`}
						className='rounded-full ring-1 ring-primary dropdown-user-photo'
						alt='user photo'
					/>
					<div className='font-medium'>
						<p className='text-primary fullname'>{user_data.first_name} {user_data.last_name}</p>
						<p className='text-light username'>{user_data.username}</p>
					</div>
				</div>
			</Link>
			<div className='h-px w-[80%] bg-border self-center'></div>
			<ul className='font-medium text-primary flex flex-col tb:gap-2.5 gap-1.5'>
				<Link to={'/profile'}>
					<li onClick={closeDropdown} className='flex items-center gap-4 hover:brightness-150'>
						<img src='/assets/images/icons/profile.svg' alt='profile icon' />
						Profile
					</li>
				</Link>
				<Link to={'/dashboard'}>
					<li onClick={closeDropdown} className='flex items-center gap-4 hover:brightness-150'>
						<img src='/assets/images/icons/dashboard.svg' alt='dashboard icon' />
						Dashboard
					</li>
				</Link>
				<Link to={'/settings'}>
					<li onClick={closeDropdown} className='flex items-center gap-4 hover:brightness-150'>
						<img src='/assets/images/icons/settings.svg' alt='settings icon' />
						Settings
					</li>
				</Link>
			</ul>
			<div className='h-[1px] w-[80%] bg-border self-center'></div>
			<ul>
				<Link onClick={logout} to={'/'}>
					<li className='flex items-center gap-4 hover:brightness-150'>
						<img src='/assets/images/icons/log-out.svg' alt='logout icon' />
						Log Out
					</li>
				</Link>
			</ul>
		</>
	)
}

export default UserAvatarDropdown
