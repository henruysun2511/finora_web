"use client";

import { ArrowRight, FileClock, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAuditLogDetail } from "@/queries/useAuditLogQuery";
import {
  ACTIONS,
  ENTITIES,
  formatDate,
  getLabel,
} from "./audit-log-columns";

function displayValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2) ?? "—";
}

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

interface AuditLogDetailDialogProps {
  id: string | null;
  onClose: () => void;
}

export function AuditLogDetailDialog({
  id,
  onClose,
}: AuditLogDetailDialogProps) {
  const { data, isLoading, isError } = useGetAuditLogDetail(id);

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
            Thông tin sự kiện và thay đổi dữ liệu được ghi nhận bởi FINORA.
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
                <p className="text-xs text-muted-foreground">Người thực hiện</p>
                <p className="mt-1 font-semibold">
                  {data.userName || data.userId || "Hệ thống"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Thời gian</p>
                <p className="mt-1 font-semibold">{formatDate(data.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hành động</p>
                <p className="mt-1 font-semibold">
                  {getLabel(ACTIONS, data.action)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Đối tượng</p>
                <p className="mt-1 font-semibold">
                  {getLabel(ENTITIES, data.entityType)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Địa chỉ IP</p>
                <p className="mt-1 break-all font-medium">
                  {data.ipAddress || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">ID đối tượng</p>
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
                <p className="break-all text-xs text-muted-foreground">
                  {data.userAgent}
                </p>
              </div>
            )}

            <div>
              <h3 className="mb-3 font-bold">So sánh dữ liệu trước và sau</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <ValuePanel title="Dữ liệu trước" value={data.oldValue} />
                <ValuePanel title="Dữ liệu sau" value={data.newValue} />
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-bold">Các trường thay đổi</h3>
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
                        <pre className="overflow-auto whitespace-pre-wrap break-all rounded-lg bg-red-50 p-2 text-red-700 dark:bg-red-950/40 dark:text-red-300">
                          {displayValue(item.from)}
                        </pre>
                        <ArrowRight className="hidden size-4 text-muted-foreground sm:block" />
                        <pre className="overflow-auto whitespace-pre-wrap break-all rounded-lg bg-emerald-50 p-2 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
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

