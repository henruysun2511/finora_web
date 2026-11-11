
"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Download,
  Eye,
  FileClock,
  FilterX,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { AdminPageTitle } from "@/components/common/admin-page-title";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { auditLogService } from "@/services/audit-log.service";
import type {
  AuditLog,
  AuditLogDetail,
  AuditLogParams,
} from "@/types/audit-log.type";
import { handleError } from "@/utils/handleError";

const ACTIONS = [
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

const ENTITIES = [
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

function getLabel(
  options: readonly (readonly [string, string])[],
  value: string
) {
  return options.find(([key]) => key === value)?.[1] || value;
}

function formatDate(value: string) {
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

function dateToIso(
  value: string,
  endOfDay = false
): string | undefined {
  if (!value) return undefined;

  const date = new Date(
    `${value}T${endOfDay ? "23:59:59.999" : "00:00:00.000"}`
  );

  return date.toISOString();
}

function displayValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;

  return JSON.stringify(value, null, 2) ?? "—";
}

function actionStyle(action: string) {
  switch (action) {
    case "CREATE":
    case "LOGIN":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "DELETE":
    case "WALLET_DELETE":
      return "border-red-200 bg-red-50 text-red-700";
    case "UPDATE":
    case "PROFILE_UPDATE":
    case "PASSWORD_CHANGE":
      return "border-blue-200 bg-blue-50 text-blue-700";
    default:
      return "border-slate-200 bg-slate-100 text-slate-700";
  }
}

const selectClass =
  "h-11 rounded-xl border border-input bg-background px-3 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/20";

function ValuePanel({
  title,
  value,
}: {
  title: string;
  value: unknown;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-all rounded-2xl border border-border bg-muted/40 p-4 text-xs leading-6">
        {displayValue(value)}
      </pre>
    </div>
  );
}

function AuditDetailDialog({
  id,
  onClose,
}: {
  id: string | null;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useQuery<
    AuditLogDetail
  >({
    queryKey: ["admin", "audit-logs", "detail", id],
    queryFn: () => auditLogService.getById(id!),
    enabled: Boolean(id),
  });

  return (
    <Dialog
      open={Boolean(id)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black">
            <FileClock className="size-5 text-primary" />
            Chi tiết nhật ký hoạt động
          </DialogTitle>
          <DialogDescription>
            Thông tin sự kiện và thay đổi dữ liệu được ghi nhận
            bởi FINORA.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            Đang tải chi tiết...
          </div>
        ) : isError ? (
          <p className="py-10 text-center text-sm text-destructive">
            Không thể tải chi tiết nhật ký.
          </p>
        ) : data ? (
          <div className="space-y-6 py-3">
            <div className="grid gap-3 rounded-2xl bg-muted/40 p-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">
                  Người thực hiện
                </p>
                <p className="mt-1 font-semibold">
                  {data.userName || data.userId || "Hệ thống"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Thời gian
                </p>
                <p className="mt-1 font-semibold">
                  {formatDate(data.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Hành động
                </p>
                <p className="mt-1 font-semibold">
                  {getLabel(ACTIONS, data.action)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Đối tượng
                </p>
                <p className="mt-1 font-semibold">
                  {getLabel(ENTITIES, data.entityType)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Địa chỉ IP
                </p>
                <p className="mt-1 break-all font-medium">
                  {data.ipAddress || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  ID đối tượng
                </p>
                <p className="mt-1 break-all font-mono text-xs">
                  {data.entityId || "—"}
                </p>
              </div>
            </div>

            {data.userAgent && (
              <div>
                <p className="mb-1 text-xs font-bold text-muted-foreground">
                  Thiết bị / Trình duyệt
                </p>
                <p className="break-all text-xs">
                  {data.userAgent}
                </p>
              </div>
            )}

            <div>
              <h3 className="mb-3 font-bold">
                So sánh dữ liệu trước và sau
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <ValuePanel
                  title="Dữ liệu trước"
                  value={data.oldValue}
                />
                <ValuePanel
                  title="Dữ liệu sau"
                  value={data.newValue}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-bold">
                Các trường thay đổi
              </h3>
              {data.diff?.length ? (
                <div className="space-y-2">
                  {data.diff.map((item, index) => (
                    <div
                      key={`${item.field}-${index}`}
                      className="rounded-xl border border-border p-3"
                    >
                      <p className="mb-2 font-mono text-xs font-bold text-primary">
                        {item.field}
                      </p>
                      <div className="grid gap-2 text-xs sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                        <pre className="overflow-auto whitespace-pre-wrap break-all rounded-lg bg-red-50 p-2 text-red-700">
                          {displayValue(item.from)}
                        </pre>
                        <ArrowRight className="hidden size-4 text-muted-foreground sm:block" />
                        <pre className="overflow-auto whitespace-pre-wrap break-all rounded-lg bg-emerald-50 p-2 text-emerald-700">
                          {displayValue(item.to)}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
                  Không có trường thay đổi được ghi nhận.
                </p>
              )}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export default function AdminAuditLogsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [action, setAction] = useState("");
  const [entityType, setEntityType] = useState("");
  const [walletId, setWalletId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(
    null
  );
  const [exporting, setExporting] = useState(false);

  const [search, setSearch] = useState("");

  const invalidDates = Boolean(
    startDate && endDate && startDate > endDate
  );

  const params = useMemo<AuditLogParams>(
    () => ({
      page,
      limit,
      ...(action ? { action } : {}),
      ...(entityType ? { entityType } : {}),
      ...(walletId.trim()
        ? { walletId: walletId.trim() }
        : {}),
      ...(startDate
        ? { startDate: dateToIso(startDate) }
        : {}),
      ...(endDate
        ? { endDate: dateToIso(endDate, true) }
        : {}),
    }),
    [
      page,
      limit,
      action,
      entityType,
      walletId,
      startDate,
      endDate,
    ]
  );

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin", "audit-logs", params],
    queryFn: () => auditLogService.getAll(params),
    enabled: !invalidDates,
    placeholderData: (previousData) => previousData,
  });

  const logs = data?.items ?? [];
  const pagination = data?.pagination;
  const total = pagination?.total ?? 0;
  const totalPages = Math.max(
    1,
    pagination?.totalPages ?? 1
  );

  // Chỉ tìm trong trang hiện tại.
  // Backend chưa hỗ trợ tham số keyword.
  const visibleLogs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return logs;

    return logs.filter((log) =>
      [
        log.userName,
        log.userId,
        log.summary,
        log.action,
        log.entityType,
        log.ipAddress,
      ]
        .some((value) =>
          String(value ?? "").toLowerCase().includes(keyword)
        )
    );
  }, [logs, search]);

  const columns = useMemo<ColumnDef<AuditLog>[]>(
    () => [
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
                {(log.userName || "HT")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold">
                  {log.userName || "Hệ thống"}
                </p>
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
            onClick={() => setSelectedId(row.original.id)}
          >
            <Eye className="size-4 text-primary" />
          </Button>
        ),
      },
    ],
    []
  );

  const resetFilters = () => {
    setAction("");
    setEntityType("");
    setWalletId("");
    setStartDate("");
    setEndDate("");
    setSearch("");
    setPage(1);
  };

  const handleExport = async (format: "csv" | "xlsx") => {
    if (!startDate || !endDate) {
      toast.error(
        "Vui lòng chọn ngày bắt đầu và ngày kết thúc để xuất báo cáo."
      );
      return;
    }

    if (invalidDates) {
      toast.error("Ngày bắt đầu không được sau ngày kết thúc.");
      return;
    }

    const start = dateToIso(startDate)!;
    const end = dateToIso(endDate, true)!;

    const days =
      (new Date(end).getTime() - new Date(start).getTime()) /
      86400000;

    if (days > 90) {
      toast.error(
        "Backend chỉ cho phép xuất tối đa 90 ngày."
      );
      return;
    }

    setExporting(true);

    try {
      const blob = await auditLogService.exportFile({
        format,
        startDate: start,
        endDate: end,
        ...(action ? { action } : {}),
        ...(entityType ? { entityType } : {}),
        ...(walletId.trim()
          ? { walletId: walletId.trim() }
          : {}),
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `finora-audit-logs-${startDate}-${endDate}.${format}`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
      toast.success("Đã xuất báo cáo nhật ký.");
    } catch (error) {
      handleError(error, "Không thể xuất báo cáo");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <AdminPageTitle
          subtitle="BẢO MẬT & KIỂM SOÁT HỆ THỐNG"
          title="Nhật ký hoạt động"
        />

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="h-11 rounded-2xl"
            onClick={() => refetch()}
            disabled={isFetching || invalidDates}
          >
            <RefreshCw
              className={`mr-2 size-4 ${
                isFetching ? "animate-spin" : ""
              }`}
            />
            Làm mới
          </Button>

          <Button
            variant="outline"
            className="h-11 rounded-2xl"
            disabled={exporting}
            onClick={() => handleExport("csv")}
          >
            <Download className="mr-2 size-4" />
            Xuất CSV
          </Button>

          <Button
            className="h-11 rounded-2xl"
            disabled={exporting}
            onClick={() => handleExport("xlsx")}
          >
            {exporting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Download className="mr-2 size-4" />
            )}
            Xuất Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Activity className="size-5" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground">
            Tổng nhật ký theo bộ lọc
          </p>
          <p className="mt-1 text-3xl font-black">
            {total.toLocaleString("vi-VN")}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <ShieldCheck className="size-5" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground">
            Phạm vi dữ liệu
          </p>
          <p className="mt-1 text-lg font-black">
            {walletId.trim()
              ? "Nhật ký ví"
              : "Nhật ký hệ thống"}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <FileClock className="size-5" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground">
            Trang hiện tại
          </p>
          <p className="mt-1 text-3xl font-black">
            {page}
            <span className="ml-1 text-base font-medium text-muted-foreground">
              / {totalPages}
            </span>
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="space-y-4 border-b border-border p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-11 rounded-xl bg-muted/40 pl-10"
                placeholder="Tìm trong trang hiện tại..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <Button
              variant="ghost"
              className="h-11 rounded-xl"
              onClick={resetFilters}
            >
              <FilterX className="mr-2 size-4" />
              Xóa bộ lọc
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <select
              className={selectClass}
              value={action}
              onChange={(event) => {
                setAction(event.target.value);
                setPage(1);
              }}
              aria-label="Lọc hành động"
            >
              {ACTIONS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <select
              className={selectClass}
              value={entityType}
              onChange={(event) => {
                setEntityType(event.target.value);
                setPage(1);
              }}
              aria-label="Lọc loại đối tượng"
            >
              {ENTITIES.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <Input
              className="h-11 rounded-xl"
              placeholder="UUID ví (để trống: nhật ký hệ thống)"
              value={walletId}
              onChange={(event) => {
                setWalletId(event.target.value);
                setPage(1);
              }}
              aria-label="ID ví"
            />

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Từ ngày
              </label>
              <Input
                type="date"
                className="h-11 rounded-xl"
                value={startDate}
                onChange={(event) => {
                  setStartDate(event.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Đến ngày
              </label>
              <Input
                type="date"
                className="h-11 rounded-xl"
                value={endDate}
                onChange={(event) => {
                  setEndDate(event.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Số bản ghi / trang
              </label>
              <select
                className={`${selectClass} w-full`}
                value={limit}
                onChange={(event) => {
                  setLimit(Number(event.target.value));
                  setPage(1);
                }}
              >
                {[10, 20, 50, 100].map((value) => (
                  <option key={value} value={value}>
                    {value} bản ghi
                  </option>
                ))}
              </select>
            </div>
          </div>

          {invalidDates && (
            <p className="text-xs font-semibold text-destructive">
              Ngày bắt đầu không được sau ngày kết thúc.
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Mặc định, Admin xem nhật ký hệ thống USER/AUTH.
            Nhập UUID ví để xem nhật ký trong ví đó.
            Tìm kiếm từ khóa chỉ áp dụng cho trang hiện tại.
          </p>
        </div>

        {isError ? (
          <div className="space-y-3 p-10 text-center">
            <p className="font-semibold text-destructive">
              Không thể tải nhật ký hoạt động.
            </p>
            <p className="text-xs text-muted-foreground">
              Kiểm tra quyền AUDIT_LOGS_READ và kết nối Backend.
            </p>
            <Button
              variant="outline"
              onClick={() => refetch()}
            >
              Thử lại
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={visibleLogs}
            loading={isLoading}
          />
        )}

        <div className="flex flex-col gap-4 border-t border-border p-5 md:flex-row md:items-center md:justify-between">
          <PaginationInfo
            page={page}
            limit={limit}
            totalItems={total}
            currentLength={logs.length}
            label="nhật ký"
          />

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isFetching}
              onClick={() =>
                setPage((previous) =>
                  Math.max(1, previous - 1)
                )
              }
            >
              Trước
            </Button>

            <span className="text-xs font-semibold">
              {page} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isFetching}
              onClick={() =>
                setPage((previous) => previous + 1)
              }
            >
              Tiếp
            </Button>
          </div>
        </div>
      </div>

      <AuditDetailDialog
        id={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
