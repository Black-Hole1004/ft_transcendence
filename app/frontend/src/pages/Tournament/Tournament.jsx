import React from 'react';
import Button from '../../components/Home/Buttons/Button';
import { useLocation, useNavigate } from 'react-router-dom' // Make sure this is included

const players = [
	{
		id: "1",
		nickname: "MOUAD55",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 12456,
		avatar: '../../../dist/assets/images/moudrib.jpeg',
		icon: '../../../dist/assets/images/Achievements/celestial-master.png'
	},
	{
		id: "2",
		nickname: "ARABIAI",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 11648,
		avatar: '../../../dist/assets/images/tabi3a.jpeg',
		icon: '../../../dist/assets/images/Achievements/galactic-trailblazer.png'
	},
	{
		id: "3",
		nickname: "AHMAYMOU",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 10231,
		avatar: '../../../dist/assets/images/lmoudir.jpg',
		icon: '../../../dist/assets/images/Achievements/stellar-voyager.png'
	},
	{
		id: "4",
		nickname: "PLAYER1",
		achievement: "GALACTIC TRAILBLAZER",
		rankClass: "text-cyan-400",
		xp: 9153,
		avatar: '../../../dist/assets/images/ahaloui.jpeg',
		icon: '../../../dist/assets/images/Achievements/cosmic-explorer.png'
	},
	{
		id: "1",
		nickname: "MOUAD55",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 12456,
		avatar: '../../../dist/assets/images/moudrib.jpeg',
		icon: '../../../dist/assets/images/Achievements/celestial-master.png'
	},
	{
		id: "2",
		nickname: "ARABIAI",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 11648,
		avatar: '../../../dist/assets/images/tabi3a.jpeg',
		icon: '../../../dist/assets/images/Achievements/galactic-trailblazer.png'
	},
	{
		id: "3",
		nickname: "AHMAYMOU",
		achievement: "CELESTIAL MASTER",
		rankClass: "text-orange-400",
		xp: 10231,
		avatar: '../../../dist/assets/images/lmoudir.jpg',
		icon: '../../../dist/assets/images/Achievements/stellar-voyager.png'
	},
	{
		id: "4",
		nickname: "PLAYER1",
		achievement: "GALACTIC TRAILBLAZER",
		rankClass: "text-cyan-400",
		xp: 9153,
		avatar: '../../../dist/assets/images/ahaloui.jpeg',
		icon: '../../../dist/assets/images/Achievements/cosmic-explorer.png'
	},

]

const Tournament = () => {
	const location = useLocation()
	const { mode, player1, player2, player3, player4, backgroundId, duration, ballSize, ballColor, paddleSize } = location.state || {}
	console.log('duration: ', duration)
	console.log('ballSize: ', ballSize)
	console.log('ballColor: ', ballColor)
	console.log('paddleSize: ', paddleSize)

	console.log(mode)
	console.log(player1)
	console.log(player2)
	console.log(player3)
	console.log(player4)
	console.log(backgroundId)

	return (
		<div className="flex flex-row items-start justify-center min-h-screen overflow-hidden">

			<div className="w-[35%] flex flex-col overflow-hidden  p-8">
				<div className=''>
					<h1 className='text-6xl font-dreamscape'
						style={{
							textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
						}}
					>
						CELESTIAL PONG CLASH
					</h1>
					<div className='flex flex-col justify-center'>
						<p className='text-gray-300 text-base font-medium text-justify pr-40'>
							The Celestial Pong Clash invites players from across the galaxy to compete in
							intense interstellar battles, where victory depends on mastering precision and
							strategy in the vast cosmic realm.
						</p>
					</div>
				</div>

				<div className='justify-center rounded-3xl mt-20 w-[60%] border border-white border-b-opacity-20'>
					<h2 className='text-2xl font-semibold flex items-center justify-center'>PLAYERS</h2>
					<div className="space-y-4 p-4 ">
						{
							players.map((player, index) => {
								return (
									<div
										key={index}
										className='user-container flex items-center justify-between font-dreamscape-sans
									rounded-md hover:bg-[rgba(183,170,156,0.2)]'>
										<div className='h-full flex items-center xl:gap-3 tb:gap-2 gap-1 w-[68%]'>
											<img
												src={player.avatar}
												className='h-16 rounded-full ring-1 ring-primary select-none'
												alt='user-image'
												loading='eager'
											/>
											<div className='flex flex-wrap items-center overflow-hidden'>
												<p className='text-primary nickname-size leading-[1] truncate mr-1'>
													{player.nickname}
												</p>
												<p className='text-achievement text-xs '> {player.achievement}</p>
											</div>
										</div>
										<div>

										</div>
										<div className='h-full mx-1 flex items-center'>
											<img
												src={player.icon}
												className='h-16 select-none'
												alt='achievement-icon'
												loading='eager'
											/>
											<p className={`xp text-primary leading-[1]`}>{`${player.xp}` + 'xp'}</p>
										</div>
									</div>
								)
							}
							)
						}
					</div>
				</div>
			</div>

			<div className="flex flex-col border rounded-3xl mt-20 pb-8 pl-16 w-[800px] h-[1100px]">
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

				<div className='flex justify-center'>
					<Button className={
						'rounded-md  w-1/2 h-12 font-regular buttons-text remove-button'
					}
						type='submit' >
						Start Tournament
					</Button>
				</div>
			</div>

		</div>
	)
}
export default Tournament;