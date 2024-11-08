import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import Header from '../../components/Header'
import GameModes from '../../components/Dashboard/GameModes'
import Achievements from '../../components/Dashboard/Achievements'
import FriendsList from '../../components/Dashboard/FriendsList/FriendsList'
import Leaderboard from '../../components/Dashboard/Leaderboard/Leaderboard'
import CongratulatoryMessage from '../../components/Dashboard/CongratulatoryMessage'
import useAuth from '../../context/AuthContext'

import axios from 'axios';
const USER_API = import.meta.env.VITE_USER_API;
const BASE_URL = import.meta.env.VITE_BASE_URL;


const Dashboard = () => {
	const { authTokens, logout, getAuthHeaders } = useAuth();

	const xp = 6445
	const [level, setLevel] = useState(null)

	useEffect(() => {
		setLevel((xp * 100) / 10000)
	}, [level])


	/************************************************************************ */
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

	
	const fetchUser = async () => {
		try {
			const response = await fetch(USER_API, {
				method: 'GET',
				headers: getAuthHeaders()
			})
			const data = await response.json();
			if (response.ok) {
				console.log('Successfully fetched user data');
	
				return (data)
			} else {
				console.log('Failed to fetch user data');
				// logout();
				return (null)
			}
		}
		catch (error) {
			console.log(error);
			// logout();
			return (null);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await fetchUser();
			if (fetchedData)
				setUser(fetchedData);
			else
				console.log('Failed to fetch user data');
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!user) 
			return;
		setFirst_name(user.first_name);
		setLast_name(user.last_name);
		setEmail(user.email);
		setMobile_number(user.mobile_number);
		setUsername(user.username);
		setDisplay_name(user.display_name);
		setBio(user.bio);
		setProfile_picture(user.profile_picture);
	} , [user]);


	return (
		<div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary overflow-hidden'>
			<Header src={`${BASE_URL}${profile_picture}`} preview={preview} 
				firstName={first_name} lastName={last_name} username={username}
			/>
			<section className='flex lg:flex-row flex-col'>
				<div className='lg:w-5/12 flex flex-col'>
					<CongratulatoryMessage achievementId={5} />
					<div className='flex mtb:flex-row flex-col lg:justify-between justify-around items-center gap-y-10 cards-padding'>
						<FriendsList />
						<Leaderboard />
					</div>
				</div>
				<div
					className='flex flex-col flex-1 rightside-my
					lg:mr-modes-right-lg lg:ml-modes-left-lg
					ml:ml-modes-left-ms ml:mr-modes-right-ms'
				>
					<GameModes />
					<Achievements level={level} />
				</div>
			</section>
		</div>
	)
}

export default Dashboard
