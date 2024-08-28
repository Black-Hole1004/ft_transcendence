import UserFriendsList from './UserFriendsList'

function FriendsList() {
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
					placeholder='Search for friends...'
					className='font-medium bg-transparent text-primary outline-none search-input p-2.5 placeholder:text-border'
				/>
			</div>
			<div className='flex flex-col lg:gap-3 gap-2 w-[96%] h-[90%] overflow-y-auto users'>
				<UserFriendsList nickname={'mouad55'} achievement={'celestial master'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'galactic trailblazer'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'celestial master'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'stellar voyager'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'celestial master'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'galactic trailblazer'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'novice astronaut'} status={'in-game'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'stellar voyager'} status={'in-game'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'celestial master'} status={'in-game'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'galactic trailblazer'} status={'offline'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'cosmic explorer'} status={'offline'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'stellar voyager'} status={'offline'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'galactic trailblazer'} status={'offline'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'celestial master'} status={'offline'} isFriend={true}/>
				<UserFriendsList nickname={'mouad55'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
				<UserFriendsList nickname={'mouad55'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
				<UserFriendsList nickname={'mouad55'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
				<UserFriendsList nickname={'mouad55'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
				<UserFriendsList nickname={'mouad55'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
				<UserFriendsList nickname={'mouad55'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
			</div>
		</div>
	)
}

export default FriendsList
