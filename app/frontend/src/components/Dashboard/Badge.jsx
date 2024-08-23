function Badge({ image, title, level }) {
	return (
		<div
			className={`text-center ${
				level < 20 && image == 'novice-astronaut'
					? 'grayscale'
					: level < 40 && image == 'cosmic-explorer'
						? 'grayscale'
						: level < 60 && image == 'stellar-voyager'
							? 'grayscale'
							: level < 80 && image == 'galactic-trailblazer'
								? 'grayscale'
								: level < 100 && image == 'celestial-master'
									? 'grayscale'
									: ''
			}`}
		>
			<img
				src={`/assets/images/Achievements/${image}.png`}
				className='hover:scale-[1.2] transition duration-500 select-none'
				alt={`${title} Badge`}
			/>
			<p className='achievements-titles-font font-dreamscape-sans'>{title}</p>
		</div>
	)
}

export default Badge
