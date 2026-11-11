
import { z } from "zod";

export const userInputSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ tên"),
  email: z.email("Email không hợp lệ"),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]),
  isActive: z.boolean(),
});

export type UserInput = z.infer<typeof userInputSchema>;
