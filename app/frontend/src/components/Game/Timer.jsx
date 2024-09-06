import React, { useState, useEffect } from 'react';

function Timer(props) {
    const [timeLeft, setTimeLeft] = useState(90); // 1 minute 30 seconds is 90 seconds

    useEffect(() => {
        if (props.isPaused) {
            return;
        }

        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId); // Clear interval when component unmounts or timeLeft changes
        }
        else if (timeLeft === 0) {
            alert('Game over!');
        }
    }, [timeLeft, props.isPaused]);

    // Format the time in mm:ss format
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div
            className={`timer border-2 border-primary p-2.5 text-3xl font-bold text-center font-dreamscape tracking-wide shadow-lg ${
                props.isPaused ? 'brightness-[20%]' : 'brightness-[1]'
            }`}
        >
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
}

export default Timer;