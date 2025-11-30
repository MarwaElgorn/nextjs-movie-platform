"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function EditError({ error, reset }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-900 bg-opacity-20 border border-red-600 rounded-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
          <h1 className="text-2xl font-bold mb-2">Error Loading Movie</h1>
          <p className="text-gray-300 mb-6">
            There was a problem loading this movie. Please try again.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              Try Again
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-gray-600 hover:bg-[#1A1A1A] rounded-lg font-semibold transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
