import useAuth from '../../context/AuthContext'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Game.css';
import GameScore from '../../components/Game/GameScore';
import Player from '../../components/Game/Player';
import RemotePlayer from '../../components/Game/RemotePlayer';
import AiPongTable from '../../components/Game/AiPongTable';
import Timer from '../../components/Game/Timer';
import Confetti from 'react-confetti';


const GameOverPopup = ({ winner, onRestart, onClose }) => (
	<div className='fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50'>
		<div className='bg-[#0E0B0A] border-2 border-[#76797Cff] text-[#E6DDC6] rounded-lg shadow-xl w-[480px] overflow-hidden relative'>
			<div
				className="h-60 bg-[url('path/to/venus-pingpong-background.jpg')] bg-cover bg-center relative"
				style={{ filter: 'brightness(1.2)' }}
			>
				{' '}
				{/* Increase brightness */}
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#0E0B0A]'></div>
				{/* Centering GAME OVER Text */}
				<div className='absolute inset-0 flex flex-col items-center justify-center'>
					<h2 className='text-5xl font-bold text-[#E6DDC6] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider'>
						GAME OVER
					</h2>
				</div>
			</div>

			<div className='p-8 relative z-10'>
				{winner ? (
					<div className='text-center'>
						<p className='text-2xl mb-2'>Cosmic Champion:</p>
						<p className='text-4xl font-bold mb-4 text-[#BE794A] glow drop-shadow-[0_2px_10px_rgba(190,121,74,0.8)]'>
							{winner.name}
						</p>
						<p className='text-lg mb-6 text-[#E6DDC6] opacity-90'>
							Your stellar skills have conquered the arena!
						</p>
					</div>
				) : (
					<p className='text-2xl text-center mb-6'>
						A cosmic deadlock! The match ends in a tie.
					</p>
				)}

				<div className='flex justify-center space-x-6 mt-8'>
					<button
						onClick={onRestart}
						className='bg-[#BE794A] hover:bg-[#61463A] text-[#E6DDC6] font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
					>
						Play Again
					</button>
					<button
						onClick={onClose}
						className='bg-transparent hover:bg-[#61463A] text-[#E6DDC6] font-bold py-3 px-8 rounded-full border-2 border-[#BE794A] transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
					>
						Return to Base
					</button>
				</div>
			</div>
		</div>
	</div>
)

