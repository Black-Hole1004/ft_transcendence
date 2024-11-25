import Sliders from './Sliders'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { GAME_CONSTRAINTS } from '../../../constants/gameConstants'
import GamePreview from './GamePreview'

// Component for game customization controls
const GameCustomizationPanel = ({ gameConfig, players, backgroundId, onGameConfigUpdate }) => {

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
						setSize={(newSize) => onGameConfigUpdate('paddle', { size: newSize })}
					/>
					<Sliders
						id='ball'
						size={gameConfig.ball.size}
						minSize={GAME_CONSTRAINTS.BALL.MIN_SIZE}
						maxSize={GAME_CONSTRAINTS.BALL.MAX_SIZE}
						setSize={(newSize) => onGameConfigUpdate('ball', { ...gameConfig.ball, size: newSize })}
					/>
					<div className='labels font-medium text-primary'>
						<FormControlLabel
							control={
								<Checkbox
									onChange={(e) =>
										onGameConfigUpdate('isBackgroundVisible', !e.target.checked)
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

				<GamePreview players={players} gameConfig={gameConfig} backgroundId={backgroundId} />

			</div>
		</div>
	)
}

export default GameCustomizationPanel
