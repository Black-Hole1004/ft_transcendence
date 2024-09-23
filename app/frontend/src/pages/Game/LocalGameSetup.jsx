import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const LocalGameSetup = () => {
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [gameDuration, setGameDuration] = useState(30) // Default 60 seconds
  const [player1Color, setPlayer1Color] = useState('#ffffff') // Default white
  const [player2Color, setPlayer2Color] = useState('#ffffff') // Default white
  const [ballColor, setBallColor] = useState('#ffffff') // Default white
  const location = useLocation()
  const navigate = useNavigate()
  const { backgroundId } = location.state || {}

  const handleSubmit = (e) => {
    e.preventDefault()
    if (player1Name && player2Name) {
      navigate('/local-game', {
        state: {
          mode: 'local',
          player1: { name: player1Name, color: player1Color },
          player2: { name: player2Name, color: player2Color },
          ballColor: ballColor,
          duration: gameDuration,
          backgroundId
        }
      })
    }
  }

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
  }

  const handleRandomColors = () => {
    setPlayer1Color(generateRandomColor())
    setPlayer2Color(generateRandomColor())
    setBallColor(generateRandomColor())
  }

  const PaddlePreview = ({ color }) => (
    <div 
      className="w-4 h-16 rounded"
      style={{ backgroundColor: color }}
    ></div>
  )

  const BallPreview = ({ color }) => (
    <div 
      className="w-6 h-6 rounded-full"
      style={{ backgroundColor: color }}
    ></div>
  )

  return (
    <div className="min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-backdrop-80 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Local Game Setup</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="player1Name">
            Player 1 Name
          </label>
          <input
            id="player1Name"
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Enter Player 1 name"
            className="w-full p-2 bg-white text-black rounded placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="player1Color">
            Player 1 Paddle Color
          </label>
          <div className="flex items-center">
            <input
              id="player1Color"
              type="color"
              value={player1Color}
              onChange={(e) => setPlayer1Color(e.target.value)}
              className="w-8 h-8 mr-2"
            />
            <span className="mr-2">{player1Color}</span>
            <PaddlePreview color={player1Color} />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="player2Name">
            Player 2 Name
          </label>
          <input
            id="player2Name"
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            placeholder="Enter Player 2 name"
            className="w-full p-2 bg-white text-black rounded placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="player2Color">
            Player 2 Paddle Color
          </label>
          <div className="flex items-center">
            <input
              id="player2Color"
              type="color"
              value={player2Color}
              onChange={(e) => setPlayer2Color(e.target.value)}
              className="w-8 h-8 mr-2"
            />
            <span className="mr-2">{player2Color}</span>
            <PaddlePreview color={player2Color} />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="gameDuration">
            Game Duration (seconds)
          </label>
          <input
            id="gameDuration"
            type="number"
            value={gameDuration}
            onChange={(e) => setGameDuration(parseInt(e.target.value))}
            placeholder="Game duration (seconds)"
            className="w-full p-2 bg-white text-black rounded placeholder-gray-400"
            required
            min="10"
            max="300"
          />
        </div>


        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="player2Color">
            Ball color
          </label>
          <div className="flex items-center">
            <input
              id="ballColor"
              type="color"
              value={ballColor}
              onChange={(e) => setBallColor(e.target.value)}
              className="w-8 h-8 mr-2"
            />
            <span className="mr-2">{ballColor}</span>
            <BallPreview color={ballColor} />
          </div>
        </div>


        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Paddle Preview</label>
          <div className="flex justify-around items-center p-4 bg-gray-700 rounded">
            <div className="flex flex-col items-center">
              <span className="mb-2">Player 1</span>
              <PaddlePreview color={player1Color} />
            </div>
            <BallPreview color={ballColor} />
            <div className="flex flex-col items-center">
              <span className="mb-2">Player 2</span>
              <PaddlePreview color={player2Color} />
            </div>
          </div>
        </div>

        <button 
          type="button" 
          onClick={handleRandomColors}
          className="w-full p-2 mb-4 bg-secondary text-primary rounded hover:bg-secondary-dark transition"
        >
          Generate Random Colors
        </button>

        <button type="submit" className="w-full p-2 bg-primary text-backdrop-80 rounded hover:bg-primary-dark transition">
          Start Game
        </button>
      </form>
    </div>
  )
}

export default LocalGameSetup