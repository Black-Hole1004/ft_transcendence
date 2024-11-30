import UserFriendsList from './UserFriendsList'



function FriendsList() {
	return (
		<div
			className='flex flex-col items-center lg:w-fl-ldr-custom tb:w-[380px] w-full mtb:h-card h-[350px] rounded-xl border-1.5
			transition duration-300 border-[rgba(255,206,157,.2)] hover:border-[rgba(255,206,157,.4)] bg-[rgba(27,22,17,0.5)]
			hover:drop-shadow-[0_0_20px_rgba(255,206,157,0.2)]'
		>
			<h1 className='font-dreamscape-sans card-title text-primary'>FRIENDS LIST</h1>

			<div className='flex items-center border border-border rounded-2xl pl-2.5 w-[90%]'>
				<img src='/assets/images/icons/search-icon.png' className='search-icon select-none' alt='' />
				<input
					type='text'
					name='search for friends'
					placeholder='Search for friends...'
					className='flex-1 font-medium bg-transparent text-primary outline-none search-input p-2.5 placeholder:text-border overflow-hidden'
				/>
			</div>
			<div className='w-[96%] overflow-y-auto users'>
				<UserFriendsList nickname={'mouad5555vv5555555555555555'} achievement={'celestial master'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'galactic trailblazer'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'celestial master'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'stellar voyager'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'celestial master'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'galactic trailblazer'} status={'online'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'novice astronaut'} status={'in-game'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'stellar voyager'} status={'in-game'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'celestial master'} status={'in-game'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'galactic trailblazer'} status={'offline'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'cosmic explorer'} status={'offline'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'stellar voyager'} status={'offline'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'galactic trailblazer'} status={'offline'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'celestial master'} status={'offline'} isFriend={true}/>
				<UserFriendsList nickname={'Aymahmou55555555555555555'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
				<UserFriendsList nickname={'Aymahmou'} achievement={'cosmic explorer'} status={'offline'} isFriend={false}/>
			</div>
		</div>
	)
}

export default FriendsList
