import './Card.css'
import Input from '../Input'
import CardButton from '../Buttons/CardButton'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




function Card({ dialogRef, closeDialog, isSigningIn, setIsSigningIn }) {
	const handleClick = () => setIsSigningIn(!isSigningIn)

	
	const [error, setError] = useState('')
	// const history = useHistory()

	

	useEffect(() => {
		const handleOutsideClick = (e) => {
			const dialogDimensions = dialogRef.current.getBoundingClientRect()

			if (
				e.clientX < dialogDimensions.left ||
				e.clientX > dialogDimensions.right ||
				e.clientY < dialogDimensions.top ||
				e.clientY > dialogDimensions.bottom
			)
				dialogRef.current.close()
		}
		if (dialogRef.current) {
			dialogRef.current.addEventListener('click', handleOutsideClick)
		}

		return () => {
			if (dialogRef.current)
				dialogRef.current.removeEventListener('click', handleOutsideClick)
		}
	}, [])

	const inputs = [
		{
			iconPath: 'email',
			placeholder: 'Email',
		},
		{
			iconPath: 'lock',
			placeholder: 'Password',
		},
		{
			iconPath: 'lock',
			placeholder: 'Confirm your password',
		},
	]

	const buttons = [
		{
			iconPath: 'google',
			alt: 'google-logo',
			content: 'Continue with Google',
		},
		{
			iconPath: '42-logo',
			alt: '42-logo',
			content: 'Continue with 42 Intra',
		},
	]

	// --------------------------------------------------------------------------------------------

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const navigate = useNavigate()

	async function loginUser(email, password) {

		try {
			const response = await axios.post('http://127.0.0.1:8000/api/login/', {
				email: email,
				password: password,
			});
			console.log('response status =>', response.status);
			if (response.status === 200) {
				console.log('Registration successful');
				alert('Login successful');
				// window.location.href = '/dashboard';
				// navigate('/dashboard');
			}
		} catch (error) {
			setError('Registration failed. Please try again.');
		}
	}

	async function registerUser(email, password, confirmPassword) {
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/register/', {
				email: email,
				password1: password,
				password2: confirmPassword,
			});
			console.log('response status =>', response.status);
			if (response.status === 201) {
				console.log('Registration successful');
				alert('Registration successful');
			}
		} catch (error) {
			setError('Registration failed. Please try again.');
		}
	}


	const handleSubmit = (e) => {
		e.preventDefault()
		if (isSigningIn) {
			loginUser(email, password)
		}
		else {
			registerUser(email, password, confirmPassword)
		}
	}
	// --------------------------------------------------------------------------------------------

	return (
		<dialog
			ref={dialogRef}
			className={`max-ml:mb-0 ml:w-card-custom max-w-full w-screen
			${isSigningIn ? 'h-[570px]' : 'h-[600px]'}
			${isSigningIn ? 'ml:h-signin-card-custom' : 'ml:h-signup-card-custom'}
			ml:border-1.5 border border-b-0 rounded-xl bg-secondary backdrop:bg-backdrop-40 backdrop:backdrop-blur-sm`}
		>
			<div className='m-2'>
				<div className='relative w-full flex items-center'>
					<img
						onClick={closeDialog}
						className='absolute right-2 top-1 select-none close-button'
						src='/assets/images/icons/close.png'
						loading='lazy'
						/>
					<div className='card-separator h-0.5 flex-1'></div>
					<img
						className='select-none pointer-events-none logo'
						src='/assets/images/logo.webp'
						loading='lazy'
						/>
					<div className='card-separator h-0.5 flex-1'></div>
				</div>
				<div className='flex flex-col justify-center form-padding text-light font-heavy lp:mb-8 mb-5'>
					{isSigningIn ? (
						<div className='w-full flex flex-col items-center welcome-message'>
							<h1 className='sign-in-title'>Welcome back!</h1>
							<p className='sign-in-phrases'>Sign in to access your dashboard.</p>
						</div>
					) : (
						<h1 className='sign-in-title text-center create-account'>
							Create New Account
						</h1>
					)}


					{/* -----------------------------------------------------------------------------------------*/}
					<form className='flex flex-col form-gap' onSubmit={handleSubmit}>
						{inputs.slice(0, isSigningIn ? 2 : 3).map((input, index) => (
							<Input
								key={index}
								iconPath={`/assets/images/icons/${input.iconPath}.png`}
								placeholder={input.placeholder}
								value={
									index === 0
										? email
										: index === 1
										? password
										: confirmPassword
								}
								onChange = {(e) => {
									if (index === 0) setEmail(e.target.value)
									else if (index === 1) setPassword(e.target.value)
									else setConfirmPassword(e.target.value)
								}}

							>
							</Input>
						))}
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
						<div className='card-separator h-0.5 flex-1'></div>
						<p className='sign-in-phrases'>or</p>
						<div className='card-separator h-0.5 flex-1'></div>
					</div>
					<div className='flex flex-col buttons-gap font-medium sign-in-phrases'>
						{buttons.map((button, index) => (
							<CardButton
								key={index}
								className={
									'text-secondary bg-primary hover:bg-secondary-light hover:text-primary \
										flex flex-row items-center justify-center gap-2'
								}
							>
								<img
									src={`/assets/images/icons/${button.iconPath}.png`}
									className='card-images'
									alt={button.alt}
									loading='lazy'
								/>
								<p>{button.content}</p>
							</CardButton>
						))}
						{isSigningIn && (
							<p className=' text-light text-center'>
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
