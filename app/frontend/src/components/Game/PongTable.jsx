import React, { useEffect, useRef } from 'react';
import Timer from '../../components/Game/Timer';

function PongTable(props) {
    const canvasRef = useRef(null);
    const { backgroundId, isPaused, handlePause } = props;

    // useEffect(() => {

    return (
        <div className='flex flex-col items-center gap-7 max-lg:order-first max-lg:w-full'>
            <canvas ref={canvasRef} id='game-table' width={800} height={400} className={`game-table border ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}> </canvas>
            <button onClick={handlePause} className='pause flex items-center gap-3 brightness-[1] leading-[0.95]'>
                <img src={`/assets/images/icons/${isPaused ? 'play' : 'pause'}.svg`} alt='' />
                <p className='align-middle'>{isPaused ? 'resume' : 'pause'}</p>
            </button>
        </div>
    );
}

export default PongTable;
