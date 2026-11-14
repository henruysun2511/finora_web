import { z } from "zod";

export const mascotInputSchema = z.object({
  tierName: z.string().trim().min(2, "Mã cấp độ (tierName) phải từ 2 ký tự"),
  displayName: z.string().trim().min(2, "Tên hiển thị phải từ 2 ký tự"),
  minNetWorth: z.coerce.number().min(0, "Tài sản ròng tối thiểu không âm"),
  maxNetWorth: z.coerce.number().nullable().optional(),
  displayOrder: z.coerce.number().default(0),
  htmlContent: z.string().trim().min(5, "Vui lòng nhập mã SVG/HTML linh vật"),
  systemPrompt: z.string().trim().min(5, "Vui lòng nhập Prompt định hướng tính cách AI"),
  quotes: z.array(z.string()).default([]),
  mascotAssetUrl: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export type MascotInput = z.infer<typeof mascotInputSchema>;

export const mascotParamsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional(),
  status: z.enum(["ALL", "ACTIVE", "INACTIVE"]).optional().default("ALL"),
});

export type MascotParams = z.infer<typeof mascotParamsSchema>;
