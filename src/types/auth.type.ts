export interface Role {
  id: string;
  code: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone?: string | null;
  avatar?: string | null;
  authProvider?: string;
  status?: string;
  isActive?: boolean;
  role?: string;
  roles?: Role[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: string | number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: string | number;
  user: User;
  tokens?: AuthTokens;
}

export interface LoginRequest {
  username: string;
  password: string;
}
