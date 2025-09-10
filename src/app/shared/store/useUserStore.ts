import { create } from "zustand";
import axios from "axios";
import IUser from "../interfaces/IUser";
import { AUTH_ENDPOINTS, TRAINING_ENDPOINTS, API_URL } from "../config/api.config";
import ProfileData from "../interfaces/IProfileData";

interface UserStore {
    user: IUser | null;
    profile: ProfileData | null;
    hasProfile: boolean;
    setUser: (user: IUser) => void;
    setProfile: (profile: ProfileData) => void;
    clearUser: () => void;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
    fetchProfile: (userId: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    profile: null,
    hasProfile: localStorage.getItem("hasProfile") === "true",

    setUser: (user) => set({ user }),

    setProfile: (profile) => {
        set({ profile, hasProfile: true });
        localStorage.setItem("hasProfile", "true");

        const currentUser = get().user;
        if (currentUser) {
            set({ user: { ...currentUser, hasProfile: true } });
        }
    },

    clearUser: () => {
        set({ user: null, profile: null, hasProfile: false });
        localStorage.removeItem("token");
        localStorage.removeItem("hasProfile");
    },

    logout: async () => {
        try {
            await axios.post(AUTH_ENDPOINTS.LOGOUT, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
        } catch (error) {
            console.error("Logout API error:", error);
        } finally {
            set({ user: null, profile: null, hasProfile: false });
            localStorage.removeItem("token");
            localStorage.removeItem("hasProfile");
        }
    },

    fetchUser: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            set({ user: null, hasProfile: false });
            return;
        }

        try {
            const res = await axios.get<{ success: boolean; user: IUser }>(
                AUTH_ENDPOINTS.ME,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: 5000
                }
            );

            if (res.data.success && res.data.user) {
                const userData = res.data.user;

                try {
                    const profileRes = await axios.get<ProfileData>(
                        `${TRAINING_ENDPOINTS.USER_PROFILES}/${userData.id}`,
                        { timeout: 5000 }
                    );

                    if (profileRes.data && typeof profileRes.data === 'object' && 'id' in profileRes.data) {
                        set({
                            user: { ...userData, hasProfile: true },
                            profile: profileRes.data,
                            hasProfile: true,
                        });
                        localStorage.setItem("hasProfile", "true");
                    } else {
                        throw new Error("Invalid profile data");
                    }
                } catch (error) {
                    set({
                        user: { ...userData, hasProfile: false },
                        profile: null,
                        hasProfile: false,
                    });
                    localStorage.setItem("hasProfile", "false");
                }
            } else {
                set({ user: null, hasProfile: false });
                localStorage.setItem("hasProfile", "false");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            set({ user: null, hasProfile: false });
            localStorage.setItem("hasProfile", "false");
        }
    },

    fetchProfile: async (userId: number) => {
        try {
            const res = await axios.get<ProfileData>(
                `${TRAINING_ENDPOINTS.USER_PROFILES}/${userId}`,
                { timeout: 5000 }
            );

            if (res.data && typeof res.data === 'object' && 'id' in res.data) {
                set({ profile: res.data, hasProfile: true });
                localStorage.setItem("hasProfile", "true");

                const currentUser = get().user;
                if (currentUser) {
                    set({ user: { ...currentUser, hasProfile: true } });
                }
            } else {
                throw new Error("Invalid profile data");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            set({ profile: null, hasProfile: false });
            localStorage.setItem("hasProfile", "false");
        }
    },
}));
