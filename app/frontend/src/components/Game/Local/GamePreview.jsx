const GamePreview = ({ players, gameConfig, backgroundId }) => {
	return (
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
			aspect-square ring-1 ring-primary rounded-full`}
					style={{
						height: `${gameConfig.ball.size}%`,
						background: `${gameConfig.ball.color}`,
					}}
				></div>
				<div
					className={`absolute top-1/2 right-2 z-10 transform -translate-y-1/2
			w-3 ring-1 ring-primary rounded-lg`}
					style={{
						height: `${gameConfig.paddle.size}%`,
						background: `${players.player2.color}`,
					}}
				></div>
			</div>
		</div>
	)
}

export default GamePreview
