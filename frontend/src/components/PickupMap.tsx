import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "../services/api";

// type definition for one pickup
interface Pickup 
{
    _id: string;
    location: {
        lat: number;
        lng: number;
    };
    timestamp: string;
    image?: string;
    points: number;
    user: {
        displayName: string;
        email: string;
    };
}

// default map center set to Colombo
const defaultCenter: [number, number] = [6.9271, 79.8612];

// default fix for missing marker icons in Leaflet 
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// 🔵 custom blue icon for user location
const userIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// utility to programmatically recenter map
const RecenterMap = ({ center }: { center: [number, number] }) => 
{
    const map = useMap();
    useEffect(() => 
    {
        map.setView(center, 14);
    }, [center, map]);
    return null;
};

export const PickupMap: React.FC = () => 
{
    const [pickups, setPickups] = useState<Pickup[]>([]);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    const userMarkerRef = useRef<L.Marker | null>(null);

    // fetching pickups from backend
    useEffect(() => 
    {
        const fetchPickups = async () => 
        {
            try 
            {
                const res = await api.get("/pickups");
                setPickups(res.data);
            } 
            catch (err) 
            {
                console.error("❌🧤 Failed to fetch any pickups:", err);
            }
        };
        fetchPickups();
    }, []);

    // get the user's real-time location
    useEffect(() => 
    {
        if (navigator.geolocation) 
        {
            navigator.geolocation.getCurrentPosition(
                (pos) => 
                {
                    const { latitude, longitude } = pos.coords;
                    setUserLocation([latitude, longitude]);
                },
                (err) => 
                {
                    console.warn("❌ Geolocation error:", err);
                    setUserLocation(defaultCenter); // fallback to Colombo
                }
            );
        } else {
        setUserLocation(defaultCenter);
        }
    }, []);

    useEffect(() => 
    {
        if (userLocation && userMarkerRef.current) 
        {
            setTimeout(() => // delay so Leaflet attaches marker to map
            {
                userMarkerRef.current?.openPopup();
            }, 100); 
        }
    }, [userLocation]);

    // final map center logic
    const center = userLocation || defaultCenter;

    return (
        <div style={{ height: "500px", width: "100%" }}>
            <MapContainer
                center={center}
                zoom={12}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
            <RecenterMap center={center} />

            <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* 🔵 user marker */}
            {userLocation && (
                <Marker
                    position={userLocation}
                    icon={userIcon}
                    ref={(ref) => 
                    {
                        if (ref) 
                        {
                            userMarkerRef.current = ref;
                        }
                    }}
                >
                    <Popup>You are here 📍</Popup>
                </Marker>
            )}

            {/* 🧤 all pickup markers */}
            {pickups.map((pickup) => (
            <Marker
                key={pickup._id}
                position={[pickup.location.lat, pickup.location.lng]}
            >
                        <Popup>
                            <strong>{pickup.user.displayName}</strong>
                            <br />
                            Points: {pickup.points}
                            <br />
                            {pickup.image && (
                                <img
                                    src={`http://localhost:5000${pickup.image}`}
                                    alt="Trash"
                                    style={{ width: "100px", height: "auto", marginTop: "5px" }}
                                />
                            )}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
