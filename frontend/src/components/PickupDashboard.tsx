import React, { useEffect, useState } from "react";
import { api } from "../services/api";

interface Pickup 
{
    _id: string;
    user: 
    {
        displayName: string;
        email: string;
    };
    timestamp: string;
    points: number;
    location: 
    {
        lat: number;
        lng: number;
    };
    image?: string;
}

export const PickupDashboard: React.FC = () => 
{
    const [pickups, setPickups] = useState<Pickup[]>([]);
    const [filterUser, setFilterUser] = useState<string>("");

    useEffect(() => 
    {
        const fetchPickups = async () => 
        {
            const res = await api.get("/pickups");
            setPickups(res.data);
        };
        fetchPickups();
    }, []);

    const filtered = pickups.filter(p =>
        filterUser ? p.user.displayName.toLowerCase().includes(filterUser.toLowerCase()) : true
    );

    return (
        <div style={{ padding: "1rem" }}>
            <h2>🧤 Cleanup Dashboard</h2>
            <input
                type="text"
                placeholder="Filter by user..."
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                style={{ padding: "0.5rem", marginBottom: "1rem", width: "250px" }}
            />

            {filtered.length === 0 ? 
            (
                <p>No results found❗</p>
            ) : (
                <ul>
                    {filtered.map((pickup) => 
                    (
                        <li key={pickup._id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
                            <strong>{pickup.user.displayName}</strong> - {new Date(pickup.timestamp).toLocaleString()}<br />
                            📍 ({pickup.location.lat.toFixed(4)}, {pickup.location.lng.toFixed(4)})<br />
                            🏆 Points: {pickup.points}<br />
                            {pickup.image && (
                                <img
                                    src={`http://localhost:5000${pickup.image}`}
                                    alt="Trash"
                                    style={{ width: "120px", marginTop: "5px" }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
