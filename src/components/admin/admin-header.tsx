"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, ShieldCheck, User } from "lucide-react";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/useAuthStore";

export function AdminHeader() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-18 sticky top-0 z-30 bg-card/85 backdrop-blur-md border-b border-border/80 px-6 flex items-center justify-between">
      {/* Search Input */}
      <div className="relative w-72 max-w-sm hidden sm:block">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Tìm kiếm danh mục, ví, giao dịch..."
          className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border border-border/80 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-card transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 ml-auto">
        <ThemeToggle />

        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-full relative border-border bg-card"
        >
          <Bell className="size-4 text-foreground" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary ring-2 ring-card" />
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-border/80 bg-card hover:bg-muted/50 transition-colors cursor-pointer outline-none">
              <div className="size-7 rounded-full bg-primary/15 text-primary font-black text-xs flex items-center justify-center">
                {user?.fullName?.substring(0, 2).toUpperCase() || "AD"}
              </div>
              <span className="text-xs font-bold text-foreground max-w-[100px] truncate">
                {user?.fullName || user?.username || "Admin"}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="font-bold text-foreground">
                {user?.fullName || "Quản trị viên"}
              </span>
              <span className="text-[11px] font-normal text-muted-foreground">
                {user?.email || "admin@finora.app"}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
              <User className="mr-2 size-4" />
              <span>Hồ sơ cá nhân</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
              <ShieldCheck className="mr-2 size-4" />
              <span>Bảo mật hệ thống</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

