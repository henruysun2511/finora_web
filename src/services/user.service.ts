
import api from "@/utils/axios";
import type {
  User,
  Role,
  UserParams,
  PaginatedUsers,
} from "@/types/user.type";
import type { UserInput } from "@/schemas/user.schema";

export const userService = {
  async getUsers(params: UserParams): Promise<PaginatedUsers> {
    const res = await api.get("/users", { params });
    return res.data.data;
  },

  async getUserById(id: string): Promise<User> {
    const res = await api.get(`/users/${id}`);
    return res.data.data;
  },

  async updateUser(
    id: string,
    payload: Partial<UserInput>
  ): Promise<User> {
    const res = await api.patch(`/users/${id}`, payload);
    return res.data.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async getRoles(): Promise<Role[]> {
    const res = await api.get("/authorization/roles");
    return res.data.data;
  },

  async assignRoles(
    id: string,
    roleIds: string[]
  ): Promise<User> {
    const res = await api.post(`/users/${id}/roles`, {
      roleIds,
    });
    return res.data.data;
  },
};
