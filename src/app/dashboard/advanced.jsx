"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Film,
  Plus,
  TrendingUp,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { MovieCard } from "@/components/MovieCard";
import { ConfirmModal } from "@/components/ConfirmModal";
import { fetchMovies, deleteMovie } from "@/utils/api";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

/**
 * Advanced Dashboard with Search and Filter
 */
export default function AdvancedDashboardPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [yearFilter, setYearFilter] = useState("");

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    movieId: null,
    movieTitle: null,
  });

  // Debounced search hook
  const { value: searchQuery, setValue: setSearchQuery } = useDebouncedSearch(
    "",
    300,
    () => {
      applyFilters();
    }
  );

  /**
   * Load movies from API
   */
  const loadMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchMovies();
      setMovies(data);
      setFilteredMovies(data);
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
   * Apply search and filter logic
   */
  const applyFilters = useCallback(() => {
    let result = [...movies];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          (m.overview && m.overview.toLowerCase().includes(query))
      );
    }

    // Year filter
    if (yearFilter) {
      result = result.filter((m) => m.year?.startsWith(yearFilter));
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "year-new":
          return new Date(b.year) - new Date(a.year);
        case "year-old":
          return new Date(a.year) - new Date(b.year);
        default:
          return 0;
      }
    });

    setFilteredMovies(result);
  }, [movies, searchQuery, yearFilter, sortBy]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  /**
   * Handle movie deletion
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

        {/* Search and Filter Bar */}
        <div className="bg-[#1A1A1A] rounded-lg p-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0D0D0D] rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none text-white placeholder-gray-500"
              />
            </div>

            {/* Year Filter */}
            <input
              type="text"
              placeholder="Filter by year (YYYY)"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              maxLength="4"
              className="px-4 py-2 bg-[#0D0D0D] rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none text-white placeholder-gray-500 w-full md:w-40"
            />

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#0D0D0D] rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none text-white"
            >
              <option value="title">Sort: A-Z</option>
              <option value="year-new">Newest First</option>
              <option value="year-old">Oldest First</option>
            </select>

            {/* Add Button */}
            <Link
              href="/dashboard/add"
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              Add
            </Link>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-400">
            Showing {filteredMovies.length} of {movies.length} movies
          </p>
        </div>

        {/* Movies Grid or Empty State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-semibold mb-2">
              {movies.length === 0
                ? "No movies yet"
                : "No movies matching your search"}
            </h3>
            <p className="text-gray-400 mb-6">
              {movies.length === 0
                ? "Start by adding your first movie"
                : "Try adjusting your search or filters"}
            </p>
            {movies.length === 0 && (
              <Link
                href="/dashboard/add"
                className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition"
              >
                Add First Movie
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
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
