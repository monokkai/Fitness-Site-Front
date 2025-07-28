import { create } from "zustand";
import IUser from "../interfaces/IUser";
import { AUTH_ENDPOINTS } from "../config/api.config";

interface UserStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    logout: async () => {
        localStorage.removeItem("token");
        set({ user: null });
    },
    fetchUser: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            set({ user: null });
            return;
        }
        try {
            const response = await fetch(AUTH_ENDPOINTS.ME, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                set({ user: null });
                return;
            }
            const json = await response.json();
            if (json.success && json.user) {
                const apiUser = json.user;
                set({
                    user: {
                        id: apiUser.id,
                        username: apiUser.username,
                        email: apiUser.email,
                        goal: apiUser.goal,
                        createdAt: apiUser.createdAt || apiUser.created_at || "",
                    },
                });
            } else {
                set({ user: null });
            }
        } catch {
            set({ user: null });
        }
    },
}));
