import { z } from "zod";

export const userInputSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]),
  isActive: z.boolean(),
});

export type UserInput = z.infer<typeof userInputSchema>;

export const userParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  keyword: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]).optional(),
  isActive: z.boolean().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
});

export type UserParamsInput = z.infer<typeof userParamsSchema>;
