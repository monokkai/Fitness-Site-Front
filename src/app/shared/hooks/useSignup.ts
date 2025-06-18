import { SignupFormData } from "@/app/shared/interfaces/IAuth";
import { create } from "zustand"
import api from "../api/axios";
import { useUserStore } from "../store/userStore";
import { useRouter } from 'next/navigation';
import { IAuthResponse } from "../interfaces/IUser";

interface ApiError {
    response?: {
        data?: {
            error?: string;
            modelState?: Record<string, string[]>;
        };
    };
    message?: string;
}

interface SignupStore extends SignupFormData {
    errors: {
        username?: string;
        email?: string;
        password?: string;
    };
    setErrors: (errors: { username?: string; email?: string; password?: string; }) => void;
}

const useSignupStore = create<SignupStore>(set => ({
    username: "",
    email: "",
    password: "",
    errors: {},
    setUsername: (username: string) => set({ username, errors: {} }),
    setEmail: (email: string) => set({ email, errors: {} }),
    setPassword: (password: string) => set({ password, errors: {} }),
    setErrors: (errors) => set({ errors })
}));

export const useSignup = () => {
    const router = useRouter();
    const { username, email, password, errors, setUsername, setEmail, setPassword, setErrors } = useSignupStore();
    const { setUser } = useUserStore();

    const validateForm = () => {
        const errors: { username?: string; email?: string; password?: string; } = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (!username || username.length < 3) errors.username = "Username must be at least 3 characters";
        if (!email || !emailRegex.test(email)) errors.email = "Invalid email address";
        if (!password || password.length < 6) errors.password = "Password must be at least 6 characters";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const setters = {
            username: setUsername,
            email: setEmail,
            password: setPassword
        };
        setters[id as keyof typeof setters]?.(value);
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!validateForm()) return;

        const requestData = {
            username,
            email,
            password
        };

        console.log('Sending registration request with data:', {
            ...requestData,
            password: '***'
        });

        try {
            const response = await api.post<IAuthResponse>("/auth/signup", requestData);

            const { data } = response;
            console.log('Server response data:', data);

            if (!data.success) {
                const errorMessage = data.error || "Registration failed";
                setErrors({
                    username: errorMessage,
                    email: "",
                    password: ""
                });
                console.error("Server error:", data);
                return;
            }

            setUser(data.user);

            setUsername("");
            setEmail("");
            setPassword("");
            setErrors({});
            router.push('/');

        } catch (error) {
            console.error("Full error object:", error);

            let errorMessage = "Registration failed. Please try again.";

            if (error && typeof error === 'object') {
                const apiError = error as ApiError;
                const serverError = apiError.response?.data?.error;
                const validationErrors = apiError.response?.data?.modelState;

                console.log('Server validation errors:', validationErrors);

                if (validationErrors) {
                    const errors: Record<string, string> = {};
                    Object.entries(validationErrors).forEach(([key, messages]) => {
                        const field = key.toLowerCase().split('.').pop() || '';
                        errors[field as keyof typeof errors] = messages[0];
                    });
                    setErrors(errors);
                    return;
                }

                errorMessage = serverError ||
                    apiError.message ||
                    "Server communication error";

                console.error("Server response:", apiError.response?.data);
            }

            setErrors({
                username: errorMessage,
                email: "",
                password: ""
            });
        }
    };

    return { formData: { username, email, password }, errors, handleChange, handleSubmit }
};