import User from "./IUser";

export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: UserDto;
    error?: string;
}

export interface UserDto {
    id: number;
    username: string;
    email: string;
}

export interface LoginResponse extends AuthResponse {
    token: string;
    user: UserDto;
}

export interface MeResponse {
    success: boolean;
    user?: UserDto;
    error?: string;
}