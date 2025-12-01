"use client";

import { PlusCircle, Search } from "lucide-react";

export default function Header({ title, onAdd, onSearch }) {
  return (
    <div className="flex justify-between items-center mb-8">

      {/* Title */}
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-[#1A1A1A] rounded border border-gray-700 outline-none text-sm"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          <PlusCircle className="w-4 h-4" />
          Add Movie
        </button>
      </div>
    </div>
  );
}
