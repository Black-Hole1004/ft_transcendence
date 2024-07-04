import React from 'react'
import Card from '../../components/Home/Card'
import Input from '../../components/Home/Input'
import CardButton from '../../components/Home/Buttons/CardButton'

function SignIn({ signInRef, closeSignIn }) {
	return (
		<Card signInRef={signInRef} onClick={closeSignIn}>
			<div className='w-full flex flex-col items-center text-light font-heavy welcome'>
				<h1 className='sign-in-title'>Welcome back!</h1>
				<p className='sign-in-phrases'>Sign in to access your dashboard.</p>
			</div>
			<form className='flex flex-col form-gap'>
				<Input placeholder={'Email'}></Input>
				<Input placeholder={'Password'}></Input>
				<CardButton>Sign in</CardButton>
			</form>
		</Card>
	)
}

export default SignIn
