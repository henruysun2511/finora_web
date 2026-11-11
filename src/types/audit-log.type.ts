
export interface AuditLog {
  id: string;
  userId?: string | null;
  userName?: string | null;
  userAvatar?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  summary?: string | null;
  ipAddress?: string | null;
  createdAt: string;
}

export interface AuditLogDiff {
  field: string;
  from?: unknown;
  to?: unknown;
}

export interface AuditLogDetail extends AuditLog {
  userAgent?: string | null;
  oldValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  diff: AuditLogDiff[];
}

export interface AuditLogParams {
  page?: number;
  limit?: number;
  walletId?: string;
  entityType?: string;
  action?: string;
  startDate?: string;
  endDate?: string;
}

export interface AuditLogPage {
  items: AuditLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface AuditLogExportParams
  extends Omit<AuditLogParams, "page" | "limit"> {
  format: "csv" | "xlsx";
  startDate: string;
  endDate: string;
}
