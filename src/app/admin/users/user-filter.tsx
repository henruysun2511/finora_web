
"use client";

import { useState } from "react";
import { Search, X, Filter } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { UserStatus } from "@/types/user.type";

interface UserFilterProps {
  onSearch: (keyword: string) => void;
  onStatusChange: (status?: UserStatus) => void;
  onRowsPerPageChange: (limit: number) => void;
}

export function UserFilter({
  onSearch,
  onStatusChange,
  onRowsPerPageChange,
}: UserFilterProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="p-5 border-b border-border flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-card">
      <div className="flex flex-wrap items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(searchValue.trim());
          }}
          className="relative w-full sm:w-[300px]"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

          <Input
            placeholder="Tìm theo họ tên, email..."
            className="pl-10 pr-9 h-11 bg-muted/40 rounded-2xl"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          {searchValue && (
            <button
              type="button"
              aria-label="Xóa tìm kiếm"
              onClick={() => {
                setSearchValue("");
                onSearch("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </form>

        <Select
          defaultValue="ALL"
          onValueChange={(value) =>
            onStatusChange(
              value === "ALL" ? undefined : value as UserStatus
            )
          }
        >
          <SelectTrigger className="w-[190px] h-11">
            <Filter className="size-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
            <SelectItem value="ACTIVE">Hoạt động</SelectItem>
            <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
            <SelectItem value="BLOCKED">Đã chặn</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <span>Hiển thị</span>
        <Select
          defaultValue="10"
          onValueChange={(value) =>
            onRowsPerPageChange(Number(value))
          }
        >
          <SelectTrigger className="w-20 h-9 rounded-xl font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span>bản ghi</span>
      </div>
    </div>
  );
}
