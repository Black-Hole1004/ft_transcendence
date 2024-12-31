import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import GamePreview from '../Game/Local/GamePreview';

// Component for game customization controls
const GameCustomizationPanel = ({
	gameConfig,
	players,
	backgroundId,
	onGameConfigUpdate,
}) => {
	return (
		<div className="flex-1 flex flex-col lp:pr-4 justify-between max-lp:gap-7">
			<div className="flex flex-col">
				<div className="labels font-medium text-primary">
					<FormControlLabel
						control={
							<Checkbox
								onChange={(e) =>
									onGameConfigUpdate(
										'isBackgroundVisible',
										!e.target.checked,
									)
								}
								sx={{
									'& .MuiSvgIcon-root': {
										fontSize:
											'clamp(1rem, 0.177vw + 0.967rem, 1.25rem)',
									},
									color: '#FBFBEE',
									'&.Mui-checked': {
										color: '#FBFBEE',
									},
								}}
							/>
						}
						label="Remove Background" // font-family
					/>
				</div>
			</div>
			<GamePreview
				players={players}
				gameConfig={gameConfig}
				backgroundId={backgroundId}
			/>
		</div>
	);
};

export default GameCustomizationPanel;
