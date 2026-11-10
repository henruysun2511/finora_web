import { categoryService } from "@/services/category.service";
import {
  CategoryQuery,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types/category.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const CATEGORIES_QUERY_KEY = ["categories"];

export function useCategories(query?: CategoryQuery) {
  return useQuery({
    queryKey: [...CATEGORIES_QUERY_KEY, query],
    queryFn: () => categoryService.getCategories(query),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryRequest) =>
      categoryService.createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      toast.success("Tạo danh mục mới thành công!");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || "Không thể tạo danh mục.";
      toast.error(msg);
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCategoryRequest }) =>
      categoryService.updateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      toast.success("Cập nhật danh mục thành công!");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || "Không thể cập nhật danh mục.";
      toast.error(msg);
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      toast.success("Đã xóa danh mục thành công!");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || "Không thể xóa danh mục.";
      toast.error(msg);
    },
  });
}

