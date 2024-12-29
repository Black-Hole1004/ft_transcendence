import './Remote.css'
import { useState } from 'react'
import Button from '../../Home/Buttons/Button'

const SearchingAnimation = ({ handleCancel }) => {
	const [opponentFound, setOpponentFound] = useState(false)

	const delay = setTimeout(() => {
		setOpponentFound(true)
	}, 5000)

	return (
		<>
			<div
				className='animation-container absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
				flex text-primary font-dreamscape select-none'
			>
				{['S', 'E', 'A', 'R', 'C', 'H', 'I', 'N', 'G', '.', '.', '.'].map((char, index) => (
					<marquee
					key={index}
						direction='down'
						scrollamount={20 + Math.ceil((Math.random() * 10) % 10)}
						style={{
							transitionDelay: `${index * 50}ms`,
						}}
						className={`char ${char === 'I' || char === '.' ? 'marquee-sm' : 'marquee-lg'}
						searching-animation transition-opacity duration-300 ${opponentFound ? 'opacity-0' : 'opacity-100'}`}
					>
						<div>{char}</div>
					</marquee>
				))}

				<div
					className={`animation-container absolute char searching-animation
						transition-opacity duration-1000 ${opponentFound ? 'opacity-100' : 'opacity-0'}`}
				>
					SEARCHING...
				</div>
				<Button
					className={
						`rounded border border-border font-medium cancel-button
						absolute left-1/2 top-full mt-10 transform -translate-x-1/2`
					}
					type='submit'
					onClick={handleCancel}
				>
					Cancel
				</Button>
			</div>
		</>
	)
}

export default SearchingAnimation
