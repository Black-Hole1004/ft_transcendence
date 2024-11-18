import './TwoFactorAuthModal.css'

const TwoFactorAuthModal = ({ dialogRef }) => {
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

	return (
		<dialog
			id={'dialog'}
			ref={dialogRef}
			className={`max-ml:mb-0 ml:w-[1000px] max-w-full w-screen h-[500px] text-center text-primary py-14
			ml:border-1.5 border border-b-0 rounded-xl bg-transparent backdrop:bg-backdrop-40 backdrop:backdrop-blur-md`}
		>
			<h1 className='modal-title font-heavy'>Enter code</h1>
			<p className='font-regular paragraph'>We sent a code to 00mouad00@gmail.com.</p>
			<div className='user-input flex justify-center gap-2 font-heavy pt-20'>
				<input
					id='first'
					type='text'
					maxLength={1}
					className='text-center bg-border tb:rounded-lg rounded-md'
					onChange={(e) => clickEvent(e.target, 'second')}
				/>
				<input
					id='second'
					type='text'
					maxLength={1}
					className='text-center bg-border tb:rounded-lg rounded-md'
					onChange={(e) => clickEvent(e.target, 'third')}
				/>
				<input
					id='third'
					type='text'
					maxLength={1}
					className='text-center bg-border tb:rounded-lg rounded-md'
					onChange={(e) => clickEvent(e.target, 'fourth')}
				/>
				<div className='bg-primary tb:h-3 h-2 mx-2 self-center rounded-sm sep'></div>
				<input
					id='fourth'
					type='text'
					maxLength={1}
					className='text-center bg-border tb:rounded-lg rounded-md '
					onChange={(e) => clickEvent(e.target, 'fifth')}
				/>
				<input
					id='fifth'
					type='text'
					maxLength={1}
					className='text-center bg-border tb:rounded-lg rounded-md '
					onChange={(e) => clickEvent(e.target, 'sixth')}
				/>
				<input
					id='sixth'
					type='text'
					maxLength={1}
					className='text-center bg-border tb:rounded-lg rounded-md'
				/>
			</div>
			<p className='font-regular paragraph py-3'>
				Didn’t get a code? <a className='font-heavy'>Click to resend</a>
			</p>
			<button
				className='border border-border transition duration-300 select-none w-[30%] py-2
					rounded-lg text-primary font-heavy hover:bg-primary hover:text-secondary'
			>
				Verify
			</button>
		</dialog>
	)
}

export default TwoFactorAuthModal

//ml:w-card-custom
