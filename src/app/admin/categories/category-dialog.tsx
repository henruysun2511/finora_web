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
  FolderPlus,
  FolderEdit,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      isDefault: true,
    },
  });

  const selectedColor = watch("color");
  const selectedIcon = watch("icon");
  const selectedType = watch("type");
  const selectedParentId = watch("parentId");
  const isDefault = watch("isDefault");

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          name: initialData.name,
          type: initialData.type,
          color: initialData.color || "#0072D6",
          icon: initialData.icon || "utensils",
          parentId: initialData.parentId || null,
          isDefault: initialData.isDefault ?? true,
        });
      } else {
        reset({
          name: "",
          type: "EXPENSE",
          color: "#0072D6",
          icon: "utensils",
          parentId: null,
          isDefault: true,
        });
      }
    }
  }, [initialData, reset, open]);

  const onFormSubmit = (data: CategoryInput) => {
    onSubmit({
      ...data,
      parentId: data.parentId === "NONE" || data.parentId === "" ? null : data.parentId,
    });
  };

  const parentCandidates = categories.filter(
    (c) => c.id !== initialData?.id && c.type === selectedType && !c.parentId
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[620px] rounded-[2rem] bg-card border border-border shadow-2xl p-0 overflow-hidden font-sans"
      >
        {/* Header chuẩn phong cách Solarn Admin */}
        <DialogHeader className="p-8 bg-card border-b border-border">
          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 text-primary">
            {isEditing ? (
              <FolderEdit className="size-6" />
            ) : (
              <FolderPlus className="size-6" />
            )}
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-foreground">
            {isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium text-sm">
            {isEditing
              ? "Cập nhật lại thông tin nhận diện cho danh mục tài chính này."
              : "Thiết lập thông tin cơ bản cho danh mục mới trong hệ sinh thái Finora."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="p-8 space-y-6 bg-card max-h-[68vh] overflow-y-auto">
            {/* Tên danh mục */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Tên danh mục <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="VD: Ăn uống, Tiền điện nước, Lương thưởng..."
                className="h-12 rounded-xl border-border bg-card text-sm font-semibold"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-[10px] text-destructive font-bold ml-1 uppercase tracking-wider">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Grid 2 cột: Loại danh mục & Danh mục cha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phân loại danh mục (Select chuẩn Solarn) */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  Loại danh mục
                </Label>
                <Select
                  value={selectedType}
                  disabled={isEditing}
                  onValueChange={(val: "EXPENSE" | "INCOME") => {
                    setValue("type", val, { shouldValidate: true });
                    setValue("parentId", null);
                  }}
                >
                  <SelectTrigger className="h-12 rounded-xl border-border bg-card shadow-xs">
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EXPENSE">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-rose-500" />
                        <span>Khoản Chi tiêu (Expense)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="INCOME">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        <span>Khoản Thu nhập (Income)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {isEditing && (
                  <p className="text-[10px] text-muted-foreground ml-1">
                    Không thể đổi phân loại khi đang chỉnh sửa
                  </p>
                )}
              </div>

              {/* Danh mục cấp cha (Select chuẩn Solarn) */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  Danh mục cấp cha
                </Label>
                <Select
                  value={selectedParentId || "NONE"}
                  onValueChange={(val) =>
                    setValue("parentId", val === "NONE" ? null : val, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="h-12 rounded-xl border-border bg-card shadow-xs">
                    <SelectValue placeholder="Chọn danh mục cha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">
                      <span className="text-muted-foreground font-medium">
                        Không có (Danh mục gốc cấp 1)
                      </span>
                    </SelectItem>
                    {parentCandidates
                      .filter((parent): parent is Category & { id: string } => Boolean(parent.id))
                      .map((parent) => (
                        <SelectItem key={parent.id} value={parent.id}>
                        <div className="flex items-center gap-2">
                          {parent.color && (
                            <span
                              className="size-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: parent.color }}
                            />
                          )}
                          <span>{parent.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Màu sắc nhận diện */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Mã màu hiển thị
              </Label>
              <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl border border-border bg-muted/20">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setValue("color", c)}
                    className={`size-8 rounded-xl transition-all cursor-pointer ${
                      selectedColor === c
                        ? "scale-110 ring-2 ring-primary ring-offset-2 ring-offset-card"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
                <Input
                  type="text"
                  placeholder="#0072D6"
                  className="w-28 h-9 text-xs font-mono ml-auto rounded-xl border-border bg-card"
                  {...register("color")}
                />
              </div>
            </div>

            {/* Biểu tượng đại diện */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Biểu tượng đại diện
              </Label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-2 border border-border rounded-xl bg-muted/20">
                {ICON_PRESETS.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setValue("icon", item.name)}
                    title={item.label}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs gap-1 transition-all cursor-pointer ${
                      selectedIcon === item.name
                        ? "bg-primary text-white font-bold shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px] truncate max-w-full">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Switch Danh mục hệ thống */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border">
              <div className="space-y-0.5">
                <Label
                  className="text-xs font-bold text-foreground cursor-pointer"
                  onClick={() => setValue("isDefault", !isDefault)}
                >
                  Danh mục mặc định của hệ thống
                </Label>
                <p className="text-[11px] text-muted-foreground font-medium">
                  Tự động hiển thị và áp dụng chung cho tất cả tài khoản người dùng trên ứng dụng
                </p>
              </div>
              <Switch
                checked={isDefault}
                onCheckedChange={(checked) => setValue("isDefault", checked)}
              />
            </div>
          </div>

          {/* Footer chuẩn Solarn */}
          <DialogFooter className="p-6 bg-muted/20 border-t border-border flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="h-11 px-5 rounded-xl font-bold border-border"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-6 rounded-xl font-bold bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary/90"
            >
              {loading ? "Đang lưu..." : isEditing ? "Lưu thay đổi" : "Tạo danh mục"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
