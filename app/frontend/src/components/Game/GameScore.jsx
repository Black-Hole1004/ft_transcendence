import { useState, useEffect } from 'react';


function GameScore({ player1Score, player2Score, isPaused }) {

    return (
        <div className={`score border-1.5 border-primary rounded-xl ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`} >
        <p className='font-dreamscape leading-[1.125] text-center'>{player1Score} - {player2Score}</p>
        </div>
    );
}

export default GameScore;