const AIGame = () => {
    const navigate = useNavigate();
    const [isPaused, setIsPaused] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [winner, setWinner] = useState(null);

    // Get game settings from location state
    const location = useLocation();

    const {
        mode,
        player,
        ai,
        ballColor, 
        duration, 
        backgroundId,
        paddleHeight,
        ballRadius
    } = location.state || {};

    const [timeRemaining, setTimeRemaining] = useState(duration || 60);
    const [showRestartPopup, setShowRestartPopup] = useState(false);
    const [resetParameters, setResetParameters] = useState(false);

    // AI state - NEW
    const [aiPaddleY, setAiPaddleY] = useState(200);
    const [userData, setUserData] = useState(null);
    const [playerData, setPlayerData] = useState(null);

	const { authTokens, logout, getAuthHeaders } = useAuth();

    // fetch current user data
    useEffect(() => {
		const fetchData = async () => {
			try {
				const baseUrl = import.meta.env.VITE_BASE_URL || ''
				// get current logged in user data --------------------------------------------------------------
				const userDataUrl = `${baseUrl}/api/user/me/`
				const userResponse = await fetch(userDataUrl, {
					headers: getAuthHeaders(),
				})
				if (!userResponse.ok) {
					throw new Error('Failed to fetch user data')
				}
				const userJson = await userResponse.json()
				setUserData(userJson)
				console.log('user data: in AI game', userData)
			} catch (error) {
				console.error('Error fetching data:', error)
				console.error('Full error details:', {
					message: error.message,
					stack: error.stack,
				})
			}
		}
		fetchData()
	}, [])

    useEffect(() => {
        if (userData) {
            setPlayerData({
                PlayerName: userData.username,
                BadgeName: userData.badge.name,
                playerImage: userData.profile_picture,
                badgeImage: userData.badge.image
            });
        }
    }, [userData]);

    const handlePause = () => {
        if (!isGameOver) {
            setIsPaused(!isPaused);
        }
    };

    const updateScore = (scorer) => {
        if (scorer === 'player') {
            setPlayerScore(prev => prev + 1);
        } else if (scorer === 'ai') {
            setAiScore(prev => prev + 1);
        }
    };

    // Timer effect
    useEffect(() => {
        if (isPaused || isGameOver) return;
        
        if (timeRemaining > 0) {
            const timerId = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else if (timeRemaining === 0) {
            gameOver();
        }
    }, [timeRemaining, isPaused, isGameOver]);

    const getWinner = () => {
        if (playerScore > aiScore) return player;
        if (aiScore > playerScore) return { name: "AI" };
        return null;
    };

    const handleClose = () => {
        setShowRestartPopup(false);
        navigate('/dashboard');
    };

    const restartGame = () => {
        setPlayerScore(0);
        setAiScore(0);
        setTimeRemaining(duration || 60);
        setIsGameOver(false);
        setIsPaused(false);
        setShowRestartPopup(false);
        setResetParameters(prev => !prev);
        setWinner(null);
    };

    const gameOver = () => {
        setIsGameOver(true);
        setIsPaused(true);
        setShowRestartPopup(true);
        setWinner(getWinner());
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    };

    return (
        <div className={`backdrop-blur-sm text-primary ${isPaused ? 'bg-backdrop-80' : 'bg-backdrop-40'}`}>
            <section className='flex'>
                <div className='flex-1 margin-page flex flex-col items-center gap-8'>
                    <GameScore 
                        player1Score={playerScore} 
                        player2Score={aiScore} 
                        isPaused={isPaused} 
                    />
                    <Timer isPaused={isPaused} timeRemaining={timeRemaining} />
                    <div className='flex-1 w-full flex max-lg:flex-wrap max-lg:justify-around justify-between font-dreamscape-sans'>
                    {playerData && (
                        <RemotePlayer
                            isPaused={isPaused}
                            PlayerName={playerData?.PlayerName || ''}
                            BadgeName={playerData?.BadgeName || ''}
                            playerImage={playerData?.playerImage}
                            badgeImage={playerData?.badgeImage}
                            GameMode="AI"
                        />
                    )}
                        <AiPongTable
                            isPaused={isPaused}
                            handlePause={handlePause}
                            backgroundId={backgroundId}
                            updateScore={updateScore}
                            isGameOver={isGameOver}
                            resetParameters={resetParameters}
                            player1Color={player.color}
                            player2Color={ai.color}
                            ballColor={ballColor}
                            paddleHeight={paddleHeight}
                            ballRadius={ballRadius}
                            aiPaddleY={aiPaddleY}  // NEW: Pass AI paddle position
                            aiDifficulty={ai.difficulty}  // NEW: Pass AI difficulty
                            aiBehavior={ai.behavior}  // NEW: Pass AI behavior
                            isAIGame={true}

                        />
                        <RemotePlayer
                            isPaused={isPaused}
                            PlayerName="AI"
                            BadgeName="Artificial Intelligence"
                            playerImage="/assets/images/ai-avatar.png"  // a default AI avatar image
                            badgeImage="/assets/images/Achievements/ai-badge0.png"    //  a default AI badge image
                            GameMode="AI"
                        />
                    </div>
                </div>
            </section>
            {showRestartPopup && (
                <GameOverPopup 
                    winner={winner} 
                    onRestart={restartGame} 
                    onClose={handleClose} 
                />
            )}
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        </div>
    );
};

export default AIGame;