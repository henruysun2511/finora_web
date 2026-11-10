"use client";

import React, { useState } from "react";
import { Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryParams } from "@/schemas/category.schema";

interface CategoryFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Partial<CategoryParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function CategoryFilter({
  onSearch,
  onFilterChange,
  onRowsPerPageChange,
}: CategoryFilterProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div className="p-5 border-b border-border flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-card">
      <div className="flex flex-wrap items-center gap-3">
        {/* Tìm kiếm */}
        <form onSubmit={handleSearch} className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên danh mục..."
            className="pl-10 pr-9 h-11 bg-muted/40 rounded-2xl"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </form>

        {/* Lọc loại danh mục */}
        <Select
          onValueChange={(val) =>
            onFilterChange({
              type: val === "ALL" ? undefined : (val as "EXPENSE" | "INCOME"),
            })
          }
        >
          <SelectTrigger className="w-[160px] h-11">
            <Filter className="size-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Loại danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả loại</SelectItem>
            <SelectItem value="EXPENSE">Chi tiêu (Expense)</SelectItem>
            <SelectItem value="INCOME">Thu nhập (Income)</SelectItem>
          </SelectContent>
        </Select>

        {/* Sắp xếp */}
        <Select
          defaultValue="createdAt"
          onValueChange={(val) => onFilterChange({ sortBy: val as any })}
        >
          <SelectTrigger className="w-[160px] h-11">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Ngày tạo</SelectItem>
            <SelectItem value="name">Tên danh mục</SelectItem>
            <SelectItem value="type">Phân loại</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rows per page */}
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground self-end lg:self-center">
        <span>Hiển thị</span>
        <Select
          defaultValue="10"
          onValueChange={(val) => onRowsPerPageChange(Number(val))}
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

