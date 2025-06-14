import { useState } from "react";

export interface FormData {
    name: string;
    email: string;
    password: string;
}

export const useSignup = (sourceData: FormData = { name: "", email: "", password: "" }) => {
    const [formData, setFormData] = useState<FormData>(sourceData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prevValue => ({ ...prevValue, [id]: value }));
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            // Here will be your API call to register user
            console.log('Submitting form data:', formData);
            // Example API call:
            // const response = await fetch('/api/auth/signup', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });
            // const data = await response.json();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return { formData, handleChange, handleSubmit };
};