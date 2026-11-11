
import api from "@/utils/axios";
import type { Mascot, MascotInput } from "@/types/mascot.type";

export const mascotService = {
  async getAll(): Promise<Mascot[]> {
    const response = await api.get("/mascots/admin");
    return response.data.data;
  },

  async getById(id: string): Promise<Mascot> {
    const response = await api.get(`/mascots/${id}`);
    return response.data.data;
  },

  async create(data: MascotInput): Promise<Mascot> {
    const response = await api.post("/mascots", data);
    return response.data.data;
  },

  async update(
    id: string,
    data: Partial<MascotInput>
  ): Promise<Mascot> {
    const response = await api.patch(`/mascots/${id}`, data);
    return response.data.data;
  },

  async updateStatus(
    id: string,
    isActive: boolean
  ): Promise<Mascot> {
    const response = await api.patch(
      `/mascots/${id}/status`,
      { isActive }
    );
    return response.data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/mascots/${id}`);
  },
};
