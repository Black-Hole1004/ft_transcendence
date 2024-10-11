class PongGame {
    constructor(canvas, player1, player2, duration) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.player1 = player1;
      this.player2 = player2;
      this.duration = duration;
  
      // Set up game objects
      this.ball = {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        radius: 10,
        speedX: 5,
        speedY: 5
      };
  
      this.paddles = {
        width: 10,
        height: 100,
        player1: {
          y: this.canvas.height / 2 - 50,
          color: player1.color
        },
        player2: {
          y: this.canvas.height / 2 - 50,
          color: player2.color
        }
      };
  
      this.scores = {
        player1: 0,
        player2: 0
      };
  
      this.timeRemaining = duration;
  
      // Bind methods
      this.update = this.update.bind(this);
      this.draw = this.draw.bind(this);
      this.start = this.start.bind(this);
    }
  
    update() {
      // Update ball position
      this.ball.x += this.ball.speedX;
      this.ball.y += this.ball.speedY;
  
      // Ball collision with top and bottom walls
      if (this.ball.y - this.ball.radius < 0 || this.ball.y + this.ball.radius > this.canvas.height) {
        this.ball.speedY = -this.ball.speedY;
      }
  
      // Ball collision with paddles
      if (
        (this.ball.x - this.ball.radius < this.paddles.width && this.ball.y > this.paddles.player1.y && this.ball.y < this.paddles.player1.y + this.paddles.height) ||
        (this.ball.x + this.ball.radius > this.canvas.width - this.paddles.width && this.ball.y > this.paddles.player2.y && this.ball.y < this.paddles.player2.y + this.paddles.height)
      ) {
        this.ball.speedX = -this.ball.speedX;
      }
  
      // Ball out of bounds
      if (this.ball.x < 0) {
        this.scores.player2++;
        this.resetBall();
      } else if (this.ball.x > this.canvas.width) {
        this.scores.player1++;
        this.resetBall();
      }
  
      // Update time remaining
      this.timeRemaining -= 1/60; // Assuming 60 FPS
      if (this.timeRemaining <= 0) {
        this.endGame();
      }
    }
  
    draw() {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Draw paddles
      this.ctx.fillStyle = this.paddles.player1.color;
      this.ctx.fillRect(0, this.paddles.player1.y, this.paddles.width, this.paddles.height);
      
      this.ctx.fillStyle = this.paddles.player2.color;
      this.ctx.fillRect(this.canvas.width - this.paddles.width, this.paddles.player2.y, this.paddles.width, this.paddles.height);
  
      // Draw ball
      this.ctx.beginPath();
      this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FFF';
      this.ctx.fill();
      this.ctx.closePath();
  
      // Draw scores
      this.ctx.font = '24px Arial';
      this.ctx.fillStyle = '#FFF';
      this.ctx.fillText(this.scores.player1, this.canvas.width / 4, 30);
      this.ctx.fillText(this.scores.player2, 3 * this.canvas.width / 4, 30);
  
      // Draw time remaining
      this.ctx.fillText(`Time: ${Math.ceil(this.timeRemaining)}`, this.canvas.width / 2 - 40, 30);
    }
  
    resetBall() {
      this.ball.x = this.canvas.width / 2;
      this.ball.y = this.canvas.height / 2;
      this.ball.speedX = -this.ball.speedX;
      this.ball.speedY = Math.random() > 0.5 ? 5 : -5;
    }
  
    movePaddle(player, direction) {
      const speed = 5;
      const paddle = this.paddles[player];
      if (direction === 'up' && paddle.y > 0) {
        paddle.y -= speed;
      } else if (direction === 'down' && paddle.y + this.paddles.height < this.canvas.height) {
        paddle.y += speed;
      }
    }
  
    start() {
      this.gameLoop = setInterval(() => {
        this.update();
        this.draw();
      }, 1000 / 60); // 60 FPS
    }
  
    endGame() {
      clearInterval(this.gameLoop);
      // Handle end game logic (e.g., display winner, update scores)
      console.log('Game Over!');
      console.log(`Final Scores - Player 1: ${this.scores.player1}, Player 2: ${this.scores.player2}`);
    }
  }
  
  export default PongGame;