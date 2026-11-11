
export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
export type SortOrder = "ASC" | "DESC";

export interface UserRole {
  id: string;
  code: string;
  name: string;
}

export interface User {
  id: string;
  username?: string;
  email: string;
  fullName: string;
  phone?: string | null;
  avatar?: string | null;
  authProvider: string;
  status: UserStatus;
  isActive: boolean;
  roles?: UserRole[];
  createdAt: string;
  updatedAt: string;
}

export interface Role extends UserRole {
  description?: string;
  isActive: boolean;
  isSysAdmin: boolean;
}

export interface UserParams {
  page: number;
  limit: number;
  keyword?: string;
  status?: UserStatus;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface PaginatedUsers {
  items: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
