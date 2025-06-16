export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}

export interface AuthFormData {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}