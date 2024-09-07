import './Alert.css'

function Alert({ type, message, onClose }) {
	const AlertsStyles = {
		info: 'bg-blue-500 bg-opacity-10 border-blue-500 text-blue-100',
		error: 'bg-red-500 bg-opacity-10 border-red-500 text-red-100',
		success: 'bg-green-500 bg-opacity-10 border-green-500 text-green-100',
		warning: 'bg-yellow-500 bg-opacity-10 border-yellow-500 text-yellow-100',
	}
	return (
		<div
			className={`absolute z-20 top-24 right-2 backdrop-brightness-0 font-medium
			flex items-center justify-between border alert p-3 rounded-lg ${AlertsStyles[type]}
			xl:w-[25%] lp:w-[30%] tb:w-[40%] mtb:w-[50%] w-[80%]`}
			role='alert'
		>
			<div className='flex gap-3 items-center'>
				<img src={`./assets/images/icons/${type}.png`} className='alert-icon' alt='' />
				<span>{message}</span>
			</div>
			<button className='focus:outline-none px-2' onClick={onClose}>&times;</button>
		</div>
	)
}

export default Alert
