import React, { useEffect, useState } from 'react'
import './Custom.css'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'

const Custom = () => {
	const [backgroundId, setBackgroundId] = useState(1)

	const handleClick = (id) => {
		setBackgroundId(id)
	}

	const xp = 6231

	return (
		<div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section>
				<div className='page-margin flex flex-col'>
					<div className='flex justify-center'>
						<div
							key={backgroundId}
							className='lp:border-2 border border-primary overflow-hidden selected-table mtb:w-select-table w-full rounded-2xl relative'
							style={{
								background: `url('/assets/images/tables/table${backgroundId}.png')`,
								backgroundSize: 'cover',
							}}
						>
							<div className='w-full h-full flex justify-center items-center bg-backdrop-40'>
								<div className='absolute top-8 left-3 paddles bg-primary rounded-full'></div>
								<Link to={'/game'}>
									<button className='font-dreamscape start-button'>start</button>
								</Link>
								<div className='absolute bottom-4 right-3 paddles bg-primary rounded-full '></div>
							</div>
						</div>
					</div>
					<div className='select-message flex justify-center items-center'>
						<h1 className='font-dreamscape-sans'>select table</h1>
					</div>
					<div
						className='grid lg:gap-8 tb:gap-6 gap-4
					lg:grid-cols-4 lg:grid-rows-2 lp:grid-cols-3 lp:grid-rows-3 grid-cols-2 grid-rows-4'
					>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
							<button
								key={id}
								onClick={() => handleClick(id)}
								className={`tables border border-primary rounded-xl overflow-hidden outline-none hover:scale-[1.05] transition duration-500`}
								style={{
									background: `url('./assets/images/tables/table${id}.png')`,
									backgroundSize: 'cover',
								}}
								disabled={xp / 1000 < id && id > 1 ? true : false}
							>
								<div
									className={`h-full w-full flex justify-center items-center ${xp / 1000 < id && id > 1 && 'bg-backdrop-80'}`}
								>
									{/* <img
										className={`${xp / 1000 < id && id > 1 ? 'block' : 'hidden'}`}
										src='/assets/images/icons/Lock.svg'
										alt=''
									/> */}
								</div>
							</button>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Custom
