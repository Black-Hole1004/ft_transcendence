import Badge from './Badge'

function Achievements({ level }) {
	return (
		<div
			className='border-1.5 rounded-xl achivements-card font-dreamscape-sans
		border-[rgba(255,206,157,.4)] bg-[rgba(27,22,17,0.5)]'
		>
			<h1 className=' text-primary text-center leading-[1.02] achievements'>Achievements</h1>
			<div className='flex max-ms:flex-col justify-between items-center text-level'>
				<Badge image={'novice-astronaut'} title={'Novice Astronaut'} level={level} />
				<Badge image={'cosmic-explorer'} title={'Cosmic Explorer'} level={level} />
				<Badge image={'stellar-voyager'} title={'Stellar Voyager'} level={level} />
				<Badge image={'galactic-trailblazer'} title={'Galactic Trailblazer'} level={level}/>
				<Badge image={'celestial-master'} title={'Celestial Master'} level={level} />
			</div>
			<div className='text-primary levels-font xl:mt-4 lp:mt-3 mtb:mt-2 mt-1'>
				<div className='flex justify-between max-ms:flex-col'>
					<p>0xp</p>
					<p>2000xp</p>
					<p>4000xp</p>
					<p>6000xp</p>
					<p>8000xp</p>
					<p>10000xp</p>
				</div>
				<div className='w-full xl:h-[11px] tb:h-2 h-[7px] rounded-md bg-[rgb(121,118,110,0.7)] mt-[2px] flex items-center'>
					<div
						className={`lp:mx-2 mx-1 rounded-lg h-[65%] bg-level`}
						style={{ width: `${level}%` }}
					></div>
				</div>
			</div>
		</div>
	)
}

export default Achievements
