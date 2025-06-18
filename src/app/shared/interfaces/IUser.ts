export interface IUser {
    id: number;
    username: string;
    email: string;
    createdAt?: string;
    lastLoginAt?: string;
    isActive?: boolean;
}

export interface IAuthResponse {
    success: boolean;
    token: string;
    user: IUser;
    error?: string;
}

export interface IUserStore {
    user: IUser | null;
    token: string | null;
    isAuth: boolean;
    setUser: (user: IUser) => void;
    setToken: (token: string) => void;
    logout: () => void;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest {
    username: string;
    email: string;
    password: string;
}