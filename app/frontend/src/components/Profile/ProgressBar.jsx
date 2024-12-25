import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbar } from 'react-circular-progressbar'

function ProgressBar({ value }) {
	return (
		<CircularProgressbar
			value={value}
			text={`${value}%`}
			styles={{
				trail: {
					stroke: '#79624C',
				},
				path: {
					stroke: '#FFCE9E',
					transition: 'stroke-dashoffset 3s ease 0s',
				},
				text: {
					fill: '#FBFBEE',
					fontSize: 'clamp(0.625rem, 0.221vw + 0.584rem, 0.938rem)',
				},
			}}
		/>
	)
}

export default ProgressBar
