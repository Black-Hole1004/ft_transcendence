import './Settings.css'
import Header from '../../components/Header'
import Button from '../../components/Home/Buttons/Button'

const Settings = () => {
	return (
		<div className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex-grow flex justify-center'>
				<div className='settings h-[930px] card-margin w-full lg:border-2 border border-primary rounded-3xl'>
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
						<div className='flex items-center lp:gap-14 tb:gap-8 gap-5'>
							<div>
								<img
									src='./assets/images/moudrib.jpeg'
									className='rounded-full border border-primary'
									alt=''
								/>
							</div>
							<div className='flex lp:gap-2 gap-1'>
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
				</div>
			</section>
		</div>
	)
}

export default Settings
