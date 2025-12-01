"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Edit, Eye } from "lucide-react";
import DeleteModal from "./DeleteModal";
import MovieModal from "./MovieModal";

export default function MoviesTable() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const mountedRef = useRef(true);

  const pageSize = 5;
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";

  const fetchMovies = async () => {
    try {
      const res = await fetch("/api/admin/movies");
      const data = await res.json();
      if (mountedRef.current) {
        setMovies(Array.isArray(data) ? data : []);
      }
    } catch {
      if (mountedRef.current) setMovies([]);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchMovies();
    return () => (mountedRef.current = false);
  }, []);

  const filtered = movies
    .filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) =>
      sortBy === "title"
        ? a.title.localeCompare(b.title)
        : Number(a.year) - Number(b.year)
    );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const buildPosterUrl = (movie) => {
    if (!movie) return "";

    if (movie.poster?.startsWith("http")) return movie.poster;

    if (movie.poster_path) return `${IMG_BASE}${movie.poster_path}`;

    return "/placeholder.png"; 
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/admin/movies/${deleteId}`, { method: "DELETE" });
      fetchMovies();
      setDeleteId(null);
    } catch {}
  };

  return (
    <>
      {/* Search + Sort */}
      <div className="flex items-center justify-between mb-6">
        <input
          placeholder="Search..."
          className="p-2 bg-[#1A1A1A] rounded border border-gray-700 w-64"
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="p-2 bg-[#1A1A1A] border border-gray-700 rounded"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>

      <table className="w-full border border-gray-800 rounded overflow-hidden">
        <thead className="bg-[#1A1A1A]">
          <tr>
            <th className="p-3">Poster</th>
            <th className="p-3">Title</th>
            <th className="p-3">Year</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((m) => {
            const posterUrl = buildPosterUrl(m);

            return (
              <tr key={m.id} className="border-t border-gray-800">
                <td className="p-3">
                  <Image
                    src={posterUrl}
                    alt={m.title}
                    width={56}
                    height={80}
                    className="object-cover rounded bg-gray-800"
                  />
                </td>

                <td className="p-3">{m.title}</td>
                <td className="p-3">{m.year}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => setSelectedMovie(m)}
                    className="text-green-400"
                  >
                    <Eye className="w-5 h-5" />
                  </button>

                  <Link
                    href={`/dashboard/edit/${m.id}`}
                    className="text-blue-400"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>

                  <button
                    onClick={() => setDeleteId(m.id)}
                    className="text-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <button
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
          disabled={page * pageSize >= filtered.length}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      <MovieModal
        open={!!selectedMovie}
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

      <DeleteModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
