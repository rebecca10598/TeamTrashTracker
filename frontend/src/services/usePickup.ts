import { useAuth } from '../context/useAuth';
import { api } from "./api";

export const usePickup = () => 
{
    const { token } = useAuth();

    const submitPickup = async (lat: number, lng: number, image = "") => 
    {
        if (!token) throw new Error("No auth token");

        const res = await api.post(
            "/pickups",
            { lat, lng, image },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    };

    return { submitPickup };
};