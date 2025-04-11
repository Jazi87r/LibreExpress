import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(''); // Añadido para manejar el ID del usuario

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                isAdmin,
                setIsAdmin,
                username,
                setUsername,
                userId,
                setUserId, // Proveer método para actualizar el ID
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
