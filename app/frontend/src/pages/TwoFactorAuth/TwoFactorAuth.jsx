import './TwoFactorAuth.css'
import { AlertWrapper } from '../../components/Layout/Layout'

const TwoFactorAuth = () => {
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

	const handleSubmit = () => {
		let code = ''
		const inputs = document.getElementsByTagName('input')

		Array.from(inputs).forEach(element => {
			code += element.value
		});

		console.log('code: ', code)
	}

	return (
		<>
			<AlertWrapper />
			<section className='relative w-full h-screen text-primary backdrop-blur-md backdrop-brightness-50'>
				<div
					className={`flex flex-col absolute container top-1/2 left-1/2 text-center text-primary`}
				>
					<h1 className='modal-title font-heavy'>Enter code</h1>
					<p className='font-regular paragraph'>We sent a code to 00mouad00@gmail.com.</p>
					<div className='user-input flex justify-center gap-2 font-heavy pt-20'>
						<input
							id='first'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)]'
							onChange={(e) => clickEvent(e.target, 'second')}
						/>
						<input
							id='second'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)]'
							onChange={(e) => clickEvent(e.target, 'third')}
						/>
						<input
							id='third'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)]'
							onChange={(e) => clickEvent(e.target, 'fourth')}
						/>
						<div className='bg-primary tb:h-3 h-2 mx-2 self-center rounded-sm sep'></div>
						<input
							id='fourth'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)] '
							onChange={(e) => clickEvent(e.target, 'fifth')}
						/>
						<input
							id='fifth'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)] '
							onChange={(e) => clickEvent(e.target, 'sixth')}
						/>
						<input
							id='sixth'
							type='text'
							maxLength={1}
							className='inputs text-center border border-border rounded bg-[rgb(183,170,156,8%)]'
						/>
					</div>
					<p className='font-regular paragraph py-3'>
						Didn’t get a code? <a className='font-heavy'>Click to resend</a>
					</p>
					<button
						onClick={handleSubmit}
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
