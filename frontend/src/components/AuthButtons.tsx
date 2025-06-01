import React from 'react';
import { useAuth } from '../context/useAuth';

export const AuthButtons: React.FC = () => 
{
    const { user, login, logout } = useAuth();

    return (
        <div>
        {user ? (
            <>
                <p>Welcome, {user.displayName}</p>
                <button onClick={logout}>Logout</button>
            </>
        ) : (
            <button onClick={login}>Login with Google</button>
        )}
        </div>
    );
};
