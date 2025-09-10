import { useEffect, useState } from "react";
import axios from "axios";
import { TRAINING_URL } from "../config/api.config";
import ProfileData from "../interfaces/IProfileData";

const useUserProfile = (userId: number | undefined) => {
    const [data, setData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await axios.get<ProfileData>(
                    `${TRAINING_URL}/user-profiles/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }
                );
                setData(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile data");
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, loading, error };
};

export default useUserProfile;
