import { useEffect, useState } from "react";
import { AUTH_ENDPOINTS } from "../config/api.config";
import IUser from "../interfaces/IUser";

export function useCurrentUser() {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        async function fetchUser() {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(AUTH_ENDPOINTS.ME, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch user: ${response.status}`);
                }

                const json = await response.json();
                console.log("ME RESPONSE:", json);

                if (json.success && json.user) {
                    const apiUser = json.user;
                    setUser({
                        id: apiUser.id,
                        username: apiUser.username,
                        email: apiUser.email,
                        goal: apiUser.goal,
                        createdAt: apiUser.createdAt || apiUser.created_at || "",
                    });
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    return { user, loading };
}
