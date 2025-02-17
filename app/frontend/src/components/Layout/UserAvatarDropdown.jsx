import { Link } from 'react-router-dom'
import useAuth from '../../context/AuthContext'
const BASE_URL = import.meta.env.VITE_BASE_URL
function UserAvatarDropdown({ setIsDropdownOpen, user_data }) {
	const { logout } = useAuth()

	const closeDropdown = () => {
		setIsDropdownOpen(false)
	}
	

	return (
		<>
			<Link to={`/profile/${user_data.username}`}>
				<div onClick={closeDropdown} className='flex items-center gap-1'>
					<img
						src={`${BASE_URL}${user_data.profile_picture}`}
						className='rounded-full object-cover ring-1 ring-primary dropdown-user-photo'
						alt='user photo'
					/>
					<div className='font-medium'>
						<p className='text-primary fullname'>@{user_data.username}</p>
						<p className='text-light username'>
							{user_data.first_name} {user_data.last_name}
						</p>
					</div>
				</div>
			</Link>
			<div className='h-px w-[80%] bg-border self-center'></div>
			<ul className='font-medium text-primary flex flex-col tb:gap-2.5 gap-1.5'>
				<Link to={`/profile/${user_data.username}`}>
					<li
						onClick={closeDropdown}
						className='flex items-center gap-4 hover:brightness-150'
					>
						<img src='/assets/images/icons/profile.svg' alt='profile icon' />
						Profile
					</li>
				</Link>
				<Link to={'/dashboard'}>
					<li
						onClick={closeDropdown}
						className='flex items-center gap-4 hover:brightness-150'
					>
						<img src='/assets/images/icons/dashboard.svg' alt='dashboard icon' />
						Dashboard
					</li>
				</Link>
				<Link to={'/settings'}>
					<li
						onClick={closeDropdown}
						className='flex items-center gap-4 hover:brightness-150'
					>
						<img src='/assets/images/icons/settings.svg' alt='settings icon' />
						Settings
					</li>
				</Link>
			</ul>
			<div className='h-[1px] w-[80%] bg-border self-center'></div>
			<ul>
				<li onClick={logout} className='flex items-center gap-4 hover:brightness-150 cursor-pointer'>
					<img src='/assets/images/icons/log-out.svg' alt='logout icon' />
					Log Out
				</li>
			</ul>
		</>
	)
}

export default UserAvatarDropdown
