import { create } from "zustand";
import IUser from "../interfaces/IUser";
import { AUTH_ENDPOINTS, TRAINING_ENDPOINTS } from "../config/api.config";
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

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    profile: null,
    hasProfile: false,
    setUser: (user) => set({ user }),
    setProfile: (profile) => {
        set({ profile, hasProfile: true });
        localStorage.setItem("hasProfile", "true");
    },
    clearUser: () => {
        set({ user: null, profile: null, hasProfile: false });
        localStorage.removeItem("token");
        localStorage.removeItem("hasProfile");
    },
    logout: async () => {
        set({ user: null, profile: null, hasProfile: false });
        localStorage.removeItem("token");
        localStorage.removeItem("hasProfile");
    },
    fetchUser: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            set({ user: null });
            return;
        }
        try {
            const res = await fetch(AUTH_ENDPOINTS.ME, {
                headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
            });
            const json = await res.json();
            if (json.success && json.user) {
                set({ user: json.user, hasProfile: localStorage.getItem("hasProfile") === "true" });
            } else {
                set({ user: null, hasProfile: false });
            }
        } catch {
            set({ user: null, hasProfile: false });
        }
    },
    fetchProfile: async (userId: number) => {
        try {
            const res = await fetch(`${TRAINING_ENDPOINTS.USER_PROFILES}/${userId}`);
            if (!res.ok) return;
            const profile: ProfileData = await res.json();
            set({ profile, hasProfile: true });
            localStorage.setItem("hasProfile", "true");
        } catch { }
    },
}));
