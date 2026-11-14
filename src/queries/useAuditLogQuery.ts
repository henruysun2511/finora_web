import { useQuery } from "@tanstack/react-query";
import { auditLogService } from "@/services/audit-log.service";
import type { AuditLogParams } from "@/types/audit-log.type";

export const AUDIT_LOG_QUERY_KEY = ["admin-audit-logs"];

export function useGetAuditLogs(params: AuditLogParams) {
  return useQuery({
    queryKey: [...AUDIT_LOG_QUERY_KEY, params],
    queryFn: () => auditLogService.getAll(params),
    placeholderData: (prev) => prev,
  });
}

export function useGetAuditLogDetail(id: string | null) {
  return useQuery({
    queryKey: [...AUDIT_LOG_QUERY_KEY, "detail", id],
    queryFn: () => auditLogService.getById(id!),
    enabled: Boolean(id),
  });
}

export function useGetEntityTimeline(entityType: string | null, entityId: string | null) {
  return useQuery({
    queryKey: [...AUDIT_LOG_QUERY_KEY, "timeline", entityType, entityId],
    queryFn: () => auditLogService.getEntityTimeline(entityType!, entityId!),
    enabled: Boolean(entityType && entityId),
  });
}
