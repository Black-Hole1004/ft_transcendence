class MonteCarloAI {
	constructor(difficulty = 'medium') {
		this.difficulty = difficulty
		this.successfulMovePatterns = new Map() // Store successful hit positions as key: "x,y" => value: count (number of times it was a successful hit)
		this.consecutiveHits = 0
		this.params = this.getParams()
	}

	static BASE_PARAMS = {
		reactionTime: {
			easy: 600,
			medium: 300,
			hard: 100,
		},
		speedMultiplier: {
			easy: 1,
			medium: 0.7,
			hard: 0.5,
		},
		noiseBase: {
			easy: 0.3,
			medium: 0.15,
			hard: 0.05,
		},
		learningRate: {
			easy: 0.2,
			medium: 0.4,
			hard: 0.6,
		},
	}

	getParams() {
		const base = MonteCarloAI.BASE_PARAMS
		return {
			reactionTime: base.reactionTime[this.difficulty],
			speed: base.speedMultiplier[this.difficulty],
			noise: base.noiseBase[this.difficulty],
			learning: base.learningRate[this.difficulty],
		}
	}

	predictBallPosition(ballPosition, ballVelocity, paddle) {
		let predictions = [] // Store 100 different predictions
		// Get the top 3 most successful hit positions from memory
		const hitPatterns = Array.from(this.successfulMovePatterns.entries())
			.sort((a, b) => b[1] - a[1]) // Sort by number of successful hits
			.slice(0, 3) // Take only top 3

		// Make 100 different guesses about where the ball might go randomly
		for (let i = 0; i < 100; i++) {
			// Decide whether to use past experience or physics
			const usePattern = Math.random() < this.params.learning && hitPatterns.length > 0
			predictions.push(
				usePattern
					? this.patternPrediction(hitPatterns) // use past experience to predict (memory)
					: this.physicsPrediction(ballPosition, ballVelocity) // use physics to predict (calculation)
			)
		}

		return this.averagePredictions(predictions, paddle) // average the predictions
	}

	patternPrediction(patterns) {
		const pattern = patterns[Math.floor(Math.random() * patterns.length)][0]
		const [x, y] = pattern.split(',').map(Number)
		return {
			x: x + (Math.random() - 0.5) * 40,
			y: y + (Math.random() - 0.5) * 40,
		}
	}

	physicsPrediction(ballPosition, ballVelocity) {
		const noise = this.calculateNoise()
		return {
			x: ballPosition.x + ballVelocity.x * (1 + noise.x),
			y: ballPosition.y + ballVelocity.y * (1 + noise.y),
		}
	}

	averagePredictions(predictions, paddle) {
		// Calculate average X and Y positions
		const avgX = predictions.reduce((sum, p) => sum + p.x, 0) / predictions.length
		const avgY = predictions.reduce((sum, p) => sum + p.y, 0) / predictions.length

		    // Make sure paddle stays within game boundaries
		return {
			x: avgX,
			y: Math.max(paddle.height / 2, Math.min(avgY, 400 - paddle.height / 2)),
		}
	}

	calculateNoise() {
		return {
			x: (Math.random() - 0.5) * this.params.noise * 2,
			y: (Math.random() - 0.5) * this.params.noise * 3,
		}
	}

	recordHit(ballPos) {
		// Count successful hits in a row
		this.consecutiveHits++
		// Convert the position to a string like "400,250"
		const pattern = `${Math.round(ballPos.x)},${Math.round(ballPos.y)}`
		
		// Add to Map or increase the count if already exists
		this.successfulMovePatterns.set(
			pattern,
			(this.successfulMovePatterns.get(pattern) || 0) + 1
		)
		// Remove the oldest pattern if there are more than 50
		if (this.successfulMovePatterns.size > 50) {
			const oldestPattern = Array.from(this.successfulMovePatterns.keys())[0]
			this.successfulMovePatterns.delete(oldestPattern)
		}
	}

	recordMiss() {
		this.consecutiveHits = 0
	}

	getAdjustedSpeed(baseSpeed) {
		return baseSpeed * this.params.speed
	}
}

export default MonteCarloAI
