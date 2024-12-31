function Mode({ image, title, className, mode }) {
	return (
		<div
			className={`absolute hover:text-[rgba(251,251,138,0)] duration-500 ${className}`}
		>
			<img
				src={`/assets/images/${image}`}
				className="brightness-[.5] hover:scale-[1.04] hover:brightness-100 transition duration-500"
				alt="tournament-background"
			/>
			<h1 className={`absolute pointer-events-none top-[40%] ${title}`}>
				{mode}
			</h1>
		</div>
	);
}

export default Mode;
