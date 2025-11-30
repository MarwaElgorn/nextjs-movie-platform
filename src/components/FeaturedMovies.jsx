"use client";

import Link from "next/link";
import Image from "next/image";
import { Film, Star, Play } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Featured Movies Section
 * Displays popular movies from the local database
 * Client component due to state management
 */
export default function FeaturedMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/admin/movies", { cache: "no-store" });
        const data = await res.json();
        setMovies(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch featured movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  // Filter movies based on search query (case-insensitive)
  const filteredMovies = movies.filter((movie) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const matchesTitle = movie.title?.toLowerCase().includes(query);
    const matchesYear = movie.year?.toString().includes(query) || 
                        movie.release_date?.slice(0, 4).includes(query);

    return matchesTitle || matchesYear;
  });

  return (
    <section
      id="explore"
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
            <Film className="w-8 h-8 text-red-600" />
            Featured Movies
          </h2>
          <p className="text-gray-400">
            Handpicked collections of the best movies for you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search movies by title or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-[#1A1A1A] text-white placeholder-gray-400 rounded-lg border border-gray-700 focus:outline-none focus:border-red-600 transition"
          />
        </div>

        {/* Movies Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-lg h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <Film className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">
              {searchQuery ? `No movies found matching "${searchQuery}"` : "No movies available yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <div className="group relative overflow-hidden rounded-lg bg-slate-800 aspect-[9/12] cursor-pointer">
                  {/* Poster Image */}
                  {movie.poster ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                      <Film className="w-12 h-12 text-gray-600" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {movie.title}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-300">
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                        </span>
                      </div>

                      {/* Year */}
                      <p className="text-xs text-gray-400 mb-4">
                        {movie.year ||
                          movie.release_date?.split("-")[0] ||
                          "N/A"}
                      </p>

                      {/* Play Button */}
                      <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                        <Play className="w-4 h-4 fill-current" />
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            View All Movies
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
