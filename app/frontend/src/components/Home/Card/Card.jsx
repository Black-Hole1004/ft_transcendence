import './Card.css'
import Input from '../Buttons/Input'
import CardButton from '../Buttons/CardButton'

function Card({ dialogRef, closeDialog, isSigningIn, setIsSigningIn }) {
	const handleClick = () => {
		isSigningIn ? setIsSigningIn(false) : setIsSigningIn(true)
	}

	return (
		<dialog
			data-modal
			ref={dialogRef}
			className={`absolute
			${isSigningIn ? 'h-[570px]' : 'h-[600px]'}
			${isSigningIn ? 'av:h-signin-card-custom' : 'av:h-signup-card-custom'}
			max-av:mb-0 av:w-card-custom max-w-full w-screen
			av:border-1.5 border border-b-0 rounded-xl bg-secondary backdrop:bg-backdrop-40 backdrop:backdrop-blur-sm`}
		>
			<div className='p-2 h-full'>
				<div className='relative w-full flex flex-row items-center'>
					<button onClick={closeDialog} className='absolute right-2 top-1'>
						<img
							className='select-none close-button'
							src='/assets/images/icons/close.png'
						/>
					</button>
					<div className='separator h-0.5 flex-1'></div>
					<img
						className='select-none pointer-events-none logo'
						src='/assets/images/logo-transparent.png'
					/>
					<div className='separator h-0.5 flex-1'></div>
				</div>
				<div className='flex flex-col justify-center form-padding'>
					{isSigningIn ? (
						<div className='w-full flex flex-col items-center text-light font-heavy welcome-message'>
							<h1 className='sign-in-title'>Welcome back!</h1>
							<p className='sign-in-phrases'>Sign in to access your dashboard.</p>
						</div>
					) : (
						<h1 className='sign-in-title text-center text-light font-heavy create-account'>
							Create New Account
						</h1>
					)}

					<form className='flex flex-col form-gap'>
						<Input
							iconPath={'/assets/images/icons/email.png'}
							placeholder={'Email'}
						></Input>
						<Input
							iconPath={'/assets/images/icons/lock.png'}
							placeholder={'Password'}
						></Input>
						{!isSigningIn && (
							<Input
								iconPath={'/assets/images/icons/lock.png'}
								placeholder={'Confirm your password'}
							></Input>
						)}
						<CardButton
							className={
								'text-primary font-heavy hover:bg-primary hover:text-secondary'
							}
						>
							{isSigningIn ? <>Sign in</> : <>Sign up</>}
						</CardButton>
					</form>
					{!isSigningIn && (
						<p className='sign-in-phrases text-light font-medium text-center'>
							Already have an account?
							<button
								onClick={handleClick}
								className='font-heavy text-primary pt-2 px-1.5'
							>
								Sign in
							</button>
						</p>
					)}

					<div className='flex flex-row items-center text-light or-separator'>
						<div className='separator h-0.5 flex-1'></div>
						<p className='sign-in-phrases'>or</p>
						<div className='separator h-0.5 flex-1'></div>
					</div>
					<div className='flex flex-col buttons-gap'>
						<CardButton
							className={
								'font-medium text-secondary bg-primary hover:bg-secondary-light hover:text-primary \
								sign-in-phrases flex flex-row items-center justify-center gap-2'
							}
						>
							<img
								src='/assets/images/icons/google.png'
								className='card-images'
								alt='google-logo'
							/>
							<p>Continue with Google</p>
						</CardButton>
						<CardButton
							className={
								'font-medium text-secondary bg-primary hover:bg-secondary-light hover:text-primary \
								sign-in-phrases flex flex-row items-center justify-center gap-2'
							}
						>
							<img
								src='/assets/images/icons/42-logo.png'
								className='card-images'
								alt='42-logo'
							/>
							<p>Continue with 42 Intra</p>
						</CardButton>
						{isSigningIn && (
							<p className='sign-in-phrases text-light font-medium text-center'>
								Don't have an account?
								<button
									onClick={handleClick}
									className='font-heavy text-primary px-1.5'
								>
									Sign up
								</button>
							</p>
						)}
					</div>
				</div>
			</div>
		</dialog>
	)
}

export default Card
