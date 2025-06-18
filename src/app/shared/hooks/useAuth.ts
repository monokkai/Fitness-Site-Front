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
            console.log('Cookies before login:', document.cookie);
            const response = await api.post("/auth/login", {
                email,
                password
            });
            console.log('Cookies after login:', document.cookie);

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

    const showCookies = () => {
        console.log('Current cookies:', document.cookie);
    }

    return { formData: { email, password }, handleChange, handleSubmit, showCookies }
}