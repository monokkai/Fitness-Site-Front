import { SignupFormData } from "@/app/components/interfaces/IAuth";
import { create } from "zustand"

const useSignupStore = create<SignupFormData>(set => ({
    name: "",
    email: "",
    password: "",
    setName: (name: string) => set({ name }),
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password })
}));

export const useSignup = () => {
    const { name, email, password, setName, setEmail, setPassword } = useSignupStore();

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
        console.log("Form data:", name, email, password)
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            console.log('Submitting form data:', name, email, password);
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            console.log('Response data:', data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return { formData: { name, email, password }, handleChange, handleSubmit }
};