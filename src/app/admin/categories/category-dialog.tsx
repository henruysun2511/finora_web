"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Coffee,
  Utensils,
  ShoppingBag,
  Car,
  Home,
  HeartPulse,
  GraduationCap,
  Plane,
  Briefcase,
  Coins,
  Gift,
  TrendingUp,
} from "lucide-react";

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
import { Category, CategoryInput, categoryInputSchema } from "@/schemas/category.schema";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CategoryInput) => void;
  initialData?: Category | null;
  categories?: Category[];
  loading?: boolean;
}

const COLOR_PRESETS = [
  "#0072D6",
  "#10B981",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#64748B",
];

const ICON_PRESETS = [
  { name: "utensils", icon: <Utensils className="size-4" />, label: "Ăn uống" },
  { name: "coffee", icon: <Coffee className="size-4" />, label: "Cà phê" },
  { name: "shopping", icon: <ShoppingBag className="size-4" />, label: "Mua sắm" },
  { name: "car", icon: <Car className="size-4" />, label: "Đi lại" },
  { name: "home", icon: <Home className="size-4" />, label: "Nhà cửa" },
  { name: "health", icon: <HeartPulse className="size-4" />, label: "Y tế" },
  { name: "education", icon: <GraduationCap className="size-4" />, label: "Học tập" },
  { name: "flight", icon: <Plane className="size-4" />, label: "Du lịch" },
  { name: "salary", icon: <Briefcase className="size-4" />, label: "Lương" },
  { name: "bonus", icon: <Coins className="size-4" />, label: "Thưởng" },
  { name: "gift", icon: <Gift className="size-4" />, label: "Quà tặng" },
  { name: "investment", icon: <TrendingUp className="size-4" />, label: "Đầu tư" },
];

export function CategoryDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  categories = [],
  loading = false,
}: CategoryDialogProps) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categoryInputSchema),
    defaultValues: {
      name: "",
      type: "EXPENSE",
      color: "#0072D6",
      icon: "utensils",
      parentId: null,
      isDefault: false,
    },
  });

  const selectedColor = watch("color");
  const selectedIcon = watch("icon");
  const selectedType = watch("type");

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        type: initialData.type,
        color: initialData.color || "#0072D6",
        icon: initialData.icon || "utensils",
        parentId: initialData.parentId || null,
        isDefault: initialData.isDefault || false,
      });
    } else {
      reset({
        name: "",
        type: "EXPENSE",
        color: "#0072D6",
        icon: "utensils",
        parentId: null,
        isDefault: false,
      });
    }
  }, [initialData, reset, open]);

  const onFormSubmit = (data: CategoryInput) => {
    onSubmit({
      ...data,
      parentId: data.parentId === "" ? null : data.parentId,
    });
  };

  const parentCandidates = categories.filter(
    (c) => c.id !== initialData?.id && c.type === selectedType && !c.parentId
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-foreground">
            {isEditing ? "Chỉnh sửa danh mục" : "Tạo danh mục tài chính mới"}
          </DialogTitle>
          <DialogDescription className="font-medium text-muted-foreground">
            {isEditing
              ? "Cập nhật thông tin nhận diện cho danh mục này."
              : "Thêm danh mục mới vào hệ thống quản trị tài chính Finora."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-2">
          {/* Tên danh mục */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Tên danh mục <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="VD: Cà phê & Đồ uống, Lương thưởng..."
              className="h-11 rounded-2xl"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Phân loại (Thu / Chi) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Loại danh mục
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={isEditing}
                onClick={() => setValue("type", "EXPENSE")}
                className={`py-2 px-3 rounded-2xl border text-xs font-bold transition-all ${
                  selectedType === "EXPENSE"
                    ? "bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400"
                    : "border-border text-muted-foreground hover:bg-muted"
                } ${isEditing ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                🔴 Khoản Chi tiêu (Expense)
              </button>
              <button
                type="button"
                disabled={isEditing}
                onClick={() => setValue("type", "INCOME")}
                className={`py-2 px-3 rounded-2xl border text-xs font-bold transition-all ${
                  selectedType === "INCOME"
                    ? "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                    : "border-border text-muted-foreground hover:bg-muted"
                } ${isEditing ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                🟢 Khoản Thu nhập (Income)
              </button>
            </div>
          </div>

          {/* Danh mục cha */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Danh mục cấp cha (Tùy chọn)
            </label>
            <select
              {...register("parentId")}
              className="w-full h-11 rounded-2xl border border-border bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
            >
              <option value="">Không có (Danh mục gốc cấp 1)</option>
              {parentCandidates.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </select>
          </div>

          {/* Màu sắc nhận diện */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Mã màu hiển thị
            </label>
            <div className="flex items-center gap-2">
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setValue("color", c)}
                  className={`size-7 rounded-full transition-transform cursor-pointer ${
                    selectedColor === c ? "scale-125 ring-2 ring-primary ring-offset-2" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <Input
                type="text"
                className="w-24 h-9 text-xs font-mono ml-auto rounded-xl"
                {...register("color")}
              />
            </div>
          </div>

          {/* Biểu tượng (Icon) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Biểu tượng đại diện
            </label>
            <div className="grid grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1.5 border border-border/80 rounded-2xl">
              {ICON_PRESETS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setValue("icon", item.name)}
                  title={item.label}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                    selectedIcon === item.name
                      ? "bg-primary text-white font-bold"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="rounded-xl font-bold"
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading} className="rounded-xl font-bold shadow-md shadow-primary/25">
              {loading ? "Đang lưu..." : isEditing ? "Lưu thay đổi" : "Tạo danh mục"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

