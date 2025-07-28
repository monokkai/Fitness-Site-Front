import { create } from "zustand";
import IUser from "../interfaces/IUser";

interface UserStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
