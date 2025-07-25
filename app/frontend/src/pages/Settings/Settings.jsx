import './Settings.css'
import Button from '../../components/Home/Buttons/Button'
import { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../../context/AuthContext'
import { useSocket } from '../../components/Layout/Layout'

import { useAlert } from '../../components/AlertContext'
import ConfirmationModal from '../../components/Settings/ConfirmationModal'
import Cookies from 'js-cookie'

import DeleteConfirmationModal from '../../components/Settings/DeleteConfirmationModal'

const USER_API = import.meta.env.VITE_USER_API
const DEFAULT_PROFILE_PICTURE = '/profile_pictures/avatar.jpg'
const BASE_URL = import.meta.env.VITE_BASE_URL

function Input({ id, type, label, placeholder, value, onChange }) {
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
				className='inputs border border-border rounded bg-[rgb(183,170,156,8%)] transition-all duration-300
				placeholders outline-none max-ms:w-[80%] text-border'
				onChange={onChange}
				value={value || ''}
			/>
		</div>
	)
}

const Settings = () => {

	const { refreshUserData, fetchUser } = useSocket()

	const dialogRef = useRef(null)
	const deleteDialogRef = useRef(null)
	const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false)

	const openDialog = () => {
		if (dialogRef.current) {
			dialogRef.current.showModal()
		}
	}

	const closeDialog = () => {
		dialogRef.current.close()
	}


	const send2faAxiosRequest = (status) => {
		axios
			.post(USER_API + '2fa/', { '2fa_status': status }, { headers: getAuthHeaders() })
			.then((response) => {
				if (response.status === 200) {
					console.log('response ----->', response.data)
				}
			})
			.catch((error) => {
				if (error.response) {
					const errorMessage = error.response.data?.error || 'Failed to enable 2FA'
					triggerAlert('error', errorMessage)
				} else if (error.request) {
					// Request was made but no response received
					triggerAlert('error', 'No response from the server')
				} else {
					// Something happened while setting up the request
					triggerAlert('error', error.message)
				}
			})
	}

	const openDeleteDialog = () => {
		if (deleteDialogRef.current) {
			deleteDialogRef.current.showModal()
		}
	}

	const closeDeleteDialog = () => {
		if (deleteDialogRef.current) {
			deleteDialogRef.current.close()
		}
	}

	const enableDesable2FA = () => {
		if (!twoFactorAuthEnabled) {
			setTwoFactorAuthEnabled(true)
			send2faAxiosRequest(true);
		} else {
			openDialog()
		}
	}

	window.addEventListener('load', function () {
		var resetButton = document.getElementById('resetButton')

		resetButton.addEventListener('click', function () {
			var forms = document.getElementsByTagName('form')
			for (var i = 0; i < forms.length; i++) {
				forms[i].reset()
			}
		})
	})

	const [user, setUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		mobile_number: '',
		username: '',
		bio: '',
		password: '',
		new_password: '',
		confirm_password: '',
		profile_picture: '',
		is_logged_with_oauth_for_2fa: false,
	})

	const [first_name, setFirst_name] = useState('')
	const [last_name, setLast_name] = useState('')
	const [email, setEmail] = useState('')
	const [mobile_number, setMobile_number] = useState('')
	const [username, setUsername] = useState('')
	const [bio, setBio] = useState('')
	const [profile_picture, setProfile_picture] = useState('')
	const [preview, setPreview] = useState(null)
	const [selectedFile, setSelectedFile] = useState(null)
	const [removeImage, setRemoveImage] = useState(false)

	const [password, setPassword] = useState('')
	const [new_password, setNewPassword] = useState('')
	const [confirm_password, setConfirmPassword] = useState('')
	const [change, setChange] = useState(false)

	const { getAuthHeaders } = useAuth()
	const { triggerAlert } = useAlert()

	function clearAllCookies() {
		// Get all cookies as an object
		const allCookies = Cookies.get()

		// Loop through the cookies and remove each one
		for (const cookieName in allCookies) {
			if (allCookies.hasOwnProperty(cookieName)) {
				Cookies.remove(cookieName)
			}
		}
	}

	const deleteAccount = () => {
		axios
			.delete(USER_API + 'delete/', {
				headers: {
					Authorization: getAuthHeaders().Authorization,
				},
			})
			.then((response) => {
				if (response.status === 200) {
					// sleep 1 second
					// trigger alert wait for 1 second --> clear cookies --> redirect to /
					triggerAlert('success', 'Account deleted successfully')
					setTimeout(() => {
						clearAllCookies()
						window.location.href = '/'
					}, 1000)
				}
			})
	}

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await fetchUser()
			if (fetchedData?.is_2fa_enabled)
				setTwoFactorAuthEnabled(true)
			else
				setTwoFactorAuthEnabled(false)
			if (fetchedData) setUser(fetchedData)
		}
		fetchData()
	}, [])

	useEffect(() => {
		if (!user) return
		setFirst_name(user.first_name)
		setLast_name(user.last_name)
		setEmail(user.email)
		setMobile_number(user.mobile_number)
		setUsername(user.username)
		setBio(user.bio)
		setPassword(user.password)
		setNewPassword(user.new_password)
		setConfirmPassword(user.confirm_password)
		setProfile_picture(user.profile_picture)
	}, [user])
	/**********************  Fetch User Data ************************/

	const create_form_data = (user, selectedFile) => {
		const userProfileData = new FormData()

		if (!user) return userProfileData
		userProfileData.append('first_name', first_name.length > 10 ? first_name.slice(0, 10) : first_name || '')
		userProfileData.append('last_name', last_name.length > 10 ? last_name.slice(0, 10) : last_name || '')
		userProfileData.append('email', email || '')
		userProfileData.append('mobile_number', mobile_number || '')
		userProfileData.append('username', username.length > 10 ? username.slice(0, 10).toLowerCase() : username.toLowerCase() || '')
		userProfileData.append('bio', bio || '')
		userProfileData.append('password', password || '')
		userProfileData.append('new_password', new_password || '')
		userProfileData.append('confirm_password', confirm_password || '')
		if (selectedFile) {
			if (selectedFile.size > 5 * 1024 * 1024) {
				triggerAlert('error', 'Image size must be less than 5MB')
				return null
			}
			userProfileData.append('profile_picture', selectedFile)
		} else if (removeImage) {
			userProfileData.append('remove_profile_picture', true)
		}
		return userProfileData
	}
	const update_user = async () => {
		const userProfileData = create_form_data(user, selectedFile)
		if (!userProfileData || change === false) return
		axios
			.put(USER_API, userProfileData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: getAuthHeaders().Authorization,
				},
			})
			.then((response) => {
				if (response.status === 200) {
					setUser(response.data)
					setSelectedFile(null)
					setPreview(null)
					setRemoveImage(false)
					triggerAlert('success', 'User data updated successfully')
					refreshUserData()
				}
			})
			.catch((error) => {
				if (error.response) {
					const errorMessage = error.response.data?.error || 'Failed to update user data'
					triggerAlert('error', errorMessage)
				} else if (error.request) {
					// Request was made but no response received
					triggerAlert('error', 'No response from the server')
				} else {
					// Something happened while setting up the request
					triggerAlert('error', error.message)
				}
			})
			setChange(false)
	}
	/**********************  Update User Data ************************/

	/**********************  Handle Input Change ************************/
	const handleInputChange = (e) => {
		setChange(true)
		e.target.classList.replace('text-border', 'text-primary')
		const { name, value } = e.target
		switch (name) {
			case 'first_name':
				setFirst_name(value)
				break
			case 'last_name':
				setLast_name(value)
				break
			case 'email':
				setEmail(value)
				break
			case 'mobile_number':
				setMobile_number(value)
				break
			case 'username':
				setUsername(value)
				break
			case 'bio':
				setBio(value)
				break
			case 'password':
				setPassword(value)
				break
			case 'new_password':
				setNewPassword(value)
				break
			case 'confirm_password':
				setConfirmPassword(value)
				break
			default:
				break
		}
	}

	const handleUploadClick = (e) => {
		setChange(true)
		document.getElementById('profile_picture').click()
	}

	const handleImageChange = (e) => {
		setChange(true)
		const file = e.target.files[0]
		if (file) {
			setPreview(URL.createObjectURL(file))
			setSelectedFile(file)
			setRemoveImage(false)
		}
	}
	function handleRemoveImage() {
		setChange(true)
		setPreview(null)
		setSelectedFile(null)
		setProfile_picture(DEFAULT_PROFILE_PICTURE)
		setRemoveImage(true)
	}

	return (
		<>
			<section className='flex justify-center'>
				<div className='s max-tb:h-auto card-margin w-full border border-primary rounded-3xl bg-[rgba(27,22,17,0.5)]'>
					<div className='flex items-center card-header sections-ml'>
						<h1 className='font-dreamscape-sans text-primary leading-[1]'>Settings</h1>
					</div>
					<div className='h-0.5 separators'></div>
					<div
						className='sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[50px] tb:gap-[20px] max-tb:gap-y-3'
					>
						<div className='font-regular sections-title tb:self-center self-start parts tb:max-w-[30%] w-full'>
							<p className='text-primary'>Profile Picture</p>
							<p className='text-light'>
								Must be JPEG, PNG, or GIF and cannot exceed 5MB.
							</p>
						</div>

						<div className='flex items-center max-ms:flex-col lp:gap-14 tb:gap-8 gap-5'>
							<div>
								<img
									src={preview || `${BASE_URL}${profile_picture}`}
									className='rounded-full object-cover border-1.5 border-border profile-pic'
									alt='Profile Picture'
								/>
							</div>

							<div className='flex max-ms:flex-col lp:gap-2 gap-1'>
								<input
									type='file'
									id='profile_picture'
									name='profile_picture'
									className='hidden'
									onChange={handleImageChange}
								/>
								<Button
									className={
										'rounded border border-border font-medium buttons-text update-button'
									}
									onClick={handleUploadClick}
								>
									Update Profile Picture
								</Button>
								<Button
									className={
										'rounded border border-border font-medium buttons-text remove-button'
									}
									onClick={handleRemoveImage}
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
						<div className='font-regular sections-title tb:self-center self-start parts tb:max-w-[30%] w-full'>
							<p className='text-primary'>Personal Settings</p>
							<p className='text-light'>
								Change identifying details for your account.
							</p>
						</div>

						<div className='flex items-center'>
							<form id='form1' className='flex flex-col lp:gap-4 gap-2'>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<Input
										id={'first_name'}
										type={'text'}
										label={'First Name'}
										onChange={handleInputChange}
										value={first_name}
									/>
									<Input
										id={'last_name'}
										type={'text'}
										label={'Last Name'}
										onChange={handleInputChange}
										value={last_name}
									/>
								</div>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<Input
										id={'email'}
										type={'email'}
										label={'Email'}
										onChange={() => pass}
										value={email}
									/>
									<Input
										id={'mobile_number'}
										type={'text'}
										label={'Phone Number'}
										onChange={handleInputChange}
										value={mobile_number}
									/>
								</div>
							</form>
						</div>
					</div>
					<div className='h-0.5 separators'></div>
					<div
						className='sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[50px] tb:gap-[20px] max-tb:gap-y-3'
					>
						<div className='font-regular sections-title tb:self-center self-start parts tb:max-w-[30%] w-full'>
							<p className='text-primary'>Profile Settings</p>
							<p className='text-light '>
								Edit your username and other public details.
							</p>
						</div>
						<div className='flex items-center'>
							<form id='form2' className='flex flex-col lp:gap-4 gap-2'>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<div className='flex flex-col gap-3'>
										<Input
											id={'username'}
											type={'text'}
											label={'Username'}
											onChange={handleInputChange}
											value={username}
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
											name='bio'
											id='bio'
											maxLength={'150'}
											className='bio-input font-regular border border-border rounded bg-[rgb(183,170,156,8%)] min-h-5
											text-border max-ms:w-full outline-none placeholders transition-all duration-300'
											onChange={handleInputChange}
											value={bio}
										></textarea>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className='h-0.5 separators'></div>
					<div
						className='sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[50px] tb:gap-[20px] max-tb:gap-y-3'
					>
						<div className='font-regular sections-title tb:self-center self-start parts tb:max-w-[30%] w-full'>
							<p className='text-primary'>Security Settings</p>
							<p className='text-light'>
								{`Update your password, ${!user.is_logged_with_oauth_for_2fa ? 'enable two-factor authentication (2FA), ' : ''}or delete your account.`}
							</p>
						</div>
						<div className='flex flex-col lp:gap-6 gap-4'>
							<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
								<Input
									id={'password'}
									type={'password'}
									label={'Current Password'}
									placeholder={'•••••••••••••'}
									onChange={handleInputChange}
									value={password}
								/>

								<Input
									id={'new_password'}
									type={'password'}
									label={'New Password'}
									placeholder={'••••••••••'}
									onChange={handleInputChange}
									value={new_password}
								/>
								<Input
									id={'confirm_password'}
									type={'password'}
									label={'Confirm New Password'}
									placeholder={'••••••••••'}
									onChange={handleInputChange}
									value={confirm_password}
								/>
							</div>
							<div className='flex gap-4'>
								{
									(!user.is_logged_with_oauth_for_2fa) ? (
										<Button
											className={
												'rounded border border-border font-medium buttons-text remove-button'
											}
											type='submit'
											onClick={enableDesable2FA}
											disabled={twoFactorAuthEnabled}
											from={'settings'}
										>
											Enable Two-factor Authentication
										</Button>
									) : (
										null
									)
								}
								<button
									className='rounded border-red-600 font-regular buttons-text remove-button border 
								transition duration-300 select-none bg-red-600 bg-opacity-10 hover:bg-red-600 active:bg-red-700'
									// onClick={deleteAccount}
									onClick={openDeleteDialog}
								>
									Delete Account
								</button>
							</div>
						</div>
					</div>
					<div className='flex justify-end save-button my-3 tb:gap-2 gap-1'>
						<Button
							className={
								'rounded border border-border font-medium buttons-text remove-button'
							}
							type='submit'
							onClick={update_user}
						>
							Save Changes
						</Button>
					</div>
				</div>
			</section>
			<ConfirmationModal
				dialogRef={dialogRef}
				closeDialog={closeDialog}
				setTwoFactorAuthEnabled={setTwoFactorAuthEnabled}
				send2faAxiosRequest={send2faAxiosRequest}
			/>
			<DeleteConfirmationModal
				dialogRef={deleteDialogRef}
				closeDialog={closeDeleteDialog}
				onDelete={deleteAccount}
			/>
		</>
	)
}

export default Settings
