import Slider from '@mui/material/Slider'

const Sliders = ({ id, size, minSize, maxSize, setSize }) => {

	const CANVAS_HEIGHT = 400 // my actual game canvas height
	const CANVAS_WIDTH = 800 // my actual game canvas width
	
	const calculatePaddleHeight = (percentage) => {
		// Convert percentage to actual pixels
		return Math.round((percentage / 100) * CANVAS_HEIGHT)
	}

	const calculateBallRadius = (percentage) => {
		// Convert percentage to a reasonable ball size
		// Using smaller divisor to keep ball from getting too big
		return Math.round((percentage / 100) * (CANVAS_HEIGHT / 8))
	}

	const actualSize = id === 'paddle' 
    ? calculatePaddleHeight(size)
    : calculateBallRadius(size);


	return (
		<div className='flex flex-col gap-5 max-w-[80%]'>
			<label className='font-regular text-light labels' htmlFor={id}>
				{id === 'paddle' ? 'Paddle' : 'Ball'} Size: {size}%
			</label>
			<div className='pl-8'>
				<Slider
					id={id}
					aria-label='Default'
					value={size}
					min={minSize}
					max={maxSize}
					valueLabelDisplay='auto'
					onChange={(e) => setSize(parseInt(e.target.value))}
					sx={{
						// Thumb
						'& .MuiSlider-thumb': {
							width: 16,
							height: 16,
							backgroundColor: '#FBFBEE',
							border: '2px solid #FBFBEE',

							// Remove ripple effect shadows
							'&::before': {
								boxShadow: 'none',
							},
							'&::after': {
								boxShadow: 'none',
							},

							// Hover state
							'&:hover': {
								boxShadow: '0 0 0 8px rgba(251, 251, 238, 0.16)',
							},

							// Active state (while dragging)
							'&.Mui-active': {
								boxShadow: '0 0 0 14px rgba(251, 251, 238, 0.3)',
							},
						},

						// Track
						'& .MuiSlider-track': {
							height: 6,
							backgroundColor: '#FBFBEE',
							border: 'none',
						},

						// Rail
						'& .MuiSlider-rail': {
							height: 5,
							backgroundColor: '#48433E',
							opacity: 1,
						},

						// Value Label
						'& .MuiSlider-valueLabel': {
							color: '#1B1611',
							backgroundColor: '#FBFBEE',
							fontSize: 'clamp(0.563rem, 0.398vw + 0.488rem, 1.125rem)',

							paddingTop: 0,
							paddingBottom: '1px',
							paddingLeft: '6px',
							paddingRight: '6px',
							borderRadius: '2px',
						},
					}}
				/>
			</div>
		</div>
	)
}

export default Sliders