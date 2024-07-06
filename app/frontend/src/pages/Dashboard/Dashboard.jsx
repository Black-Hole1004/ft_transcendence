import React from 'react'
import Header from '../../components/Header'

const Dashboard = () => {
	return (
		<div className='w-screen h-screen backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex lg:flex-row flex-col'>
				<div className='lg:w-5/12 lg:h-screen w-screen'>
					<div>
						
					</div>
				</div>
				<div className='lg:flex-1 lg:h-screen w-screen flex-none'>

				</div>
			</section>
		</div>
	)
}

export default Dashboard
