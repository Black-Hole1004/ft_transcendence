import React from 'react';

const ReadyNotification = ({ 
    isOpen, 
    onClose, 
    message, 
    type = 'self' // 'self' or 'opponent'
}) => {
    if (!isOpen) return null;

    const containerStyle = {
        animation: 'fadeIn 0.3s ease-out'
    };

    const modalStyle = {
        animation: 'slideIn 0.3s ease-out'
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            style={containerStyle}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideIn {
                        from { transform: translateY(-20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .glow-text {
                        text-shadow: 0 0 10px rgba(230, 221, 198, 0.5);
                    }
                    .status-pulse {
                        animation: pulse 2s infinite;
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                `}
            </style>

            <div 
                className="bg-[#0E0B0A] border-2 border-[#76797C] text-[#E6DDC6] p-8 rounded-lg max-w-md w-full mx-4 shadow-xl"
                style={modalStyle}
            >
                <div className={`text-2xl font-bold mb-6 glow-text ${type === 'self' ? 'text-green-400' : 'text-blue-400'}`}>
                    <div className="flex items-center gap-3">
                        {type === 'self' ? '🎮' : '👥'}
                        <span className="status-pulse">
                            {type === 'self' ? 'Ready Status' : 'Opponent Update'}
                        </span>
                    </div>
                </div>
                
                <div className="text-lg mb-6 leading-relaxed">
                    {message}
                </div>
                
                {type === 'self' && (
                    <div className="text-gray-400 mb-6 p-4 bg-black bg-opacity-30 rounded-lg border border-gray-800">
                        <p className="text-sm">
                            Waiting for opponent to be ready and then you start the game...
                        </p>
                        <div className="mt-2 flex justify-center">
                            <div className="loading-dots">
                                <span>.</span><span>.</span><span>.</span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="flex justify-end">
                    <button 
                        onClick={onClose}
                        className="bg-[#BE794A] hover:bg-[#61463A] text-[#E6DDC6] font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReadyNotification;