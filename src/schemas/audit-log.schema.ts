import { z } from "zod";

export const auditLogParamsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  walletId: z.string().optional(),
  entityType: z.string().optional(),
  action: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type AuditLogParamsInput = z.infer<typeof auditLogParamsSchema>;

export const auditLogExportSchema = z.object({
  format: z.enum(["csv", "xlsx"]).default("csv"),
  startDate: z.string().min(1, "Vui lòng chọn ngày bắt đầu"),
  endDate: z.string().min(1, "Vui lòng chọn ngày kết thúc"),
  entityType: z.string().optional(),
  action: z.string().optional(),
});

export type AuditLogExportInput = z.infer<typeof auditLogExportSchema>;
