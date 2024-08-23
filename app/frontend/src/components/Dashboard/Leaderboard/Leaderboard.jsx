import UserLeaderboard from './UserLeaderboard'

function Leaderboard() {
	return (
		<div
			className='flex flex-col items-center lg:w-fl-ldr-custom tb:w-[380px] w-[300px]
			rounded-xl card-height border-1.5 border-[rgba(255,206,157,.4)] bg-[rgba(27,22,17,0.5)]'
		>
			<h1 className='font-dreamscape-sans card-title'>LEADERBOARD</h1>
			<div className='flex flex-col lg:gap-3 gap-2 w-[96%] h-[95%] overflow-y-auto users'>
				<UserLeaderboard rank={1} nickname={'mouad55'} achievement={'celestial master'} xp={12315}/>
				<UserLeaderboard rank={2} nickname={'mouad55'} achievement={'celestial master'} xp={11512}/>
				<UserLeaderboard rank={3} nickname={'mouad55'} achievement={'celestial master'} xp={11243}/>
				<UserLeaderboard rank={4} nickname={'mouad55'} achievement={'celestial master'} xp={10789}/>
				<UserLeaderboard rank={5} nickname={'mouad55'} achievement={'celestial master'} xp={10546}/>
				<UserLeaderboard rank={6} nickname={'mouad55'} achievement={'celestial master'} xp={10312}/>
				<UserLeaderboard rank={7} nickname={'mouad55'} achievement={'celestial master'} xp={10003}/>
				<UserLeaderboard rank={8} nickname={'mouad55'} achievement={'galactic trailblazer'} xp={9813}/>
				<UserLeaderboard rank={9} nickname={'mouad55'} achievement={'galactic trailblazer'} xp={9612}/>
				<UserLeaderboard rank={10} nickname={'mouad55'} achievement={'galactic trailblazer'} xp={9321}/>
				<UserLeaderboard rank={11} nickname={'mouad55'} achievement={'galactic trailblazer'} xp={9223}/>
				<UserLeaderboard rank={12} nickname={'mouad55'} achievement={'galactic trailblazer'} xp={9123}/>
				<UserLeaderboard rank={13} nickname={'mouad55'} achievement={'galactic trailblazer'} xp={7712}/>
				<UserLeaderboard rank={14} nickname={'mouad55'} achievement={'galactic trailblazer'} xp={7645}/>
				<UserLeaderboard rank={15} nickname={'mouad55'} achievement={'galactic trailblazer'} xp={7021}/>
				<UserLeaderboard rank={16} nickname={'mouad55'} achievement={'stellar voyager'} xp={6213}/>
				<UserLeaderboard rank={17} nickname={'mouad55'} achievement={'stellar voyager'} xp={5231}/>
				<UserLeaderboard rank={18} nickname={'mouad55'} achievement={'cosmic explorer'} xp={3123}/>
				<UserLeaderboard rank={19} nickname={'mouad55'} achievement={'novice astronaut'} xp={1546}/>
				<UserLeaderboard rank={20} nickname={'mouad55'} achievement={'novice astronaut'} xp={1312}/>

			</div>
		</div>
	)
}

export default Leaderboard
