import React, { useRef, useState } from 'react'
import './Home.css'
import Card from '../../components/Home/Card/Card'
import Header from '../../components/Home/Header/Header'
import Button from '../../components/Home/Buttons/Button'

const Home = () => {
	const dialogRef = useRef(null)
	const [isSigningIn, setIsSigningIn] = useState(false)
	const openDialog = () => {
		dialogRef.current.showModal()
	}

	const closeDialog = () => {
		dialogRef.current.close()
	}

	const handleClick = (event) => {
		const buttonId = event.target.getAttribute('id')

		{
			buttonId == 'sign-in' ? setIsSigningIn(true) : setIsSigningIn(false)
		}

		{
			buttonId ? openDialog() : closeDialog()
		}
	}

	return (
		<>
			<Header openDialog={handleClick} />
			<section className='relative'>
				<div className='flex md:justify-start sm:justify-center'>
					<h1
						className='relative border gradient-border leading-[1] responsive-font text-primary font-dreamscape select-none
						lg:border-t-2 lg:border-b-2 md:pt-[16px] sm:pt-[10px] pb-[10px]
						2xl:ml-[80px] xl:ml-[60px] lg:ml-[40px] md:ml-[30px]'
					>
						starserve
						<span className='subtitle absolute text-primary font-heavy bottom-2 left-0'>
							Serve Among the Stars
						</span>
					</h1>
				</div>
				<div className='text-primary font-heavy text-center pt-[120px] tracking-wide leading-[1.7]'>
					<p className='call-to-action'>
						Join the ultimate space ping pong adventure on Venus! Serve, spin, and score
						in zero-gravity.
					</p>
					<p className='call-to-action'>
						Come along for an unforgettable adventure of space competition and celestial
						marvels.
					</p>
					<Button
						id='get-started'
						onClick={handleClick}
						className='responsive-font-getstarted-button lg:rounded-xl sm:rounded-lg mt-[25px]
						2xl:py-[15px] xl:py-[11px] lg:py-[10px] md:py-[9px] sm:py-[8px]
						2xl:px-[28px] xl:px-[24px] lg:px-[20px] md:px-[16px] sm:px-[12px]'
					>
						Get Started
					</Button>
				</div>
			</section>
			<Card
				dialogRef={dialogRef}
				closeDialog={closeDialog}
				isSigningIn={isSigningIn}
				setIsSigningIn={setIsSigningIn}
			></Card>
		</>
	)
}

export default Home
