import api from "@/utils/axios";
import { OperationsDashboard } from "@/types/dashboard.type";

export const dashboardService = {
  async getOperationsDashboard(): Promise<OperationsDashboard> {
    const res = await api.get("/dashboard/operations");
    return res.data.data;
  },
};
