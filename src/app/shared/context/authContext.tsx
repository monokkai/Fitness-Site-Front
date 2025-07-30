"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { AUTH_ENDPOINTS } from "../config/api.config";
import api from "../api/axios";
import { LoginResponse, MeResponse } from "../interfaces/IApiResponses";
import User from "../interfaces/IUser";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const clearAuthState = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  }, []);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<MeResponse>(AUTH_ENDPOINTS.ME);

      const userData = response.data?.user || {
        id: response.data?.id,
        email: response.data?.email,
        username: response.data?.username,
        createdAt: response.data?.createdAt,
      };

      if (userData?.id) {
        setUser(userData as User);
      } else {
        await clearAuthState();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      await clearAuthState();
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthState]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, {
          email,
          password,
        });

        const token =
          response.data?.accessToken ||
          response.data?.token ||
          response.data?.access_token;

        if (!token) {
          throw new Error("Authentication token not found in server response");
        }

        localStorage.setItem("token", token);

        const userData = response.data?.user || {
          id: response.data?.id,
          email: response.data?.email || email,
          username: response.data?.username || email.split("@")[0],
          createdAt: response.data?.createdAt || new Date().toISOString(),
        };

        setUser(userData as User);
      } catch (error) {
        console.error("Login error:", error);
        await clearAuthState();
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [clearAuthState]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT);
      await clearAuthState();
      router.push("/auth");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      await clearAuthState();
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthState, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
