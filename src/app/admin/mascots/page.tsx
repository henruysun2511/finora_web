
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  CheckCircle2,
  CircleOff,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";

import { AdminPageTitle } from "@/components/common/admin-page-title";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataTable } from "@/components/common/data-table";
import { DataPagination } from "@/components/common/data-pagination";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useGetMascots,
  useCreateMascot,
  useUpdateMascot,
  useUpdateMascotStatus,
  useDeleteMascot,
} from "@/queries/useMascotQuery";

import type {
  Mascot,
  MascotInput,
} from "@/types/mascot.type";

import { handleError } from "@/utils/handleError";

const money = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + " ₫";

const emptyForm: MascotInput = {
  tierName: "",
  displayName: "",
  minNetWorth: 0,
  maxNetWorth: null,
  displayOrder: 0,
  htmlContent: "",
  systemPrompt: "",
  quotes: [],
  mascotAssetUrl: "",
  isActive: true,
};

function MascotFormDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  loading,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  initialData: Mascot | null;
  onSubmit: (data: MascotInput) => Promise<void>;
  loading: boolean;
}) {
  const [form, setForm] = useState<MascotInput>(emptyForm);
  const [quotesText, setQuotesText] = useState("");

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm({
        tierName: initialData.tierName,
        displayName: initialData.displayName,
        minNetWorth: Number(initialData.minNetWorth),
        maxNetWorth:
          initialData.maxNetWorth == null
            ? null
            : Number(initialData.maxNetWorth),
        displayOrder: initialData.displayOrder,
        htmlContent: initialData.htmlContent || "",
        systemPrompt: initialData.systemPrompt || "",
        quotes: initialData.quotes || [],
        mascotAssetUrl: initialData.mascotAssetUrl || "",
        isActive: initialData.isActive,
      });

      setQuotesText(
        (initialData.quotes || []).join("\n")
      );
    } else {
      setForm({ ...emptyForm });
      setQuotesText("");
    }
  }, [open, initialData]);

  const setField = <K extends keyof MascotInput>(
    key: K,
    value: MascotInput[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const payload: MascotInput = {
      ...form,
      tierName: form.tierName.trim(),
      displayName: form.displayName.trim(),
      htmlContent: form.htmlContent.trim(),
      systemPrompt: form.systemPrompt.trim(),
      quotes: quotesText
        .split("\n")
        .map((q) => q.trim())
        .filter(Boolean),
      mascotAssetUrl:
        form.mascotAssetUrl?.trim() || undefined,
    };

    if (
      !/^[a-z0-9_-]+$/.test(payload.tierName)
    ) {
      toast.error(
        "Mã linh vật chỉ gồm chữ thường, số, - hoặc _"
      );
      return;
    }

    if (
      !payload.displayName ||
      !payload.htmlContent ||
      !payload.systemPrompt
    ) {
      toast.error("Vui lòng nhập đủ các trường bắt buộc");
      return;
    }

    if (
      !Number.isFinite(payload.minNetWorth) ||
      !Number.isInteger(payload.displayOrder) ||
      payload.displayOrder < 0
    ) {
      toast.error("Ngưỡng tài sản hoặc thứ tự không hợp lệ");
      return;
    }

    if (
      payload.maxNetWorth !== null &&
      (
        !Number.isFinite(payload.maxNetWorth) ||
        payload.maxNetWorth <= payload.minNetWorth
      )
    ) {
      toast.error(
        "Ngưỡng tối đa phải lớn hơn ngưỡng tối thiểu"
      );
      return;
    }

    await onSubmit(payload);
  };

  const inputClass =
    "h-11 rounded-xl border-border bg-background";

  const textareaClass =
    "w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">
            {initialData
              ? "Chỉnh sửa linh vật"
              : "Thêm linh vật mới"}
          </DialogTitle>
          <DialogDescription>
            Thiết lập cấp độ, tài sản ròng và tính cách
            của linh vật AI FINORA.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 pt-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Mã linh vật *
              </label>
              <Input
                className={inputClass}
                placeholder="Ví dụ: nora"
                value={form.tierName}
                onChange={(e) =>
                  setField("tierName", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Tên hiển thị *
              </label>
              <Input
                className={inputClass}
                placeholder="Ví dụ: Nora"
                value={form.displayName}
                onChange={(e) =>
                  setField("displayName", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Tài sản tối thiểu (VND) *
              </label>
              <Input
                type="number"
                step="0.01"
                className={inputClass}
                value={form.minNetWorth}
                onChange={(e) =>
                  setField(
                    "minNetWorth",
                    Number(e.target.value)
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Tài sản tối đa (VND)
              </label>
              <Input
                type="number"
                step="0.01"
                className={inputClass}
                placeholder="Để trống nếu không giới hạn"
                value={form.maxNetWorth ?? ""}
                onChange={(e) =>
                  setField(
                    "maxNetWorth",
                    e.target.value === ""
                      ? null
                      : Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Thứ tự hiển thị *
              </label>
              <Input
                type="number"
                min={0}
                step={1}
                className={inputClass}
                value={form.displayOrder}
                onChange={(e) =>
                  setField(
                    "displayOrder",
                    Number(e.target.value)
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Trạng thái
              </label>
              <select
                className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
                value={form.isActive ? "true" : "false"}
                onChange={(e) =>
                  setField(
                    "isActive",
                    e.target.value === "true"
                  )
                }
              >
                <option value="true">Hoạt động</option>
                <option value="false">Tạm ẩn</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Đường dẫn ảnh linh vật
            </label>
            <Input
              className={inputClass}
              placeholder="/assets/mascots/nora.svg"
              value={form.mascotAssetUrl || ""}
              onChange={(e) =>
                setField(
                  "mascotAssetUrl",
                  e.target.value
                )
              }
            />
            <p className="text-xs text-muted-foreground">
              Nhập đường dẫn asset đã được lưu trữ.
              API hiện tại nhận URL, không phải file upload.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              System Prompt *
            </label>
            <textarea
              className={textareaClass}
              rows={4}
              placeholder="Mô tả tính cách và cách tư vấn của linh vật..."
              value={form.systemPrompt}
              onChange={(e) =>
                setField(
                  "systemPrompt",
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Câu thoại đặc trưng
            </label>
            <textarea
              className={textareaClass}
              rows={4}
              placeholder="Mỗi câu thoại trên một dòng"
              value={quotesText}
              onChange={(e) =>
                setQuotesText(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Mã HTML / SVG *
            </label>
            <textarea
              className={`${textareaClass} font-mono`}
              rows={6}
              placeholder="<div>...</div>"
              value={form.htmlContent}
              onChange={(e) =>
                setField(
                  "htmlContent",
                  e.target.value
                )
              }
              required
            />
            <p className="text-xs text-muted-foreground">
              Nội dung được lưu dưới dạng mã nguồn,
              không thực thi trực tiếp trong trang Admin.
            </p>
          </div>

          <DialogFooter className="gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Hủy
            </Button>

            <Button
              type="submit"
              className="rounded-xl font-bold"
              disabled={loading}
            >
              {loading
                ? "Đang lưu..."
                : initialData
                  ? "Lưu thay đổi"
                  : "Tạo linh vật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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

  const activeCount = mascots.filter(
    (m) => m.isActive
  ).length;

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return mascots
      .filter((m) => {
        if (status === "active" && !m.isActive)
          return false;

        if (status === "inactive" && m.isActive)
          return false;

        return (
          m.displayName.toLowerCase().includes(keyword) ||
          m.tierName.toLowerCase().includes(keyword)
        );
      })
      .sort(
        (a, b) => a.displayOrder - b.displayOrder
      );
  }, [mascots, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / limit)
  );

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
        mascot.isActive
          ? "Đã tạm ẩn linh vật"
          : "Đã kích hoạt linh vật"
      );
    } catch (error) {
      handleError(
        error,
        "Không thể thay đổi trạng thái"
      );
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

  const columns: ColumnDef<Mascot>[] = [
    {
      accessorKey: "displayName",
      header: "Linh vật",
      cell: ({ row }) => {
        const mascot = row.original;

        return (
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Bot className="size-6" />
            </div>

            <div className="min-w-0">
              <p className="font-bold text-foreground">
                {mascot.displayName}
              </p>
              <p className="text-xs text-muted-foreground">
                {mascot.tierName}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "displayOrder",
      header: "Cấp độ",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="rounded-full px-3 py-1"
        >
          Cấp {row.original.displayOrder}
        </Badge>
      ),
    },
    {
      id: "netWorth",
      header: "Ngưỡng tài sản ròng",
      cell: ({ row }) => (
        <div className="text-sm">
          <p className="font-semibold">
            {money(Number(row.original.minNetWorth))}
          </p>
          <p className="text-xs text-muted-foreground">
            {row.original.maxNetWorth == null
              ? "Không giới hạn trên"
              : `Đến ${money(
                  Number(row.original.maxNetWorth)
                )}`}
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
              ? "inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
              : "inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
          }
        >
          {row.original.isActive
            ? "Hoạt động"
            : "Tạm ẩn"}
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
              onClick={() => {
                setEditing(mascot);
                setDialogOpen(true);
              }}
            >
              <Pencil className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              title={
                mascot.isActive
                  ? "Tạm ẩn"
                  : "Kích hoạt"
              }
              disabled={statusMutation.isPending}
              onClick={() => handleStatus(mascot)}
            >
              {mascot.isActive ? (
                <CircleOff className="size-4" />
              ) : (
                <CheckCircle2 className="size-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              title="Xóa"
              className="text-destructive"
              disabled={mascots.length <= 1}
              onClick={() => setDeleting(mascot)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex min-h-screen flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <AdminPageTitle
          title="Quản lý Linh vật AI"
          subtitle="Hệ thống Mascot FINORA"
        />

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-11 rounded-2xl font-bold"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              className={`mr-2 size-4 ${
                isFetching ? "animate-spin" : ""
              }`}
            />
            Làm mới
          </Button>

          <Button
            className="h-11 rounded-2xl px-5 font-bold shadow-md shadow-primary/20"
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

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Tổng linh vật",
            value: mascots.length,
            icon: Bot,
            color: "text-primary bg-primary/10",
          },
          {
            label: "Đang hoạt động",
            value: activeCount,
            icon: CheckCircle2,
            color:
              "text-emerald-600 bg-emerald-50",
          },
          {
            label: "Tạm ẩn",
            value: mascots.length - activeCount,
            icon: Wallet,
            color:
              "text-amber-600 bg-amber-50",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-3xl border border-border bg-card p-5 shadow-sm"
          >
            <div>
              <p className="text-xs font-semibold text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-2 text-3xl font-black">
                {item.value}
              </p>
            </div>

            <div
              className={`flex size-12 items-center justify-center rounded-2xl ${item.color}`}
            >
              <item.icon className="size-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-11 rounded-2xl bg-muted/40 pl-10"
              placeholder="Tìm theo tên, mã linh vật..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              className="h-11 rounded-2xl border border-input bg-background px-4 text-sm font-semibold"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">
                Tất cả trạng thái
              </option>
              <option value="active">
                Hoạt động
              </option>
              <option value="inactive">
                Tạm ẩn
              </option>
            </select>

            <select
              className="h-11 rounded-2xl border border-input bg-background px-4 text-sm"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10 bản ghi</option>
              <option value={20}>20 bản ghi</option>
              <option value={50}>50 bản ghi</option>
            </select>
          </div>
        </div>

        {isError ? (
          <div className="p-10 text-center">
            <p className="font-semibold text-destructive">
              Không thể tải danh sách linh vật.
            </p>
            <Button
              variant="outline"
              className="mt-4 rounded-xl"
              onClick={() => refetch()}
            >
              Thử lại
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={pagedMascots}
            loading={isLoading}
          />
        )}

        <div className="flex flex-col gap-4 border-t border-border p-5 md:flex-row md:items-center md:justify-between">
          <PaginationInfo
            page={safePage}
            limit={limit}
            totalItems={filtered.length}
            currentLength={pagedMascots.length}
            label="linh vật"
          />

          <DataPagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      <MascotFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={editing}
        onSubmit={handleSave}
        loading={
          createMutation.isPending ||
          updateMutation.isPending
        }
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
        onConfirm={handleDelete}
        title="Xóa linh vật?"
        description={`Bạn có chắc chắn muốn xóa "${deleting?.displayName || ""}"? Linh vật sẽ được xóa mềm khỏi hệ thống.`}
        buttonText="Xác nhận xóa"
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
