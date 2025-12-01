"use client";

import { X } from "lucide-react";
import Image from "next/image";

export default function MovieModal({ open, onClose, movie }) {
  if (!open || !movie) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] rounded-lg w-full max-w-2xl p-6 relative border border-gray-700">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 relative h-64">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover rounded"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-400 mb-2">Year: {movie.year}</p>
            <p className="text-gray-300 leading-relaxed">{movie.overview || "No overview"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
