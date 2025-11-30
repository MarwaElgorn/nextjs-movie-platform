"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function MovieDetailError({ error, reset }) {
  return (
    <main className="bg-[#0D0D0D] text-white min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center space-y-6 px-6 max-w-md">
        <AlertCircle className="w-20 h-20 mx-auto text-red-600" />
        <h1 className="text-4xl font-bold">Error Loading Movie</h1>
        <p className="text-gray-400">
          Sorry, something went wrong while loading this movie details.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Try Again
          </button>
          <Link
            href="/movies"
            className="px-6 py-3 border border-gray-600 hover:bg-white/10 rounded-lg font-semibold transition"
          >
            Back to Movies
          </Link>
        </div>
      </div>
    </main>
  );
}
