import React from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";
import { cn } from "@/utils/cn";

export function Logo({
  className,
  isWhite = false,
  showBadge = true,
}: {
  className?: string;
  isWhite?: boolean;
  showBadge?: boolean;
}) {
  return (
    <Link
      href="/admin/dashboard"
      className={cn("flex items-center gap-3 select-none group", className)}
    >
      {showBadge && (
        <div
          className={cn(
            "w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-md",
            isWhite
              ? "bg-white/20 text-white border border-white/25"
              : "bg-primary text-white shadow-primary/30"
          )}
        >
          <Wallet className="size-5" />
        </div>
      )}
      <div className="flex flex-col">
        <span
          className={cn(
            "text-xl font-black tracking-tight",
            isWhite ? "text-white" : "text-foreground"
          )}
        >
          FINORA<span className="text-sky-400">.</span>
        </span>
        <span
          className={cn(
            "text-[9px] font-extrabold tracking-widest uppercase opacity-75 -mt-1",
            isWhite ? "text-white/80" : "text-muted-foreground"
          )}
        >
          Admin Portal
        </span>
      </div>
    </Link>
  );
}

