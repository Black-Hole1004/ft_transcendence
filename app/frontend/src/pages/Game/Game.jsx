import React from 'react'
import './Game.css'
import Header from '../../components/Header'

const Game = () => {
	return (
		<div className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex-grow flex'>
				<div className='page-margin flex-1 flex flex-col border border-border'>
					<div className='border border-victory flex justify-center'>
						<div className='lp:border-2 border border-primary selected-table mtb:w-select-table w-full rounded-2xl
							flex justify-center items-center'>
							<button className='font-dreamscape '>
								start
							</button>
						</div>
					</div>
					<div className='border border-defeat h-[15%] flex justify-center items-center'>
						<h1 className='font-dreamscape-sans select-message'>select table</h1>
					</div>
					<div className='tables flex-1 flex border border-blue-600 gap-5'>
						{/* <div className='flex-wrap w-[374px] border border-yellow-400'></div>
						<div className='flex-wrap w-[374px] border border-yellow-400'></div>
						<div className='flex-wrap w-[374px] border border-yellow-400'></div>
						<div className='flex-wrap w-[374px] border border-yellow-400'></div>
						<div className='flex-wrap w-[374px] border border-yellow-400'></div>
						<div className='flex-wrap w-[374px] border border-yellow-400'></div>
						<div className='flex-wrap w-[374px] border border-yellow-400'></div>
						<div className='flex-wrap w-[374px] border border-yellow-400'></div> */}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Game
