"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRight, MoreVertical, Pencil, ShieldCheck, Tag, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/schemas/category.schema";
import { formatDate } from "@/utils/format";

interface ColumnProps {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<Category>[] => [
  {
    accessorKey: "icon",
    header: "Biểu tượng",
    cell: ({ row }) => {
      const isExpense = row.original.type === "EXPENSE";
      return (
        <div
          className="size-9 rounded-2xl flex items-center justify-center text-white shadow-xs"
          style={{
            backgroundColor: row.original.color || (isExpense ? "#EF4444" : "#10B981"),
          }}
        >
          <Tag className="size-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên danh mục",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.parentId && (
          <CornerDownRight className="size-3.5 text-muted-foreground shrink-0" />
        )}
        <span className="font-bold text-foreground">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Phân loại",
    cell: ({ row }) => {
      const isExpense = row.original.type === "EXPENSE";
      return (
        <Badge
          variant={isExpense ? "destructive" : "success"}
          className="rounded-full"
        >
          {isExpense ? "Chi tiêu" : "Thu nhập"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "parent",
    header: "Danh mục cha",
    cell: ({ row }) => {
      const parent = row.original.parent;
      return parent ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-semibold">
          {parent.name}
        </span>
      ) : (
        <span className="text-xs text-muted-foreground/70">(Gốc cấp 1)</span>
      );
    },
  },
  {
    accessorKey: "isDefault",
    header: "Loại danh mục",
    cell: ({ row }) =>
      row.original.isDefault ? (
        <Badge variant="default" className="rounded-full gap-1 text-[11px]">
          <ShieldCheck className="size-3" />
          <span>Hệ thống</span>
        </Badge>
      ) : (
        <span className="text-xs text-muted-foreground">Người dùng tạo</span>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-6">Thao tác</div>,
    cell: ({ row }) => (
      <div className="text-right pr-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 rounded-full">
              <MoreVertical className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 rounded-2xl">
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <Pencil className="mr-2 size-3.5" />
              <span>Chỉnh sửa</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(row.original)}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <Trash2 className="mr-2 size-3.5" />
              <span>Xóa danh mục</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

