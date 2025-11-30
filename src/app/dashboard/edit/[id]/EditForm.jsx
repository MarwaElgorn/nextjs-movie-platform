"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateMovie, validateMovie, showToast } from "@/utils/api";

/**
 * Edit Movie Form Component
 * @param {Object} props
 * @param {Object} props.movie - Movie data to edit
 */
export default function EditForm({ movie }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState(movie);

  /**
   * Handle form submission
   */
  async function handleSave(e) {
    e.preventDefault();
    setErrors({});

    // Validate movie data
    const { isValid, errors: validationErrors } = validateMovie(form);

    if (!isValid) {
      setErrors(validationErrors);
      showToast("Please fix the errors below", "error");
      return;
    }

    try {
      setIsLoading(true);
      await updateMovie(movie.id, form);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating movie:", error);
      showToast("Failed to update movie. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold mb-2">Edit Movie</h1>
        <p className="text-gray-400 mb-10">{movie.title}</p>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              placeholder="Enter movie title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={`w-full p-4 bg-[#1A1A1A] rounded-lg border ${
                errors.title ? "border-red-500" : "border-gray-700"
              } focus:border-red-600 focus:outline-none transition text-white placeholder-gray-500`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Year Field */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Release Date (YYYY-MM-DD) *
            </label>
            <input
              type="date"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className={`w-full p-4 bg-[#1A1A1A] rounded-lg border ${
                errors.year ? "border-red-500" : "border-gray-700"
              } focus:border-red-600 focus:outline-none transition text-white`}
            />
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year}</p>
            )}
          </div>

          {/* Poster URL Field */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Poster Image URL *
            </label>
            <input
              type="url"
              placeholder="https://image.tmdb.org/t/p/w500/..."
              value={form.poster}
              onChange={(e) => setForm({ ...form, poster: e.target.value })}
              className={`w-full p-4 bg-[#1A1A1A] rounded-lg border ${
                errors.poster ? "border-red-500" : "border-gray-700"
              } focus:border-red-600 focus:outline-none transition text-white placeholder-gray-500`}
            />
            {errors.poster && (
              <p className="text-red-500 text-sm mt-1">{errors.poster}</p>
            )}
          </div>

          {/* Overview Field */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter movie description (optional)"
              value={form.overview || ""}
              onChange={(e) => setForm({ ...form, overview: e.target.value })}
              rows={5}
              className="w-full p-4 bg-[#1A1A1A] rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition text-white placeholder-gray-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:opacity-50 px-6 py-4 rounded-lg font-semibold transition"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-4 rounded-lg font-semibold border border-gray-600 hover:bg-[#1A1A1A] transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
