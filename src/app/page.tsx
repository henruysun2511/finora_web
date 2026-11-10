"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function RootPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dash-bg">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 rounded-full border-3 border-primary border-t-transparent animate-spin" />
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Đang tải FINORA Admin...
        </span>
      </div>
    </div>
  );
}

