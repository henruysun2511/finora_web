import React from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-dash-bg text-foreground">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Inset Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}

