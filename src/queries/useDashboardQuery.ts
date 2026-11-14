import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export const DASHBOARD_QUERY_KEY = ["admin-dashboard-operations"];

export const useGetOperationsDashboard = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardService.getOperationsDashboard(),
    refetchInterval: 30000, // Tự động làm mới mỗi 30s
  });
};
