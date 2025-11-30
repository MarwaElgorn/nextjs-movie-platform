"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Film, Plus, TrendingUp } from "lucide-react";
import { MovieCard } from "@/components/MovieCard";
import { ConfirmModal } from "@/components/ConfirmModal";
import { fetchMovies, deleteMovie } from "@/utils/api";

/**
 * Dashboard page - Admin movie management interface
 */
export default function DashboardPage() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    movieId: null,
    movieTitle: null,
  });

  // Check admin access
  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession");
    if (!adminSession) {
      router.push("/login");
    }
  }, [router]);

  /**
   * Load movies from API
   */
  const loadMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchMovies();
      setMovies(data);
    } catch (error) {
      console.error("Failed to load movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  /**
   * Handle movie deletion with confirmation
   */
  const handleDeleteClick = (movieId, movieTitle) => {
    setConfirmModal({
      isOpen: true,
      movieId,
      movieTitle,
    });
  };

  /**
   * Confirm and execute deletion
   */
  const handleConfirmDelete = async () => {
    try {
      setDeletingId(confirmModal.movieId);
      await deleteMovie(confirmModal.movieId);

      // Optimistic UI update - remove from local state immediately
      setMovies((prev) => prev.filter((m) => m.id !== confirmModal.movieId));

      setConfirmModal({ isOpen: false, movieId: null, movieTitle: null });
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const stats = {
    total: movies.length,
    recent: movies.filter(
      (m) => new Date(m.year) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] text-white">
      {/* Hero Section */}
      {movies.length > 0 && (
        <section className="relative h-[50vh] overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movies[0].poster}`}
            alt={movies[0].title}
            fill
            priority
            className="object-cover opacity-30"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent"></div>

          <div className="relative h-full flex flex-col justify-end items-start p-10 max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg">
              Dashboard
            </h1>
            <p className="text-gray-300 text-lg drop-shadow">
              Manage your movie collection
            </p>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Total Movies
                </p>
                <p className="text-3xl font-bold mt-2">{stats.total}</p>
              </div>
              <Film className="w-12 h-12 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Added This Month
                </p>
                <p className="text-3xl font-bold mt-2">{stats.recent}</p>
              </div>
              <TrendingUp className="w-12 h-12 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 shadow-lg">
            <Link
              href="/dashboard/add"
              className="flex items-center justify-between h-full"
            >
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  Add New Movie
                </p>
                <p className="text-3xl font-bold mt-2">+</p>
              </div>
              <Plus className="w-12 h-12 opacity-50" />
            </Link>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">All Movies</h2>
          <Link
            href="/dashboard/add"
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Movie
          </Link>
        </div>

        {/* Movies Grid or Empty State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-semibold mb-2">No movies yet</h3>
            <p className="text-gray-400 mb-6">
              Start by adding your first movie
            </p>
            <Link
              href="/dashboard/add"
              className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Add First Movie
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onDelete={handleDeleteClick}
                isDeleting={deletingId === movie.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Delete Movie?"
        message={`Are you sure you want to delete "${confirmModal.movieTitle}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setConfirmModal({ isOpen: false, movieId: null, movieTitle: null })
        }
        confirmText="Delete"
        isLoading={deletingId === confirmModal.movieId}
      />
    </main>
  );
}
