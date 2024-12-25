
function Timer(props) {
	const minutes = Math.floor(props.timeRemaining / 60)
	const seconds = props.timeRemaining % 60


    return (
        <div
            className={`timer p-2.5 text-3xl font-bold text-center font-dreamscape-sans ${props.isPaused ? 'brightness-[20%]' : 'brightness-[1]'
                } ${props.isSuddenDeath
                    ? 'border-red-500 text-red-500 animate-pulse'
                    : 'border-primary text-white'
                }`}
        >
            {props.isSuddenDeath && "SUDDEN DEATH - "}
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
}

export default Timer
