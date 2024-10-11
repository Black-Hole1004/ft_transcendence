import React, { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router-dom';

function PongTable({ 
  isPaused, 
  handlePause, 
  backgroundId, 
  updateScore, 
  isGameOver, 
  resetParameters, 
  player1Color, 
  player2Color, 
  ballColor,
  paddleHeight,
  ballRadius
}) {

  // 800 is the canvas width
  // 400 is the canvas height

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);
  
  const paddleWidth = 20;
  const paddleX = 5;
  const BallInitialSpeed = 0.5;
  const BallAcceleration = 0.1; 
  const paddleSpeed = 300; // pixels per second {100, 200, 300 .. 800}
  const MAX_BALL_SPEED = 8;

  const [playerY, setPlayerY] = useState(200 - paddleHeight / 2); // becuase 200 is the canvas height devided by 2
  const [aiY, setAiY] = useState(200 - paddleHeight / 2);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });


  const MAX_CANVAS_WIDTH = 1200; // Maximum canvas width
  const MAX_CANVAS_HEIGHT = 600; // Maximum canvas height
  const MIN_CANVAS_WIDTH = 400; // Minimum canvas width
  const ASPECT_RATIO = 2; // Width to height ratio (2:1)

  // Update player and AI objects with new paddleHeight
  const [player, setPlayer] = useState({
    name: 'Player 1',
    x: paddleX,
    y: playerY,
    width: paddleWidth,
    height: paddleHeight,
    color: player1Color || 'white',
    score: 0,
    won: false
  });

  const [ai, setAi] = useState({
    name: 'Player 2',
    x: 800 - paddleWidth - paddleX, // 800 is the canvas width
    y: aiY,
    width: paddleWidth,
    height: paddleHeight,
    color: player2Color || 'white',
    score: 0,
    won: false
  });

  // Update ball object with new ballRadius
  const ballRef = useRef({
    x: 400, // 400 is the canvas width devided by 2
    y: 200, // 200 is the canvas height devided by 2
    radius: ballRadius,
    speed: BallInitialSpeed,
    velocityX: 5,
    velocityY: 5,
    color: ballColor || 'white'
  });
  
  const [isLeftPlayerMovingUp, setIsLeftPlayerMovingUp] = useState(false);
  const [isLeftPlayerMovingDown, setIsLeftPlayerMovingDown] = useState(false);
  const [isRightPlayerMovingUp, setIsRightPlayerMovingUp] = useState(false);
  const [isRightPlayerMovingDown, setIsRightPlayerMovingDown] = useState(false);
  
  useEffect(() => {
    // Reset game state when resetParameters changes
    ballRef.current = {
      x: 400, // 400 is the canvas width devided by 2
      y: 200, // 200 is the canvas height devided by 2
      radius: ballRadius,
      speed: BallInitialSpeed,
      velocityX: 5,
      velocityY: 5,
      color: ballColor || 'white'
    };
    setPlayerY(200 - paddleHeight / 2);
    setAiY(200 - paddleHeight / 2);
  }, [resetParameters, ballRadius, ballColor, paddleHeight]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
  
    const background = new Image();
    background.src = `/assets/images/tables/table${backgroundId}.png`;
  
    const drawPaddle = (paddle) => {
      ctx.fillStyle = paddle.color;
      ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
      ctx.beginPath();
      ctx.arc(paddle.x + paddle.width / 2, paddle.y, paddle.width / 2, 0, Math.PI, true);
      ctx.arc(paddle.x + paddle.width / 2, paddle.y + paddle.height, paddle.width / 2, 0, Math.PI, false);
      ctx.closePath();
      ctx.fill();
    };
  
    const drawBall = (ball) => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    };
  
    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
      drawPaddle(player);
      drawPaddle(ai);
      drawBall(ballRef.current);
    };
  

    const collisionDetection = (ball, paddle) => {
      const paddleTop = paddle.y;
      const paddleBottom = paddle.y + paddle.height;
      const paddleLeft = paddle.x;
      const paddleRight = paddle.x + paddle.width;
  
      const ballTop = ball.y - ball.radius;
      const ballBottom = ball.y + ball.radius;
      const ballLeft = ball.x - ball.radius;
      const ballRight = ball.x + ball.radius;
  
      return ballRight > paddleLeft && ballLeft < paddleRight && ballBottom > paddleTop && ballTop < paddleBottom;
    };
    
    const handlePaddleCollision = (ball, paddle) => {
      const paddleCenter = paddle.y + paddle.height / 2;
      const collisionPoint = ball.y - paddleCenter;
      const normalizedCollisionPoint = collisionPoint / (paddle.height / 2);
      const bounceAngle = normalizedCollisionPoint * Math.PI / 4;
  
      ball.velocityX = -ball.velocityX;
      // ball.velocityY = ball.speed * Math.sin(bounceAngle);
  
      // Ensure the ball is outside the paddle
      if (paddle.x < 400) { // Left paddle
        ball.x = paddle.x + paddle.width + ball.radius;
      } else { // Right paddle
        ball.x = paddle.x - ball.radius;
      }
  
      ball.speed += BallAcceleration;
      if (ball.speed > MAX_BALL_SPEED) {
        ball.speed = MAX_BALL_SPEED;
      }
    };
    
    const resetBall = () => {
      ballRef.current = {
        ...ballRef.current,
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        speed: BallInitialSpeed,
        velocityX: -ballRef.current.velocityX
      };
    };
  
    const updateGame = (time) => {
      if (isPaused || isGameOver) return;

      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
  
      const ball = ballRef.current;
  
      // Update ball position
      const nextX = ball.x + ball.velocityX * ball.speed;
      const nextY = ball.y + ball.velocityY * ball.speed;
  
      // Ball collision with top/bottom
      if (nextY + ball.radius > canvasHeight || nextY - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
        ball.y = nextY + ball.radius > canvasHeight ? canvasHeight - ball.radius : ball.radius;
      } else {
        ball.y = nextY;
      }
  
      // Ball collision with paddles
      if (collisionDetection(ball, player)) {
        handlePaddleCollision(ball, player);
      } else if (collisionDetection(ball, ai)) {
        handlePaddleCollision(ball, ai);
      } else {
        ball.x = nextX;
      }
  
      // Reset ball if out of bounds and update score
      if (ball.x < 0 || ball.x > canvasWidth) {
        updateScore(ball.x < 0 ? 2 : 1);
        resetBall();
      }
  
      // Update left player position based on keyboard input
      if (isLeftPlayerMovingUp) {
        setPlayerY(prev => Math.max(prev - paddleSpeed * deltaTime, 0));
      }
      if (isLeftPlayerMovingDown) {
        setPlayerY(prev => Math.min(prev + paddleSpeed * deltaTime, canvasHeight - paddleHeight));
      }
  
      // Update right player position based on keyboard input
      if (isRightPlayerMovingUp) {
        setAiY(prev => Math.max(prev - paddleSpeed * deltaTime, 0));
      }
      if (isRightPlayerMovingDown) {
        setAiY(prev => Math.min(prev + paddleSpeed * deltaTime, canvasHeight - paddleHeight));
      }
  
      draw();
      requestRef.current = requestAnimationFrame(updateGame);
    };
  
    requestRef.current = requestAnimationFrame(updateGame);
  
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused, isGameOver, player, ai, updateScore, isLeftPlayerMovingUp, isLeftPlayerMovingDown, isRightPlayerMovingUp, isRightPlayerMovingDown, backgroundId, paddleHeight]);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'w') {
        setIsLeftPlayerMovingUp(true);
      }
      if (event.key === 's') {
        setIsLeftPlayerMovingDown(true);
      }
      if (event.key === 'ArrowUp') {
        setIsRightPlayerMovingUp(true);
      }
      if (event.key === 'ArrowDown') {
        setIsRightPlayerMovingDown(true);
      }
    };
  
    const handleKeyUp = (event) => {
      if (event.key === 'w') {
        setIsLeftPlayerMovingUp(false);
      }
      if (event.key === 's') {
        setIsLeftPlayerMovingDown(false);
      }
      if (event.key === 'ArrowUp') {
        setIsRightPlayerMovingUp(false);
      }
      if (event.key === 'ArrowDown') {
        setIsRightPlayerMovingDown(false);
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
    // Update player and AI positions when state changes
    useEffect(() => {
      setPlayer(prev => ({ ...prev, y: playerY }));
      setAi(prev => ({ ...prev, y: aiY }));
    }, [playerY, aiY]);
    

    return (
      <div ref={containerRef} className="flex flex-col items-center gap-7 max-lg:order-first max-lg:w-full">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className={`game-table border ${isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
          style={{ borderRadius: '25px', width: '100%', height: 'auto', maxWidth: `${MAX_CANVAS_WIDTH}px` }}
        />
        {!isGameOver && (
          <button onClick={handlePause} className="pause flex items-center gap-3 brightness-[1] leading-[0.95]">
            <img src={`/assets/images/icons/${isPaused ? 'play' : 'pause'}.svg`} alt="" />
            <p className="align-middle">{isPaused ? 'resume' : 'pause'}</p>
          </button>
        )}
      </div>
    );
}

export default PongTable;