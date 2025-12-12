export const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
export const IMG_PATH = process.env.NEXT_PUBLIC_TMDB_IMG;

export const ENDPOINTS = {
  DISCOVER: "/discover/movie?sort_by=popularity.desc",
  SEARCH: "/search/movie",
  MOVIE: "/movie",
  POPULAR: "/movie/popular",
};
