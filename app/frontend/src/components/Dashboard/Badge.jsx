function Badge({ image, title, requiredXp, currentXp }) {
	const isUnlocked = currentXp >= requiredXp;

	return (
		<div className={`text-center ${!isUnlocked ? 'grayscale' : ''}`}>
			<img
				src={`/assets/images/Achievements/${image}.png`}
				className="hover:scale-[1.2] transition duration-500 select-none"
				alt={`${title} Badge`}
			/>
			<p className="achievements-titles-font font-dreamscape-sans select-none">
				{title}
			</p>
		</div>
	);
}

export default Badge;
