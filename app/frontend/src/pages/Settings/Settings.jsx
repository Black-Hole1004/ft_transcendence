import './Settings.css'
import Header from '../../components/Header'
import Button from '../../components/Home/Buttons/Button'

function Input({ type, label, placeholder, id }) {
	return (
		<div className='flex flex-col'>
			<label htmlFor={id} className='font-regular text-light sections-title'>
				{label}
			</label>
			<input
				id={id}
				name={id}
				type={type}
				placeholder={placeholder}
				className='inputs border border-border rounded-lg bg-[rgb(183,170,156,8%)]
				placeholder:text-border placeholder:font-regular placeholders outline-none max-ms:w-[80%]'
			/>
		</div>
	)
}

const Settings = () => {
	window.addEventListener('load', function () {
		var resetButton = document.getElementById('resetButton')

		resetButton.addEventListener('click', function () {
			var forms = document.getElementsByTagName('form')
			for (var i = 0; i < forms.length; i++) {
				forms[i].reset()
			}
		})
	})

	return (
		<div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex justify-center'>
				<div className='settings max-tb:h-auto card-margin w-full lg:border-2 border border-primary rounded-3xl'>
					<div className='flex items-center card-header sections-ml'>
						<h1 className='font-dreamscape-sans text-primary leading-[1]'>settings</h1>
					</div>
					<div className='h-0.5 separators'></div>
					<div
						className='sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[80px] tb:gap-[20px] max-tb:gap-y-3'
					>
						<div className='font-regular sections-title tb:self-center self-start'>
							<p className='text-primary'>Profile Picture</p>
							<p className='text-light'>
								Must be JPEG, PNG, or GIF and cannot exceed 5MB.
							</p>
						</div>
						<div className='flex items-center max-ms:flex-col lp:gap-14 tb:gap-8 gap-5'>
							<div>
								<img
									src='./assets/images/moudrib.jpeg'
									className='rounded-full border border-primary profile-pic'
									alt=''
								/>
							</div>
							<div className='flex max-ms:flex-col lp:gap-2 gap-1'>
								<Button
									className={
										'rounded-md border-border font-regular buttons-text update-button'
									}
								>
									Update Profile Picture
								</Button>
								<Button
									className={
										'rounded-md border-border font-regular buttons-text remove-button'
									}
								>
									Remove
								</Button>
							</div>
						</div>
					</div>
					<div className='h-0.5 separators'></div>
					<div
						className='sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[50px] tb:gap-[20px] max-tb:gap-y-3'
					>
						<div className='font-regular sections-title tb:self-center self-start'>
							<p className='text-primary'>Personal Settings</p>
							<p className='text-light'>
								Change identifying details for your account.
							</p>
						</div>
						<div className='flex items-center'>
							<form id='form1' className='flex flex-col lp:gap-4 gap-2'>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<Input
										id={'firstname'}
										type={'text'}
										label={'First Name'}
										placeholder={'Mouad'}
									/>
									<Input
										id={'lastname'}
										type={'text'}
										label={'Last Name'}
										placeholder={'Oudrib'}
									/>
								</div>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<Input
										id={'email'}
										type={'email'}
										label={'Email'}
										placeholder={'transcendence@gmail.com'}
									/>
									<Input
										id={'phonenumber'}
										type={'text'}
										label={'Phone Number'}
										placeholder={'+212611223344'}
									/>
								</div>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<Input
										id={'password'}
										type={'password'}
										label={'Current Password'}
										placeholder={'•••••••••••••'}
									/>
									<Input
										id={'newpassword'}
										type={'password'}
										label={'New Password'}
										placeholder={'••••••••••'}
									/>
									<Input
										id={'confirmpassword'}
										type={'password'}
										label={'Confirm New Password'}
										placeholder={'••••••••••'}
									/>
								</div>
							</form>
						</div>
					</div>
					<div className='h-0.5 separators'></div>
					<div
						className='sections-ml flex tb:flex-row flex-col items-center picture-section
						gap-5 max-tb:gap-y-3'
					>
						<div className='font-regular sections-title tb:self-center self-start'>
							<p className='text-primary'>Profile Settings</p>
						</div>
						<div className='flex items-center'>
							<form id='form2' className='flex flex-col lp:gap-4 gap-2'>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<div className='flex flex-col gap-3'>
										<Input
											id={'username'}
											type={'text'}
											label={'Username'}
											placeholder={'mouad55'}
										/>
										<Input
											id={'displayname'}
											type={'text'}
											label={'Display Name'}
											placeholder={'Arobase'}
										/>
									</div>
									<div className='flex flex-col'>
										<label
											htmlFor=''
											className='font-regular text-light sections-title'
										>
											Bio
										</label>
										<textarea
											name=''
											id=''
											placeholder={
												'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quam, aperiam sit ratione officiis asperiores id quisquam, fugiat ipsa sed autem.'
											}
											maxLength={'250'}
											className='bio-input font-regular border border-border rounded-lg bg-[rgb(183,170,156,8%)]
											max-ms:w-full outline-none placeholders placeholder:text-border'
										></textarea>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className='flex justify-end save-button my-3 tb:gap-2 gap-1'>
						<Button
							id={'resetButton'}
							className={
								'rounded-md border-border font-regular buttons-text remove-button'
							}
						>
							Cancel
						</Button>
						<Button
							className={
								'rounded-md border-border font-regular buttons-text remove-button'
							}
						>
							Save Changes
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Settings
