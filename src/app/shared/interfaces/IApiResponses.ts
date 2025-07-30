import User from "./IUser";

export interface LoginResponse {
  accessToken?: string;
  token?: string;
  access_token?: string;
  user?: User;
  id?: number;
  email?: string;
  username?: string;
  createdAt?: string;
}

export interface MeResponse {
  user?: User;
  id?: number;
  email?: string;
  username?: string;
  createdAt?: string;
}