

const Input = ({ iconPath, type, placeholder, value, onChange }) => {

	return (
		<div className='flex flex-row items-center bg-secondary-light responsive-input border border-border rounded'>
			<img
				src={iconPath}
				loading='lazy'
				className='responsive-icon select-none pointer-events-none padding-top-input'
				alt='icon'
			/>
			<input
				className='flex-1 placeholder:text-light bg-transparent placeholder:font-heavy text-primary font-medium
				select-none padding-top-input ml:px-2 ms:px-1 outline-none placeholder:opacity-60'
				placeholder={placeholder}
				type={!type ? 'email' : 'password'}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

export default Input
