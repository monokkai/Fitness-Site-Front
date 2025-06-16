export interface IUser {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    lastLoginAt?: string;
    isActive: boolean;
}

export interface IAuthResponse {
    success: boolean;
    token: string;
    user: IUser;
    error?: string;
}