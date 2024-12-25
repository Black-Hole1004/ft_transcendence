import Inputs from '../Game/Local/Inputs'

const GamePreparationPanelT = ({
	players,
	onReset,
	onSubmit,
	gameConfig,
	onRandomize,
	onPlayerUpdate,
	onGameConfigUpdate,
}) => {
	return (
		<div className='flex-1 flex flex-col lp:pl-4'>
			<h3 className='title-size font-heavy text-2xl mt-5 mb-6'>Prepare for Battle</h3>
			<div
				onSubmit={onSubmit}
				className='flex-1 flex flex-col max-lp:gap-12 justify-between'
			>
				<div className='flex flex-col gap-4'>
					<div className='flex justify-between'>
						<Inputs
							id={'Player 1'}
							value={players.player1}
							setValue={(field, value) => onPlayerUpdate('player1', field, value)}
							/>
						<Inputs
							id={'Player 2'}
							value={players.player2}
							setValue={(field, value) => onPlayerUpdate('player2', field, value)}
							/>
					</div>
					<div className='flex justify-between'>
						<Inputs
							id={'Player 3'}
							value={players.player3}
							setValue={(field, value) => onPlayerUpdate('player3', field, value)}
						/>
						<Inputs
							id={'Player 4'}
							value={players.player4}
							setValue={(field, value) => onPlayerUpdate('player4', field, value)}
							/>
					</div>
					{/* <div className='self-end'>
						<Inputs
							id={'Ball'}
							value={gameConfig.ball}
							duration={gameConfig.duration}
							setDuration={(duration) => onGameConfigUpdate('duration', duration)}
							setValue={(value) =>
								onGameConfigUpdate('ball', { ...gameConfig.ball, color: value })
							}
							/>
					</div> */}
				</div>
				<div className='self-end flex flex-col gap-2'>
					{/* <button
						type='button'
						onClick={onRandomize}
						className='font-medium labels w-full p-2 border border-border text-primary rounded
							bg-[rgb(183,170,156,8%)] transition duration-200 ease-in hover:bg-[rgb(183,170,156,30%)]'
					>
						Generate Random Values
					</button>
					<button
						type='button'
						onClick={onReset}
						className='font-medium labels w-full p-2 border border-border text-primary rounded
							bg-[rgb(183,170,156,8%)] transition duration-200 ease-in hover:bg-[rgb(183,170,156,30%)]'
					>
						Reset to Default
					</button>

					<button
						type='submit'
						className='font-dreamscape labels w-full p-2 bg-primary text-secondary rounded brightness-90
					hover:scale-[1.02] hover:brightness-100 transition duration-200 ease-in'
					>
						Start Tournament
					</button> */}
				</div>
			</div>
		</div>
	)
}

export default GamePreparationPanelT
