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

const collectCookieData = () => {
  if (typeof window === "undefined") return;

  try {
    const cookieData = {
      country: navigator.language.split("-")[1] || "unknown",
      language: navigator.language,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      localTime: new Date().toISOString(),
      referer: document.referrer || "none",
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      deviceType: /Mobi|Android/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop",
      cookieEnabled: navigator.cookieEnabled,
      online: navigator.onLine,
      languagePreferences: navigator.languages,
      connectionType: (navigator as any).connection?.effectiveType || "unknown",
    };

    document.cookie = `env_metrics=${encodeURIComponent(
      JSON.stringify(cookieData)
    )}; path=/; max-age=86400;`;

    document.cookie = `cd_location=${encodeURIComponent(
      JSON.stringify({
        country: cookieData.country,
        timezone: cookieData.timezone,
      })
    )}; path=/; max-age=86400;`;
    document.cookie = `cd_browser=${encodeURIComponent(
      JSON.stringify({
        userAgent: cookieData.userAgent,
        platform: cookieData.platform,
      })
    )}; path=/; max-age=86400;`;
    document.cookie = `cd_screen=${encodeURIComponent(
      JSON.stringify({
        screenResolution: cookieData.screenResolution,
        viewportSize: cookieData.viewportSize,
      })
    )}; path=/; max-age=86400;`;
  } catch (error) {
    console.error("Cookie collection failed:", error);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const clearAuthState = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");

    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }, []);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<MeResponse>(AUTH_ENDPOINTS.ME);

      if (response.data?.success && response.data.user) {
        setUser({
          id: response.data.user.id,
          email: response.data.user.email,
          username: response.data.user.username,
          createdAt: response.data.user.createdAt,
        });

        const token = localStorage.getItem("token");
        if (token) {
          document.cookie = `user_session=${token}; path=/; max-age=604800; samesite=lax`;
        }

        await collectCookieData();
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

        if (!response.data?.token) {
          throw new Error(response.data?.error || "No token received");
        }

        localStorage.setItem("token", response.data.token);

        document.cookie = `user_session=${response.data.token}; path=/; max-age=604800; samesite=lax`;

        if (response.data.user) {
          setUser({
            id: response.data.user.id,
            email: response.data.user.email,
            username: response.data.user.username,
            createdAt: response.data.user.createdAt,
          });

          await collectCookieData();
        }

        router.push("/");
      } catch (error) {
        console.error("Login error:", error);
        await clearAuthState();
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [clearAuthState, router]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT);
      await clearAuthState();
      router.push("/auth");
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
