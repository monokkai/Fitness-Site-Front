import { create } from 'zustand';

interface SignupFormState {
    username: string;
    email: string;
    password: string;
    showPassword: boolean;
    errors: {
        username?: string;
        email?: string;
        password?: string;
    };
    isSubmitting: boolean;
    setFormData: (data: Partial<Omit<SignupFormState, 'errors' | 'isSubmitting'>>) => void;
    setErrors: (errors: SignupFormState['errors']) => void;
    toggleShowPassword: () => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
}

export const useSignupStore = create<SignupFormState>((set) => ({
    username: '',
    email: '',
    password: '',
    showPassword: false,
    errors: {},
    isSubmitting: false,
    setFormData: (data) => set((state) => ({ ...state, ...data })),
    setErrors: (errors) => set({ errors }),
    toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
    setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
