import { useState } from 'react';

const Input = ({ iconPath, type, placeholder, value, onChange }) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = (e) => {
		// e.stopPropagation()
		setShowPassword(!showPassword);
	};
	return (
		<div className="flex flex-row items-center bg-secondary-light responsive-input border border-border rounded">
			<img
				src={iconPath}
				loading="lazy"
				className="responsive-icon select-none pointer-events-none padding-top-input"
				alt="icon"
			/>
			<input
				className="flex-1 placeholder:text-light bg-transparent placeholder:font-heavy text-primary font-medium
				select-none padding-top-input ml:px-2 ms:px-1 outline-none placeholder:opacity-60"
				placeholder={placeholder}
				type={!type ? 'email' : showPassword ? 'text' : 'password'}
				value={value}
				onChange={onChange}
			/>
			{type && (
				<button onClick={handleShowPassword}>
					<img
						src={
							showPassword
								? '/assets/images/icons/hide.png'
								: '/assets/images/icons/view.png'
						}
						loading="lazy"
						className="responsive-icon select-none pointer-events-none padding-top-input outline-none"
						alt="icon"
					/>
				</button>
			)}
		</div>
	);
};

export default Input;
