"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { AdminPageTitle } from "@/components/common/admin-page-title";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { SortOrder, CategorySortBy } from "@/constants/sort";
import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategories,
  useUpdateCategory,
} from "@/queries/useCategoryQuery";
import { Category, CategoryInput, CategoryParams } from "@/schemas/category.schema";
import { handleError } from "@/utils/handleError";
import { getColumns } from "./category-columns";
import { CategoryDialog } from "./category-dialog";
import { CategoryFilter } from "./category-filter";

export default function AdminCategoriesPage() {
  const [params, setParams] = useState<CategoryParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: CategorySortBy.CREATED_AT,
  });

  const { data: rawCategories = [], isLoading } = useGetCategories(params);
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleAdd = () => {
    setEditingCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleDeleteTrigger = (category: Category) => {
    setDeletingCategory(category);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingCategory?.id) return;
    try {
      await deleteMutation.mutateAsync(deletingCategory.id, {
        onSuccess: () => {
          toast.success("Xóa danh mục thành công");
          setConfirmOpen(false);
          setDeletingCategory(null);
        },
        onError: (error: any) => {
          handleError(error, "Không thể xóa danh mục");
        },
      });
    } catch (error) {
      console.error("Delete category failed", error);
    }
  };

  const handleSubmit = async (formData: CategoryInput) => {
    try {
      if (editingCategory?.id) {
        await updateMutation.mutateAsync(
          {
            id: editingCategory.id,
            data: formData,
          },
          {
            onSuccess: () => {
              toast.success("Cập nhật danh mục thành công");
              setDialogOpen(false);
            },
            onError: (error: any) => {
              handleError(error, "Cập nhật danh mục thất bại");
            },
          }
        );
      } else {
        await createMutation.mutateAsync(formData, {
          onSuccess: () => {
            toast.success("Tạo danh mục mới thành công");
            setDialogOpen(false);
          },
          onError: (error: any) => {
            handleError(error, "Tạo danh mục thất bại");
          },
        });
      }
    } catch (error) {
      console.error("Submit category failed", error);
    }
  };

  // Client-side filtering & pagination calculation
  const allCategories = (rawCategories as Category[]) || [];
  const filtered = allCategories.filter((cat) => {
    if (params.type && cat.type !== params.type) return false;
    if (params.search?.trim()) {
      const q = params.search.toLowerCase().trim();
      const matchName = cat.name.toLowerCase().includes(q);
      const matchParent = (cat.parent?.name || "").toLowerCase().includes(q);
      if (!matchName && !matchParent) return false;
    }
    return true;
  });

  const totalItems = filtered.length;
  const page = params.page || 1;
  const limit = params.limit || 10;
  const totalPages = Math.ceil(totalItems / limit);
  const pagedCategories = filtered.slice((page - 1) * limit, page * limit);

  return (
    <div className="flex flex-col gap-6 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle
          title="Danh mục Hệ thống"
          subtitle="Quản trị Tài chính"
        />

        <Button
          onClick={handleAdd}
          className="bg-primary text-white px-6 h-11 rounded-2xl font-bold shadow-md shadow-primary/25"
        >
          <Plus className="mr-2 size-4" />
          <span>Thêm danh mục mới</span>
        </Button>
      </div>

      {/* Main Table Container Box */}
      <div className="bg-card rounded-3xl shadow-xs border border-border overflow-hidden">
        <CategoryFilter
          onSearch={(val) =>
            setParams((prev) => ({ ...prev, search: val, page: 1 }))
          }
          onFilterChange={(filters) =>
            setParams((prev) => ({ ...prev, ...filters, page: 1 }))
          }
          onRowsPerPageChange={(val) =>
            setParams((prev) => ({ ...prev, limit: val, page: 1 }))
          }
        />

        <div className="p-0">
          <DataTable
            columns={getColumns({
              onEdit: handleEdit,
              onDelete: handleDeleteTrigger,
            })}
            data={pagedCategories}
            loading={isLoading}
          />
        </div>

        {/* Footer Pagination */}
        <div className="p-5 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card">
          <PaginationInfo
            page={page}
            limit={limit}
            totalItems={totalItems}
            currentLength={pagedCategories.length}
            label="danh mục"
          />
          <DataPagination
            page={page}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>

      {/* Create / Edit Dialog */}
      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={editingCategory}
        categories={allCategories}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa danh mục"
        description={`Bạn có chắc chắn muốn xóa danh mục "${deletingCategory?.name}"? Hành động này sẽ gỡ danh mục khỏi hệ thống.`}
        buttonText="Xác nhận xóa"
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
