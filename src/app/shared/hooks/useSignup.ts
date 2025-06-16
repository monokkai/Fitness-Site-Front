import { SignupFormData } from "@/app/shared/interfaces/IAuth";
import { create } from "zustand"
import axios from "axios"
import { useUserStore } from "../store/userStore";
import { useRouter } from 'next/navigation';
import { IAuthResponse } from "../interfaces/IUser";

const useSignupStore = create<SignupFormData>(set => ({
    name: "",
    email: "",
    password: "",
    setName: (name: string) => set({ name }),
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password })
}));

export const useSignup = () => {
    const router = useRouter();
    const { name, email, password, setName, setEmail, setPassword } = useSignupStore();
    const { setUser, setToken } = useUserStore();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        if (id == "name") {
            setName(value);
        }
        if (id == "email") {
            setEmail(value);
        }
        if (id == "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8082/api/auth/signup", {
                username: name,
                email,
                password
            });

            const { token, user } = response.data as IAuthResponse;

            setToken(token);
            setUser(user);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setName("");
            setEmail("");
            setPassword("");

            router.push('/');

        } catch (error: any) {
            console.error("Error submitting form:", error.response?.data?.error || error.message);
        }
    };

    return { formData: { name, email, password }, handleChange, handleSubmit }
};