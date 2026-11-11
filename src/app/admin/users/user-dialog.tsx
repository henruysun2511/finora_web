
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";

import {
  userInputSchema,
  type UserInput,
} from "@/schemas/user.schema";
import type { User, UserStatus } from "@/types/user.type";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onSubmit: (data: UserInput) => void;
  loading?: boolean;
}

export function UserDialog({
  open, onOpenChange, user, onSubmit, loading,
}: UserDialogProps) {
  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors },
  } = useForm<UserInput>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      avatar: "",
      status: "ACTIVE",
      isActive: true,
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone ?? "",
      avatar: user.avatar ?? "",
      status: user.status,
      isActive: user.isActive,
    });
  }, [user, reset, open]);

  const status = watch("status");
  const isActive = watch("isActive");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-6 rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">
            Chỉnh sửa người dùng
          </DialogTitle>
          <DialogDescription>
            Cập nhật thông tin tài khoản trong hệ thống FINORA.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 py-2"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Họ và tên
            </label>
            <Input
              {...register("fullName")}
              className="h-11 rounded-2xl"
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Email
            </label>
            <Input
              type="email"
              {...register("email")}
              className="h-11 rounded-2xl"
            />
            {errors.email && (
              <p className="text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Số điện thoại
            </label>
            <Input
              {...register("phone")}
              className="h-11 rounded-2xl"
              placeholder="Chưa cập nhật"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              URL ảnh đại diện
            </label>
            <Input
              {...register("avatar")}
              className="h-11 rounded-2xl"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Trạng thái
            </label>
            <Select
              value={status}
              onValueChange={(value) =>
                setValue("status", value as UserStatus)
              }
            >
              <SelectTrigger className="w-full h-11 rounded-2xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                <SelectItem value="BLOCKED">Đã chặn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-border p-4 cursor-pointer">
            <input
              type="checkbox"
              className="size-4 accent-primary"
              checked={isActive}
              onChange={(e) =>
                setValue("isActive", e.target.checked)
              }
            />
            <span className="text-sm font-semibold">
              Kích hoạt tài khoản
            </span>
          </label>

          <DialogFooter className="pt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="rounded-xl"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl font-bold"
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
