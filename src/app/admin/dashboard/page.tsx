"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  FolderTree,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Receipt,
  Coins,
  Activity,
  Bot,
  ScrollText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetOperationsDashboard } from "@/queries/useDashboardQuery";
import { useGetCategories } from "@/queries/useCategoryQuery";
import { formatCurrency } from "@/utils/format";

export default function AdminDashboardPage() {
  const { data: operations, isLoading: isLoadingOps } = useGetOperationsDashboard();
  const { data: categories, isLoading: isLoadingCats } = useGetCategories();

  const totalUsers = operations?.userGrowth?.totalUsers ?? 0;
  const totalVolume = operations?.platformMetrics?.grossMerchandiseVolume ?? 0;
  const totalTx = operations?.platformMetrics?.totalTransactionsCount ?? 0;
  const dailyTx = operations?.platformMetrics?.dailyTransactionsCount ?? 0;

  const totalCats = categories?.length ?? 0;
  const expenseCats = categories?.filter((c) => c.type === "EXPENSE").length ?? 0;
  const incomeCats = categories?.filter((c) => c.type === "INCOME").length ?? 0;

  const stats = [
    {
      title: "Tổng người dùng",
      value: isLoadingOps ? "..." : `${totalUsers} tài khoản`,
      desc: "Người dùng đăng ký trong hệ thống",
      icon: <Users className="size-5 text-primary" />,
      color: "border-primary/20 bg-primary/5",
      link: "/admin/users",
      actionText: "Quản lý người dùng",
    },
    {
      title: "Khối lượng dòng tiền",
      value: isLoadingOps ? "..." : formatCurrency(totalVolume),
      desc: "Tổng khối lượng giao dịch luân chuyển",
      icon: <Coins className="size-5 text-emerald-500" />,
      color: "border-emerald-500/20 bg-emerald-500/5",
    },
    {
      title: "Tổng số giao dịch",
      value: isLoadingOps ? "..." : `${totalTx.toLocaleString("vi-VN")} GD`,
      desc: dailyTx > 0 ? `+${dailyTx} giao dịch phát sinh hôm nay` : "Giao dịch phát sinh toàn nền tảng",
      icon: <Receipt className="size-5 text-amber-500" />,
      color: "border-amber-500/20 bg-amber-500/5",
    },
    {
      title: "Danh mục hệ thống",
      value: isLoadingCats ? "..." : `${totalCats} danh mục`,
      desc: `${expenseCats} Chi tiêu · ${incomeCats} Thu nhập`,
      icon: <FolderTree className="size-5 text-rose-500" />,
      color: "border-rose-500/20 bg-rose-500/5",
      link: "/admin/categories",
      actionText: "Quản lý danh mục",
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
            Trung tâm kiểm soát tài chính, phân loại danh mục và giám sát dữ liệu thời gian thực FINORA
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/categories">
            <Button className="rounded-full shadow-md shadow-primary/25">
              <FolderTree className="size-4 mr-2" />
              <span>Quản lý danh mục</span>
            </Button>
          </Link>
        </div>
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
            {s.link ? (
              <Link
                href={s.link}
                className="mt-4 pt-3 border-t border-border/50 text-xs font-bold text-primary flex items-center justify-between hover:underline"
              >
                <span>{s.actionText || "Xem chi tiết"}</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            ) : (
              <div className="mt-4 pt-3 border-t border-border/50 text-xs font-semibold text-muted-foreground/70 flex items-center gap-1">
                <Activity className="size-3 text-emerald-500 animate-pulse" />
                <span>Số liệu thời gian thực</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Operational Modules Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/admin/users"
          className="p-6 rounded-3xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="size-6" />
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <h3 className="font-bold text-base text-foreground mb-1">Tài khoản & Phân quyền</h3>
          <p className="text-xs text-muted-foreground">
            Quản lý người dùng, trạng thái kích hoạt, khóa tài khoản và gán vai trò hệ thống.
          </p>
        </Link>

        <Link
          href="/admin/mascots"
          className="p-6 rounded-3xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 rounded-2xl bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center">
              <Bot className="size-6" />
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-fuchsia-500 transition-colors" />
          </div>
          <h3 className="font-bold text-base text-foreground mb-1">Quản lý Linh vật AI</h3>
          <p className="text-xs text-muted-foreground">
            Thiết lập các mốc tài sản ròng, mã SVG linh vật và kịch bản gợi ý tài chính.
          </p>
        </Link>

        <Link
          href="/admin/audit-logs"
          className="p-6 rounded-3xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <ScrollText className="size-6" />
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-amber-500 transition-colors" />
          </div>
          <h3 className="font-bold text-base text-foreground mb-1">Nhật ký hoạt động (Audit)</h3>
          <p className="text-xs text-muted-foreground">
            Theo dõi lịch sử kiểm toán, truy vết thay đổi dữ liệu và xuất báo cáo kiểm tra.
          </p>
        </Link>
      </div>

      {/* Feature Showcase Box */}
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
              <ShieldCheck className="size-3.5" />
              <span>Dữ liệu Vận hành Thực tế từ NestJS API</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">
              Hệ thống Tài chính & Phân loại Thông minh
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Các chỉ số thống kê trên bảng điều khiển được đồng bộ trực tiếp từ cơ sở dữ liệu FINORA, bảo đảm tính minh bạch, nhất quán và độ trễ thấp nhất cho ban quản trị.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>Tự động cập nhật số liệu mỗi 30 giây</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>Bảo mật dữ liệu theo chuẩn RBAC</span>
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
