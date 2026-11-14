import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Mascot, MascotInput } from "@/types/mascot.type";
import { MascotAvatar } from "./mascot-avatar";

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

interface MascotFormDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  initialData: Mascot | null;
  onSubmit: (data: MascotInput) => Promise<void>;
  loading: boolean;
}

export function MascotFormDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  loading,
}: MascotFormDialogProps) {
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

      setQuotesText((initialData.quotes || []).join("\n"));
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      mascotAssetUrl: form.mascotAssetUrl?.trim() || undefined,
    };

    if (!/^[a-z0-9_-]+$/.test(payload.tierName)) {
      toast.error("Mã linh vật chỉ gồm chữ thường, số, - hoặc _");
      return;
    }

    if (!payload.displayName || !payload.htmlContent || !payload.systemPrompt) {
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
      (!Number.isFinite(payload.maxNetWorth) ||
        payload.maxNetWorth <= payload.minNetWorth)
    ) {
      toast.error("Ngưỡng tối đa phải lớn hơn ngưỡng tối thiểu");
      return;
    }

    await onSubmit(payload);
  };

  const inputClass = "h-11 rounded-xl border-border bg-background";
  const textareaClass =
    "w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">
            {initialData ? "Chỉnh sửa linh vật" : "Thêm linh vật mới"}
          </DialogTitle>
          <DialogDescription>
            Thiết lập cấp độ, tài sản ròng và tính cách của linh vật AI FINORA.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-3">
          {/* Live Mascot Avatar Preview */}
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted/30 p-4">
            <MascotAvatar
              mascot={{
                tierName: form.tierName,
                displayName: form.displayName,
                htmlContent: form.htmlContent,
                mascotAssetUrl: form.mascotAssetUrl,
              }}
              size="lg"
            />
            <div>
              <p className="text-sm font-bold text-foreground">
                {form.displayName || "Xem trước linh vật"}
              </p>
              <p className="text-xs text-muted-foreground">
                Mã: {form.tierName || "chưa nhập"} · Hiển thị thời gian thực theo mã SVG hoặc Asset URL
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Mã linh vật *</label>
              <Input
                className={inputClass}
                placeholder="Ví dụ: nora"
                value={form.tierName}
                onChange={(e) => setField("tierName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Tên hiển thị *</label>
              <Input
                className={inputClass}
                placeholder="Ví dụ: Nora"
                value={form.displayName}
                onChange={(e) => setField("displayName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Tài sản tối thiểu (VND) *</label>
              <Input
                type="number"
                step="0.01"
                className={inputClass}
                value={form.minNetWorth}
                onChange={(e) => setField("minNetWorth", Number(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Tài sản tối đa (VND)</label>
              <Input
                type="number"
                step="0.01"
                className={inputClass}
                placeholder="Để trống nếu không giới hạn"
                value={form.maxNetWorth ?? ""}
                onChange={(e) =>
                  setField(
                    "maxNetWorth",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Thứ tự hiển thị *</label>
              <Input
                type="number"
                min={0}
                step={1}
                className={inputClass}
                value={form.displayOrder}
                onChange={(e) => setField("displayOrder", Number(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Trạng thái</label>
              <select
                className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
                value={form.isActive ? "true" : "false"}
                onChange={(e) => setField("isActive", e.target.value === "true")}
              >
                <option value="true">Hoạt động</option>
                <option value="false">Tạm ẩn</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Đường dẫn ảnh linh vật</label>
            <Input
              className={inputClass}
              placeholder="/assets/mascots/nora.svg"
              value={form.mascotAssetUrl || ""}
              onChange={(e) => setField("mascotAssetUrl", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Nhập đường dẫn asset đã được lưu trữ (URL/Path).
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">System Prompt *</label>
            <textarea
              className={textareaClass}
              rows={4}
              placeholder="Mô tả tính cách và cách tư vấn của linh vật..."
              value={form.systemPrompt}
              onChange={(e) => setField("systemPrompt", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Câu thoại đặc trưng</label>
            <textarea
              className={textareaClass}
              rows={4}
              placeholder="Mỗi câu thoại trên một dòng"
              value={quotesText}
              onChange={(e) => setQuotesText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Mã HTML / SVG *</label>
            <textarea
              className={`${textareaClass} font-mono`}
              rows={6}
              placeholder="<div>...</div>"
              value={form.htmlContent}
              onChange={(e) => setField("htmlContent", e.target.value)}
              required
            />
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

            <Button type="submit" className="rounded-xl font-bold" disabled={loading}>
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
