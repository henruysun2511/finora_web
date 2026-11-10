import React from "react";
import Link from "next/link";
import {
  FolderTree,
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Danh mục hệ thống",
      value: "24 danh mục",
      desc: "16 Chi tiêu · 8 Thu nhập",
      icon: <FolderTree className="size-5 text-primary" />,
      color: "border-primary/20 bg-primary/5",
      link: "/admin/categories",
    },
    {
      title: "Tổng thu nhập tháng",
      value: "₫ 48,500,000",
      desc: "+14.2% so với tháng trước",
      icon: <TrendingUp className="size-5 text-emerald-500" />,
      color: "border-emerald-500/20 bg-emerald-500/5",
    },
    {
      title: "Tổng chi tiêu tháng",
      value: "₫ 21,340,000",
      desc: "-5.8% ngân sách tối ưu",
      icon: <TrendingDown className="size-5 text-rose-500" />,
      color: "border-rose-500/20 bg-rose-500/5",
    },
    {
      title: "Số ví hoạt động",
      value: "12 ví",
      desc: "Đã đồng bộ ngân hàng",
      icon: <Wallet className="size-5 text-amber-500" />,
      color: "border-amber-500/20 bg-amber-500/5",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title Header with SOLARN style bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-8 rounded-full bg-primary shadow-sm shadow-primary/40" />
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Tổng quan Hệ thống
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground ml-5 mt-1 font-medium">
            Trung tâm kiểm soát tài chính, phân loại danh mục và giám sát dữ liệu FINORA
          </p>
        </div>

        <Link href="/admin/categories">
          <Button className="rounded-full shadow-md shadow-primary/25">
            <FolderTree className="size-4 mr-2" />
            <span>Quản lý danh mục</span>
          </Button>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-3xl border ${s.color} p-6 shadow-sm hover:shadow-md transition-all bg-card/80 backdrop-blur-md flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {s.title}
              </span>
              <div className="size-10 rounded-2xl bg-card border border-border flex items-center justify-center shadow-xs">
                {s.icon}
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-foreground tracking-tight mb-1">
                {s.value}
              </div>
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                {s.desc}
              </p>
            </div>
            {s.link && (
              <Link
                href={s.link}
                className="mt-4 pt-3 border-t border-border/50 text-xs font-bold text-primary flex items-center justify-between hover:underline"
              >
                <span>Xem chi tiết danh mục</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Feature Showcase Box */}
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
              <ShieldCheck className="size-3.5" />
              <span>Chuẩn hóa Dữ liệu NestJS</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">
              Phân loại danh mục tài chính thông minh
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hệ thống danh mục hệ thống giúp chuẩn hóa các giao dịch thu nhập và chi tiêu của toàn bộ người dùng, hỗ trợ lập ngân sách tự động và tính toán dòng tiền chính xác.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>Hỗ trợ cây phân cấp Cha - Con</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>Mã màu và biểu tượng chuẩn hóa</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <Link href="/admin/categories">
              <Button size="lg" className="w-full sm:w-auto font-bold rounded-2xl">
                <span>Vào trang Quản lý Danh mục</span>
                <ArrowUpRight className="size-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

