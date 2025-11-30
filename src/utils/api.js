/**
 * API utility functions for fetching and handling responses
 */

const API_BASE = "/api/admin/movies";

/**
 * Show toast notification
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 * @param {number} duration
 */
export function showToast(message, type = "info", duration = 3000) {
  if (typeof window !== "undefined" && window.showToast) {
    window.showToast(message, type, duration);
  }
}

/**
 * Fetch all movies
 */
export async function fetchMovies() {
  try {
    const res = await fetch(API_BASE, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch movies");
    return await res.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    showToast("Failed to load movies", "error");
    throw error;
  }
}

/**
 * Fetch single movie by ID
 */
export async function fetchMovie(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch movie");
    return await res.json();
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    throw error;
  }
}

/**
 * Add new movie
 * @param {Object} movie
 */
export async function createMovie(movie) {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    if (!res.ok) throw new Error("Failed to create movie");
    showToast("Movie added successfully!", "success");
    return await res.json();
  } catch (error) {
    console.error("Error creating movie:", error);
    showToast("Failed to add movie", "error");
    throw error;
  }
}

/**
 * Update movie by ID
 * @param {number} id
 * @param {Object} movie
 */
export async function updateMovie(id, movie) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    if (!res.ok) throw new Error("Failed to update movie");
    showToast("Movie updated successfully!", "success");
    return await res.json();
  } catch (error) {
    console.error(`Error updating movie ${id}:`, error);
    showToast("Failed to update movie", "error");
    throw error;
  }
}

/**
 * Delete movie by ID
 * @param {number} id
 */
export async function deleteMovie(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete movie");
    showToast("Movie deleted successfully!", "success");
    return await res.json();
  } catch (error) {
    console.error(`Error deleting movie ${id}:`, error);
    showToast("Failed to delete movie", "error");
    throw error;
  }
}

/**
 * Validate movie data before submission
 * @param {Object} movie
 */
export function validateMovie(movie) {
  const errors = {};

  if (!movie.title?.trim()) {
    errors.title = "Title is required";
  }

  if (!movie.year?.trim()) {
    errors.year = "Year is required";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(movie.year)) {
    errors.year = "Year must be in YYYY-MM-DD format";
  }

  if (!movie.poster?.trim()) {
    errors.poster = "Poster URL is required";
  } else if (!movie.poster.startsWith("http")) {
    errors.poster = "Poster must be a valid URL";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
