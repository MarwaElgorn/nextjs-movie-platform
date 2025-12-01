"use client";

import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#0D0D0D] text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
