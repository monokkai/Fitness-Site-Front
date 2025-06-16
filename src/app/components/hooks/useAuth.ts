import { useState } from "react";
import { AuthFormData } from "@/app/components/interfaces/IAuth";

export const useAuth = (sourceData: AuthFormData = { email: "", password: "" }) => {
    const [formData, setFormData] = useState<AuthFormData>(sourceData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prevValue => ({ ...prevValue, [id]: value }));
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            console.log("Submitting form data:", formData);
            const response = await fetch("api/auth/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Response data:", data);
        } catch (error) {
            console.error("Error was occured:", error);
        }
    }

    return { formData, handleChange, handleSubmit }
}