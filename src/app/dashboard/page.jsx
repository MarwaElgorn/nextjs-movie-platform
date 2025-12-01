"use client";
import MoviesTable from "./components/MoviesTable";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Movies Dashboard</h1>

        <Link
          href="/dashboard/add"
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
        >
          Add Movie
        </Link>
      </div>

      <MoviesTable />
    </main>
  );
}
