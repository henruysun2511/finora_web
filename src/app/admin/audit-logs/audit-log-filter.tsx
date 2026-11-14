"use client";

import { FilterX, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ACTIONS, ENTITIES } from "./audit-log-columns";

const selectClass =
  "h-11 rounded-xl border border-input bg-background px-3 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/20";

interface AuditLogFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  action: string;
  onActionChange: (value: string) => void;
  entityType: string;
  onEntityTypeChange: (value: string) => void;
  walletId: string;
  onWalletIdChange: (value: string) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
  endDate: string;
  onEndDateChange: (value: string) => void;
  invalidDates: boolean;
  onReset: () => void;
}

export function AuditLogFilter({
  search,
  onSearchChange,
  action,
  onActionChange,
  entityType,
  onEntityTypeChange,
  walletId,
  onWalletIdChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  invalidDates,
  onReset,
}: AuditLogFilterProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo người dùng, nội dung, IP..."
            className="h-11 rounded-xl pl-10"
          />
        </div>

        {/* Action */}
        <select
          value={action}
          onChange={(e) => onActionChange(e.target.value)}
          className={selectClass}
          aria-label="Lọc theo hành động"
        >
          {ACTIONS.map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        {/* Entity */}
        <select
          value={entityType}
          onChange={(e) => onEntityTypeChange(e.target.value)}
          className={selectClass}
          aria-label="Lọc theo đối tượng"
        >
          {ENTITIES.map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        {/* Wallet ID */}
        <Input
          value={walletId}
          onChange={(e) => onWalletIdChange(e.target.value)}
          placeholder="ID Ví (tùy chọn)"
          className="h-11 rounded-xl"
        />

        {/* Start Date */}
        <Input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="h-11 rounded-xl"
          aria-label="Ngày bắt đầu"
        />

        {/* End Date */}
        <Input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="h-11 rounded-xl"
          aria-label="Ngày kết thúc"
        />

        {/* Reset button */}
        <Button
          variant="outline"
          onClick={onReset}
          className="h-11 rounded-xl"
        >
          <FilterX className="mr-2 size-4" />
          Đặt lại bộ lọc
        </Button>
      </div>

      {invalidDates && (
        <p className="text-sm font-medium text-destructive">
          * Ngày bắt đầu không được sau ngày kết thúc. Vui lòng chọn lại khoảng thời gian hợp lệ.
        </p>
      )}
    </div>
  );
}

