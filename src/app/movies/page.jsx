import Image from "next/image";
import Link from "next/link";
import { Play, Info } from "lucide-react";
import TrialSection from "@/components/TrialSection";
import { API_KEY, BASE_URL, IMG_PATH } from "@/lib/config";

/**
 * Movies Browse Page - ISR (Incremental Static Regeneration)
 * Displays featured movie and categorized movie collections
 * Revalidates every 3600s (1 hour) for optimal performance with fresh data
 */
export const revalidate = 3600;

export default async function MoviesPage() {
  try {
    const res = await fetch(
      `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch movies: ${res.status}`);
    }

    const data = await res.json();
    const movies = data.results.slice(0, 20);

    if (!movies.length) {
      throw new Error("No movies found");
    }

    const featuredMovie = movies[0];
    const movieCollections = [
      { title: "Trending Now", movies: movies.slice(0, 10) },
      { title: "Popular Movies", movies: movies.slice(5, 15) },
      { title: "Top Rated", movies: movies.slice(10, 20) },
    ];

    return (
      <main className="bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] text-white">
        {/* Featured Movie Banner */}
        <section className="relative h-screen overflow-hidden pt-20">
          {/* Background Image */}
          {featuredMovie?.backdrop_path && (
            <Image
              src={`${IMG_PATH}${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              fill
              priority
              className="object-cover opacity-40"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-8">
              {/* Title */}
              <div>
                <div className="inline-block px-4 py-2 bg-red-600 bg-opacity-30 rounded-full mb-4 text-red-400 text-sm font-medium">
                  Featured Now
                </div>
                <h1 className="text-6xl md:text-7xl font-black leading-tight mb-4">
                  {featuredMovie.title}
                </h1>
              </div>

              {/* Movie Info */}
              <div className="flex items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span>{(featuredMovie.vote_average || 0).toFixed(1)}</span>
                </div>
                <div>{featuredMovie.release_date?.slice(0, 4)}</div>
                <div className="inline-block px-3 py-1 bg-gray-700 rounded text-sm">
                  {featuredMovie.adult ? "18+" : "PG-13"}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed line-clamp-3">
                {featuredMovie.overview ||
                  "A thrilling movie experience awaits you."}
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-8">
                <button className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-white transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg">
                  <Play className="w-5 h-5" />
                  Play Now
                </button>
                <Link
                  href={`/movies/${featuredMovie.id}`}
                  className="px-8 py-4 border-2 border-white/30 hover:border-white/60 rounded-lg font-semibold text-white transition-all flex items-center gap-2"
                >
                  <Info className="w-5 h-5" />
                  More Info
                </Link>
              </div>
            </div>

            {/* Featured Movie Poster */}
            {featuredMovie?.poster_path && (
              <div className="hidden lg:block absolute right-12 bottom-0 h-96 w-64">
                <Image
                  src={`${IMG_PATH}${featuredMovie.poster_path}`}
                  alt={featuredMovie.title}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
            )}
          </div>
        </section>

        {/* Movie Collections */}
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">
          {movieCollections.map((collection, index) => (
            <section key={index} className="space-y-8">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {collection.title}
                </h2>
                <Link
                  href="/movies"
                  className="text-red-500 hover:text-red-400 font-semibold transition"
                >
                  View All →
                </Link>
              </div>

              {/* Movies Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {collection.movies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    className="group relative h-80 rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-2"
                  >
                    {/* Movie Poster */}
                    <div className="relative w-full h-full bg-gray-800">
                      {movie.poster_path ? (
                        <Image
                          src={`${IMG_PATH}${movie.poster_path}`}
                          alt={movie.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="w-full p-4 space-y-2">
                        <h3 className="font-bold text-white line-clamp-2">
                          {movie.title}
                        </h3>
                        <div className="flex items-center gap-2 text-yellow-500 text-sm">
                          <span>★</span>
                          <span>{(movie.vote_average || 0).toFixed(1)}</span>
                        </div>
                        <button className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-semibold transition">
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Trial Section */}
        <TrialSection />
      </main>
    );
  } catch (error) {
    console.error("Error in MoviesPage:", error);
    return (
      <main className="bg-[#0D0D0D] text-white min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Unable to Load Movies</h1>
          <p className="text-gray-400">
            Please check your connection and try again.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Go Home
          </Link>
        </div>
      </main>
    );
  }
}
