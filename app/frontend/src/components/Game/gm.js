// select canvas
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// variables
const PaddleWidth = 20;
const PaddleHeight = 100;

const paddleX = 3.6;
const paddleY = canvas.height / 2 - PaddleHeight / 2;

const BallX = canvas.width / 2;
const BallY = canvas.height / 2;

const MAX_BALL_SPEED = 8; // Set the maximum ball speed
const MAX_AI_LEVEL = 10; // Set the maximum AI level

const BallRadius = 15;
const BallInitialSpeed = 1;
const BallAcceleration = 0.025; // 1% of the initial speed
const paddleSpeed = 750;
const ai_level = 2; // 1 easy, 2 medium, 3 diffuclt, 4 hard, 5 very hard, 7 impossible, 10 unbeatable

// user paddle
const player = {
	name: "player",
	x: paddleX,
	y: paddleY,
	width: PaddlwWidth,
	height: PaddleHeight,
	color: "#211D21",
	score: 0,
	won: false,
};

// AI paddle
const ai = {
	name: "ai",
	x: canvas.width - PaddlwWidth - paddleX,
	y: paddleY,
	width: PaddlwWidth,
	height: PaddleHeight,
	color: "#A50113",
	score: 0,
	won: false,
};

const ball = {
	name: "ball",
	x: BallX,
	y: BallY,
	radius: BallRadius,
	speed: BallInitialSpeed,
	velocityX: 5,
	velocityY: 5,
	color: "#010A10",
};

// draw shapes && text functions
function drawPaddle(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
	// make the top and bottom lines of the paddle rounded
	ctx.beginPath();
	ctx.arc(x + w / 2, y, w / 2, 0, Math.PI, true);
	ctx.closePath();
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x + w / 2, y + h, w / 2, 0, Math.PI, false);
	ctx.closePath();
	ctx.fill();
}

function drawBall(x, y, r, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fill();
}


// redraw canvas
function render() {
	// clear the canvas with a black rectangle
	drawPaddle(0, 0, canvasWidth, canvasHeight, "#DFE2DB");

	// draw the paddles
	drawPaddle(player.x, player.y, player.width, player.height, player.color); // user paddle
	drawPaddle(ai.x, ai.y, ai.width, ai.height, ai.color); // AI paddle

	// draw the ball
	drawBall(ball.x, ball.y, ball.radius, ball.color);

}

function collision(ball, paddle) {
	paddle.top = paddle.y;
	paddle.bottom = paddle.y + paddle.height;
	paddle.left = paddle.x;
	paddle.right = paddle.x + paddle.width;

	ball.top = ball.y - ball.radius;
	ball.bottom = ball.y + ball.radius;
	ball.left = ball.x - ball.radius;
	ball.right = ball.x + ball.radius;

	// return true if the ball collides with the paddle
	return (
		ball.right > paddle.left &&
		ball.bottom > paddle.top &&
		ball.left < paddle.right &&
		ball.top < paddle.bottom
	);
}

// control the paddle with the mouse
function movePaddle(evt) {
	let rect = canvas.getBoundingClientRect(); // get the size of the canvas and its position relative to the viewport
	player.y = evt.clientY - rect.top - player.height / 2; // update the paddle position with the mouse position
}

// mouse event
canvas.addEventListener("mousemove", movePaddle);

// keyboard event
let lastTime = 0;
let isMovingUp = false;
let isMovingDown = false;

window.addEventListener("keydown", (evt) => {
	if (evt.key === "ArrowUp" || evt.key === "w") {
		isMovingUp = true;
	}
	if (evt.key === "ArrowDown" || evt.key === "s") {
		isMovingDown = true;
	}
});

window.addEventListener("keyup", (evt) => {
	if (evt.key === "ArrowUp") {
		isMovingUp = false;
	}
	if (evt.key === "ArrowDown") {
		isMovingDown = false;
	}
});

function updatePlayerPosition(currentTime) {
	if (lastTime === 0) {
		lastTime = currentTime;
		requestAnimationFrame(updatePlayerPosition);
		return;
	}

	const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
	lastTime = currentTime;

	if (isMovingUp) {
		player.y -= paddleSpeed * deltaTime;
	}
	if (isMovingDown) {
		player.y += paddleSpeed * deltaTime;
	}

	// Clamp the player's position to keep it within the game bounds
	if (player.y < -PaddleHeight / 2) {
		player.y = -PaddleHeight / 2;
	}
	if (player.y + player.height / 2 > canvas.height) {
		player.y = canvas.height - player.height / 2;
	}
	requestAnimationFrame(updatePlayerPosition);
}

// reset the ball TO the center of the canvas
function resetBall() {
	ball.x = canvasWidth / 2;
	ball.y = canvasHeight / 2;
	ball.speed = BallInitialSpeed;
	ball.velocityX *= -1;
}

