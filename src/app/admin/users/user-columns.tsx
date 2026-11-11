
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  MoreVertical, Eye, Pencil, ShieldCheck,
  LockKeyhole, UnlockKeyhole, Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { User } from "@/types/user.type";

interface ColumnProps {
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onRoles: (user: User) => void;
  onToggleBlock: (user: User) => void;
  onDelete: (user: User) => void;
  loading?: boolean;
}

const getInitials = (name: string) =>
  name.trim().split(/\s+/).slice(-2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

export const getColumns = ({
  onView,
  onEdit,
  onRoles,
  onToggleBlock,
  onDelete,
  loading,
}: ColumnProps): ColumnDef<User>[] => [
  {
    accessorKey: "fullName",
    header: "Người dùng",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-3 min-w-[220px]">
          <div className="size-11 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm overflow-hidden">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.fullName}
                className="size-full object-cover"
              />
            ) : getInitials(user.fullName)}
          </div>

          <div className="min-w-0">
            <p className="font-bold text-foreground truncate">
              {user.fullName}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-1">
              {user.email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.phone || "Chưa cập nhật"}
      </span>
    ),
  },
  {
    id: "roles",
    header: "Vai trò",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1.5">
        {row.original.roles?.length ? (
          row.original.roles.map((role) => (
            <Badge
              key={role.id}
              variant="default"
              className="rounded-full"
            >
              <ShieldCheck className="size-3" />
              {role.name}
            </Badge>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">
            Chưa gán
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const user = row.original;

      if (user.status === "BLOCKED") {
        return <Badge variant="destructive">Đã chặn</Badge>;
      }

      if (user.status === "INACTIVE" || !user.isActive) {
        return <Badge variant="warning">Không hoạt động</Badge>;
      }

      return <Badge variant="success">Hoạt động</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tham gia",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString("vi-VN")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => {
      const user = row.original;
      const blocked = user.status === "BLOCKED";

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={loading}
                className="size-9 rounded-xl hover:bg-primary/10"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onSelect={() => onView(user)}>
                <Eye className="size-4" />
                Xem chi tiết
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={() => onEdit(user)}>
                <Pencil className="size-4" />
                Chỉnh sửa
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={() => onRoles(user)}>
                <ShieldCheck className="size-4" />
                Phân quyền
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={() => onToggleBlock(user)}>
                {blocked ? (
                  <UnlockKeyhole className="size-4" />
                ) : (
                  <LockKeyhole className="size-4" />
                )}
                {blocked ? "Mở chặn" : "Chặn tài khoản"}
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={() => onDelete(user)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="size-4" />
                Xóa tài khoản
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
