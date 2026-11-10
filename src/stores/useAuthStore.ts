import { User } from "@/types/auth.type";
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string, refreshToken?: string) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, token, refreshToken) => {
        set({
          user,
          accessToken: token,
          refreshToken: refreshToken ?? null,
          isAuthenticated: true,
        });
        Cookies.set("accessToken", token, { expires: 7 });
      },

      setAccessToken: (token) => {
        set({ accessToken: token, isAuthenticated: true });
        Cookies.set("accessToken", token, { expires: 7 });
      },

      setRefreshToken: (token) => {
        set({ refreshToken: token });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        Cookies.remove("accessToken");
        localStorage.removeItem("finora-auth-storage");
      },
    }),
    {
      name: "finora-auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

