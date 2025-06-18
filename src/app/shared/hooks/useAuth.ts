'use client';

import { AuthFormData } from "@/app/shared/interfaces/IAuth";
import { create } from "zustand"
import api from "../api/axios";
import { useRouter } from 'next/navigation';
import { useUserStore } from "../store/userStore";
import { IAuthResponse } from "../interfaces/IUser";

const useAuthStore = create<AuthFormData>(set => ({
    email: "",
    password: "",
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password })
}))

export const useAuth = () => {
    const router = useRouter();
    const { email, password, setEmail, setPassword } = useAuthStore();
    const { setUser } = useUserStore();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        if (id == "email") {
            setEmail(value);
        }
        if (id == "password") {
            setPassword(value);
        }
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            const { user } = response.data as IAuthResponse;
            setUser(user);
            setEmail("");
            setPassword("");
            router.push('/');

        } catch (error: any) {
            if (error instanceof Error) {
                console.error("Error occurred:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    }

    return { formData: { email, password }, handleChange, handleSubmit }
}