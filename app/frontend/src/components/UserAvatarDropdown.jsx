import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import useAuth from '../context/AuthContext'


function UserAvatarDropdown({ setIsDropdownOpen, src, firstName, lastName, username }) {
	const dropdownRef = useRef(null)

	const {logout} = useAuth()

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setIsDropdownOpen(false)
			}
		}
		const timeoutId = setTimeout(() => {
			document.addEventListener('click', handleOutsideClick);
		  }, 0);
		
		  return () => {
			clearTimeout(timeoutId);
			document.removeEventListener('click', handleOutsideClick);
		  };
	}, [])


	return (
		<div
			ref={dropdownRef}
			className='dropdown absolute z-10 right-0 top-full flex flex-col border border-primary rounded-xl bg-secondary'
		>
			<Link to={'/profile'}>
				<div className='flex items-center gap-1'>
					<img
						src={src}
						className='rounded-full border border-primary dropdown-user-photo'
						alt='user photo'
					/>
					<div className='font-medium'>
						<p className='text-primary fullname'> {firstName} {lastName} </p>
						<p className='text-light username'> {username} </p>
					</div>
				</div>
			</Link>
			<div className='h-[1px] w-[80%] bg-border self-center'></div>
			<ul className='font-medium text-primary flex flex-col tb:gap-2.5 gap-1.5'>
				<Link to={'/profile'}>
					<li className='flex items-center gap-4 '>
						<img src='/assets/images/icons/profile.svg' alt='' />
						Profile
					</li>
				</Link>
				<Link to={'/dashboard'}>
					<li className='flex items-center gap-4 '>
						<img src='/assets/images/icons/dashboard.svg' alt='' />
						Dashboard
					</li>
				</Link>
				<Link to={'/settings'}>
					<li className='flex items-center gap-4 '>
						<img src='/assets/images/icons/settings.svg' alt='' />
						Settings
					</li>
				</Link>
			</ul>
			<div className='h-[1px] w-[80%] bg-border self-center'></div>
			<ul>
				<Link onClick={logout}>
					<li className='flex items-center gap-4 '>
						<img src='/assets/images/icons/log-out.svg' alt='' />
						Log Out
					</li>
				</Link>
			</ul>
		</div>
	)
}

export default UserAvatarDropdown
