export type CategoryType = "EXPENSE" | "INCOME";

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon?: string | null;
  color?: string | null;
  parentId?: string | null;
  parent?: Category | null;
  isDefault: boolean;
  createdBy?: string | null;
  createdAt: string;
  updatedAt?: string;
  children?: Category[];
}

export interface CreateCategoryRequest {
  name: string;
  type: CategoryType;
  icon?: string;
  color?: string;
  parentId?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  icon?: string;
  color?: string;
  parentId?: string;
}

export interface CategoryQuery {
  type?: CategoryType;
  search?: string;
  isTree?: boolean;
}

