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




//time variables
let startTime = Date.now();
let totalTime = 30; // 1 minute 30 seconds
let timeRemaining = totalTime;
let gameStarted = false;
let gameEnded = false;
let gamePaused = false;
//Game objects
// the vertical line in the middle
const net = {
	x: canvas.width / 2 - 1,
	y: 0,
	width: 2,
	height: 10,
	color: "#332D33",
};

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
// draw text
function drawText(text, x, y, color) {
	ctx.fillStyle = color;
	ctx.font = "45px fantasy";
	ctx.textAlign = "center";
	ctx.fillText(text, x, y);
}

function drawNet() {
	for (let i = 70; i <= canvasHeight; i += 15) {
		drawPaddle(net.x, net.y + i, net.width, net.height, net.color);
	}
}

function drawTimer() {
	const minutes = Math.floor(timeRemaining / 60);
	const seconds = timeRemaining % 60;
	const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	ctx.fillStyle = "#332D33";
	ctx.font = "45px fantasy";
	ctx.textAlign = "center";
	ctx.fillText(formattedTime, canvasWidth / 2, 50);
}

canvas.addEventListener("click", (evt) => {
	console.log("evt");
	if (evt.button === 0 && gameEnded && !gameStarted) {
		console.log("let's start again");
		startGame();
		requestAnimationFrame(game);
	}
});

// redraw canvas
function render() {
	// clear the canvas with a black rectangle
	drawPaddle(0, 0, canvasWidth, canvasHeight, "#DFE2DB");

	// draw the network
	drawNet();

	// draw the score
	drawText(player.score, canvasWidth / 4, 50, "#332D33"); // User score
	drawText(ai.score, (3 * canvasWidth) / 4, 50, "#332D33"); // AI score

	// draw the paddles
	drawPaddle(player.x, player.y, player.width, player.height, player.color); // user paddle
	drawPaddle(ai.x, ai.y, ai.width, ai.height, ai.color); // AI paddle

	// draw the ball
	drawBall(ball.x, ball.y, ball.radius, ball.color);
	drawTimer();

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

// reset the ball
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
	if (
		distX < ball.radius + paddle.width / 2 &&
		distY < ball.radius + paddle.height / 2
	) {
		// Collision detected
		return true;
	}
	// No collision
	return false;
}


function gameOver() {
	// explodeBall(ball);
	if (player.score > ai.score) {
		drawText("You Won!", canvasWidth / 2, canvasHeight / 2, "#332D33");
		player.won = true;
	} else if (ai.score > player.score) {
		drawText("You Lost!", canvasWidth / 2, canvasHeight / 2, "#332D33");
		ai.won = true;
	}
	else if (player.score == ai.score) {
		drawText("Its' A Draw", canvasWidth / 2, canvasHeight / 2, "#332D33");
		ai.won = false;
		player.won = false;
	}
	drawText("Game Over", canvasWidth / 2, canvasHeight / 2 - 50, "#332D33");
	cancelAnimationFrame(game);
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
	// check if the game is over and update the timer
	const elapcedTime = (Date.now() - startTime) / 1000; // get the elpaced time and convert it to seconds 
	timeRemaining = totalTime - Math.floor(elapcedTime); // calculate the remaining time
	if (!gameStarted) {
		gameStarted = true;
	} else {
		timeRemaining--;
		if (timeRemaining <= 0) {
			gameEnded = true;
			gameStarted = false;
			gamePaused = false;	
			gameOver();
		}
	}
}

function startGame() {
	startTime = Date.now();
	gameStarted = true;
	gameEnded = false;
	gamePaused = false; 
	player.score = 0;
	ai.score = 0;
	timeRemaining = totalTime;
	resetBall();
}

// Game intialization
function game() {
	if (!gameEnded && !gameStarted) {
		startGame();
		gameStarted = true;
	}
	if (gameStarted && !gameEnded) {
		render();
		update();
		requestAnimationFrame(game);
	}
	else if (gameEnded) {
		// wait for the user to click to restart the game
	}
}

//loop the game
// const FPS = 50; //frames per second
// setInterval(game, 1000 / FPS);
game();