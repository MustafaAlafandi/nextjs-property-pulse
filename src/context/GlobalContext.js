'use client';
import {createContext, useContext, useState} from 'react';

// Create context

const GlobalContext = createContext(null);

// Create a provider component
export const GlobalProvider = ({children}) => {
    const [unreadCount, setUnreadCount] = useState(0);
    return (
        <GlobalContext.Provider value={{unreadCount, setUnreadCount}} >
        {children}
        </GlobalContext.Provider>
    );
}

// Create a custom hook to use the GlobalContext
export const useGlobalContext = () => {
    return useContext(GlobalContext);
}