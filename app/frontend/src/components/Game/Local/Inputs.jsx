import { MuiColorInput } from 'mui-color-input'

const Inputs = ({ id, value, duration, setDuration, setValue }) => {
	const onChange = id === 'Ball' ? (e) => setDuration(e.target.value) : (e) => setValue('name', e.target.value)
	return (
		<div className='flex-1 flex flex-col gap-2'>
			<h2 className='font-heavy labels text-primary'>{id}</h2>
			<div className='flex justify-between max-ml:flex-col max-ml:gap-2'>
				<div className='flex flex-col flex-1 ml-2'>
					<label className='font-regular text-light labels' htmlFor={id}>
						{id === 'Ball' ? 'Game duration (seconds)' : 'Player Name'}
					</label>
					<input
						id={id}
						type='text'
						onChange={onChange}
						value={`${id === 'Ball' ? duration : value.name}`}
						placeholder={`${id === 'Ball' ? 'Game duration (seconds)' : 'Player Name'}`}
						className='inputs border border-border rounded bg-[rgb(183,170,156,8%)] placeholder:text-border
						text-primary placeholder:font-regular placeholders outline-none w-[90%] transition-all duration-300'
						required
						maxLength='15'
					/>
				</div>
				<div className='flex flex-col ml:w-[30%] w-[50%] max-ml:ml-2'>
					<label className='font-regular text-light labels' htmlFor={id + 'Color'}>
						{id === 'Ball' ? 'Ball Color' : 'Paddle Color'}
					</label>
					<MuiColorInput
						format='hex'
						id={id + 'Color'}
						value={value.color}
						isAlphaHidden={true}
						fallbackValue='#fbfbee'
						onChange={(color) => setValue(id === 'Ball' ? color : 'color', color)}
						sx={{
							// Border
							border: 1,
							outline: 'none',
							borderRadius: 1,
							borderColor: '#646464',

							// Colors
							backgroundColor: 'rgb(183,170,156,8%)',

							'& .MuiOutlinedInput-input': {
								color: '#FBFBEE',
								fontSize: 'clamp(0.563rem, 0.398vw + 0.488rem, 1.125rem)',
								paddingTop: 'clamp(0.375rem, 0.177vw + 0.342rem, 0.625rem)',
								paddingBottom: 'clamp(0.375rem, 0.177vw + 0.342rem, 0.625rem)',
								paddingRight: '0px',
							},

							'& .MuiOutlinedInput-root': {
								paddingLeft: 'clamp(0.438rem, 0.221vw + 0.396rem, 0.75rem)',
								paddingRight: 'clamp(0.438rem, 0.221vw + 0.396rem, 0.75rem)',

								// Normal state
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: 'transparent',
								},
								// Hover state
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: 'transparent',
								},
								// Focus state
								'&:focus .MuiOutlinedInput-notchedOutline': {
									borderColor: 'transparent',
								},
							},

							'& .MuiColorInput-Button': {
								padding: '0px',
								borderRadius: 1,
								width: 'clamp(1.125rem, 0.265vw + 1.075rem, 1.5rem)',
								height: 'clamp(1.125rem, 0.265vw + 1.075rem, 1.5rem)',
							},
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default Inputs
