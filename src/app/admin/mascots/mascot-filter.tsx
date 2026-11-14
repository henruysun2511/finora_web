import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MascotFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export function MascotFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: MascotFilterProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-10 pl-9 rounded-xl border-border bg-background"
          placeholder="Tìm theo tên hiển thị hoặc mã cấp độ..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          className="h-10 rounded-xl border border-input bg-background px-3 text-sm font-medium"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Đang tạm ẩn</option>
        </select>
      </div>
    </div>
  );
}
