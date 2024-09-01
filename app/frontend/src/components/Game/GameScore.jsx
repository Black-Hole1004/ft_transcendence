
function GameScore(props) {
    return (
        <div className={`score border-1.5 border-primary rounded-xl ${props.isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`} >
        <p className='font-dreamscape leading-[1.125] text-center'>1 - 3</p>
        </div>
    );
}

export default GameScore;