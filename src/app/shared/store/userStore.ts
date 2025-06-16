import { create } from "zustand";
import { IUser } from "../interfaces/IUser";

interface UserStore {
    user: {
        id: number;
        username: string;
        email: string;
    } | null;
    token: string | null;
    isAuth: boolean;
    setUser: (user: IUser) => void;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuth: !!localStorage.getItem('token'),
    setUser: (user: IUser) => set({ user, isAuth: true }),
    setToken: (token: string) => {
        localStorage.setItem('token', token);
        set({ token });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuth: false });
    }
}));