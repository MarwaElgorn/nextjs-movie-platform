"use client";

import Link from "next/link";
import { Film, PlusCircle, LayoutDashboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("adminSession");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-[#1A1A1A] border-r border-gray-800 px-6 py-8 flex flex-col">
      <h1 className="text-xl font-bold mb-10">Admin Panel</h1>

      <nav className="flex-1 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded hover:bg-white/10"
        >
          <LayoutDashboard className="w-5 h-5" />
          Overview
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded hover:bg-white/10"
        >
          <Film className="w-5 h-5" />
          Movies
        </Link>

        <Link
          href="/dashboard/add"
          className="flex items-center gap-3 p-3 rounded hover:bg-white/10"
        >
          <PlusCircle className="w-5 h-5" />
          Add Movie
        </Link>
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 rounded text-red-400 hover:bg-red-600/10"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}
