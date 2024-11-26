import React, { createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User object: { token, role }

    const login = async (username, password) => {
        const response = await fetch('http://43.224.182.185:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            setUser({
                token: data.token,
                username: data.username, // Add username
                name: data.name, // Add name
                role: data.role,
            });
        } else {
            throw new Error(data.message);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);