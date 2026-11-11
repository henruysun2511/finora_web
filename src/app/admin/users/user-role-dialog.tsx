
"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useGetRoles } from "@/queries/useUserQuery";
import type { User } from "@/types/user.type";

interface UserRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onSubmit: (roleIds: string[]) => void;
  loading?: boolean;
}

export function UserRoleDialog({
  open, onOpenChange, user, onSubmit, loading,
}: UserRoleDialogProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const {
    data: roles = [],
    isLoading,
    isError,
  } = useGetRoles(open);

  useEffect(() => {
    if (open && user) {
      setSelectedRoles(user.roles?.map((role) => role.id) ?? []);
    }
  }, [open, user]);

  const toggleRole = (id: string) => {
    setSelectedRoles((prev) =>
      prev.includes(id)
        ? prev.filter((value) => value !== id)
        : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 rounded-3xl">
        <DialogHeader>
          <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2">
            <ShieldCheck className="size-6" />
          </div>

          <DialogTitle className="text-xl font-black">
            Phân quyền người dùng
          </DialogTitle>

          <DialogDescription>
            Thiết lập vai trò cho tài khoản{" "}
            <strong>{user?.fullName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-3 max-h-80 overflow-y-auto">
          {isLoading && (
            <p className="text-sm text-muted-foreground">
              Đang tải danh sách vai trò...
            </p>
          )}

          {isError && (
            <p className="text-sm text-destructive">
              Không thể tải vai trò. Kiểm tra quyền ROLES_READ.
            </p>
          )}

          {!isLoading && !isError && roles.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Hệ thống chưa có vai trò.
            </p>
          )}

          {roles.map((role) => (
            <label
              key={role.id}
              className="flex items-center gap-3 p-4 border border-border rounded-2xl cursor-pointer hover:bg-muted/50"
            >
              <input
                type="checkbox"
                className="size-4 accent-primary"
                checked={selectedRoles.includes(role.id)}
                onChange={() => toggleRole(role.id)}
              />
              <div>
                <p className="font-bold text-sm">{role.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {role.description || role.code}
                </p>
              </div>
            </label>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Hủy bỏ
          </Button>
          <Button
            disabled={loading || isLoading || isError || roles.length === 0}
            onClick={() => onSubmit(selectedRoles)}
            className="rounded-xl font-bold"
          >
            {loading ? "Đang lưu..." : "Lưu phân quyền"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
