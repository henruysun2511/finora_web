import React from "react";

export const PaginationInfo = ({
  page = 1,
  limit = 10,
  totalItems = 0,
  currentLength = 0,
  label = "danh mục",
  className = "text-xs font-medium text-muted-foreground",
}: {
  page?: number;
  limit?: number;
  totalItems?: number;
  currentLength?: number;
  label?: string;
  className?: string;
}) => {
  const from = currentLength > 0 ? (page - 1) * limit + 1 : 0;
  const to = Math.min(page * limit, totalItems);

  return (
    <p className={className}>
      Hiển thị <span className="font-bold text-foreground">{from}</span> -{" "}
      <span className="font-bold text-foreground">{to}</span> trong tổng số{" "}
      <span className="font-bold text-foreground">{totalItems}</span> {label}
    </p>
  );
};

