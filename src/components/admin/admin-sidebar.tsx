"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderTree,
  Wallet,
  ArrowLeftRight,
  PiggyBank,
  HandCoins,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { Logo } from "@/components/common/logo";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/utils/cn";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

export const navItems: NavItem[] = [
  {
    title: "Tổng quan",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    title: "Danh mục hệ thống",
    href: "/admin/categories",
    icon: <FolderTree className="size-4" />,
  },
  {
    title: "Ví & Tài khoản",
    href: "/admin/wallets",
    icon: <Wallet className="size-4" />,
  },
  {
    title: "Giao dịch",
    href: "/admin/transactions",
    icon: <ArrowLeftRight className="size-4" />,
  },
  {
    title: "Ngân sách",
    href: "/admin/budgets",
    icon: <PiggyBank className="size-4" />,
  },
  {
    title: "Sổ nợ & Khoản vay",
    href: "/admin/loans",
    icon: <HandCoins className="size-4" />,
  },
  {
    title: "Báo cáo tài chính",
    href: "/admin/reports",
    icon: <BarChart3 className="size-4" />,
  },
  {
    title: "Tài khoản & Phân quyền",
    href: "/admin/users",
    icon: <Users className="size-4" />,
  },
  {
    title: "Cài đặt hệ thống",
    href: "/admin/settings",
    icon: <Settings className="size-4" />,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-72 flex-shrink-0 sticky top-0 h-screen bg-gradient-to-b from-primary via-[#0062b8] to-[#004b91] text-white flex flex-col p-5 shadow-2xl z-40 overflow-y-auto">
      {/* Top Logo */}
      <div className="mb-8 px-2 pt-2">
        <Logo isWhite showBadge />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5">
        <div className="text-[11px] font-extrabold tracking-wider uppercase text-white/60 px-3 mb-2">
          Menu Quản trị
        </div>

        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-2xl text-[13.5px] font-bold transition-all duration-200 select-none",
                isActive
                  ? "bg-white text-primary shadow-lg shadow-black/15 font-extrabold translate-x-1"
                  : "text-white/80 hover:bg-white/12 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(isActive ? "text-primary" : "text-white/90")}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </div>
              {isActive && <ChevronRight className="size-3.5 text-primary" />}
            </Link>
          );
        })}
      </nav>

      {/* User Card Footer */}
      <div className="mt-auto pt-4 border-t border-white/15">
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-9 rounded-xl bg-white text-primary font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
              {user?.fullName?.substring(0, 2).toUpperCase() || "AD"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {user?.fullName || user?.username || "Admin User"}
              </p>
              <p className="text-[10px] text-white/70 truncate uppercase tracking-wider">
                {user?.roles?.[0]?.name || user?.role || "SYSTEM_ADMIN"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Đăng xuất"
            className="size-8 rounded-xl flex items-center justify-center hover:bg-white/20 text-white/90 hover:text-white transition-colors"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

