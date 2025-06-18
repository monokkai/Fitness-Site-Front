"use client"
import { create } from "zustand";
import { IUser } from "../interfaces/IUser";
import api from "../api/axios";

interface UserStore {
    user: IUser | null;
    isAuthenticated: boolean;
    setUser: (user: IUser | null) => void;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user: IUser | null) => set({ user, isAuthenticated: !!user }),
    logout: async () => {
        try {
            await api.post('/auth/logout');
            set({ user: null, isAuthenticated: false });
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
}));