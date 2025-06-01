import { createContext } from "react";
import type { User } from "firebase/auth";

export interface ExtendedUser extends User 
{
    badges?: string[];
    totalPoints?: number;
    team?: string;
    currentStreak?: number;     
    longestStreak?: number;      
    lastPickupAt?: Date;         
}

export interface AuthContextType 
{
    user: ExtendedUser | null;
    token: string | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
