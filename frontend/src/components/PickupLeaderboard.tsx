import React, { useEffect, useState } from "react";
import { api } from "../services/api";

interface LeaderboardEntry 
{
    displayName: string;
    email: string;
    totalPoints: number;
    pickups: number;
}

export const PickupLeaderboard: React.FC = () => 
{
    const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);

    useEffect(() => 
    {
        const fetchLeaderboard = async () => 
        {
            try 
            {
                const res = await api.get("/leaderboard");
                setLeaders(res.data);
            } 
            catch (err) 
            {
                console.error("❌ Failed to fetch leaderboard:", err);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div>
            <h3>🏆 Top Trash Warriors</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#ddd" }}>
                        <th>#</th>
                        <th>User</th>
                        <th>Points</th>
                        <th>Pickups</th>
                    </tr>
                </thead>
                <tbody>
                    {leaders.map((user, index) => (
                        <tr key={index} style={{ textAlign: "center" }}>
                            <td>{index + 1}</td>
                            <td>{user.displayName || user.email}</td>
                            <td>{user.totalPoints}</td>
                            <td>{user.pickups}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
