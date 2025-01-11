import './TwoFactorAuth.css'
import { AlertWrapper } from '../../components/Layout/Layout'

import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../context/AuthContext'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

import { useAlert } from '../../components/AlertContext'
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
const HOSTNAME = VITE_BASE_URL



const TwoFactorAuth = () => {

	const location = useLocation()
	const { setAuthTokens, setUser } = useAuth()
	const { email, password } = location.state || {}
	const navigate = useNavigate();



	const clickEvent = (current, next) => {
		if (current?.value.length) {
			const isDigit = current.value.charCodeAt(0) >= 48 && current.value.charCodeAt(0) <= 57
			
			if (isDigit) {
				document.getElementById(next).focus()
			} else {
				current.value = ''
			}
		}
	}

	const clearInput = (key, current, prev) => {
		if (key === 'Backspace') {
			if (current?.value.length) {
				current.value = ''
			} else {
				if (prev)
					document.getElementById(prev).focus()
			}
		}
	}

	const { triggerAlert } = useAlert()

    const handleSubmit = (type, message) => {
        triggerAlert(type, message)
    }


	const verifyOtp = async () => {
		console.log('here')
		try {
			let otp = ''
			const inputs = document.getElementsByTagName('input')

			Array.from(inputs).forEach(element => {
				otp += element.value
			});

			const response = await fetch(`${HOSTNAME}/api/user/2fa/verify/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password,
					otp
				})
			})

			const data = await response.json()

			if (response.ok) {
				console.log('---------->', data.access_token)
				setAuthTokens(data)
                setUser(jwtDecode(data.access_token))
                
                const access_token = JSON.stringify(data.access_token)
                const refresh_token = JSON.stringify(data.refresh_token)
                Cookies.set('refresh_token', refresh_token, { sameSite: 'None', secure: true });
                Cookies.set('access_token', access_token, { sameSite: 'None', secure: true });
                navigate('/dashboard')
				console.log("===============> ", data)
			} else {
				console.log('Login failed----------->', data)
				handleSubmit('error', 'Something went wrong')
				console.log('Login failed----------->', data)
			}
		}
		catch (error) {
			console.error('error', error)
		}
	}

	return (
		<>
			<AlertWrapper />
			<section className='relative w-full h-screen text-primary backdrop-blur-md backdrop-brightness-50'>
				<div
					className={`flex flex-col absolute container top-1/2 left-1/2 text-center text-primary`}
				>
					<h1 className='modal-title font-heavy'>Enter code</h1>
					<p className='font-regular paragraph'>Enter the 6-digit code sent to your {email} address</p>
					<div className='user-input flex justify-center gap-2 font-heavy pt-20'>
						<input
							id='first'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)]'
							onChange={(e) => clickEvent(e.target, 'second')}
							onKeyDown={(e) => clearInput(e.key, e.target, null)}
							/>
						<input
							id='second'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)]'
							onChange={(e) => clickEvent(e.target, 'third')}
							onKeyDown={(e) => clearInput(e.key, e.target, 'first')}
							/>
						<input
							id='third'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)]'
							onChange={(e) => clickEvent(e.target, 'fourth')}
							onKeyDown={(e) => clearInput(e.key, e.target, 'second')}
							/>
						<div className='bg-primary tb:h-3 h-2 mx-2 self-center rounded-sm sep'></div>
						<input
							id='fourth'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)] '
							onChange={(e) => clickEvent(e.target, 'fifth')}
							onKeyDown={(e) => clearInput(e.key, e.target, 'third')}
							/>
						<input
							id='fifth'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)] '
							onChange={(e) => clickEvent(e.target, 'sixth')}
							onKeyDown={(e) => clearInput(e.key, e.target, 'fourth')}
							/>
						<input
							id='sixth'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)]'
							onKeyDown={(e) => clearInput(e.key, e.target, 'fifth')}
						/>
					</div>
					<button
						onClick={verifyOtp}
						className='verify border border-border text-primary font-medium select-none py-2 px-10 my-10 self-center
						rounded bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out hover:bg-[rgb(183,170,156,30%)]'
					>
						Verify
					</button>
				</div>
			</section>
		</>
	)
}

export default TwoFactorAuth
