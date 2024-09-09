import './Settings.css'
import Header from '../../components/Header'
import Button from '../../components/Home/Buttons/Button'
import { useEffect , useState } from 'react'

import axios from 'axios'

const USER_API = import.meta.env.VITE_USER_API;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_PROFILE_PICTURE = '/profile_pictures/avatar.jpg';

function Input({id, type, label, placeholder, value, onChange}) {
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
				onChange={onChange}
				value={value || ''}
			/>
		</div>
	)
}

const Settings = () => {

	window.addEventListener('load', function() {
		var resetButton = document.getElementById('resetButton');
		
		resetButton.addEventListener('click', function() {
			var forms = document.getElementsByTagName('form');
			for (var i = 0; i < forms.length; i++) {
				forms[i].reset();
			}
		})
	})

	const [user, setUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		mobile_number: '',
		username: '',
		display_name: '',
		bio: '',
		profile_picture: ''
	})

	const [first_name, setFirst_name] = useState('')
	const [last_name, setLast_name] = useState('')
	const [email, setEmail] = useState('')
	const [mobile_number, setMobile_number] = useState('')
	const [username, setUsername] = useState('')
	const [display_name, setDisplay_name] = useState('')
	const [bio, setBio] = useState('')
	const [profile_picture, setProfile_picture] = useState('')
	const [preview, setPreview] = useState(null)
	const [selectedFile, setSelectedFile] = useState(null)

	let cookies = document.cookie;
	let access_token = cookies.split('=')[1];
	let header = {"Authorization": `Bearer ${access_token}`};


	/**********************  Fetch User Data ************************/
	const fetchUser = async () => {
		try 
		{
			const response = await axios.get(USER_API, {headers: header});
			return response.data;
		} 
		catch (error) 
		{
			console.log(error);
			return null;
		}
	};
	  
	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await fetchUser();
			if (fetchedData)
				setUser(fetchedData);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!user) 
			return;
		setFirst_name(user.first_name)
		setLast_name(user.last_name)
		setEmail(user.email)
		setMobile_number(user.mobile_number )
		setUsername(user.username)
		setDisplay_name(user.display_name)
		setBio(user.bio)
		setProfile_picture(user.profile_picture)
	}, [user])
	/**********************  Fetch User Data ************************/


	/**********************  Update User Data ************************/
	function get_value(key) {
		switch (key) {
			case 'first_name':
				return first_name;
			case 'last_name':
				return last_name;
			case 'email':
				return email;
			case 'mobile_number':
				return mobile_number;
			case 'username':
				return username;
			case 'display_name':
				return display_name;
			case 'bio':
				return bio;
			default:
				return '';
		}
	}

	const create_form_data = (user, selectedFile) => {
		const userProfileData = new FormData();

		if (!user)
			return userProfileData;
		for (const [key, value] of Object.entries(user)) {
			if (key === 'profile_picture')
				continue;
			if (value !== get_value(key))
			{
				userProfileData.append(key, get_value(key));
				setUser({...user, [key]: get_value(key)});
			}
		}
		if (selectedFile && user.profile_picture !== selectedFile)
			userProfileData.append('profile_picture', selectedFile);
		else
			userProfileData.append('profile_picture', "null");
		return userProfileData;
	}

	const update_user = () =>
	{ 
		const userProfileData = create_form_data(user, selectedFile);
		axios.put(USER_API, userProfileData, {headers: header})
		.then((response) => {
			console.log(response)
		})
		.catch((error) => {
			console.log(error)
		})
	}
	/**********************  Update User Data ************************/


	/**********************  Handle Input Change ************************/
	const handleInputChange = (e) => {
		const {name, value} = e.target;
		switch (name) {
			case 'first_name':
				setFirst_name(value);
				break;
			case 'last_name':
				setLast_name(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'mobile_number':
				setMobile_number(value);
				break;
			case 'username':
				setUsername(value);
				break;
			case 'display_name':
				setDisplay_name(value);
				break;
			case 'bio':
				setBio(value);
				break;
			default:
				break;
		}
	}

	const handleUploadClick = (e) =>
	{
		document.getElementById('profile_picture').click();
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
			setSelectedFile(file);
		}
	}
	function handleRemoveImage() {
		setPreview(null);
		setSelectedFile(null);
		setProfile_picture(DEFAULT_PROFILE_PICTURE);
	}
	/**********************  Handle Input Change ************************/

	return (
		<div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header src={`${BASE_URL}${profile_picture}`} preview={preview} />
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


						<div className='flex items-center max-ms:flex-col lp:gap-14 tb:gap-8 gap-5' >

							<div>
								<img
									
									src= {preview || `${BASE_URL}${profile_picture}`}
									className='rounded-full border border-primary profile-pic'
									alt='Profile Picture'
								/>
							</div>

							<div className='flex max-ms:flex-col lp:gap-2 gap-1'>

								<input
									type='file'
									id='profile_picture'
									name='profile_picture'
									style={{display: 'none'}}
									onChange={handleImageChange}
								/>
								<Button
									className={'rounded-md border-border font-regular buttons-text update-button'}
									onClick={handleUploadClick}
									>
									Update Profile Picture
								</Button>
								<Button
									className={
										'rounded-md border-border font-regular buttons-text remove-button'
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
										id={'first_name'}
										type={'text'}
										label={'First Name'}
										placeholder={'Mouad'}
										onChange={handleInputChange}
										value={first_name}
									/>
									<Input
										id={'last_name'}
										type={'text'}
										label={'Last Name'}
										placeholder={'Oudrib'}
										onChange={handleInputChange}
										value={last_name}
									/>
								</div>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<Input
										id={'email'}
										type={'email'}
										label={'Email'}
										placeholder={'transcendence@gmail.com'}
										onChange={handleInputChange}
										value={email}
									/>
									<Input
										id={'mobile_number'}
										type={'text'}
										label={'Phone Number'}
										placeholder={'+212611223344'}
										onChange={handleInputChange}
										value={mobile_number}
									/>
								</div>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<Input
										id={'password'}
										type={'password'}
										label={'Current Password'}
										placeholder={'•••••••••••••'}
										onChange={handleInputChange}
										value={''}
									/>
									<Input
										id={'newpassword'}
										type={'password'}
										label={'New Password'}
										placeholder={'••••••••••'}
										onChange={handleInputChange}
										value={''}
									/>
									<Input
										id={'confirmpassword'}
										type={'password'}
										label={'Confirm New Password'}
										placeholder={'••••••••••'}
										onChange={handleInputChange}
										value={''}
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
											onChange={handleInputChange}
											value={username}
										/>
										<Input
											id={'display_name'}
											type={'text'}
											label={'Display Name'}
											placeholder={'Arobase'}
											onChange={handleInputChange}
											value={display_name}
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
											placeholder={
												'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quam, aperiam sit ratione officiis asperiores id quisquam, fugiat ipsa sed autem.'
											}
											maxLength={'250'}
											className='bio-input font-regular border border-border rounded-lg bg-[rgb(183,170,156,8%)]
											max-ms:w-full outline-none placeholders placeholder:text-border'
											onChange={handleInputChange}
											value={bio}
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
							onClick={() => window.location.reload()}
						>
							Cancel
						</Button>
						<Button
							className={
								'rounded-md border-border font-regular buttons-text remove-button'
							}
							type='submit'
							onClick={update_user}
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
