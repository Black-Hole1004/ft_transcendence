import UserLeaderboard from './UserLeaderboard';

const Leaderboard = ({ users }) => {
	if (!users) return <div>Loading...</div>;

	return (
		<div className='flex flex-col items-center lg:w-fl-ldr-custom tb:w-[380px] w-full mtb:h-card h-[350px] rounded-xl border-1.5
		transition duration-300 border-[rgba(255,206,157,.2)] hover:border-[rgba(255,206,157,.4)] bg-[rgba(27,22,17,0.5)]
		hover:drop-shadow-[0_0_20px_rgba(255,206,157,0.2)]'>
			<h1 className='font-dreamscape-sans card-title'>LEADERBOARD</h1>
			<div className='w-[96%] overflow-y-auto users'>
				{users.map((user, index) => (
					<UserLeaderboard 
						key={user.id}
						rank={index + 1}
						nickname={user.username}
						achievement={user.achievement.name.toLowerCase()}
						xp={user.xp}
						profilePicture={user.profile_picture}
					/>
				))}
			</div>
		</div>
	);
}

export default Leaderboard;