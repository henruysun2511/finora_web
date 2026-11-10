import { CategorySortBy, SortOrder } from "@/constants/sort";
import { z } from "zod";

export const categoryInputSchema = z.object({
  name: z.string().min(2, "Tên danh mục phải có ít nhất 2 ký tự").max(100),
  type: z.enum(["EXPENSE", "INCOME"]),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  isDefault: z.boolean().optional(),
});

export type CategoryInput = z.infer<typeof categoryInputSchema>;

export const categorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "Tên danh mục phải có ít nhất 2 ký tự").max(100),
  type: z.enum(["EXPENSE", "INCOME"]),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  parent: z.any().optional().nullable(),
  isDefault: z.boolean(),
  createdBy: z.string().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Category = z.infer<typeof categorySchema>;

export const categoryParamsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional(),
  type: z.enum(["EXPENSE", "INCOME"]).optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([CategorySortBy.NAME, CategorySortBy.TYPE, CategorySortBy.CREATED_AT]).optional().default(CategorySortBy.CREATED_AT),
});

export type CategoryParams = z.input<typeof categoryParamsSchema>;
