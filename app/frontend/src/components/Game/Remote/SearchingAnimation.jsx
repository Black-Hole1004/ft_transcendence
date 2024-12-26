import './Remote.css'
import { useState } from 'react'

const SearchingAnimation = () => {
	const [opponentFound, setOpponentFound] = useState(false)

	const delay = setTimeout(() => {
		setOpponentFound(true)
	}, 5000)

	return (
		<div
			className='animation-container absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
			flex text-primary font-dreamscape searching-animation select-none overflow-hidden'
		>
			{['S', 'E', 'A', 'R', 'C', 'H', 'I', 'N', 'G', '.', '.', '.'].map((char, index) => (
				<marquee
					key={index}
					direction='down'
					scrollamount={30 + Math.ceil((Math.random() * 10) % 10)}
					style={{
						transitionDelay: `${index * 50}ms`,
					}}
					className={`char ${char === 'I' || char === '.' ? 'marquee-sm' : 'marquee-lg'}
									transition-opacity duration-300 ${opponentFound ? 'opacity-0' : 'opacity-100'}`}
				>
					<div>{char}</div>
				</marquee>
			))}

			<div
				className={`animation-container absolute char 
					transition-opacity duration-1000 ${opponentFound ? 'opacity-100' : 'opacity-0'}`}
			>
				SEARCHING...
			</div>
		</div>
	)
}

export default SearchingAnimation