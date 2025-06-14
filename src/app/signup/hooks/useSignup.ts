import { useState } from "react";

export interface FormData {
    name: string;
    email: string;
    password: string;
}

export const useSignup = (sourceData: FormData = { name: "", email: "", password: "" }) => {
    const [formData, setFormData] = useState<FormData>(sourceData);

    const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(preventValue => ({ ...preventValue, [id]: value }));
    }

    return { formData, handleChange, setFormData };
}