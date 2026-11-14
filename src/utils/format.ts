export function formatVnd(amount: number): string {
  const formatted = new Intl.NumberFormat("vi-VN").format(Math.abs(amount));
  const sign = amount < 0 ? "-₫ " : "₫ ";
  return `${sign}${formatted}`;
}

export const formatCurrency = formatVnd;


export function formatDate(dateString?: string | Date): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

