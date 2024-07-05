import React from 'react'
import Input from '../../components/Home/Input'
import CardButton from '../../components/Home/Buttons/CardButton'

function SignIn({ signInRef, openSignUpFromSignIn, closeSignIn }) {
	return (
		<dialog
			data-modal
			ref={signInRef}
			className='
		av:border-1.5 border rounded-xl bg-secondary backdrop:bg-backdrop-40 backdrop:backdrop-blur-sm
		av:h-signin-card-custom h-[570px] max-av:mb-0 av:w-card-custom max-w-full w-screen'
		>
			<div className='p-2 h-full'>
				<div className='relative w-full flex flex-row items-center'>
					<button onClick={closeSignIn} className='absolute right-2 top-1'>
						<img className='select-none close-button' src='/assets/images/close.png' />
					</button>
					<div className='separator h-0.5 flex-1'></div>
					<img
						className='select-none pointer-events-none logo'
						src='/assets/images/logo-transparent.png'
					/>
					<div className='separator h-0.5 flex-1'></div>
				</div>
				<div className='flex flex-col justify-center form-padding'>
					<div className='w-full flex flex-col items-center text-light font-heavy welcome'>
						<h1 className='sign-in-title'>Welcome back!</h1>
						<p className='sign-in-phrases'>Sign in to access your dashboard.</p>
					</div>
					<form className='flex flex-col form-gap'>
						<Input placeholder={'Email'}></Input>
						<Input placeholder={'Password'}></Input>
						<CardButton
							className={
								'text-primary font-heavy hover:bg-primary hover:text-secondary'
							}
						>
							Sign in
						</CardButton>
					</form>
					<div className='flex flex-row items-center text-light or-separator'>
						<div className='separator h-0.5 flex-1'></div>
						<p className='sign-in-phrases'>or</p>
						<div className='separator h-0.5 flex-1'></div>
					</div>
					<div className='flex flex-col buttons-gap'>
						<CardButton
							className={
								'font-medium text-secondary bg-primary sign-in-phrases flex flex-row items-center justify-center gap-2'
							}
						>
							<img
								src='/assets/images/google.png'
								className='card-images'
								alt='google-logo'
							/>
							<p>Continue with Google</p>
						</CardButton>
						<CardButton
							className={
								'font-medium text-secondary bg-primary sign-in-phrases flex flex-row items-center justify-center gap-2'
							}
						>
							<img
								src='/assets/images/42-logo.png'
								className='card-images'
								alt='42-logo'
							/>
							<p>Continue with 42 Intra</p>
						</CardButton>
						<p className='sign-in-phrases text-light font-medium text-center'>
							Don't have an account?
							<button onClick={openSignUpFromSignIn} className='font-heavy text-primary px-1.5'> Sign up</button>
						</p>
					</div>
				</div>
			</div>
		</dialog>
	)
}

export default SignIn
