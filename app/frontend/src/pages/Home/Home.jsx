import React, { useRef, useState } from 'react'
import './Home.css'
// const LazyCard = React.lazy(() => import('../../components/Home/Card/Card'))
import Card from '../../components/Home/Card/Card'
import Header from '../../components/Home/Header/Header'
import Button from '../../components/Home/Buttons/Button'

const Home = () => {
	const dialogRef = useRef(null)
	const [isSigningIn, setIsSigningIn] = useState(false)

	const openDialog = () => {
		if (dialogRef.current) {
			dialogRef.current.showModal()
		}
	}

	const closeDialog = () => {
		dialogRef.current.close()
	}

	const handleClick = (event) => {
		const buttonId = event.target.getAttribute('id')
		setIsSigningIn(buttonId === 'sign-in')
		openDialog()
	}

	return (
		<>
			<Header handleClick={handleClick} />
			<section className='text-primary responsive-text'>
				<div className='flex lp:justify-start justify-center'>
					<h1
						className='relative border gradient-border leading-[1] font-dreamscape select-none
						lg:border-y-2 lp:pt-[16px] pt-[10px] pb-[10px]
						4k:ml-[80px] xl:ml-[60px] lg:ml-[40px] lp:ml-[25px]'
					>
						starserve
						<span className='absolute font-heavy bottom-2 left-0'>
							Serve Among the Stars
						</span>
					</h1>
				</div>
				<div className='font-heavy text-center lp:mt-[120px] mt-[80px] mx-1 tracking-wide leading-[1.7]'>
					<p>
						Join the ultimate space pong adventure on Venus! Serve, spin, and score in
						zero-gravity.
					</p>
					<p>
						Come along for an unforgettable adventure of space competition and celestial
						marvels.
					</p>
					<Button
						id='get-started'
						onClick={handleClick}
						className='lg:rounded-xl ms:rounded-lg my-[25px]'
					>
						Get Started
					</Button>
				</div>
			</section>
			<React.Suspense fallback={<div>Loading...</div>}>
				{/* <LazyCard */}
				<Card
					dialogRef={dialogRef}
					closeDialog={closeDialog}
					isSigningIn={isSigningIn}
					setIsSigningIn={setIsSigningIn}
				/>
			</React.Suspense>
		</>
	)
}

export default Home
