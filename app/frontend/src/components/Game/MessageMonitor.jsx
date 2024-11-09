// MessageMonitor.jsx
import React from 'react';

const MessageMonitor = ({ messages }) => {
    return (
        <div className="bg-black bg-opacity-20 p-4 rounded overflow-auto max-h-96">
            {messages.map((msg, index) => (
                <div 
                    key={index} 
                    className={`mb-2 p-2 rounded ${
                        msg.direction === 'sent' ? 'bg-blue-900' : 'bg-green-900'
                    }`}
                >
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{msg.time}</span>
                        <span className={msg.direction === 'sent' ? 'text-blue-300' : 'text-green-300'}>
                            {msg.direction}
                        </span>
                    </div>
                    <pre className="text-sm mt-1 whitespace-pre-wrap">
                        {JSON.stringify(msg.data, null, 2)}
                    </pre>
                </div>
            ))}
        </div>
    );
};

export default MessageMonitor;