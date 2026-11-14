"use client";

import React, { useMemo, useState } from "react";
import { Plus, RefreshCw, Bot, Wallet } from "lucide-react";
import { toast } from "sonner";

import { AdminPageTitle } from "@/components/common/admin-page-title";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataTable } from "@/components/common/data-table";
import { DataPagination } from "@/components/common/data-pagination";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";

import {
  useGetMascots,
  useCreateMascot,
  useUpdateMascot,
  useUpdateMascotStatus,
  useDeleteMascot,
} from "@/queries/useMascotQuery";
import type { Mascot, MascotInput } from "@/types/mascot.type";
import { handleError } from "@/utils/handleError";

import { getMascotColumns } from "./mascot-columns";
import { MascotFormDialog } from "./mascot-dialog";
import { MascotFilter } from "./mascot-filter";

export default function AdminMascotsPage() {
  const {
    data: mascots = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetMascots();

  const createMutation = useCreateMascot();
  const updateMutation = useUpdateMascot();
  const statusMutation = useUpdateMascotStatus();
  const deleteMutation = useDeleteMascot();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Mascot | null>(null);
  const [deleting, setDeleting] = useState<Mascot | null>(null);

  const activeCount = mascots.filter((m) => m.isActive).length;

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return mascots
      .filter((m) => {
        if (status === "active" && !m.isActive) return false;
        if (status === "inactive" && m.isActive) return false;

        return (
          m.displayName.toLowerCase().includes(keyword) ||
          m.tierName.toLowerCase().includes(keyword)
        );
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [mascots, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const safePage = Math.min(page, totalPages);
  const pagedMascots = filtered.slice(
    (safePage - 1) * limit,
    safePage * limit
  );

  const handleSave = async (data: MascotInput) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({
          id: editing.id,
          data,
        });
        toast.success("Cập nhật linh vật thành công");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Tạo linh vật thành công");
      }

      setDialogOpen(false);
      setEditing(null);
    } catch (error) {
      handleError(error, "Không thể lưu linh vật");
    }
  };

  const handleStatus = async (mascot: Mascot) => {
    try {
      await statusMutation.mutateAsync({
        id: mascot.id,
        isActive: !mascot.isActive,
      });

      toast.success(
        mascot.isActive ? "Đã tạm ẩn linh vật" : "Đã kích hoạt linh vật"
      );
    } catch (error) {
      handleError(error, "Không thể thay đổi trạng thái");
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;

    try {
      await deleteMutation.mutateAsync(deleting.id);
      toast.success("Đã xóa linh vật");
      setDeleting(null);
    } catch (error) {
      handleError(error, "Không thể xóa linh vật");
    }
  };

  const columns = useMemo(
    () =>
      getMascotColumns({
        onEdit: (m) => {
          setEditing(m);
          setDialogOpen(true);
        },
        onToggleStatus: handleStatus,
        onDelete: (m) => setDeleting(m),
        isStatusPending: statusMutation.isPending,
      }),
    [statusMutation.isPending]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminPageTitle
          title="Quản lý Linh vật AI"
          subtitle="Thiết lập các mốc tài sản ròng, mã SVG linh vật và kịch bản tư vấn AI."
        />

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            className="rounded-xl font-bold"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Làm mới
          </Button>

          <Button
            className="rounded-xl font-bold"
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 size-4" />
            Thêm linh vật
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bot className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Tổng số linh vật
              </p>
              <p className="text-2xl font-black text-foreground">
                {mascots.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Bot className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Đang kích hoạt
              </p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {activeCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Wallet className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Cấp độ cao nhất
              </p>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {mascots.length > 0
                  ? `Cấp ${Math.max(...mascots.map((m) => m.displayOrder))}`
                  : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <MascotFilter
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {/* Data Table */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <DataTable
          columns={columns}
          data={pagedMascots}
          loading={isLoading}
        />

        {!isLoading && filtered.length > 0 && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <PaginationInfo
              page={safePage}
              limit={limit}
              totalItems={filtered.length}
            />

            <DataPagination
              page={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {/* Create / Edit Form Modal */}
      <MascotFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={editing}
        onSubmit={handleSave}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Xóa linh vật?"
        description={`Bạn có chắc chắn muốn xóa "${deleting?.displayName}"? Hành động này sẽ đánh dấu xóa mềm linh vật.`}
        buttonText="Xóa linh vật"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
