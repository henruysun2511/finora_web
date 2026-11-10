"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Xác nhận xóa",
  description = "Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?",
  buttonText = "Xác nhận xóa",
  loading,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 rounded-3xl">
        <DialogHeader>
          <div className="size-12 rounded-2xl bg-destructive/15 text-destructive flex items-center justify-center mb-3">
            <AlertTriangle className="size-6" />
          </div>
          <DialogTitle className="text-xl font-black text-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-4 gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="rounded-xl font-bold"
          >
            Hủy bỏ
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl font-bold shadow-md shadow-destructive/25"
          >
            {loading ? "Đang thực hiện..." : buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

