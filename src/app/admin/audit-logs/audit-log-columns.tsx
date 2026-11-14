import type { ColumnDef } from "@tanstack/react-table";
import { CalendarDays, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AuditLog } from "@/types/audit-log.type";

export const ACTIONS = [
  ["", "Tất cả hành động"],
  ["LOGIN", "Đăng nhập"],
  ["LOGOUT", "Đăng xuất"],
  ["CREATE", "Tạo mới"],
  ["UPDATE", "Cập nhật"],
  ["DELETE", "Xóa"],
  ["PASSWORD_CHANGE", "Đổi mật khẩu"],
  ["PROFILE_UPDATE", "Cập nhật hồ sơ"],
  ["ADJUST_BALANCE", "Điều chỉnh số dư"],
  ["ARCHIVE", "Lưu trữ"],
  ["UNARCHIVE", "Bỏ lưu trữ"],
  ["CANCEL", "Hủy"],
  ["MEMBER_INVITE", "Mời thành viên"],
  ["MEMBER_ACCEPT", "Chấp nhận lời mời"],
  ["MEMBER_ROLE_CHANGE", "Đổi quyền thành viên"],
  ["MEMBER_REMOVE", "Xóa thành viên"],
  ["WALLET_UPDATE", "Cập nhật ví"],
  ["WALLET_DELETE", "Xóa ví"],
  ["RECORD_PAYMENT", "Ghi nhận thanh toán"],
  ["UNLINK_COUNTERPARTY", "Hủy liên kết"],
  ["UPDATE_LIMIT", "Cập nhật hạn mức"],
  ["ROLLOVER_EXECUTE", "Chuyển ngân sách"],
] as const;

export const ENTITIES = [
  ["", "Tất cả đối tượng"],
  ["USER", "Người dùng"],
  ["AUTH", "Xác thực"],
  ["TRANSACTION", "Giao dịch"],
  ["ACCOUNT", "Tài khoản"],
  ["TRANSFER", "Chuyển tiền"],
  ["WALLET", "Ví"],
  ["WALLET_MEMBER", "Thành viên ví"],
  ["LOAN", "Khoản vay"],
  ["LOAN_PAYMENT", "Thanh toán khoản vay"],
  ["BUDGET", "Ngân sách"],
] as const;

export function getLabel(
  options: readonly (readonly [string, string])[],
  value: string
) {
  return options.find(([key]) => key === value)?.[1] || value;
}

export function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function actionStyle(action: string) {
  switch (action) {
    case "CREATE":
    case "LOGIN":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300";
    case "DELETE":
    case "WALLET_DELETE":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300";
    case "UPDATE":
    case "PROFILE_UPDATE":
    case "PASSWORD_CHANGE":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300";
    default:
      return "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300";
  }
}

export function getAuditLogColumns(
  onViewDetail: (id: string) => void
): ColumnDef<AuditLog>[] {
  return [
    {
      accessorKey: "createdAt",
      header: "Thời gian",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 whitespace-nowrap text-sm">
          <CalendarDays className="size-4 text-muted-foreground" />
          {formatDate(row.original.createdAt)}
        </div>
      ),
    },
    {
      accessorKey: "userName",
      header: "Người thực hiện",
      cell: ({ row }) => {
        const log = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
              {(log.userName || "HT").slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-semibold">{log.userName || "Hệ thống"}</p>
              <p className="max-w-40 truncate text-xs text-muted-foreground">
                {log.userId || "Tự động"}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Hành động",
      cell: ({ row }) => (
        <span
          className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs font-bold ${actionStyle(
            row.original.action
          )}`}
        >
          {getLabel(ACTIONS, row.original.action)}
        </span>
      ),
    },
    {
      accessorKey: "entityType",
      header: "Đối tượng",
      cell: ({ row }) => (
        <span className="text-sm font-medium">
          {getLabel(ENTITIES, row.original.entityType)}
        </span>
      ),
    },
    {
      accessorKey: "summary",
      header: "Nội dung",
      cell: ({ row }) => (
        <p
          className="max-w-xs truncate text-sm text-muted-foreground"
          title={row.original.summary || ""}
        >
          {row.original.summary || "Không có mô tả"}
        </p>
      ),
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Xem chi tiết"
          aria-label="Xem chi tiết nhật ký"
          onClick={() => onViewDetail(row.original.id)}
        >
          <Eye className="size-4 text-primary" />
        </Button>
      ),
    },
  ];
}

