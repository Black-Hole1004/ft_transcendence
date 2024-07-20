import React from 'react'
import './Game.css'
import Header from '../../components/Header'

const Game = () => {
	return (
		<div className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex-grow'>
				<div className='page-margin flex flex-col border border-border'>
					<div className='border border-victory flex justify-center'>
						<div className='lp:border-2 border border-primary selected-table mtb:w-select-table w-full rounded-2xl
							flex justify-center items-center'>
							<button className='font-dreamscape '>
								start
							</button>
						</div>
					</div>
					<div className='border border-defeat select-message flex justify-center items-center'>
						<h1 className='font-dreamscape-sans'>select table</h1>
					</div>
					<div className='grid lg:gap-8 tb:gap-6 gap-4 border border-blue-600
					lg:grid-cols-4 lg:grid-rows-2 lp:grid-cols-3 lp:grid-rows-3 grid-cols-2 grid-rows-4'>
						<div className='tables border border-yellow-400'></div>
						<div className='tables border border-yellow-400'></div>
						<div className='tables border border-yellow-400'></div>
						<div className='tables border border-yellow-400'></div>
						<div className='tables border border-yellow-400'></div>
						<div className='tables border border-yellow-400'></div>
						<div className='tables border border-yellow-400'></div>
						<div className='tables border border-yellow-400'></div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Game
