import React, { useState, useRef } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Button from '../../components/Home/Buttons/Button'

const Home = () => {
	const signInRef = useRef(null)
	const signUpRef = useRef(null)

	const openSignIn = () => {
		signInRef.current.showModal()
	}

	const closeSignIn = () => {
		signInRef.current.close()
	}

	const openSignUp = () => {
		signUpRef.current.showModal()
	}

	const closeSignUp = () => {
		signUpRef.current.close()
	}
	
	const openSignUpFromSignIn = () => {
		closeSignIn()
		openSignUp()
	}
	
	const openSignInFromSignUp = () => {
		closeSignUp()
		openSignIn()
	}
	
	return (
		<>
			<header className='relative flex items-center text-primary font-medium 2xl:h-[116px] xl:h-[100px] sm:h-[80px]'>
				<nav
					className='absolute flex justify-between
					2xl:w-[190px] xl:w-[180px] lg:w-[160px] md:w-[150px] sm:w-[130px]
					2xl:right-[50px] xl:right-[40px] md:right-[30px] sm:right-[20px]'
				>
					<button
						data-open-modal //
						onClick={openSignIn}
						className='responsive-font-header-buttons'
					>
						Sign in
					</button>
					<Button
						onClick={openSignUp}
						className='rounded-lg responsive-font-header-buttons
						2xl:py-[12px] xl:py-[11px] lg:py-[10px] md:py-[9px] sm:py-[8px]
						2xl:px-[23px] xl:px-[20px] lg:px-[16px] md:px-[14px] sm:px-[10px]'
					>
						Sign up
					</Button>
				</nav>
			</header>
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
						onClick={openSignUp}
						className='responsive-font-getstarted-button lg:rounded-xl sm:rounded-lg mt-[25px]
						2xl:py-[15px] xl:py-[11px] lg:py-[10px] md:py-[9px] sm:py-[8px]
						2xl:px-[28px] xl:px-[24px] lg:px-[20px] md:px-[16px] sm:px-[12px]'
					>
						Get Started
					</Button>
				</div>
			</section>
			<SignIn signInRef={signInRef} openSignUpFromSignIn={openSignUpFromSignIn} closeSignIn={closeSignIn}></SignIn>
			<SignUp signUpRef={signUpRef} openSignInFromSignUp={openSignInFromSignUp} closeSignUp={closeSignUp}></SignUp>
		</>
	)
}

export default Home
