"use client"
import { create } from "zustand";
import { IUser, IUserStore } from "../interfaces/IUser";

export const useUserStore = create<IUserStore>((set) => ({
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    isAuth: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
    setUser: (user: IUser) => set({ user, isAuth: true }),
    setToken: (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
        set({ token });
    },
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
        set({ user: null, token: null, isAuth: false });
    }
}));