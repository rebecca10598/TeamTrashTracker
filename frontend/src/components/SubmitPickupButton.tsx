import React, { useEffect, useState } from "react";
import { usePickup } from "../services/usePickup";
import { uploadToExpress } from "../services/uploadToExpress";

export const SubmitPickupButton: React.FC = () => 
{
    const { submitPickup } = usePickup();

    const [file, setFile] = useState<File | null>(null);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    // get current location on load
    useEffect(() => 
    {
        if (!navigator.geolocation) 
        {
            alert("Geolocation is not supported by your browser 🙁");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => 
            {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (err) => 
            {
                console.error("Geolocation error❗:", err);
                alert("Could not get location ⚠️\n" + err.message);
            }
        );
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        if (e.target.files && e.target.files[0]) 
        {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => 
    {
        try 
        {
            if (!location) 
            {
                alert("Location not available❗Please enable location services");
                return;
            }

            let imageUrl = "";
            if (file) 
            {
                imageUrl = await uploadToExpress(file);
            }

            const result = await submitPickup(location.lat, location.lng, imageUrl);
            console.log("✅ Pickup submitted:", result);
            alert("Pickup with location and image successfully submitted ✅");
        } 
        catch (err) 
        {
            console.error("❌ Pickup failed", err);
            alert("Error submitting pickup");
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleSubmit} disabled={!location}>
                {location ? "Submit Pickup with Location 📍" : "Getting Location..."}
            </button>
        </div>
    );
};
