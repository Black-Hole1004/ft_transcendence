import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import './Game.css'
import Header from '../../components/Header'
import GameScore from '../../components/Game/GameScore'
import Player from '../../components/Game/Player'
import PongTable from '../../components/Game/PongTable'
import Timer from '../../components/Game/Timer'

const Game = () => {
    const [isPaused, setIsPaused] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [winner, setWinner] = useState(null)
    
    const location = useLocation()
    const { 
        mode, 
        player1, 
        player2, 
        ballColor, 
        duration, 
        backgroundId 
    } = location.state || {}
    
    const [timeRemaining, setTimeRemaining] = useState(duration || 20)
    const [showRestartPopup, setShowRestartPopup] = useState(false)
    const [resetParameters, setResetParameters] = useState(false)

    // const player1 = {
    //     name: "mouad55",
    //     badge: "celestial master",
    //     image: "/assets/images/moudrib.jpeg",
    //     badgeImage: "/assets/images/Achievements/celestial-master.png"
    // }

    // const player2 = {
    //     name: "Ahmaymou",
    //     badge: "galactic trailblazer",
    //     image: "/assets/images/lmoudir.jpg",
    //     badgeImage: "/assets/images/Achievements/galactic-trailblazer.png"
    // }

    const handlePause = () => {
        if (!isGameOver) {
            setIsPaused(!isPaused)
        }
    }

    const updateScore = (player) => {
        if (player === 1) {
            setPlayer1Score(prevScore => prevScore + 1)
        }
		else if (player === 2) {
            setPlayer2Score(prevScore => prevScore + 1)
        }
    }

    useEffect(() => {
		if (isPaused) {
			return;
		}
		if (timeRemaining > 0) {
			const timerId = setInterval(() => {
				setTimeRemaining((prevTime) => prevTime - 1);
			}, 1000);
			return () => clearInterval(timerId); // Clear interval when component unmounts or timeRemaining changes
		}
		else if (timeRemaining === 0) {
			// alert('Game over!');
			GameOver();
		}
    }, [timeRemaining, isPaused]);

    const getWinner = () => {
        if (player1Score > player2Score) return player1
        if (player2Score > player1Score) return player2
        return null
    }

    const restartGame = () => {
        setPlayer1Score(0)
        setPlayer2Score(0)
        setTimeRemaining(20)
        setIsGameOver(false)
        setIsPaused(false)
        setShowRestartPopup(false)
		setResetParameters(true);
    }

	const GameOver = () => {
		setIsGameOver(true)
		setIsPaused(true)
		setShowRestartPopup(true)
	}

    return (
        <div className={`min-h-screen backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-80' : 'bg-backdrop-40'}`}>
            <Header />
            <section className='flex'>
                <div className='flex-1 margin-page flex flex-col items-center gap-8'>
                    <GameScore player1Score={player1Score} player2Score={player2Score} isPaused={isPaused} />
					<Timer isPaused={isPaused} timeRemaining={timeRemaining} />
                    <div className='flex-1 w-full flex justify-between font-dreamscape-sans max-lg:flex-wrap max-lg:justify-around'>
                        <Player isPaused={isPaused} PlayerName={player1.name} BadgeName={player1.badge} playerImage={player1.image} badgeImage={player1.badgeImage}
                        GameMode='local'
                        />
                        <PongTable 
                            isPaused={isPaused} 
                            handlePause={handlePause} 
                            backgroundId={backgroundId || 1} 
                            updateScore={updateScore}
                            isGameOver={isGameOver}
							resetParameters={resetParameters} // this is a boolean that will be toggled to reset the game
                        />
                        <Player isPaused={isPaused} PlayerName={player2.name} BadgeName={player2.badge} playerImage={player2.image} badgeImage={player2.badgeImage} 
                        GameMode='local'
                        />
                    </div>
                    {(showRestartPopup) && (
						<>
							<div className="restart-popup">
								<h2>Game Over!</h2>
								{getWinner() ? (
									<p>Winner: {getWinner().name}</p>
								) : (
									<p>It's a tie!</p>
								)}
								<button onClick={restartGame}>Restart Game</button>
							</div>
						</>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Game







