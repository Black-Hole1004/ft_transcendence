import './Loader.css'

const Loader = () => {
	return (
		<div className="flex justify-center items-center h-screen w-screen
			backdrop-brightness-50">
			<div className="relative loader-container aspect-square">
				<div className="absolute loader-paddles loader-left-paddle left-2 bg-primary h-[50%] w-[15%] rounded-lg"></div>
				<div className="absolute loader-paddles loader-right-paddle right-2 bg-primary h-[50%] w-[15%] rounded-lg"></div>
			</div>
		</div>
	)
}

export default Loader