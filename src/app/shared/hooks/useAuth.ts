import { AuthFormData } from "@/app/shared/interfaces/IAuth";
import { create } from "zustand"
import axios from "axios"

const useAuthStore = create<AuthFormData>(set => ({
    email: "",
    password: "",
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password })
}))

export const useAuth: () => void = () => {
    const { email, password, setEmail, setPassword } = useAuthStore();

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
            console.log("Submitting form data with Zustand:", email, password);
            const response = await axios.post("/auth...", {
                email,
                password
            });
            const data = await response.data;
            console.log("Response data:", data);
        } catch (error) {
            console.error("Error was occured:", error);
        }
    }

    return { formData: { email, password }, handleChange, handleSubmit }
}