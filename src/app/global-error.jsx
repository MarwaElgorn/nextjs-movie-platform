"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="bg-[#0D0D0D] text-white">
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-md">
            <AlertCircle className="w-20 h-20 mx-auto text-red-600" />
            <h1 className="text-4xl font-bold">Something Went Wrong</h1>
            <p className="text-gray-400">
              Sorry, an unexpected error occurred. Please try again.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={reset}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 border border-gray-600 hover:bg-white/10 rounded-lg font-semibold transition"
              >
                Go Home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
