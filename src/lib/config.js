// TMDB API Configuration
// API Key from environment or fallback
export const API_KEY =
  process.env.NEXT_PUBLIC_TMDB_API_KEY || "9813ce01a72ca1bd2ae25f091898b1c7";

// Base URL for TMDB API v3
export const BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";

// Image path prefix for poster/backdrop images
export const IMG_PATH =
  process.env.NEXT_PUBLIC_TMDB_IMG || "https://image.tmdb.org/t/p/w500";

// Common endpoints
export const ENDPOINTS = {
  DISCOVER: "/discover/movie?sort_by=popularity.desc",
  SEARCH: "/search/movie",
  MOVIE: "/movie",
  POPULAR: "/movie/popular",
};
