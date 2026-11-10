import api from "@/utils/axios";
import { AuthResponse, LoginRequest } from "@/types/auth.type";

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const res = await api.post("/auth/login", payload);
    return res.data.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore
    }
  },

  async getMe() {
    const res = await api.get("/auth/me");
    return res.data.data;
  },
};

