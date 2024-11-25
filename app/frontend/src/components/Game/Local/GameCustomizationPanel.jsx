import Sliders from './Sliders'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { GAME_CONSTRAINTS } from '../../../constants/gameConstants'

// Component for game customization controls
const GameCustomizationPanel = ({ gameConfig, players, backgroundId, onGameConfigUpdate }) => {
	const handlePaddleSizeChange = (newSize) => {
		onGameConfigUpdate('paddle', { size: newSize })
	}

	const handleBallSizeChange = (newSize) => {
		onGameConfigUpdate('ball', { ...gameConfig.ball, size: newSize })
	}

	return (
		<div className='flex-1 flex flex-col lp:pr-4'>
			<h3 className='title-size font-heavy text-2xl mt-5 mb-8'>Personalize Your Game</h3>
			<div className='flex-1 flex flex-col justify-between max-lp:gap-7'>
				<div className='flex flex-col'>
					<Sliders
						id='paddle'
						size={gameConfig.paddle.size}
						minSize={GAME_CONSTRAINTS.PADDLE.MIN_SIZE}
						maxSize={GAME_CONSTRAINTS.PADDLE.MAX_SIZE}
						setSize={handlePaddleSizeChange}
					/>
					<Sliders
						id='ball'
						size={gameConfig.ball.size}
						minSize={GAME_CONSTRAINTS.BALL.MIN_SIZE}
						maxSize={GAME_CONSTRAINTS.BALL.MAX_SIZE}
						setSize={handleBallSizeChange}
					/>
					<div className='labels font-medium text-primary'>
						<FormControlLabel
							control={
								<Checkbox
									onChange={(e) =>
										onGameConfigUpdate('isBackgroundVisible', e.target.checked)
									}
									sx={{
										'& .MuiSvgIcon-root': {
											fontSize: 'clamp(1rem, 0.177vw + 0.967rem, 1.25rem)',
										},
										color: '#FBFBEE',
										'&.Mui-checked': {
											color: '#FBFBEE',
										},
									}}
								/>
							}
							label='Remove Background' // font-family
						/>
					</div>
				</div>
				<div className='flex flex-col gap-2'>
					<h2 className='font-heavy labels text-primary'>Preview</h2>
					<div
						className={`relative self-center w-[92%] max-w-[500px] aspect-video border border-primary rounded-lg overflow-hidden
					${gameConfig.isBackgroundVisible ? '' : 'bg-black'}`}
					>
						<img
							src={`/assets/images/tables/table${backgroundId}.png`}
							className={`${gameConfig.isBackgroundVisible ? '' : 'hidden'} select-none brightness-[50%]`}
							alt='table image'
						/>
						<div
							className={`absolute top-1/2 left-2 z-10 transform -translate-y-1/2
						w-3 ring-1 ring-primary rounded-lg`}
							style={{
								height: `${gameConfig.paddle.size}%`,
								background: `${players.player1.color}`,
							}}
						></div>
						<div
							className={`absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2
						aspect-square border-0.7 border-primary rounded-full`}
							style={{
								height: `${gameConfig.ball.size}%`,
								background: `${gameConfig.ball.color}`,
							}}
						></div>
						<div
							className={`absolute top-1/2 right-2 z-10 transform -translate-y-1/2
						w-3 border-0.7 border-primary rounded-lg`}
							style={{
								height: `${gameConfig.paddle.size}%`,
								background: `${players.player2.color}`,
							}}
						></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameCustomizationPanel
