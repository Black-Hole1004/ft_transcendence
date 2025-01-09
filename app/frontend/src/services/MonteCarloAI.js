class MonteCarloAI {
	constructor(difficulty = 'medium') {
		this.difficulty = difficulty
		this.successfulMovePatterns = new Map()
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
		let predictions = []
		const hitPatterns = Array.from(this.successfulMovePatterns.entries())
			.sort((a, b) => b[1] - a[1])
			.slice(0, 3)

		for (let i = 0; i < 100; i++) {
			const usePattern = Math.random() < this.params.learning && hitPatterns.length > 0
			predictions.push(
				usePattern
					? this.patternPrediction(hitPatterns)
					: this.physicsPrediction(ballPosition, ballVelocity)
			)
		}

		return this.averagePredictions(predictions, paddle)
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
		const avgX = predictions.reduce((sum, p) => sum + p.x, 0) / predictions.length
		const avgY = predictions.reduce((sum, p) => sum + p.y, 0) / predictions.length

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
		this.consecutiveHits++
		const pattern = `${Math.round(ballPos.x)},${Math.round(ballPos.y)}`
		this.successfulMovePatterns.set(
			pattern,
			(this.successfulMovePatterns.get(pattern) || 0) + 1
		)

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
