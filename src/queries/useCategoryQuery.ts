import { CategoryInput, CategoryParams } from "@/schemas/category.schema";
import { categoryService } from "@/services/category.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const CATEGORY_QUERY_KEY = ["categories"];

export const useGetCategories = (params?: CategoryParams) => {
  return useQuery({
    queryKey: [...CATEGORY_QUERY_KEY, params],
    queryFn: () => categoryService.getCategories(params),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInput) => categoryService.createCategory(data as any),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY }),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryInput> }) =>
      categoryService.updateCategory(id, data as any),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY }),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY }),
  });
};

