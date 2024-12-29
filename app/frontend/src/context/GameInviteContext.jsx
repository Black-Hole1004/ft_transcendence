import React, { createContext, useState, useContext } from "react";

// Create the context
const GameInviteContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    
    const [data, setData] = useState(null);
    const [isGameAccepted, setIsGameAccepted] = useState(false);


    return (
    <GameInviteContext.Provider value={{ setData, data, isGameAccepted, setIsGameAccepted }}>
        {children}
    </GameInviteContext.Provider>
    );
};

// Custom hook for consuming the context
export const useGameInvite = () => {
    return useContext(GameInviteContext);
};
