
"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { AdminPageTitle } from "@/components/common/admin-page-title";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

import {
  useGetUsers,
  useGetUser,
  useUpdateUser,
  useDeleteUser,
  useAssignUserRoles,
} from "@/queries/useUserQuery";

import type { User, UserParams } from "@/types/user.type";
import type { UserInput } from "@/schemas/user.schema";
import { handleError } from "@/utils/handleError";

import { getColumns } from "./user-columns";
import { UserFilter } from "./user-filter";
import { UserDialog } from "./user-dialog";
import { UserRoleDialog } from "./user-role-dialog";

export default function AdminUsersPage() {
  const [params, setParams] = useState<UserParams>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetUsers(params);

  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();
  const rolesMutation = useAssignUserRoles();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);

  const { data: detail, isLoading: detailLoading, isError: detailError } =
    useGetUser(viewOpen ? selectedUser?.id ?? null : null);

  const users = data?.items ?? [];
  const pagination = data?.pagination;

  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const page = pagination?.page ?? params.page;
  const limit = pagination?.limit ?? params.limit;

  const mutationPending =
    updateMutation.isPending ||
    deleteMutation.isPending ||
    rolesMutation.isPending;

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleUpdate = async (formData: UserInput) => {
    if (!selectedUser) return;

    try {
      await updateMutation.mutateAsync({
        id: selectedUser.id,
        data: formData,
      });

      toast.success("Cập nhật người dùng thành công");
      setEditOpen(false);
      setSelectedUser(null);
    } catch (error) {
      handleError(error, "Cập nhật người dùng thất bại");
    }
  };

  const handleRoles = async (roleIds: string[]) => {
    if (!selectedUser) return;

    try {
      await rolesMutation.mutateAsync({
        id: selectedUser.id,
        roleIds,
      });

      toast.success("Phân quyền thành công");
      setRoleOpen(false);
      setSelectedUser(null);
    } catch (error) {
      handleError(error, "Không thể phân quyền người dùng");
    }
  };

  const handleToggleBlock = async () => {
    if (!selectedUser) return;

    const blocked = selectedUser.status === "BLOCKED";

    try {
      await updateMutation.mutateAsync({
        id: selectedUser.id,
        data: {
          status: blocked ? "ACTIVE" : "BLOCKED",
          isActive: blocked,
        },
      });

      toast.success(
        blocked
          ? "Đã mở chặn tài khoản"
          : "Đã chặn tài khoản"
      );

      setBlockOpen(false);
      setSelectedUser(null);
    } catch (error) {
      handleError(error, "Không thể thay đổi trạng thái tài khoản");
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteMutation.mutateAsync(selectedUser.id);

      toast.success("Xóa người dùng thành công");
      setDeleteOpen(false);
      setSelectedUser(null);

      if (users.length === 1 && params.page > 1) {
        setParams((prev) => ({
          ...prev,
          page: prev.page - 1,
        }));
      }
    } catch (error) {
      handleError(error, "Không thể xóa người dùng");
    }
  };

  return (
    <div className="flex flex-col gap-6 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle
          title="Quản lý Người dùng"
          subtitle="Tài khoản & Phân quyền"
        />

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-6 h-11 rounded-2xl font-bold"
        >
          <RefreshCw
            className={`mr-2 size-4 ${
              isFetching ? "animate-spin" : ""
            }`}
          />
          Làm mới dữ liệu
        </Button>
      </div>

      {/* Main Container */}
      <div className="bg-card rounded-3xl shadow-xs border border-border overflow-hidden">
        <UserFilter
          onSearch={(keyword) =>
            setParams((prev) => ({
              ...prev,
              keyword: keyword || undefined,
              page: 1,
            }))
          }
          onStatusChange={(status) =>
            setParams((prev) => ({
              ...prev,
              status,
              page: 1,
            }))
          }
          onRowsPerPageChange={(limit) =>
            setParams((prev) => ({
              ...prev,
              limit,
              page: 1,
            }))
          }
        />

        {isError ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 px-5 text-center">
            <div className="size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
              <RefreshCw className="size-6" />
            </div>

            <div>
              <p className="font-bold text-foreground">
                Không thể tải danh sách người dùng
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {error instanceof Error
                  ? error.message
                  : "Vui lòng kiểm tra kết nối hoặc quyền truy cập."}
              </p>
            </div>

            <Button
              onClick={() => refetch()}
              className="rounded-xl"
            >
              Thử lại
            </Button>
          </div>
        ) : (
          <>
            <DataTable
              columns={getColumns({
                onView: (user) => {
                  setSelectedUser(user);
                  setViewOpen(true);
                },
                onEdit: handleEdit,
                onRoles: (user) => {
                  setSelectedUser(user);
                  setRoleOpen(true);
                },
                onToggleBlock: (user) => {
                  setSelectedUser(user);
                  setBlockOpen(true);
                },
                onDelete: (user) => {
                  setSelectedUser(user);
                  setDeleteOpen(true);
                },
                loading: mutationPending,
              })}
              data={users}
              loading={isLoading}
            />

            <div className="p-5 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card">
              <PaginationInfo
                page={page}
                limit={limit}
                totalItems={totalItems}
                currentLength={users.length}
                label="người dùng"
              />

              <DataPagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) =>
                  setParams((prev) => ({
                    ...prev,
                    page: newPage,
                  }))
                }
              />
            </div>
          </>
        )}
      </div>

      {/* View Details */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">
              Thông tin người dùng
            </DialogTitle>
            <DialogDescription>
              Thông tin tài khoản từ hệ thống FINORA.
            </DialogDescription>
          </DialogHeader>

          {detailLoading ? (
            <p className="py-8 text-center text-muted-foreground">
              Đang tải thông tin...
            </p>
          ) : detailError ? (
            <p className="py-8 text-center text-destructive">
              Không thể tải thông tin tài khoản.
            </p>
          ) : detail ? (
            <div className="space-y-4 py-2">
              {[
                ["Họ tên", detail.fullName],
                ["Email", detail.email],
                ["Số điện thoại", detail.phone || "Chưa cập nhật"],
                ["Nguồn đăng nhập", detail.authProvider],
                ["Trạng thái", detail.status],
                ["Kích hoạt", detail.isActive ? "Có" : "Không"],
                [
                  "Vai trò",
                  detail.roles?.map((r) => r.name).join(", ") || "Chưa gán",
                ],
                [
                  "Ngày tham gia",
                  new Date(detail.createdAt).toLocaleString("vi-VN"),
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-b border-border/60 pb-3"
                >
                  <p className="text-xs font-semibold text-muted-foreground">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1 break-all">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Edit */}
      <UserDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        user={selectedUser}
        onSubmit={handleUpdate}
        loading={updateMutation.isPending}
      />

      {/* Assign Roles */}
      <UserRoleDialog
        open={roleOpen}
        onOpenChange={setRoleOpen}
        user={selectedUser}
        onSubmit={handleRoles}
        loading={rolesMutation.isPending}
      />

      {/* Block / Unblock */}
      <ConfirmDialog
        open={blockOpen}
        onOpenChange={setBlockOpen}
        onConfirm={handleToggleBlock}
        title={
          selectedUser?.status === "BLOCKED"
            ? "Mở chặn tài khoản"
            : "Chặn tài khoản"
        }
        description={
          selectedUser?.status === "BLOCKED"
            ? `Bạn muốn mở chặn tài khoản "${selectedUser?.fullName}"?`
            : `Bạn chắc chắn muốn chặn tài khoản "${selectedUser?.fullName}"?`
        }
        buttonText={
          selectedUser?.status === "BLOCKED"
            ? "Xác nhận mở chặn"
            : "Xác nhận chặn"
        }
        loading={updateMutation.isPending}
      />

      {/* Soft Delete */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Xác nhận xóa người dùng"
        description={`Bạn có chắc chắn muốn xóa tài khoản "${selectedUser?.fullName}"? Hệ thống sẽ thực hiện xóa mềm.`}
        buttonText="Xác nhận xóa"
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
