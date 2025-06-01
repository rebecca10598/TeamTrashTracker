import React, { useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import type { ReactNode } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContextValue";
import type { ExtendedUser } from "./AuthContextValue";

interface AuthProviderProps 
{
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => 
{
    const [user, setUser] = useState<ExtendedUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => 
    {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => 
        {
            if (firebaseUser) 
            {
                const idToken = await firebaseUser.getIdToken();
                console.log("🔥 Your fresh Firebase ID token:", idToken);
                setToken(idToken);
                // fetch extended user from backend (badges, points, etc.)
                const res = await fetch("http://localhost:5000/api/users/me", {
                    headers: 
                    {
                        Authorization: `Bearer ${idToken}`,
                    },
                });

                const backendUser = await res.json();
                setUser({ ...firebaseUser, ...backendUser });
            } 
            else 
            {
                setUser(null);
                setToken(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (): Promise<void> => 
    {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const logout = async (): Promise<void> => 
    {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
