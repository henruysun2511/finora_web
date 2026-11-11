
import api from "@/utils/axios";
import type {
  AuditLog,
  AuditLogDetail,
  AuditLogPage,
  AuditLogParams,
  AuditLogExportParams,
} from "@/types/audit-log.type";

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const auditLogService = {
  async getAll(
    params: AuditLogParams
  ): Promise<AuditLogPage> {
    const response = await api.get<
      ApiResponse<AuditLogPage>
    >("/audit-logs", { params });

    return response.data.data;
  },

  async getById(id: string): Promise<AuditLogDetail> {
    const response = await api.get<
      ApiResponse<AuditLogDetail>
    >(`/audit-logs/${id}`);

    return response.data.data;
  },

  async getEntityTimeline(
    entityType: string,
    entityId: string
  ): Promise<unknown> {
    const response = await api.get(
      `/audit-logs/entities/${encodeURIComponent(entityType)}/${encodeURIComponent(entityId)}`
    );

    return response.data.data;
  },

  async exportFile(
    params: AuditLogExportParams
  ): Promise<Blob> {
    const response = await api.get<Blob>(
      "/audit-logs/export",
      {
        params,
        responseType: "blob",
      }
    );

    return response.data;
  },
};
