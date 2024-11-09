// src/components/Game/GameTestingControls.jsx
import React, { useState } from 'react';

const GameTestingControls = ({ onTest, isConnected }) => {
    const [testSpeed, setTestSpeed] = useState(1);
    const [autoTest, setAutoTest] = useState(false);

    const tests = [
        {
            name: 'Move Paddle Up',
            action: () => onTest('paddle_move', { y: -20 })
        },
        {
            name: 'Move Paddle Down',
            action: () => onTest('paddle_move', { y: 20 })
        },
        {
            name: 'Oscillate Ball',
            action: () => onTest('ball_update', {
                x: 400 + Math.sin(Date.now() / 1000) * 100,
                y: 200 + Math.cos(Date.now() / 1000) * 100
            })
        },
        {
            name: 'Test Collision',
            action: () => onTest('paddle_move', { y: 200 })
        }
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                    <span>Test Speed:</span>
                    <input
                        type="range"
                        min="0.1"
                        max="2"
                        step="0.1"
                        value={testSpeed}
                        onChange={(e) => setTestSpeed(parseFloat(e.target.value))}
                        className="w-32"
                    />
                    <span>{testSpeed}x</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={autoTest}
                        onChange={(e) => setAutoTest(e.target.checked)}
                    />
                    <span>Auto Test</span>
                </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {tests.map((test, index) => (
                    <button
                        key={index}
                        onClick={test.action}
                        disabled={!isConnected}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        {test.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GameTestingControls;