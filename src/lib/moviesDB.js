import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "movies.json");


/**
 * Normalize movie object to ensure consistency
 * @param {Object} movie
 * @returns {Object} Normalized movie object
 */
function normalizeMovie(movie) {
  return {
    id: Number(movie.id) || Date.now(),
    title: movie.title?.trim() || "Unknown",
    overview: movie.overview?.trim() || "",
    poster: movie.poster?.trim() || movie.poster_path?.trim() || "",
    poster_path: movie.poster_path?.trim() || movie.poster?.trim() || "",
    backdrop_path: movie.backdrop_path?.trim() || "",
    release_date: movie.release_date || movie.year || "",
    year: movie.year || movie.release_date?.slice(0, 4) || "",
    vote_average: Number(movie.vote_average) || 0,
    popularity: Number(movie.popularity) || 0,
    adult: Boolean(movie.adult) || false,
  };
}

/**
 * Read all movies from JSON file
 */
export function readMovies() {
  console.log("READING MOVIES.JSON FROM:", filePath);
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const movies = JSON.parse(data);
    return Array.isArray(movies)
      ? movies
          .map(normalizeMovie)
          .filter((m) => m.title && m.title !== "Unknown")
      : [];
  } catch (error) {
    console.error("Error reading movies:", error);
    return [];
  }
}

/**
 * Write movies to JSON file
 */
export function writeMovies(movies) {
  try {
    const normalized = movies.map(normalizeMovie);
    fs.writeFileSync(filePath, JSON.stringify(normalized, null, 2));
  } catch (error) {
    console.error("Error writing movies:", error);
    throw error;
  }
}

/**
 * Get all movies
 */
export function getMovies() {
  return readMovies();
}

/**
 * Add new movie
 */
export function addMovie(movie) {
  const movies = readMovies();
  const newMovie = normalizeMovie({
    ...movie,
    id: movie.id || Date.now(),
  });
  movies.push(newMovie);
  writeMovies(movies);
  return newMovie;
}

/**
 * Get movie by ID
 */
export function getMovieById(id) {
  const movies = readMovies();
  return movies.find((m) => m.id === Number(id));
}

/**
 * Update movie by ID
 */
export function updateMovie(id, updated) {
  const movies = readMovies();
  const index = movies.findIndex((m) => m.id === Number(id));

  if (index === -1) {
    throw new Error(`Movie with ID ${id} not found`);
  }

  const updatedMovie = normalizeMovie({
    ...movies[index],
    ...updated,
    id: movies[index].id,
  });

  movies[index] = updatedMovie;
  writeMovies(movies);
  return updatedMovie;
}

/**
 * Delete movie by ID
 */
export function deleteMovie(id) {
  const movies = readMovies();
  const filtered = movies.filter((m) => m.id !== Number(id));

  if (filtered.length === movies.length) {
    throw new Error(`Movie with ID ${id} not found`);
  }

  writeMovies(filtered);
  return { success: true, id };
}

/**
 * Search movies by title (case-insensitive)
 */
export function searchMovies(query) {
  const movies = readMovies();
  if (!query?.trim()) return movies;

  const lowerQuery = query.toLowerCase();
  return movies.filter(
    (m) =>
      m.title.toLowerCase().includes(lowerQuery) ||
      m.overview.toLowerCase().includes(lowerQuery)
  );
}
