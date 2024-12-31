import './Settings.css';
import Button from '../../components/Home/Buttons/Button';
import { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import useAuth from '../../context/AuthContext';
import { useSocket } from '../../components/Layout/Layout';

const USER_API = import.meta.env.VITE_USER_API;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_PROFILE_PICTURE = '/profile_pictures/avatar.jpg';
import { useAlert } from '../../components/AlertContext';
import ConfirmationModal from '../../components/Settings/ConfirmationModal';

function Input({ id, type, label, placeholder, value, onChange }) {
	return (
		<div className="flex flex-col">
			<label
				htmlFor={id}
				className="font-regular text-light sections-title"
			>
				{label}
			</label>
			<input
				id={id}
				name={id}
				type={type}
				placeholder={placeholder}
				className="inputs border border-border rounded bg-[rgb(183,170,156,8%)] transition-all duration-300
				placeholder:text-border placeholder:font-regular placeholders outline-none max-ms:w-[80%]"
				onChange={onChange}
				value={value || ''}
			/>
		</div>
	);
}

const Settings = () => {
	const { refreshUserData, fetchUser } = useSocket();

	const dialogRef = useRef(null);
	const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);

	const openDialog = () => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const closeDialog = () => {
		dialogRef.current.close();
	};

	// const handle2FAModal = () => {
	// 	openDialog()
	// }

	// const handle2FAModal = () => {
	// 	openDialog()
	// }

	const enableDesable2FA = () => {
		if (!twoFactorAuthEnabled) {
			setTwoFactorAuthEnabled(true);
		} else {
			// console.log(twoFactorAuthEnabled)
			openDialog();
		}
	};

	window.addEventListener('load', function () {
		var resetButton = document.getElementById('resetButton');

		resetButton.addEventListener('click', function () {
			var forms = document.getElementsByTagName('form');
			for (var i = 0; i < forms.length; i++) {
				forms[i].reset();
			}
		});
	});

	const [user, setUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		mobile_number: '',
		username: '',
		display_name: '',
		bio: '',
		password: '',
		new_password: '',
		confirm_password: '',
		profile_picture: '',
	});

	const [first_name, setFirst_name] = useState('');
	const [last_name, setLast_name] = useState('');
	const [email, setEmail] = useState('');
	const [mobile_number, setMobile_number] = useState('');
	const [username, setUsername] = useState('');
	const [display_name, setDisplay_name] = useState('');
	const [bio, setBio] = useState('');
	const [profile_picture, setProfile_picture] = useState('');
	const [preview, setPreview] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [removeImage, setRemoveImage] = useState(false);

	const [password, setPassword] = useState('');
	const [new_password, setNewPassword] = useState('');
	const [confirm_password, setConfirmPassword] = useState('');

	const { authTokens, logout, getAuthHeaders } = useAuth();
	const { triggerAlert } = useAlert();

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await fetchUser();
			if (fetchedData) setUser(fetchedData);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!user) return;
		setFirst_name(user.first_name);
		setLast_name(user.last_name);
		setEmail(user.email);
		setMobile_number(user.mobile_number);
		setUsername(user.username);
		setDisplay_name(user.display_name);
		setBio(user.bio);
		setPassword(user.password);
		setNewPassword(user.new_password);
		setConfirmPassword(user.confirm_password);
		setProfile_picture(user.profile_picture);
	}, [user]);
	/**********************  Fetch User Data ************************/

	const create_form_data = (user, selectedFile) => {
		const userProfileData = new FormData();

		if (!user) return userProfileData;
		userProfileData.append('first_name', first_name || '');
		userProfileData.append('last_name', last_name || '');
		userProfileData.append('email', email || '');
		userProfileData.append('mobile_number', mobile_number || '');
		userProfileData.append('username', username || '');
		userProfileData.append('display_name', display_name || '');
		userProfileData.append('bio', bio || '');
		userProfileData.append('password', password || '');
		userProfileData.append('new_password', new_password || '');
		userProfileData.append('confirm_password', confirm_password || '');
		if (selectedFile) {
			if (selectedFile.size > 5 * 1024 * 1024) {
				triggerAlert('error', 'Image size must be less than 5MB');
				return userProfileData;
			}
			userProfileData.append('profile_picture', selectedFile);
		} else if (removeImage) {
			userProfileData.append('remove_profile_picture', true);
		}
		return userProfileData;
	};
	const update_user = async () => {
		console.log('--- update_user ---');
		const userProfileData = create_form_data(user, selectedFile);
		console.log('userProfileData ----->', userProfileData);
		axios
			.put(USER_API, userProfileData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: getAuthHeaders().Authorization,
				},
			})
			.then((response) => {
				if (response.status === 200) {
					console.log('response ----->', response.data);
					setUser(response.data);
					setSelectedFile(null);
					setPreview(null);
					setRemoveImage(false);
					console.log('User data updated successfully');
					triggerAlert('success', 'User data updated successfully');
					refreshUserData();
				}
			})
			.catch((error) => {
				if (error.response) {
					console.log('Error:', error.response.data);
					const errorMessage =
						error.response.data?.error ||
						'Failed to update user data';
					triggerAlert('error', errorMessage);
					console.error('Error:', errorMessage);
				} else if (error.request) {
					// Request was made but no response received
					triggerAlert('error', 'No response from the server');
					console.error('Error: No response from the server');
				} else {
					// Something happened while setting up the request
					triggerAlert('error', error.message);
					console.error('Error:', error.message);
				}
			});
	};
	/**********************  Update User Data ************************/

	/**********************  Handle Input Change ************************/
	const handleInputChange = (e) => {
		const { name, value } = e.target;
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
			case 'password':
				setPassword(value);
				break;
			case 'new_password':
				setNewPassword(value);
				break;
			case 'confirm_password':
				setConfirmPassword(value);
				break;
			default:
				break;
		}
	};

	const handleUploadClick = (e) => {
		document.getElementById('profile_picture').click();
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
			setSelectedFile(file);
			setRemoveImage(false);
		}
	};
	function handleRemoveImage() {
		setPreview(null);
		setSelectedFile(null);
		setProfile_picture(DEFAULT_PROFILE_PICTURE);
		setRemoveImage(true);
	}

	// console.log('user ----->', user)

	return (
		<>
			<section className="flex justify-center">
				<div className="s max-tb:h-auto card-margin w-full border border-primary rounded-3xl">
					<div className="flex items-center card-header sections-ml">
						<h1 className="font-dreamscape-sans text-primary leading-[1]">
							Settings
						</h1>
					</div>
					<div className="h-0.5 separators"></div>
					<div
						className="sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[80px] tb:gap-[20px] max-tb:gap-y-3"
					>
						<div className="font-regular sections-title tb:self-center self-start parts">
							<p className="text-primary">Profile Picture</p>
							<p className="text-light">
								Must be JPEG, PNG, or GIF and cannot exceed 5MB.
							</p>
						</div>

						<div className="flex items-center max-ms:flex-col lp:gap-14 tb:gap-8 gap-5">
							<div>
								<img
									src={
										preview ||
										`${BASE_URL}${profile_picture}`
									}
									className="rounded-full object-cover border-1.5 border-border profile-pic"
									alt="Profile Picture"
								/>
							</div>

							<div className="flex max-ms:flex-col lp:gap-2 gap-1">
								<input
									type="file"
									id="profile_picture"
									name="profile_picture"
									className="hidden"
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
					<div className="h-0.5 separators"></div>
					<div
						className="sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[50px] tb:gap-[20px] max-tb:gap-y-3"
					>
						<div className="font-regular sections-title tb:self-center self-start parts ">
							<p className="text-primary">Personal Settings</p>
							<p className="text-light">
								Change identifying details for your account.
							</p>
						</div>

						<div className="flex items-center">
							<form
								id="form1"
								className="flex flex-col lp:gap-4 gap-2"
							>
								<div className="flex flex-wrap xl:gap-12 lg:gap-4 gap-2">
									<Input
										id={'first_name'}
										type={'text'}
										label={'First Name'}
										placeholder={first_name}
										onChange={handleInputChange}
										value={first_name}
									/>
									<Input
										id={'last_name'}
										type={'text'}
										label={'Last Name'}
										placeholder={last_name}
										onChange={handleInputChange}
										value={last_name}
									/>
								</div>
								<div className="flex flex-wrap xl:gap-12 lg:gap-4 gap-2">
									<Input
										id={'email'}
										type={'email'}
										label={'Email'}
										onChange={handleInputChange}
										placeholder={email}
										value={email}
									/>
									<Input
										id={'mobile_number'}
										type={'text'}
										label={'Phone Number'}
										placeholder={mobile_number}
										onChange={handleInputChange}
										value={mobile_number}
									/>
								</div>
							</form>
						</div>
					</div>
					<div className="h-0.5 separators"></div>
					<div
						className="sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[50px] tb:gap-[20px] max-tb:gap-y-3"
					>
						<div className="font-regular sections-title tb:self-center self-start parts ">
							<p className="text-primary">Profile Settings</p>
							<p className="text-light ">
								Edit your display name, bio, and other public
								details.
							</p>
						</div>
						<div className="flex items-center">
							<form
								id="form2"
								className="flex flex-col lp:gap-4 gap-2"
							>
								<div className="flex flex-wrap xl:gap-12 lg:gap-4 gap-2">
									<div className="flex flex-col gap-3">
										<Input
											id={'username'}
											type={'text'}
											label={'Username'}
											placeholder={username}
											onChange={handleInputChange}
											value={username}
										/>
										<Input
											id={'display_name'}
											type={'text'}
											label={'Display Name'}
											placeholder={display_name}
											onChange={handleInputChange}
											value={display_name}
										/>
									</div>
									<div className="flex flex-col">
										<label
											htmlFor=""
											className="font-regular text-light sections-title"
										>
											Bio
										</label>
										<textarea
											name="bio"
											id="bio"
											placeholder={bio}
											maxLength={'250'}
											className="bio-input font-regular border border-border rounded-lg bg-[rgb(183,170,156,8%)]
										max-ms:w-full outline-none placeholders placeholder:text-border transition-all duration-300"
											onChange={handleInputChange}
											value={bio}
										></textarea>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className="h-0.5 separators"></div>
					<div
						className="sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[50px] tb:gap-[20px] max-tb:gap-y-3"
					>
						<div className="font-regular sections-title tb:self-center self-start parts ">
							<p className="text-primary">Security Settings</p>
							<p className="text-light">
								Update your password and enable two-factor
								authentication for added security.
							</p>
						</div>
						<div className="flex flex-col lp:gap-6 gap-4">
							<div className="flex flex-wrap xl:gap-12 lg:gap-4 gap-2">
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
							<div className="flex gap-4">
								<Button
									className={
										'rounded border border-border font-medium buttons-text remove-button'
									}
									type="submit"
									onClick={enableDesable2FA}
									disabled={twoFactorAuthEnabled}
								>
									Enable Two-factor Authentication
								</Button>
								<button
									className="rounded-md border-red-600 font-regular buttons-text remove-button border 
								transition duration-300 select-none bg-red-600 bg-opacity-10 hover:bg-red-600 active:bg-red-700"
								>
									Delete Account
								</button>
							</div>
						</div>
					</div>
					<div className="flex justify-end save-button my-3 tb:gap-2 gap-1">
						<Button
							id={'resetButton'}
							className={
								'rounded border border-border font-medium buttons-text remove-button'
							}
							onClick={() => window.location.reload()}
						>
							Cancel
						</Button>
						<Button
							className={
								'rounded border border-border font-medium buttons-text remove-button'
							}
							type="submit"
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
			/>
		</>
	);
};

export default Settings;
