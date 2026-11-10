import api from "@/utils/axios";
import { CategoryParams } from "@/schemas/category.schema";
import {
  Category,
  CategoryQuery,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types/category.type";

export const categoryService = {
  async getCategories(query?: CategoryParams | CategoryQuery): Promise<Category[]> {
    const res = await api.get("/categories", { params: query });
    return res.data.data;
  },

  async getCategoryById(id: string): Promise<Category> {
    const res = await api.get(`/categories/${id}`);
    return res.data.data;
  },

  async createCategory(payload: CreateCategoryRequest): Promise<Category> {
    const res = await api.post("/categories", payload);
    return res.data.data;
  },

  async updateCategory(
    id: string,
    payload: UpdateCategoryRequest
  ): Promise<Category> {
    const res = await api.patch(`/categories/${id}`, payload);
    return res.data.data;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};

