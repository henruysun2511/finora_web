"use client";

import { useMemo, useState } from "react";
import { Activity, Download, Filter, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { AdminPageTitle } from "@/components/common/admin-page-title";
import { DataTable } from "@/components/common/data-table";
import { DataPagination } from "@/components/common/data-pagination";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";

import { auditLogService } from "@/services/audit-log.service";
import { useGetAuditLogs } from "@/queries/useAuditLogQuery";
import type { AuditLogParams } from "@/types/audit-log.type";
import { handleError } from "@/utils/handleError";

import { getAuditLogColumns } from "./audit-log-columns";
import { AuditLogFilter } from "./audit-log-filter";
import { AuditLogDetailDialog } from "./audit-log-detail-dialog";

function dateToIso(value: string, endOfDay = false): string | undefined {
  if (!value) return undefined;
  const date = new Date(`${value}T${endOfDay ? "23:59:59.999" : "00:00:00.000"}`);
  return date.toISOString();
}

export default function AdminAuditLogsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [action, setAction] = useState("");
  const [entityType, setEntityType] = useState("");
  const [walletId, setWalletId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const invalidDates = Boolean(startDate && endDate && startDate > endDate);

  const params = useMemo<AuditLogParams>(
    () => ({
      page,
      limit,
      ...(action ? { action } : {}),
      ...(entityType ? { entityType } : {}),
      ...(walletId.trim() ? { walletId: walletId.trim() } : {}),
      ...(startDate ? { startDate: dateToIso(startDate) } : {}),
      ...(endDate ? { endDate: dateToIso(endDate, true) } : {}),
    }),
    [page, limit, action, entityType, walletId, startDate, endDate]
  );

  const { data, isLoading, isFetching, refetch } = useGetAuditLogs(params);

  const logs = data?.items ?? [];
  const pagination = data?.pagination;
  const total = pagination?.total ?? 0;
  const totalPages = Math.max(1, pagination?.totalPages ?? 1);

  // Client-side search within the current loaded page
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
      ].some((val) => String(val ?? "").toLowerCase().includes(keyword))
    );
  }, [logs, search]);

  const columns = useMemo(
    () => getAuditLogColumns((id) => setSelectedId(id)),
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
      toast.error("Vui lòng chọn ngày bắt đầu và ngày kết thúc để xuất báo cáo.");
      return;
    }

    if (invalidDates) {
      toast.error("Ngày bắt đầu không được sau ngày kết thúc.");
      return;
    }

    const start = dateToIso(startDate)!;
    const end = dateToIso(endDate, true)!;
    const days = (new Date(end).getTime() - new Date(start).getTime()) / 86400000;

    if (days > 90) {
      toast.error("Backend chỉ cho phép xuất tối đa 90 ngày.");
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
        ...(walletId.trim() ? { walletId: walletId.trim() } : {}),
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `finora-audit-logs-${startDate}-${endDate}.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success("Đã xuất báo cáo nhật ký thành công.");
    } catch (error) {
      handleError(error, "Không thể xuất báo cáo");
    } finally {
      setExporting(false);
    }
  };

  const activeFiltersCount = [action, entityType, walletId, startDate, endDate].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
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
            <RefreshCw className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`} />
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

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
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
          <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <ShieldCheck className="size-5" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground">
            Phạm vi dữ liệu
          </p>
          <p className="mt-1 text-lg font-black">
            {walletId.trim() ? "Nhật ký ví" : "Nhật ký hệ thống"}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
            <Filter className="size-5" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground">
            Bộ lọc đang áp dụng
          </p>
          <p className="mt-1 text-lg font-black">
            {activeFiltersCount} điều kiện
          </p>
        </div>
      </div>

      {/* Filter Component */}
      <AuditLogFilter
        search={search}
        onSearchChange={setSearch}
        action={action}
        onActionChange={(v) => {
          setAction(v);
          setPage(1);
        }}
        entityType={entityType}
        onEntityTypeChange={(v) => {
          setEntityType(v);
          setPage(1);
        }}
        walletId={walletId}
        onWalletIdChange={(v) => {
          setWalletId(v);
          setPage(1);
        }}
        startDate={startDate}
        onStartDateChange={(v) => {
          setStartDate(v);
          setPage(1);
        }}
        endDate={endDate}
        onEndDateChange={(v) => {
          setEndDate(v);
          setPage(1);
        }}
        invalidDates={invalidDates}
        onReset={resetFilters}
      />

      {/* Data Table */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
        <DataTable
          columns={columns}
          data={visibleLogs}
          loading={isLoading}
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PaginationInfo
            totalItems={total}
            page={page}
            limit={limit}
            currentLength={visibleLogs.length}
            label="nhật ký"
          />

          <DataPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Detail Dialog */}
      <AuditLogDetailDialog
        id={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
