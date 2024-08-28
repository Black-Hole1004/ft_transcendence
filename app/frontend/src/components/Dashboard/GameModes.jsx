import Button from './Button'
import { Link } from 'react-router-dom'

function GameModes() {
	return (
		<div className='relative w-full lg:h-shapes-lg ms:h-shapes-ms font-dreamscape-sans text-primary select-none modes'>
			<Button
				image={'tournaments.webp'}
				title={'lg:left-[5%] lp:left-[15%] left-[12%]'}
				className={'w-[67%]'}
				mode={'tournaments'}
			></Button>
			<Button
				image={'training.webp'}
				title={'right-[10%]'}
				className={'right-0 w-[42%]'}
				mode={'training'}
			></Button>
			<Link to={'/custom'}>
				<Button
					image={'1vs1.webp'}
					title={'right-[30%]'}
					className={
						'right-0 w-[53%] lg:bottom-2 lp:bottom-4 tb:bottom-3 ml:bottom-2 ms:bottom-1'
					}
					mode={'1 vs 1'}
				></Button>
			</Link>
		</div>
	)
}

export default GameModes
