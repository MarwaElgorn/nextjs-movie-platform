"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Movie card component for grid display
 * @typedef {Object} Movie
 * @property {number} id - Movie ID
 * @property {string} title - Movie title
 * @property {string} poster - Poster image URL
 * @property {string} year - Release year
 * @property {string} overview - Movie description
 *
 * @param {Object} props
 * @param {Movie} props.movie - Movie data
 * @param {Function} props.onDelete - Delete callback
 * @param {boolean} props.isDeleting - Loading state for delete
 */
export function MovieCard({ movie, onDelete, isDeleting = false }) {
  return (
    <div className="group bg-[#1A1A1A] rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 relative h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-72 bg-gray-800 overflow-hidden">
        {movie.poster ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'%3E%3Crect fill='%23333' width='300' height='450'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs mb-4">{movie.year || "N/A"}</p>
        {movie.overview && (
          <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-1">
            {movie.overview}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 p-3 bg-[#0D0D0D] border-t border-gray-700">
        <Link
          href={`/dashboard/edit/${movie.id}`}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium py-2 rounded transition text-center"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(movie.id)}
          disabled={isDeleting}
          className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium py-2 rounded transition"
        >
          {isDeleting ? "..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
