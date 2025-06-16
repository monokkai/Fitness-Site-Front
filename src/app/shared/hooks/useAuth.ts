'use client';

import { AuthFormData } from "@/app/shared/interfaces/IAuth";
import { create } from "zustand"
import axios from "axios"
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
    const { setUser, setToken } = useUserStore();

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
            const response = await axios.post("http://localhost:8082/api/auth/auth", {
                email,
                password
            });

            const { token, user } = response.data as IAuthResponse;
            setToken(token);
            setUser(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setEmail("");
            setPassword("");
            router.push('/');

        } catch (error: any) {
            console.error("Error occurred:", error.response?.data?.error || error.message);
        }
    }

    return { formData: { email, password }, handleChange, handleSubmit }
}