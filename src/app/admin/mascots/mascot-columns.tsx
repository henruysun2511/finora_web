import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, CircleOff, Pencil, Trash2 } from "lucide-react";
import { MascotAvatar } from "./mascot-avatar";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Mascot } from "@/types/mascot.type";

const money = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + " ₫";

interface MascotColumnsProps {
  onEdit: (mascot: Mascot) => void;
  onToggleStatus: (mascot: Mascot) => void;
  onDelete: (mascot: Mascot) => void;
  isStatusPending?: boolean;
}

export function getMascotColumns({
  onEdit,
  onToggleStatus,
  onDelete,
  isStatusPending,
}: MascotColumnsProps): ColumnDef<Mascot>[] {
  return [
    {
      accessorKey: "displayName",
      header: "Linh vật",
      cell: ({ row }) => {
        const mascot = row.original;
        return (
          <div className="flex items-center gap-3">
            <MascotAvatar mascot={mascot} size="md" />
            <div className="min-w-0">
              <p className="font-bold text-foreground">{mascot.displayName}</p>
              <p className="text-xs text-muted-foreground">{mascot.tierName}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "displayOrder",
      header: "Cấp độ",
      cell: ({ row }) => (
        <Badge variant="outline" className="rounded-full px-3 py-1 font-bold">
          Cấp {row.original.displayOrder}
        </Badge>
      ),
    },
    {
      id: "netWorth",
      header: "Ngưỡng tài sản ròng",
      cell: ({ row }) => (
        <div className="text-sm">
          <p className="font-semibold">{money(Number(row.original.minNetWorth))}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.maxNetWorth == null
              ? "Không giới hạn trên"
              : `Đến ${money(Number(row.original.maxNetWorth))}`}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Trạng thái",
      cell: ({ row }) => (
        <span
          className={
            row.original.isActive
              ? "inline-flex rounded-full border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-800 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400"
              : "inline-flex rounded-full border border-slate-200 bg-slate-100 dark:bg-slate-800 dark:border-slate-700 px-3 py-1 text-xs font-bold text-slate-600 dark:text-slate-400"
          }
        >
          {row.original.isActive ? "Hoạt động" : "Tạm ẩn"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        const mascot = row.original;
        return (
          <div className="flex justify-end gap-1 pr-3">
            <Button
              variant="ghost"
              size="icon"
              title="Chỉnh sửa"
              onClick={() => onEdit(mascot)}
            >
              <Pencil className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              title={mascot.isActive ? "Tạm ẩn" : "Kích hoạt"}
              disabled={isStatusPending}
              onClick={() => onToggleStatus(mascot)}
            >
              {mascot.isActive ? (
                <CircleOff className="size-4" />
              ) : (
                <CheckCircle2 className="size-4 text-emerald-600" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              title="Xóa"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(mascot)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
