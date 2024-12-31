import './Alert.css';

import { useState, useEffect } from 'react';

const Alert = ({ type, message, onClose }) => {
	const AlertsStyles = {
		info: 'bg-blue-500 bg-opacity-10 border-blue-500 text-blue-100',
		error: 'bg-red-500 bg-opacity-10 border-red-500 text-red-100',
		success: 'bg-green-500 bg-opacity-10 border-green-500 text-green-100',
		warning:
			'bg-yellow-500 bg-opacity-10 border-yellow-500 text-yellow-100',
	};

	const LoaderStyles = {
		info: 'bg-blue-500',
		error: 'bg-red-500',
		success: 'bg-green-500',
		warning: 'bg-yellow-500',
	};

	const [filled, setFilled] = useState(5000);

	useEffect(() => {
		if (filled > 0) {
			setTimeout(() => setFilled((prev) => prev - 20), 20);
		}
	}, [filled]);

	return (
		<div
			className={`alert absolute z-20 top-full right-2 backdrop-brightness-0 font-medium border-l-4
			flex flex-col border alert rounded ${AlertsStyles[type]}`}
			role="alert"
		>
			<div className="flex items-center justify-between h-[98%] lp:p-6 p-3">
				<div className="flex gap-3 items-center mr-4">
					<img
						src={`/assets/images/icons/${type}.png`}
						className="alert-icon"
						alt=""
					/>
					<span>{message}</span>
				</div>
				<button className="focus:outline-none px-2" onClick={onClose}>
					&times;
				</button>
			</div>
			<div
				className={`${LoaderStyles[type]} h-0.5 rounded-r`}
				style={{ width: `${(filled / 5000) * 100}%` }}
			></div>
		</div>
	);
};

export default Alert;
