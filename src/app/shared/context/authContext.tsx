"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { AUTH_ENDPOINTS, COOKIE_ENDPOINTS } from "../config/api.config";
import api from "../api/axios";
import { LoginResponse, MeResponse } from "../interfaces/IApiResponses";
import User from "../interfaces/IUser";
import { NavigatorWithConnection } from "../interfaces/INavigatorWithConnection";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (newUserData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const sendCookieDataToServer = async (token?: string) => {
  try {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return null;
    }

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
      connectionType:
        (navigator as NavigatorWithConnection).connection?.effectiveType ||
        "unknown",
      token,
    };

    const response = await fetch(COOKIE_ENDPOINTS.SET, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cookieData),
    });

    if (!response.ok) {
      throw new Error(`Failed to set cookie: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Cookie set response:", result);
    return result;
  } catch (error) {
    console.error("Failed to send cookie data:", error);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const hasCheckedAuth = useRef(false);

  const clearAuthState = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
  }, []);

  const updateUser = useCallback((newUserData: Partial<User>) => {
    setUser((prevData) => (prevData ? { ...prevData, ...newUserData } : null));
  }, []);

  const checkAuth = useCallback(async () => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    setIsLoading(true);
    try {
      const response = await api.get<MeResponse>(AUTH_ENDPOINTS.ME, {
        withCredentials: true,
      });

      if (response.data?.success && response.data.user) {
        setUser({
          id: response.data.user.id,
          email: response.data.user.email,
          username: response.data.user.username,
          createdAt: response.data.user.createdAt,
        });

        const token = localStorage.getItem("token");
        if (token) {
          sendCookieDataToServer(token).catch((error) => {
            console.log("Cookie setup completed with warnings:", error);
          });
        }
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
        hasCheckedAuth.current = false;

        if (response.data.user) {
          setUser({
            id: response.data.user.id,
            email: response.data.user.email,
            username: response.data.user.username,
            createdAt: response.data.user.createdAt,
          });
        }

        sendCookieDataToServer(response.data.token).catch((error) => {
          console.log(
            "Cookie setup after login completed with warnings:",
            error
          );
        });

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
      await api.post(AUTH_ENDPOINTS.LOGOUT, {}, { withCredentials: true });
      await clearAuthState();
      hasCheckedAuth.current = false;
      router.push("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
      await clearAuthState();
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthState, router]);

  useEffect(() => {
    if (!hasCheckedAuth.current) {
      checkAuth();
    }
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, checkAuth, updateUser }}
    >
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
