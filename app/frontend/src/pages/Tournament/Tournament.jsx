import React from 'react';
const players = [
	{
		id: "1",
		name: "MOUAD55",
		rank: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 12456,
		avatar: '../../../dist/assets/images/moudrib.jpeg',
		icon: "🔥"
	},
	{
		id: "2",
		name: "ARABIAI",
		rank: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 11648,
		avatar: '../../../dist/assets/images/moudrib.jpeg',
		icon: "🔥"
	},
	{
		id: "3",
		name: "AHMAYMOU",
		rank: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 10231,
		avatar: '../../../dist/assets/images/lmoudir.jpg',
		icon: "🔥"
	},
	{
		id: "4",
		name: "PLAYER1",
		rank: "GALACTIC TRAILBLAZER",
		rankClass: "text-cyan-400",
		xp: 9153,
		avatar: '../../../dist/assets/images/moudrib.jpeg',
		icon: "🌍"
	},
]
const Tournament = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="border border-gray-300 p-4 rounded-md w-[800px] h-[800px]">

				<div className="flex flex-col items-start justify-between h-full space-y-4">

					<div className=' flex-1 flex flex-col justify-around'>
						
						<div className='flex flex-row relative'>
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[0].avatar}
								alt="avatar"
							/>
							<div className='border-t-2 border-white h-24 w-24 flex justify-center items-center border-white border-t-2 border-r-2 absolute top-12 left-24'>
							</div>

							<div className='h-24 w-24 border-t-2 border-white absolute top-[140px] left-48 flex justify-center items-center'>
							</div>
						</div>


						<div className='flex flex-row relative'>
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[0].avatar}
								alt="avatar"
							/>
							<div className=' h-24 w-24 flex justify-center items-center border-white border-b-2 border-r-2 absolute -top-12 left-24'>
							</div>
						</div>
					</div>

					<div className=' flex-1 flex flex-col justify-around'>
						<div className='flex flex-row relative'>
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[0].avatar}
								alt="avatar"
							/>
							<div className='border-t-2 border-white h-24 w-24 flex justify-center items-center border-white border-t-2 border-r-2 absolute top-12 left-24'>
							</div>
							
							<div className='h-24 w-24 border-t-2 border-white absolute top-[140px] left-48 flex justify-center items-center'>
							</div>
							{/* <img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[0].avatar}
								alt="avatar"
							/> */}
						</div>
						<div className='flex flex-row relative'>
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[0].avatar}
								alt="avatar"
							/>
							<div className=' h-24 w-24 flex justify-center items-center border-white border-b-2 border-r-2 absolute -top-12 left-24'>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Tournament;