import Image from "next/image";
import Link from "next/link";
import { Play, Heart, Share2, Clock, Calendar, Globe } from "lucide-react";
import { API_KEY, BASE_URL, IMG_PATH } from "@/lib/config";
import AddToWishlistButton from "@/components/AddToWishlistButton";

/**
 * Movie Detail Page - ISR (Incremental Static Regeneration)
 * Generates static params for popular movies, falls back to dynamic rendering
 * Revalidates every 1800s (30 minutes)
 */
export const revalidate = 1800;

/**
 * Generate static params for ISR - Pre-render popular movies
 */
export async function generateStaticParams() {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results.slice(0, 20).map((movie) => ({
      movieid: movie.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

/**
 * Movie Detail Page Server Component
 * Fetches movie data server-side for better performance
 */
export default async function MovieDetails({ params }) {
  try {
    const { movieid } = await params;

    if (!movieid) {
      throw new Error("No movie ID provided");
    }

    const url = `${BASE_URL}/movie/${movieid}?api_key=${API_KEY}&language=en-US`;
    console.log("Fetching movie ID:", movieid);

    const res = await fetch(url, {
      next: { revalidate: 1800 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.error(`API Error [${res.status}] for movie ${movieid}`);

      return (
        <main className="bg-[#0D0D0D] text-white min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Movie Not Found</h1>
            <p className="text-gray-400 text-lg">
              Sorry, this movie could not be found (Error: {res.status}).
            </p>
            <Link
              href="/movies"
              className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              ← Back to Movies
            </Link>
          </div>
        </main>
      );
    }

    const movie = await res.json();

    if (!movie.id || !movie.title) {
      return (
        <main className="bg-[#0D0D0D] text-white min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Invalid Movie Data</h1>
            <p className="text-gray-400 text-lg">
              The movie data received was invalid.
            </p>
            <Link
              href="/movies"
              className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              ← Back to Movies
            </Link>
          </div>
        </main>
      );
    }

    // Extract genres, studios, etc
    const rating = (movie.vote_average || 0).toFixed(1);
    const runtime = movie.runtime || "N/A";
    const year = movie.release_date?.slice(0, 4) || "N/A";
    const language = movie.original_language?.toUpperCase() || "EN";

    return (
      <main className="bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] text-white min-h-screen">
        {/* Hero Banner */}
        <section className="relative h-screen overflow-hidden pt-20">
          {/* Background */}
          {movie.backdrop_path && (
            <Image
              src={`${IMG_PATH}${movie.backdrop_path}`}
              alt={movie.title}
              fill
              priority
              className="object-cover opacity-25"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-center">
              {/* Left: Poster */}
              {movie.poster_path && (
                <div className="hidden md:block">
                  <div className="relative h-96 w-64 rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={`${IMG_PATH}${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Right: Info */}
              <div
                className={`space-y-6 ${
                  movie.poster_path ? "md:col-span-2" : "md:col-span-3"
                }`}
              >
                {/* Badge */}
                <div className="inline-block px-4 py-2 bg-red-600 bg-opacity-30 rounded-full text-red-400 text-sm font-medium">
                  {movie.adult ? "18+" : "PG-13"}
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                  {movie.title}
                </h1>

                {/* Ratings & Info */}
                <div className="flex flex-wrap items-center gap-4 text-gray-300">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="font-semibold">{rating}</span>
                    <span className="text-gray-500">/ 10</span>
                  </div>
                  <div className="h-5 w-px bg-gray-600"></div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{runtime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{language}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                  {movie.overview || "No description available."}
                </p>

                {/* Genres */}
                {movie.genres?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-8">
                  <button className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-white transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg">
                    <Play className="w-5 h-5" />
                    Play Now
                  </button>
                  <AddToWishlistButton
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    releaseDate={movie.release_date}
                  />
                  <button className="px-6 py-4 border-2 border-white/30 hover:border-white/60 rounded-lg font-semibold text-white transition-all flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.overview || "No description available."}
                </p>
              </div>

              {movie.tagline && (
                <div>
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                    Tagline
                  </h3>
                  <p className="text-xl italic text-gray-300">
                    "{movie.tagline}"
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                  Release Date
                </h3>
                <p className="text-xl font-semibold">{movie.release_date}</p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                  Runtime
                </h3>
                <p className="text-xl font-semibold">{runtime} minutes</p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                  Budget
                </h3>
                <p className="text-xl font-semibold">
                  {movie.budget
                    ? `$${(movie.budget / 1000000).toFixed(1)}M`
                    : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                  Revenue
                </h3>
                <p className="text-xl font-semibold">
                  {movie.revenue
                    ? `$${(movie.revenue / 1000000).toFixed(1)}M`
                    : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                  Language
                </h3>
                <p className="text-xl font-semibold">{language}</p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                  Popularity
                </h3>
                <p className="text-xl font-semibold">
                  {(movie.popularity || 0).toFixed(0)}
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="pt-8">
            <Link
              href="/movies"
              className="inline-block px-6 py-3 border border-gray-600 hover:bg-white/10 rounded-lg font-semibold transition"
            >
              ← Back to Movies
            </Link>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error loading movie details:", error);
    return (
      <main className="bg-[#0D0D0D] text-white min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Error Loading Movie</h1>
          <p className="text-gray-400 text-lg">
            Sorry, something went wrong while loading this movie.
          </p>
          <Link
            href="/movies"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Back to Movies
          </Link>
        </div>
      </main>
    );
  }
}
