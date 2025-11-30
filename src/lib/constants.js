/**
 * Application constants and configuration
 */

// API Configuration
export const API_ENDPOINTS = {
  MOVIES: "/api/admin/movies",
  MOVIE_DETAIL: (id) => `/api/admin/movies/${id}`,
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// Toast Messages
export const TOAST_MESSAGES = {
  MOVIE_ADDED: "Movie added successfully!",
  MOVIE_UPDATED: "Movie updated successfully!",
  MOVIE_DELETED: "Movie deleted successfully!",
  ADD_FAILED: "Failed to add movie",
  UPDATE_FAILED: "Failed to update movie",
  DELETE_FAILED: "Failed to delete movie",
  LOAD_FAILED: "Failed to load movies",
  VALIDATION_ERROR: "Please fill in all required fields",
};

// Form Validation Rules
export const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 255,
  DATE_FORMAT: /^\d{4}-\d{2}-\d{2}$/,
  URL_FORMAT: /^https?:\/\/.+/,
};

// UI Constants
export const UI_CONSTANTS = {
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
  ITEMS_PER_PAGE: 20,
  ANIMATION_DURATION: 300,
};

// Color Schemes
export const COLORS = {
  PRIMARY: "#DC2626", // Red
  BACKGROUND: "#0D0D0D", // Dark
  SURFACE: "#1A1A1A", // Darker
  TEXT: "#FFFFFF", // White
  TEXT_SECONDARY: "#9CA3AF", // Gray
  SUCCESS: "#10B981", // Green
  ERROR: "#EF4444", // Red
  WARNING: "#F59E0B", // Amber
};

// Movie Status
export const MOVIE_STATUS = {
  ACTIVE: "active",
  ARCHIVED: "archived",
  DRAFT: "draft",
};

// Sort Options
export const SORT_OPTIONS = [
  { value: "title", label: "Title (A-Z)" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "rating", label: "Highest Rated" },
];

// Filter Options
export const FILTER_OPTIONS = {
  YEAR: "year",
  GENRE: "genre",
  RATING: "rating",
};

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies & Shows" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/dashboard", label: "Dashboard" },
];

// Breakpoints (Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: "streamvibe_user_prefs",
  WISHLIST: "streamvibe_wishlist",
  RECENT_MOVIES: "streamvibe_recent",
};
