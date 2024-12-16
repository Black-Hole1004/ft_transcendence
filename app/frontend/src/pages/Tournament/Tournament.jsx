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
		avatar: '../../../dist/assets/images/tabi3a.jpeg',
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
		avatar: '../../../dist/assets/images/ahaloui.jpeg',
		icon: "🌍"
	},
]

const Tournament = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen ">

			<div className="flex flex-col border border-gray-300 p-4 rounded-md w-[800px] h-[800px]">
				
				{/* first partie of tournament */}
				<div className=' flex-1 flex flex-row relative'>
					{/* first column */}
					<div className=' flex flex-col justify-around'>
						<div className=''> 							
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[0].avatar}
								alt="avatar"
							/>
						</div>

						<div className=''> 							
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[1].avatar}
								alt="avatar"
							/>
						</div>
					</div>
					{/* second column */}
					<div className='w-24 h-full flex flex-col'>
						<div className=' flex-1'>
						</div>
						<div className='border-t-2 border-r-2 border-white flex-1'>
						</div>
						<div className='border-b-2 border-r-2 border-white flex-1'>
						</div>
						<div className='flex-1'>
						</div>
					</div>

					{/* third column */}
					<div className='w-24 flex flex-col'>
						<div className='flex-1'></div>
						<div className='flex-1'></div>
						<div className='border-t-2 border-white flex-1'></div>
						<div className='flex-1'> </div>
					</div>

					{/* fourth column */}
					<div className=' w-24 flex flex-col'>
						<div className=' flex-1'></div>
						<div className=' flex-1 flex justify-center items-center'>
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[0].avatar}
								alt="avatar"
							/>
						</div>
						<div className=' flex-1'> </div>
					</div>

					{/* fifth column */}
					<div className='w-24 h-full flex flex-col'>
						<div className=' flex-1'></div>
						<div className='flex-1'></div>
						<div className='border-t-2 border-r-2 border-white flex-1'></div>
						<div className='border-r-2 flex-1'></div>
					</div>

					{/* sixth column */}
					<div className='border-b border-white w-24 h-full flex flex-col'></div>

					{/* seventh column */}
					<div className='w-24 h-full flex flex-col absolute top-1/2 right-24 justify-center '>
						<img
							className="w-24 h-24 rounded-full border-2 border-white"
							src={players[0].avatar}
							alt="avatar"
						/>
					</div>
				</div>


				{/* second partie of tournament */}
				<div className=' flex-1 flex flex-row'>
					{/* first column */}
					<div className=' flex flex-col justify-around'>
						<div className=''> 							
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[2].avatar}
								alt="avatar"
							/>
						</div>

						<div className=''> 							
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[3].avatar}
								alt="avatar"
							/>
						</div>
					</div>
					{/* second column */}
					<div className='w-24 h-full flex flex-col'>
						<div className=' flex-1'></div>
						<div className='border-t-2 border-r-2 border-white flex-1'></div>
						<div className='border-b-2 border-r-2 border-white flex-1'></div>
						<div className='flex-1'></div>
					</div>

					{/* third column */}
					<div className='w-24 flex flex-col'>
						<div className='flex-1'></div>
						<div className='flex-1'></div>
						<div className='border-t-2 border-white flex-1'></div>
						<div className='flex-1'> </div>
					</div>

					{/* fourth column */}
					<div className=' w-24 flex flex-col'>
						<div className=' flex-1'></div>
						<div className=' flex-1 flex justify-center items-center'>
							<img
								className="w-24 h-24 rounded-full border-2 border-white"
								src={players[3].avatar}
								alt="avatar"
							/>
						</div>
						<div className=' flex-1'> </div>
					</div>

					{/* fifth column */}
					<div className=' w-24 h-full flex flex-col'>
						<div className='border-r-2 flex-1'></div>
						<div className='border-b-2 border-r-2 flex-1'></div>
						<div className=' border-white flex-1'></div>
						<div className='flex-1'></div>
					</div>

					{/* sixth column */}
					<div className='border-t border-white w-24 h-full flex flex-col'>
					</div>
					
				</div>
			</div>
		</div>
	)
}
export default Tournament;