function collisionDetection(ball, paddle) {
	// Calculate the distance between the centers of the ball and the paddle
	const distX = Math.abs(ball.x - paddle.x - paddle.width / 2);
	const distY = Math.abs(ball.y - paddle.y - paddle.height / 2);

	// Check if the distance is less than the sum of the half-widths and half-heights
	if ( distX < ball.radius + paddle.width / 2 && distY < ball.radius + paddle.height / 2) {
		// Collision detected
		return true;
	}
	// No collision
	return false;
}


// update function : move, collision, score, movement..
function update() {
	// ball movement
	ball.x += ball.velocityX * ball.speed;
	ball.y += ball.velocityY * ball.speed;

	// ball collision with the top and bottom walls
	if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
		ball.velocityY *= -1;
	}

	// check for collisions with the paddles
	let playerCollision = collisionDetection(ball, player);
	let aiCollision = collisionDetection(ball, ai);

	if (aiCollision) {
		ball.velocityX *= -1;
		ball.speed += BallAcceleration;
	} else if (playerCollision) {
		ball.velocityX *= -1;
		ball.speed += BallAcceleration;
	}
	if (ball.speed > MAX_BALL_SPEED) {
		ball.speed = MAX_BALL_SPEED;
	}
	console.log(ball.speed);

	// AI movement
	ai.y += (ball.y - ai.height / 2 - ai.y) * (ai_level / 10);
	player.y += (ball.y - player.height / 2 - player.y) * (ai_level / 10);
	// listen to the keyboard events
	requestAnimationFrame(updatePlayerPosition);
	// update the score
	if (ball.x - ball.radius < 0) {
		if (!playerCollision) {
			ai.score++;
			resetBall();
		}
	} else if (ball.x + ball.radius > canvas.width) {
		if (!aiCollision) {
			player.score++;
			resetBall();
		}
	}
}


// Game intialization
function game() {
	render();
	update();
	requestAnimationFrame(game);
}

// start the game loop
game();


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
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);
  
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });
  
  const paddleWidth = 20;
  const paddleX = 5;
  const BallInitialSpeed = 0.5;
  const BallAcceleration = 0.1; 
  const paddleSpeed = 300; // pixels per second {100, 200, 300 .. 800}
  const MAX_BALL_SPEED = 8;

  const MAX_CANVAS_WIDTH = 1200; // Maximum canvas width
  const MAX_CANVAS_HEIGHT = 600; // Maximum canvas height
  const MIN_CANVAS_WIDTH = 400; // Minimum canvas width
  const ASPECT_RATIO = 2; // Width to height ratio (2:1)

  // ... (other state variables remain the same)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = window.innerHeight;

        let newWidth = containerWidth;
        let newHeight = newWidth / ASPECT_RATIO;

        // Ensure the canvas doesn't exceed the maximum dimensions
        if (newWidth > MAX_CANVAS_WIDTH) {
          newWidth = MAX_CANVAS_WIDTH;
          newHeight = newWidth / ASPECT_RATIO;
        }

        // Ensure the canvas doesn't exceed the container height
        if (newHeight > containerHeight * 0.8) { // 80% of container height
          newHeight = containerHeight * 0.8;
          newWidth = newHeight * ASPECT_RATIO;
        }

        // Ensure the canvas doesn't go below the minimum width
        if (newWidth < MIN_CANVAS_WIDTH) {
          newWidth = MIN_CANVAS_WIDTH;
          newHeight = newWidth / ASPECT_RATIO;
        }

        setCanvasSize({ width: Math.round(newWidth), height: Math.round(newHeight) });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Reset game state when resetParameters changes or canvas size changes
    const scaleFactor = canvasSize.width / 800; // Calculate scale factor based on original 800x400 size

    ballRef.current = {
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      radius: ballRadius * scaleFactor,
      speed: BallInitialSpeed * scaleFactor,
      velocityX: 5 * scaleFactor,
      velocityY: 5 * scaleFactor,
      color: ballColor || 'white'
    };

    const scaledPaddleHeight = paddleHeight * scaleFactor;
    const scaledPaddleWidth = paddleWidth * scaleFactor;
    const scaledPaddleX = paddleX * scaleFactor;

    setPlayerY(canvasSize.height / 2 - scaledPaddleHeight / 2);
    setAiY(canvasSize.height / 2 - scaledPaddleHeight / 2);

    setPlayer(prev => ({
      ...prev,
      x: scaledPaddleX,
      y: canvasSize.height / 2 - scaledPaddleHeight / 2,
      width: scaledPaddleWidth,
      height: scaledPaddleHeight,
    }));

    setAi(prev => ({
      ...prev,
      x: canvasSize.width - scaledPaddleWidth - scaledPaddleX,
      y: canvasSize.height / 2 - scaledPaddleHeight / 2,
      width: scaledPaddleWidth,
      height: scaledPaddleHeight,
    }));
  }, [resetParameters, ballRadius, ballColor, paddleHeight, canvasSize]);

  // ... (rest of the component code remains the same)

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